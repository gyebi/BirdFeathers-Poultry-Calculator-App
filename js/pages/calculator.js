import { state } from "../state.js";
import { navigate } from "../router.js";

export function init() {
  const chickCostEl = document.getElementById("chickCost");
  const feedCostEl = document.getElementById("feedCost");
  const totalCostEl = document.getElementById("totalCost");
  const backBtn = document.getElementById("backBatch");

  // 🐔 Chick Cost
  const broilerTotal =
    (state.birds.broilers || 0) *
    (state.batch.broilerCost || 0);

  const layerTotal =
    (state.birds.layers || 0) *
    (state.batch.layerCost || 0);

  const chickCost = broilerTotal + layerTotal;

  // 🌾 Feed Cost
  const feedCost =
    (state.feed.totalBags || 0) *
    (state.feed.bagPrice || 0);

  // 🧮 Total Cost
  const totalCost = chickCost + feedCost;

  // Format
  const format = value =>
    value.toLocaleString(undefined, {
      style: "currency",
      currency: "USD"
    });

  chickCostEl.textContent = format(chickCost);
  feedCostEl.textContent = format(feedCost);
  totalCostEl.textContent = format(totalCost);

  backBtn.addEventListener("click", () => {
    navigate("batch-setup");
  });
}
