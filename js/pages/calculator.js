import { state } from "../state.js";
import { navigate } from "../router.js";

export function init() {
  const flockCostEl = document.getElementById("flockCost");
  const backBtn = document.getElementById("backBatch");

  // 🔢 Calculate broiler total
  const broilerTotal =
    (state.birds.broilers || 0) *
    (state.batch.broilerCost || 0);

  // 🔢 Calculate layer total
  const layerTotal =
    (state.birds.layers || 0) *
    (state.batch.layerCost || 0);

  // 🧮 Total flock cost
  const flockCost = broilerTotal + layerTotal;

  flockCostEl.textContent = flockCost.toLocaleString(undefined, {
    style: "currency",
    currency: "USD"
  });

  backBtn.addEventListener("click", () => {
    navigate("batch-setup");
  });
}
