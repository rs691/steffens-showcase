import assert from "node:assert/strict";
import test from "node:test";
import { runDesignAssistant } from "./design-assistant";

test("design assistant quotes a walnut sign and keeps secrets out of the reply", () => {
  const result = runDesignAssistant("Make a large walnut sign that says \"The Millers\"", {
    text: "",
    stain: "woodBackground",
    size: "medium",
  });

  assert.equal(result.draft.size, "large");
  assert.equal(result.draft.stain, "amerBlackWalnut");
  assert.equal(result.draft.text, "The Millers");
  assert.equal(result.quoteCents, 12000);
  assert.equal(result.tools.length, 3);
  assert.equal(result.reply.includes("STRIPE_SECRET_KEY"), false);
  assert.equal(result.reply.includes("sk_"), false);
});
