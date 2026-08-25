import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateWalnutQuoteContract,
  evaluateWalnutQuoteLive,
} from "./evals";

test("walnut + large eval: quoteSign returns $120", async () => {
  const report = await evaluateWalnutQuoteContract();
  const failed = report.checks.filter((check) => !check.pass);
  assert.equal(
    report.passed,
    true,
    failed.map((check) => `${check.name}: ${check.detail ?? ""}`).join("; "),
  );
});

test(
  "live walnut + large eval calls quoteSign and quotes $120",
  { skip: process.env.RUN_LIVE_EVALS !== "1" },
  async () => {
    const report = await evaluateWalnutQuoteLive();
    const failed = report.checks.filter((check) => !check.pass);
    assert.equal(
      report.passed,
      true,
      failed.map((check) => `${check.name}: ${check.detail ?? ""}`).join("; "),
    );
  },
);
