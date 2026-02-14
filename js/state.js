// js/state.js
export const state = {
  flow: {
    birdType: null,
    step: 1
  },

  birds: {
    broilers: 0,
    layers: 0,
  },

  batch: {
    broilerCost: 0,
    layerCost: 0,
  },

  production: {
    broilerWeeks: 6,
    broilerWeeks: 8,
    layerWeeks: 18,

    layer: {
    rateOfLay: 0.0, // 80%
    cycleDays: 365,
    cullThreshold: 0.6,
    resalePricePerBird: 0
  }
  },

  feed: {
    bagWeight: 50,
    bagPrice: 0,
    totalKg: 0,
    totalBags: 0,
  },


  mortality: {
    broilerRate: 0, // percentage
    layerRate: 0,
  },


  revenue: {
    //broilerPricePerKg: 0,
    broilerPricePerBird: 0,

    broilerSellPrice: 0,
    
    layerEggPricePerCrate: 0,
    averageEggsPerLayer: 280, // yearly estimate
  },




};
