export type AgentFeature = "design-copilot" | "admin-copilot";

export type AgentLimits = {
  requestsPerMinute: number;
  maxOutputTokens: number;
  maxSteps: number;
  tokenBudgetPerHour: number;
};

export type QuotaDenied = {
  ok: false;
  reason: "rate" | "budget";
  retryAfterSeconds: number;
  message: string;
};

export type QuotaAllowed = {
  ok: true;
  limits: AgentLimits;
};

export type QuotaResult = QuotaAllowed | QuotaDenied;

function envInt(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getAgentLimits(feature: AgentFeature): AgentLimits {
  const isAdmin = feature === "admin-copilot";
  return {
    requestsPerMinute: envInt(
      "AGENT_RATE_LIMIT_PER_MIN",
      isAdmin ? 20 : 12,
    ),
    maxOutputTokens: envInt(
      "AGENT_MAX_OUTPUT_TOKENS",
      isAdmin ? 600 : 700,
    ),
    maxSteps: envInt("AGENT_MAX_STEPS", isAdmin ? 5 : 6),
    tokenBudgetPerHour: envInt("AGENT_TOKEN_BUDGET_PER_HOUR", 25_000),
  };
}

export function clientKeyFromRequest(request: Request, userId?: string | null): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";
  return userId ? `${ip}:${userId}` : ip;
}

/** In-memory sliding window. Per serverless instance — enough to cap demo abuse. */
export class SlidingWindowLimiter {
  private requests = new Map<string, number[]>();
  private budgets = new Map<string, { windowStart: number; used: number }>();

  constructor(private readonly now: () => number = () => Date.now()) {}

  consume(key: string, limits: AgentLimits): QuotaResult {
    const ts = this.now();
    const minuteAgo = ts - 60_000;
    const hits = (this.requests.get(key) ?? []).filter((t) => t > minuteAgo);

    if (hits.length >= limits.requestsPerMinute) {
      const retryAfterSeconds = Math.max(1, Math.ceil((hits[0] + 60_000 - ts) / 1000));
      return {
        ok: false,
        reason: "rate",
        retryAfterSeconds,
        message: "Too many copilot requests. Please wait a minute and try again.",
      };
    }

    const hourMs = 60 * 60 * 1000;
    const budget = this.budgets.get(key);
    const windowStart =
      budget && ts - budget.windowStart < hourMs ? budget.windowStart : ts;
    const used = budget && windowStart === budget.windowStart ? budget.used : 0;
    const nextUsed = used + limits.maxOutputTokens;

    if (nextUsed > limits.tokenBudgetPerHour) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((windowStart + hourMs - ts) / 1000),
      );
      return {
        ok: false,
        reason: "budget",
        retryAfterSeconds,
        message: "Copilot hourly token budget reached. Try again later.",
      };
    }

    hits.push(ts);
    this.requests.set(key, hits);
    this.budgets.set(key, { windowStart, used: nextUsed });
    return { ok: true, limits };
  }

  reset() {
    this.requests.clear();
    this.budgets.clear();
  }
}

export const agentLimiter = new SlidingWindowLimiter();

export function enforceAgentQuota(
  request: Request,
  feature: AgentFeature,
  userId?: string | null,
): QuotaResult {
  const limits = getAgentLimits(feature);
  const key = `${feature}:${clientKeyFromRequest(request, userId)}`;
  return agentLimiter.consume(key, limits);
}

export function quotaDeniedHeaders(result: QuotaDenied): HeadersInit {
  return { "Retry-After": String(result.retryAfterSeconds) };
}
