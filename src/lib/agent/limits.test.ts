import assert from "node:assert/strict";
import test from "node:test";
import { SlidingWindowLimiter, type AgentLimits } from "./limits";

const limits: AgentLimits = {
  requestsPerMinute: 2,
  maxOutputTokens: 100,
  maxSteps: 3,
  tokenBudgetPerHour: 250,
};

test("rate limiter allows requests under the per-minute cap", () => {
  const limiter = new SlidingWindowLimiter(() => 1_000);
  assert.equal(limiter.consume("a", limits).ok, true);
  assert.equal(limiter.consume("a", limits).ok, true);
});

test("rate limiter blocks the third request in the same minute", () => {
  const limiter = new SlidingWindowLimiter(() => 5_000);
  limiter.consume("b", limits);
  limiter.consume("b", limits);
  const denied = limiter.consume("b", limits);
  assert.equal(denied.ok, false);
  if (!denied.ok) {
    assert.equal(denied.reason, "rate");
    assert.ok(denied.retryAfterSeconds >= 1);
  }
});

test("token budget blocks after estimated output tokens exceed the hourly cap", () => {
  const limiter = new SlidingWindowLimiter(() => 10_000);
  const tight: AgentLimits = { ...limits, requestsPerMinute: 10, tokenBudgetPerHour: 150 };
  assert.equal(limiter.consume("c", tight).ok, true);
  const denied = limiter.consume("c", tight);
  assert.equal(denied.ok, false);
  if (!denied.ok) {
    assert.equal(denied.reason, "budget");
  }
});
