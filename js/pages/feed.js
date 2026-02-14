import { state } from "../state.js";
import { navigate } from "../router.js";

const feedRules = {
    broiler: {
        sixWeeks:5,
        eightWeeks:7
    },
    layer: {
        toPOL:9
    }

};

export function init() {
  const summary = document.getElementById("feedSummary");
  const bagInput = document.getElementById("bagPrice");
  const saveBtn = document.getElementById("saveFeed");

 
  const broilers = state.birds.broilers || 0;
  const layers = state.birds.layers || 0;

  // Basic broiler feed formula (5kg per bird)
  const totalKgB = broilers * 5;
  const totalBagsB = totalKgB / state.feed.bagWeight;

  // Basic Layer feed formula ( per bird)
  const totalKgL = layers * 9;
  const totalBagsL = totalKgL / state.feed.bagWeight;

  const totalKg = totalKgB + totalKgL;
  const totalBags = totalBagsB + totalBagsL;

  state.feed.totalKg = totalKg;
  state.feed.totalBags = totalBags;

  summary.innerHTML = `
    <p>Total Feed Required: ${totalKg} kg</p>
    <p>Equivalent Bags (50kg): ${totalBags.toFixed(2)}</p>
  `;

  saveBtn.addEventListener("click", () => {
    state.feed.bagPrice =
      Number(bagInput.value) || 0;

    navigate("revenue");
  });
}
