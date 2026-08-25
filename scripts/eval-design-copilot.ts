import { evaluateWalnutQuoteContract, evaluateWalnutQuoteLive } from "@/lib/agent/evals";
import { isAiGatewayConfigured } from "@/lib/agent/design-tools";

async function main() {
  const contract = await evaluateWalnutQuoteContract();
  console.log(JSON.stringify(contract, null, 2));
  if (!contract.passed) {
    process.exitCode = 1;
  }

  if (process.env.RUN_LIVE_EVALS === "1" || isAiGatewayConfigured()) {
    const live = await evaluateWalnutQuoteLive();
    console.log(JSON.stringify(live, null, 2));
    if (!live.passed) process.exitCode = 1;
  } else {
    console.log("Live eval skipped (set RUN_LIVE_EVALS=1 with AI Gateway configured).");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
