import type { CommunityReport, DealerResponse, DealType, FuelType, ManufacturerPromotion, StateOption, VehicleDeal, VehicleProfile } from "@/lib/types";

export const genericVehicleImage = "https://placehold.co/900x520/e8eef7/09111f?text=New+Vehicle";

export const usStates: StateOption[] = [
  ["AL", "Alabama", "South", "Birmingham"],
  ["AK", "Alaska", "West", "Anchorage"],
  ["AZ", "Arizona", "West", "Phoenix"],
  ["AR", "Arkansas", "South", "Little Rock"],
  ["CA", "California", "West", "Los Angeles"],
  ["CO", "Colorado", "West", "Denver"],
  ["CT", "Connecticut", "Northeast", "Hartford"],
  ["DE", "Delaware", "Northeast", "Wilmington"],
  ["DC", "Washington, D.C.", "Northeast", "Washington"],
  ["FL", "Florida", "South", "Miami"],
  ["GA", "Georgia", "South", "Atlanta"],
  ["HI", "Hawaii", "West", "Honolulu"],
  ["ID", "Idaho", "West", "Boise"],
  ["IL", "Illinois", "Midwest", "Chicago"],
  ["IN", "Indiana", "Midwest", "Indianapolis"],
  ["IA", "Iowa", "Midwest", "Des Moines"],
  ["KS", "Kansas", "Midwest", "Wichita"],
  ["KY", "Kentucky", "South", "Louisville"],
  ["LA", "Louisiana", "South", "New Orleans"],
  ["ME", "Maine", "Northeast", "Portland"],
  ["MD", "Maryland", "Northeast", "Baltimore"],
  ["MA", "Massachusetts", "Northeast", "Boston"],
  ["MI", "Michigan", "Midwest", "Detroit"],
  ["MN", "Minnesota", "Midwest", "Minneapolis"],
  ["MS", "Mississippi", "South", "Jackson"],
  ["MO", "Missouri", "Midwest", "St. Louis"],
  ["MT", "Montana", "West", "Billings"],
  ["NE", "Nebraska", "Midwest", "Omaha"],
  ["NV", "Nevada", "West", "Las Vegas"],
  ["NH", "New Hampshire", "Northeast", "Manchester"],
  ["NJ", "New Jersey", "Northeast", "Princeton"],
  ["NM", "New Mexico", "West", "Albuquerque"],
  ["NY", "New York", "Northeast", "New York"],
  ["NC", "North Carolina", "South", "Charlotte"],
  ["ND", "North Dakota", "Midwest", "Fargo"],
  ["OH", "Ohio", "Midwest", "Columbus"],
  ["OK", "Oklahoma", "South", "Oklahoma City"],
  ["OR", "Oregon", "West", "Portland"],
  ["PA", "Pennsylvania", "Northeast", "Philadelphia"],
  ["RI", "Rhode Island", "Northeast", "Providence"],
  ["SC", "South Carolina", "South", "Charleston"],
  ["SD", "South Dakota", "Midwest", "Sioux Falls"],
  ["TN", "Tennessee", "South", "Nashville"],
  ["TX", "Texas", "South", "Austin"],
  ["UT", "Utah", "West", "Salt Lake City"],
  ["VT", "Vermont", "Northeast", "Burlington"],
  ["VA", "Virginia", "South", "Richmond"],
  ["WA", "Washington", "West", "Seattle"],
  ["WV", "West Virginia", "South", "Charleston"],
  ["WI", "Wisconsin", "Midwest", "Milwaukee"],
  ["WY", "Wyoming", "West", "Cheyenne"]
].map(([code, name, region, capitalOrMajorMarket]) => ({ code, name, region, capitalOrMajorMarket }));

const regionStates = {
  West: usStates.filter((state) => state.region === "West").map((state) => state.code),
  South: usStates.filter((state) => state.region === "South").map((state) => state.code),
  Midwest: usStates.filter((state) => state.region === "Midwest").map((state) => state.code),
  Northeast: usStates.filter((state) => state.region === "Northeast").map((state) => state.code)
};

type ModelSeed = [model: string, family: string, bodyStyle: string, baseMsrp: number, fuelType?: FuelType, powertrain?: string, drivetrain?: string];
type MakeSeed = { make: string; manufacturer?: string; models: ModelSeed[] };

const makeModelSeeds: MakeSeed[] = [
  { make: "Acura", manufacturer: "Honda Motor Co.", models: [["Integra", "Integra", "Hatchback", 33100], ["TLX", "TLX", "Sedan", 46500], ["RDX", "RDX", "SUV", 45200], ["MDX", "MDX", "SUV", 55650], ["ZDX", "ZDX", "SUV", 65400, "Electric", "Dual-motor EV", "AWD"]] },
  { make: "Alfa Romeo", manufacturer: "Stellantis", models: [["Giulia", "Giulia", "Sedan", 46100], ["Stelvio", "Stelvio", "SUV", 48900], ["Tonale", "Tonale", "SUV", 47640, "Plug-in Hybrid", "PHEV AWD", "AWD"], ["4C", "4C", "Performance", 71000], ["Junior", "Junior", "SUV", 42900, "Electric", "EV", "FWD"]] },
  { make: "Audi", manufacturer: "Volkswagen Group", models: [["A3", "A3", "Sedan", 38900], ["A5", "A5", "Coupe", 49500], ["Q5", "Q5", "SUV", 54895], ["Q7", "Q7", "SUV", 61300], ["Q8 e-tron", "Q8", "SUV", 75400, "Electric", "Dual-motor EV", "AWD"]] },
  { make: "BMW", manufacturer: "BMW Group", models: [["3 Series", "3 Series", "Sedan", 47200], ["5 Series", "5 Series", "Sedan", 59100], ["X3", "X3", "SUV", 50200], ["X5", "X5", "SUV", 67300], ["i4", "i4", "Sedan", 62195, "Electric", "EV", "RWD"]] },
  { make: "Buick", manufacturer: "General Motors", models: [["Envista", "Envista", "SUV", 29290], ["Encore GX", "Encore", "SUV", 28600], ["Envision", "Envision", "SUV", 37500], ["Enclave", "Enclave", "SUV", 46900], ["Electra E5", "Electra", "SUV", 49900, "Electric", "EV", "AWD"]] },
  { make: "Cadillac", manufacturer: "General Motors", models: [["CT4", "CT4", "Sedan", 36100], ["CT5", "CT5", "Sedan", 48700], ["XT5", "XT5", "SUV", 45600], ["Escalade", "Escalade", "SUV", 89900], ["Lyriq", "Lyriq", "SUV", 64290, "Electric", "EV", "AWD"]] },
  { make: "Chevrolet", manufacturer: "General Motors", models: [["Malibu", "Malibu", "Sedan", 26500], ["Trax", "Trax", "SUV", 22400], ["Equinox EV", "Equinox", "SUV", 43595, "Electric", "EV", "FWD"], ["Silverado 1500", "Silverado", "Truck", 48900], ["Colorado", "Colorado", "Truck", 33700]] },
  { make: "Chrysler", manufacturer: "Stellantis", models: [["Pacifica", "Pacifica", "Minivan", 46325], ["Pacifica Hybrid", "Pacifica", "Minivan", 54800, "Plug-in Hybrid", "PHEV", "FWD"], ["Voyager", "Voyager", "Minivan", 41800], ["300", "300", "Sedan", 39200], ["Halcyon", "Halcyon", "Sedan", 57900, "Electric", "EV", "AWD"]] },
  { make: "Dodge", manufacturer: "Stellantis", models: [["Hornet", "Hornet", "SUV", 38780], ["Durango", "Durango", "SUV", 45400], ["Charger", "Charger", "Performance", 49900], ["Charger Daytona", "Charger", "Performance", 68900, "Electric", "EV", "AWD"], ["Hornet R/T", "Hornet", "SUV", 45500, "Plug-in Hybrid", "PHEV AWD", "AWD"]] },
  { make: "Ford", manufacturer: "Ford Motor Company", models: [["Mustang", "Mustang", "Performance", 33900], ["Escape", "Escape", "SUV", 32100], ["Bronco", "Bronco", "SUV", 39900], ["F-150", "F-Series", "Truck", 56180], ["F-150 Lightning", "F-Series", "Truck", 64900, "Electric", "Dual-motor EV", "AWD"]] },
  { make: "Genesis", manufacturer: "Hyundai Motor Group", models: [["G70", "G70", "Sedan", 43100], ["G80", "G80", "Sedan", 57500], ["GV70", "GV70", "SUV", 53650], ["GV80", "GV80", "SUV", 67100], ["Electrified GV70", "GV70", "SUV", 68800, "Electric", "Dual-motor EV", "AWD"]] },
  { make: "GMC", manufacturer: "General Motors", models: [["Terrain", "Terrain", "SUV", 31400], ["Acadia", "Acadia", "SUV", 43800], ["Yukon", "Yukon", "SUV", 68200], ["Sierra 1500", "Sierra", "Truck", 58995], ["Hummer EV Pickup", "Hummer EV", "Truck", 98900, "Electric", "Tri-motor EV", "AWD"]] },
  { make: "Honda", manufacturer: "Honda Motor Co.", models: [["Civic", "Civic", "Sedan", 26300], ["Accord", "Accord", "Sedan", 35210, "Hybrid", "Hybrid FWD", "FWD"], ["HR-V", "HR-V", "SUV", 27100], ["CR-V", "CR-V", "SUV", 35900, "Hybrid", "Hybrid AWD", "AWD"], ["Ridgeline", "Ridgeline", "Truck", 42100]] },
  { make: "Hyundai", manufacturer: "Hyundai Motor Group", models: [["Elantra", "Elantra", "Sedan", 22900], ["Sonata", "Sonata", "Sedan", 31700, "Hybrid", "Hybrid FWD", "FWD"], ["Tucson", "Tucson", "SUV", 33400], ["Santa Fe", "Santa Fe", "SUV", 37900], ["Ioniq 5", "Ioniq", "SUV", 52340, "Electric", "EV", "AWD"]] },
  { make: "Infiniti", manufacturer: "Nissan Motor Co.", models: [["Q50", "Q50", "Sedan", 44500], ["QX50", "QX50", "SUV", 42800], ["QX55", "QX55", "SUV", 51200], ["QX60", "QX60", "SUV", 56995], ["QX80", "QX80", "SUV", 82450]] },
  { make: "Jeep", manufacturer: "Stellantis", models: [["Compass", "Compass", "SUV", 29900], ["Wrangler", "Wrangler", "SUV", 38100], ["Grand Cherokee", "Grand Cherokee", "SUV", 61230, "Plug-in Hybrid", "PHEV 4x4", "4WD"], ["Wagoneer", "Wagoneer", "SUV", 68400], ["Gladiator", "Gladiator", "Truck", 42100]] },
  { make: "Kia", manufacturer: "Hyundai Motor Group", models: [["K4", "K4", "Sedan", 23100], ["K5", "K5", "Sedan", 29900], ["Sportage", "Sportage", "SUV", 33200, "Hybrid", "Hybrid AWD", "AWD"], ["Telluride", "Telluride", "SUV", 41200], ["EV6", "EV", "SUV", 49850, "Electric", "EV", "RWD"]] },
  { make: "Lexus", manufacturer: "Toyota Motor Corp.", models: [["IS", "IS", "Sedan", 42000], ["ES", "ES", "Sedan", 44900, "Hybrid", "Hybrid FWD", "FWD"], ["NX", "NX", "SUV", 46600], ["RX", "RX", "SUV", 53340], ["RZ", "RZ", "SUV", 59900, "Electric", "EV", "AWD"]] },
  { make: "Lincoln", manufacturer: "Ford Motor Company", models: [["Corsair", "Corsair", "SUV", 41200], ["Nautilus", "Nautilus", "SUV", 60415, "Hybrid", "Hybrid AWD", "AWD"], ["Aviator", "Aviator", "SUV", 59800], ["Navigator", "Navigator", "SUV", 87200], ["Star", "Star", "SUV", 69900, "Electric", "EV", "AWD"]] },
  { make: "Mazda", manufacturer: "Mazda Motor Corp.", models: [["Mazda3", "Mazda3", "Sedan", 25500], ["CX-30", "CX", "SUV", 28700], ["CX-50", "CX", "SUV", 40200, "Hybrid", "Hybrid AWD", "AWD"], ["CX-90", "CX", "SUV", 43800, "Plug-in Hybrid", "PHEV AWD", "AWD"], ["MX-5 Miata", "MX-5", "Performance", 31200]] },
  { make: "Mercedes-Benz", manufacturer: "Mercedes-Benz Group", models: [["C-Class", "C-Class", "Sedan", 51250], ["E-Class", "E-Class", "Sedan", 65100], ["GLC", "GLC", "SUV", 51900], ["GLE", "GLE", "SUV", 64900], ["EQE SUV", "EQ", "SUV", 77900, "Electric", "EV", "AWD"]] },
  { make: "MINI", manufacturer: "BMW Group", models: [["Cooper Hardtop", "Cooper", "Hatchback", 30900], ["Cooper Convertible", "Cooper", "Convertible", 35600], ["Countryman", "Countryman", "SUV", 39195], ["Clubman", "Clubman", "Wagon", 38900], ["Countryman SE", "Countryman", "SUV", 46800, "Electric", "EV", "AWD"]] },
  { make: "Mitsubishi", manufacturer: "Mitsubishi Motors", models: [["Mirage", "Mirage", "Hatchback", 18100], ["Outlander Sport", "Outlander", "SUV", 25900], ["Eclipse Cross", "Eclipse Cross", "SUV", 29400], ["Outlander", "Outlander", "SUV", 35600], ["Outlander PHEV", "Outlander", "SUV", 46890, "Plug-in Hybrid", "PHEV AWD", "AWD"]] },
  { make: "Nissan", manufacturer: "Nissan Motor Co.", models: [["Sentra", "Sentra", "Sedan", 22200], ["Altima", "Altima", "Sedan", 28700], ["Rogue", "Rogue", "SUV", 35485], ["Pathfinder", "Pathfinder", "SUV", 41300], ["Ariya", "Ariya", "SUV", 46100, "Electric", "EV", "FWD"]] },
  { make: "Porsche", manufacturer: "Volkswagen Group", models: [["718 Cayman", "718", "Performance", 72900], ["911", "911", "Performance", 122100], ["Macan", "Macan", "SUV", 64900], ["Cayenne", "Cayenne", "SUV", 86800], ["Macan Electric", "Macan", "SUV", 80795, "Electric", "EV", "AWD"]] },
  { make: "Ram", manufacturer: "Stellantis", models: [["1500", "1500", "Truck", 55480], ["2500", "2500", "Truck", 61200, "Diesel", "Cummins diesel", "4WD"], ["3500", "3500", "Truck", 70500, "Diesel", "Cummins diesel", "4WD"], ["ProMaster", "ProMaster", "Commercial", 46900], ["1500 REV", "1500", "Truck", 69900, "Electric", "EV", "4WD"]] },
  { make: "Subaru", manufacturer: "Subaru Corp.", models: [["Impreza", "Impreza", "Hatchback", 24500], ["Legacy", "Legacy", "Sedan", 26800], ["Crosstrek", "Crosstrek", "SUV", 29600], ["Outback", "Outback", "Wagon", 39730], ["Solterra", "Solterra", "SUV", 46800, "Electric", "EV", "AWD"]] },
  { make: "Tesla", manufacturer: "Tesla", models: [["Model 3", "Model", "Sedan", 38990, "Electric", "EV", "RWD"], ["Model Y", "Model", "SUV", 49990, "Electric", "EV", "AWD"], ["Model S", "Model", "Sedan", 79990, "Electric", "EV", "AWD"], ["Model X", "Model", "SUV", 84990, "Electric", "EV", "AWD"], ["Cybertruck", "Cybertruck", "Truck", 79990, "Electric", "EV", "AWD"]] },
  { make: "Toyota", manufacturer: "Toyota Motor Corp.", models: [["Camry", "Camry", "Sedan", 33110, "Hybrid", "Hybrid FWD", "FWD"], ["Corolla", "Corolla", "Sedan", 23800], ["RAV4", "RAV4", "SUV", 34900, "Hybrid", "Hybrid AWD", "AWD"], ["Tacoma", "Tacoma", "Truck", 46240], ["bZ4X", "bZ", "SUV", 44300, "Electric", "EV", "AWD"]] },
  { make: "Volkswagen", manufacturer: "Volkswagen Group", models: [["Jetta", "Jetta", "Sedan", 23200], ["Golf GTI", "Golf", "Hatchback", 33700], ["Taos", "Taos", "SUV", 28200], ["Atlas", "Atlas", "SUV", 39800], ["ID.4", "ID", "SUV", 51195, "Electric", "EV", "RWD"]] },
  { make: "Volvo", manufacturer: "Volvo Cars", models: [["S60", "S60", "Sedan", 43600, "Mild Hybrid", "Mild hybrid", "AWD"], ["V60 Cross Country", "V60", "Wagon", 51200, "Mild Hybrid", "Mild hybrid", "AWD"], ["XC40", "XC", "SUV", 41600], ["XC60", "XC", "SUV", 52495, "Mild Hybrid", "Mild hybrid", "AWD"], ["EX90", "EX", "SUV", 79900, "Electric", "EV", "AWD"]] }
];

const trimNames = ["Core", "Premium", "Limited"];

export const majorMakes = makeModelSeeds.map((seed) => seed.make);

export const vehicleCatalog: VehicleProfile[] = makeModelSeeds.flatMap((makeSeed, makeIndex) =>
  makeSeed.models.flatMap(([model, family, bodyStyle, baseMsrp, fuelType = "Gasoline", powertrain = "Turbocharged gas", drivetrain = "FWD"], modelIndex) =>
    trimNames.map((trim, trimIndex) => {
      const year = 2026 - ((makeIndex + modelIndex + trimIndex) % 2);
      const id = slug([year, makeSeed.make, model, trim].join(" "));
      const msrp = baseMsrp + trimIndex * Math.round(baseMsrp * 0.085);
      const isEV = fuelType === "Electric";
      const isHybrid = fuelType.includes("Hybrid");
      return {
        id,
        year,
        make: makeSeed.make,
        model,
        trim,
        manufacturer: makeSeed.manufacturer ?? makeSeed.make,
        modelFamily: family,
        msrp,
        bodyStyle,
        drivetrain,
        engine: powertrain,
        fuelType,
        powertrain,
        isEV,
        isHybrid,
        stockPhotoUrl: photoUrl(makeSeed.make, model, trim),
        modelPhotoUrl: photoUrl(makeSeed.make, model),
        makePhotoUrl: photoUrl(makeSeed.make, "vehicle"),
        fallbackImageUrl: genericVehicleImage,
        imageUrl: photoUrl(makeSeed.make, model, trim),
        marketAvailability: {
          states: usStates.map((state) => state.code),
          regions: ["National", "West", "South", "Midwest", "Northeast"]
        },
        regionalEligibility: ["National", "West", "South", "Midwest", "Northeast"],
        manufacturerIncentiveSupport: true,
        oemProgramSupport: [
          "National manufacturer lease promotion",
          "Regional manufacturer lease promotion",
          "National manufacturer finance APR promotion",
          "Regional manufacturer finance APR promotion",
          "Lease cash",
          "Retail bonus cash",
          "Loyalty incentive",
          "Conquest incentive",
          isEV ? "EV credit" : "Regional dealer cash"
        ]
      };
    })
  )
);

export const manufacturerPromotions: ManufacturerPromotion[] = vehicleCatalog.flatMap((profile, index) => {
  const region = ["National", "West", "South", "Midwest", "Northeast"][index % 5];
  const leasePayment = Math.round(profile.msrp * (profile.isEV ? 0.0078 : profile.isHybrid ? 0.0094 : 0.0102));
  const financePayment = Math.round(profile.msrp / (profile.isEV ? 78 : 72));
  const base = {
    vehicleId: profile.id,
    make: profile.make,
    region,
    scope: region === "National" ? "National" as const : "Regional" as const,
    msrp: profile.msrp,
    sellingPrice: profile.msrp - Math.round(profile.msrp * 0.035),
    incentives: profile.isEV ? 7500 + (index % 3) * 1000 : 1000 + (index % 4) * 500,
    dealerDiscount: Math.round(profile.msrp * 0.035),
    evTaxCredit: profile.isEV,
    loyaltyCash: index % 4 === 0 ? 1000 : 0,
    conquestCash: index % 5 === 0 ? 1500 : 0,
    leaseCash: profile.isEV || profile.isHybrid ? 2500 : 1000,
    retailBonusCash: index % 3 === 0 ? 1250 : 500,
    expiresAt: "2026-06-30",
    sourceUrl: `https://www.${profile.make.toLowerCase().replace(/[^a-z0-9]/g, "")}.com/offers`
  };

  return [
    {
      ...base,
      id: `oem-${profile.id}-lease`,
      programName: `${profile.make} ${profile.model} manufacturer lease promotion`,
      type: "Lease" as DealType,
      monthlyPayment: leasePayment,
      dueAtSigning: profile.isEV ? 2999 : 3499,
      term: profile.isEV ? 24 : 36,
      mileage: 10000 + (index % 2) * 2000,
      moneyFactor: Number((0.00125 + (index % 6) * 0.00014).toFixed(5))
    },
    {
      ...base,
      id: `oem-${profile.id}-finance`,
      programName: `${profile.make} ${profile.model} manufacturer APR promotion`,
      type: "Finance" as DealType,
      monthlyPayment: financePayment,
      dueAtSigning: 4000,
      term: 72,
      mileage: 0,
      apr: Number((profile.isEV ? 1.9 + (index % 3) : 2.9 + (index % 4)).toFixed(1))
    }
  ];
});

export const deals: VehicleDeal[] = vehicleCatalog.flatMap((profile, index) => {
  const targetStates = stateSpread(index);
  return targetStates.flatMap((stateCode, stateIndex) => {
    const lease = manufacturerPromotions.find((promotion) => promotion.vehicleId === profile.id && promotion.type === "Lease")!;
    const finance = manufacturerPromotions.find((promotion) => promotion.vehicleId === profile.id && promotion.type === "Finance")!;
    return [
      createGeneratedDeal(profile, lease, index, stateCode, stateIndex),
      createGeneratedDeal(profile, finance, index + 3, stateCode, stateIndex + 1)
    ];
  });
}).sort((a, b) => b.benchmark.effectiveSavings - a.benchmark.effectiveSavings);

export const communityReports: CommunityReport[] = [
  community("r1", "BMW i4 eDrive40", "Los Angeles, CA", "Leasehackr", "Imported worksheet-style comp shows EV lease cash stacking with dealer discount below the manufacturer lease benchmark.", 452, 2900, 36, 7800, 82),
  community("r2", "Hyundai Ioniq 5 SEL AWD", "Seattle, WA", "Reddit", "Public discussion references improved regional EV lease support and dealer-advertised discounts.", 312, 1999, 24, 6000, 78),
  community("r3", "Honda Accord EX-L Hybrid", "Atlanta, GA", "Customer Upload", "Customer-submitted worksheet includes dealer discount, loyalty cash, and due-at-signing structure.", 389, 2895, 36, 3460, 89)
];

export const dealerResponses: DealerResponse[] = [
  {
    id: "m1",
    dealer: "Lone Star BMW",
    status: "best offer",
    vehicle: "BMW i4 Premium",
    monthlyPayment: 482,
    dueAtSigning: 2900,
    oemMonthlyPayment: 510,
    benchmarkAdvantage: 28,
    responseRank: 1,
    message: "We can beat the written manufacturer benchmark if you can take delivery this week.",
    receivedAt: "18 min ago"
  },
  {
    id: "m2",
    dealer: "Austin EV Auto Group",
    status: "countered",
    vehicle: "BMW i4 Premium",
    monthlyPayment: 501,
    dueAtSigning: 2999,
    oemMonthlyPayment: 510,
    benchmarkAdvantage: 9,
    responseRank: 2,
    message: "We are still below the manufacturer lease special and can include all-weather mats.",
    receivedAt: "1 hr ago"
  },
  {
    id: "m3",
    dealer: "Capitol Motors",
    status: "no response",
    vehicle: "BMW i4 Premium",
    monthlyPayment: 0,
    dueAtSigning: 0,
    oemMonthlyPayment: 510,
    benchmarkAdvantage: 0,
    responseRank: 3,
    message: "Campaign sent. Follow-up queued for tomorrow morning.",
    receivedAt: "Sent yesterday"
  }
];

export const favoritedDeals = deals.slice(0, 8);

export const regionQuality = [
  { region: "West", lease: 94, finance: 76 },
  { region: "South", lease: 88, finance: 82 },
  { region: "California", lease: 84, finance: 74 },
  { region: "Midwest", lease: 76, finance: 90 },
  { region: "Northeast", lease: 79, finance: 73 },
  { region: "All U.S. markets", lease: 86, finance: 81 }
];

function createGeneratedDeal(profile: VehicleProfile, oem: ManufacturerPromotion, index: number, stateCode: string, stateIndex: number): VehicleDeal {
  const state = usStates.find((item) => item.code === stateCode)!;
  const discountRate = 0.038 + ((index + stateIndex) % 5) * 0.009;
  const dealerDiscount = Math.round(profile.msrp * discountRate);
  const beats = (index + stateIndex) % 4 !== 1;
  const monthlyDelta = beats ? 12 + ((index + stateIndex) % 6) * 9 : -18 - ((index + stateIndex) % 3) * 7;
  const sellingPrice = profile.msrp - dealerDiscount;

  return buildDeal(profile, oem, {
    dealer: `${state.capitalOrMajorMarket} ${profile.make}`,
    city: state.capitalOrMajorMarket,
    state: state.code,
    distance: 4 + ((index + stateIndex) % 42),
    monthlyPayment: Math.max(179, oem.monthlyPayment - monthlyDelta),
    dueAtSigning: Math.max(999, oem.dueAtSigning - (beats ? 400 : -350)),
    apr: oem.type === "Finance" ? Math.max(0.9, Number(((oem.apr ?? 3.9) - (beats ? 0.6 : -0.5)).toFixed(1))) : undefined,
    moneyFactor: oem.type === "Lease" ? Math.max(0.00085, Number(((oem.moneyFactor ?? 0.0018) - (beats ? 0.00012 : -0.00008)).toFixed(5))) : undefined,
    sellingPrice,
    incentives: oem.incentives + (beats ? 500 : 0) + ((index + stateIndex) % 3) * 250,
    dealerDiscount,
    dealerFees: 249 + ((index + stateIndex) % 5) * 100,
    brokerFee: (index + stateIndex) % 13 === 0 ? 399 : 0,
    confidence: 72 + ((index + stateIndex) % 7) * 4,
    communityComps: 2 + ((index + stateIndex) % 8),
    updatedAt: (index + stateIndex) % 3 === 0 ? "Today" : (index + stateIndex) % 3 === 1 ? "Yesterday" : "2 days ago"
  });
}

function buildDeal(
  profile: VehicleProfile,
  oem: ManufacturerPromotion,
  data: {
    dealer: string;
    city: string;
    state: string;
    distance: number;
    monthlyPayment: number;
    dueAtSigning: number;
    apr?: number;
    moneyFactor?: number;
    sellingPrice: number;
    incentives: number;
    dealerDiscount: number;
    dealerFees: number;
    brokerFee: number;
    confidence: number;
    communityComps: number;
    updatedAt: string;
  }
): VehicleDeal {
  const monthlySavings = oem.monthlyPayment - data.monthlyPayment;
  const aprImprovement = Number(((oem.apr ?? 0) - (data.apr ?? oem.apr ?? 0)).toFixed(1));
  const dueAtSigningSavings = oem.dueAtSigning - data.dueAtSigning;
  const discountAdvantage = data.dealerDiscount - oem.dealerDiscount;
  const effectiveSavings = monthlySavings * oem.term + dueAtSigningSavings + discountAdvantage;
  const benchmarkStatus =
    effectiveSavings > 5000 || monthlySavings >= 50
      ? "EXCEPTIONAL_REGIONAL_DEAL"
      : monthlySavings > 8 || aprImprovement >= 0.5 || discountAdvantage > 1000
        ? "BEATS_OEM"
        : Math.abs(monthlySavings) <= 8 && Math.abs(dueAtSigningSavings) < 500
          ? "MATCHES_OEM"
          : "WORSE_THAN_OEM";

  return {
    ...profile,
    id: `deal-${profile.id}-${data.state.toLowerCase()}-${oem.type.toLowerCase()}`,
    type: oem.type,
    state: data.state,
    city: data.city,
    dealer: data.dealer,
    distance: data.distance,
    monthlyPayment: data.monthlyPayment,
    dueAtSigning: data.dueAtSigning,
    term: oem.term,
    mileage: oem.mileage,
    apr: data.apr,
    moneyFactor: data.moneyFactor,
    sellingPrice: data.sellingPrice,
    incentives: data.incentives,
    dealerDiscount: data.dealerDiscount,
    dealerFees: data.dealerFees,
    brokerFee: data.brokerFee,
    creditTier: "Tier 1 / well-qualified",
    evTaxCredit: profile.isEV,
    regionProgram: `${oem.region} manufacturer benchmark plus dealer-advertised promotion`,
    communityComps: data.communityComps,
    confidence: data.confidence,
    updatedAt: data.updatedAt,
    expiresAt: oem.expiresAt,
    source: "Mock dealer ad, manufacturer program, and compliant market feed placeholder",
    advertisedSourceUrl: "https://example.com/dealer-promotion",
    oemPromotionId: oem.id,
    manufacturerBenchmarkPromotion: `${oem.programName}: ${oem.type === "Lease" ? `$${oem.monthlyPayment}/mo, $${oem.dueAtSigning} due, ${oem.term} months` : `${oem.apr}% APR for ${oem.term} months`}`,
    dealerAdvertisedPromotion: `${data.dealer}: ${oem.type === "Lease" ? `$${data.monthlyPayment}/mo, $${data.dueAtSigning} due` : `${data.apr}% APR, ${oem.term} months`}`,
    benchmark: {
      oemMonthlyPayment: oem.monthlyPayment,
      dealerMonthlyPayment: data.monthlyPayment,
      oemAPR: oem.apr,
      dealerAPR: data.apr,
      oemDueAtSigning: oem.dueAtSigning,
      dealerDueAtSigning: data.dueAtSigning,
      oemDealerDiscount: oem.dealerDiscount,
      dealerDiscount: data.dealerDiscount,
      monthlySavings,
      aprImprovement,
      dueAtSigningSavings,
      discountAdvantage,
      benchmarkStatus,
      effectiveSavings,
      regionRank: Math.max(1, Math.min(25, 1 + Math.floor((100 - data.confidence + Math.max(0, -monthlySavings)) / 5)))
    }
  };
}

function stateSpread(index: number) {
  return usStates.map((state) => state.code);
}

function photoUrl(...parts: string[]) {
  return `https://source.unsplash.com/900x520/?${encodeURIComponent(`${parts.join(" ")} new vehicle`)}`;
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function community(id: string, vehicle: string, location: string, source: CommunityReport["source"], snippet: string, monthlyPayment: number, dueAtSigning: number, term: number, negotiatedDiscount: number, confidence: number): CommunityReport {
  return {
    id,
    vehicleId: slug(vehicle),
    vehicle,
    location,
    source,
    snippet,
    monthlyPayment,
    dueAtSigning,
    term,
    negotiatedDiscount,
    confidence,
    url: "#",
    date: "2026-05-14"
  };
}
