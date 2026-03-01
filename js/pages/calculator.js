import { state } from "../state.js";
import { navigate } from "../router.js";

export function init() {
  const chickCostEl = document.getElementById("chickCost");
  const feedCostEl = document.getElementById("feedCost");
  const totalCostEl = document.getElementById("totalCost");
  const eggRevenueEl = document.getElementById("eggRevenue");

  const broilerRevenueEl = document.getElementById("broilerRevenue");
  const resaleRevenueEl = document.getElementById("resaleRevenue");
  const totalLayerRevenueEl = document.getElementById("totalLayerRevenue");
  const totalRevenueEl = document.getElementById("totalRevenue");
  const profitEl = document.getElementById("profit");
  const backBtn = document.getElementById("backBatch");

  let eggRevenue = 0;
  let resaleRevenue = 0;
  let totalLayerRevenue = 0;
  let broilerRevenue = 0;

  // Format
  const format = value =>
    value.toLocaleString(undefined, {
      style: "currency",
      currency: "USD"
    });

  

  // 🐔 Chick Cost
  const broilerTotal =
    (state.birds.broilers || 0) * (state.batch.broilerCost || 0);

  const layerTotal =
    (state.birds.layers || 0) * (state.batch.layerCost || 0);

  const chickCost = broilerTotal + layerTotal;

  console.log("Broiler Chick Cost:", broilerTotal);
  console.log("Layer Chick Cost:", layerTotal);
  console.log("Total Chick Cost:", chickCost);

  //Survival calculations

  const survivingBroilers =
  state.birds.broilers *
  (1 - (state.mortality.broilerRate || 0) / 100);

const survivingLayers =
  state.birds.layers *
  (1 - (state.mortality.layerRate || 0) / 100);

  // 🌾 Feed Cost
 //Broliers 
  const broilerStarter = state.feed.broilers.broilerStarter.totalKg;
  const broilerFinisher = state.feed.broilers.broilerFinisher.totalKg;

  console.log("Broiler Starter in Kg:", broilerStarter);
  console.log("Broiler Finisher in Kg:", broilerFinisher);

  const broilerStarterBags = state.feed.broilers.broilerStarter.totalBags;
  const broilerFinisherBags = state.feed.broilers.broilerFinisher.totalBags;

  console.log("Broiler Starter Bags:", broilerStarterBags);
  console.log("Broiler Finisher Bags:", broilerFinisherBags);

  const totalBags = broilerStarterBags + broilerFinisherBags;

  console.log("Total Broiler Bags:", totalBags);

  const feedCostBroiler = broilerStarterBags * (state.feed.bagPrice || 0);
  const feedCostFinisher = broilerFinisherBags * (state.feed.bagPrice || 0);

  console.log("Broiler Starter Feed Cost:", feedCostBroiler);
  console.log("Broiler Finisher Feed Cost:", feedCostFinisher);

  const TotalFeedCostBroilers = feedCostBroiler + feedCostFinisher;
  
  console.log("Total Feed Cost for Broilers:", TotalFeedCostBroilers);

// Layers
  const layerStarter = state.feed.layers.layerStarter.totalKg;
  const layerGrower = state.feed.layers.layerGrower.totalKg;
  console.log("Layer Starter in Kg:", layerStarter);
  console.log("Layer Grower in Kg:", layerGrower);

  const layerStarterBags = state.feed.layers.layerStarter.totalBags;
  const layerGrowerBags = state.feed.layers.layerGrower.totalBags;
  console.log("Layer Starter Bags:", layerStarterBags);
  console.log("Layer Grower Bags:", layerGrowerBags);


  //Layer Marsh 

  // Layer Marsh 
  //surviving layers * Daily feed per layer * cycle days 


  // Store Layer Mash
  const layerMashBags = state.feed.layers.layerMash.totalBags;
  const costLayerMash = layerMashBags * (state.feed.bagPrice || 0);
  console.log("Layer Mash Cost:", costLayerMash);    

  

  const feedCostLayerStarter = layerStarterBags * (state.feed.bagPrice || 0);
  const feedCostLayerGrower = layerGrowerBags * (state.feed.bagPrice || 0);

  console.log("Layer Starter Feed Cost:", feedCostLayerStarter);
  console.log("Layer Grower Feed Cost:", feedCostLayerGrower);
  console.log("Layer Mash Feed Cost:", costLayerMash);

  const TotalFeedCostLayers = feedCostLayerStarter + feedCostLayerGrower + costLayerMash;
  console.log("Total Feed Cost for Layers:", TotalFeedCostLayers);


  // 🧮 Total Cost
  const totalCost = chickCost + TotalFeedCostBroilers + TotalFeedCostLayers;

  chickCostEl.textContent = format(chickCost);
  feedCostEl.textContent = format(TotalFeedCostBroilers + TotalFeedCostLayers );
  totalCostEl.textContent = format(totalCost);


// BROILER REVENUE
const avgWeight =
  state.production.broilerWeeks === 8 ? 2.8 : 2.2;

 broilerRevenue =
  survivingBroilers * (state.revenue.broilerSellPrice || 0);

// LAYER REVENUE

const rateOfLay =
  state.production.layer.rateOfLay || 0;

const threshold =
  state.production.layer.cullThreshold;



if (rateOfLay >= threshold) {

  const dailyEggs =
    survivingLayers * rateOfLay;

  const annualEggs =
      dailyEggs * (state.production.layer?.cycleDays || 365);

    const eggPrice =
      state.revenue.cratePrice
        ? state.revenue.cratePrice / 30
        : 0;

  eggRevenue =
    annualEggs * (eggPrice || 0);

} else {

  resaleRevenue =
    survivingLayers *
    (state.production.layer?.resalePricePerBird || 0);
}

totalLayerRevenue = eggRevenue + resaleRevenue;
 
if(state.birds.layers > 0) {
if (rateOfLay < threshold) {
  console.warn("Layer productivity below threshold — consider culling.");
}

if (rateOfLay < threshold) {
  document.getElementById("layerRevenue").style.color = "orange";
}

}

  broilerRevenueEl.textContent = format(broilerRevenue);

  eggRevenueEl.textContent = format(eggRevenue);
  resaleRevenueEl.textContent = format(resaleRevenue);
  totalLayerRevenueEl.textContent = format(eggRevenue + resaleRevenue);

  const totalRevenue = broilerRevenue + eggRevenue + resaleRevenue;
  totalRevenueEl.textContent = format(totalRevenue);

  const profit = totalRevenue - totalCost;
  profitEl.textContent = format(profit);

  if (profit > 0) {
    profitEl.textContent = `Congratulations! Going by your entries, you made a profit of ${format(profit)}`;
  } else if (profit < 0) {
    profitEl.textContent = `Unfortunately, based on your entries, you incurred a loss of ${format(profit)}`;
  } else {
    profitEl.textContent = "Your revenue and costs are perfectly balanced, resulting in a break-even scenario.";
  }

  profitEl.style.color =
    profit >= 0 ? "green" : "red";

  backBtn.addEventListener("click", () => {
    navigate("bird-type");
  });

console.log("Broiler Revenue:", broilerRevenue);
console.log("Layer Revenue:", totalLayerRevenue);
console.log("Total Revenue:", totalRevenue);
}
