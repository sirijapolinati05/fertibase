// productsData.js - Complete data from Fertibase Brochure
export const PRODUCTS_DATA = {
  // ========================
  // 1. NITROGEN FIXING BIOFERTILIZERS
  // ========================
  "NITROBASE": {
    id: "NITROBASE",
    name: "NITROBASE",
    fullName: "NITROBASE (Azospirillum)",
    category: "Biofertilizers",
    subCategory: "Nitrogen Fixing Biofertilizers",
    type: "Azospirillum Liquid Biofertilizer",
    microbialCount: "1×10⁸ CFU/ml",
    description: "NITROBASE is an innovative biofertilizer formulated with a high concentration of 1x10⁸ CFU/ml of free-living nitrogen-fixing bacteria in a convenient liquid form. These beneficial bacteria play a crucial role in converting atmospheric nitrogen (N₂) into plant-usable forms, promoting healthy crop growth.",
    keyAdvantages: [
      "High viable microbial population for consistent field performance",
      "Liquid formulation ensures rapid availability in the root zone",
      "Enhances nitrogen availability through biological processes",
      "Improves nutrient use efficiency and reduces nitrogen losses",
      "Supports reduced dependence on chemical nitrogen fertilizers"
    ],
    cropBenefits: [
      "Promotes strong vegetative growth and uniform crop stand",
      "Improves plant vigor and leaf greenness",
      "Encourages better root development and nutrient uptake",
      "Contributes to improved yield potential"
    ],
    recommendedCrops: ["Paddy", "Cereals (maize, wheat, millets)", "Sugarcane", "Cotton", "Vegetables"],
    dosage: "1 Litre Per Acre",
    applicationDetails: ["Foliar Spray", "Drip Irrigation / Fertigation"],
    applicationStage: "Vegetative stage",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "DFNC": {
    id: "DFNC",
    name: "DFNC",
    fullName: "DFNC (Azotobacter)",
    category: "Biofertilizers",
    subCategory: "Nitrogen Fixing Biofertilizers",
    type: "Azotobacter-based Liquid Biofertilizer",
    microbialCount: "1×10⁸ CFU/ml",
    description: "DFNC is a revolutionary biofertilizer formulated with a high concentration of minimum 1x10⁸ CFU/ml of free-living nitrogen-fixing bacteria in a convenient liquid form. These beneficial bacteria play a crucial role in converting atmospheric nitrogen (N₂) into plant-usable forms, promoting healthy crop growth.",
    keyAdvantages: [
      "Contains high populations of free-living nitrogen-fixing bacteria",
      "Improves nitrogen availability in the soil without plant specificity",
      "Liquid formulation enables faster soil and root-zone colonization",
      "Enhances nutrient use efficiency and reduces nitrogen losses",
      "Supports reduced application of chemical nitrogen fertilizers"
    ],
    cropBenefits: [
      "Promotes strong vegetative growth and uniform crop stand",
      "Improves plant vigor and leaf greenness",
      "Encourages better root development and nutrient uptake",
      "Contributes to improved yield potential"
    ],
    recommendedCrops: ["Paddy", "Cereals (maize, wheat, millets)", "Sugarcane", "Cotton", "Vegetables"],
    dosage: "1 Litre Per Acre",
    applicationDetails: ["Seed treatment", "Foliar spray"],
    applicationStage: "At sowing, transplanting or during early crop growth",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "FERTIRHIZO": {
    id: "FERTIRHIZO",
    name: "FERTIRHIZO",
    fullName: "FERTIRHIZO (Rhizobium)",
    category: "Biofertilizers",
    subCategory: "Nitrogen Fixing Biofertilizers",
    type: "Rhizobium Liquid Biofertilizer",
    microbialCount: "1×10⁸ CFU/ml",
    description: "FERTIRHIZO is a liquid biofertilizer formulated with a high concentration minimum 1x10⁸ CFU/ml of symbiotic nitrogen-fixing bacteria. These beneficial bacteria play a crucial role in converting atmospheric nitrogen (N₂) into plant-usable forms, promoting healthy crop growth.",
    keyAdvantages: [
      "Contains crop-specific Rhizobium strains for effective nodulation",
      "Ensures reliable biological nitrogen fixation in legume crops",
      "Liquid formulation allows uniform seed and root-zone coverage",
      "Reduces external nitrogen fertilizer requirement",
      "Environment-friendly and soil health supportive solution"
    ],
    cropBenefits: [
      "Improves root nodulation and nitrogen availability",
      "Enhances vegetative growth and plant vigor",
      "Promotes uniform crop establishment",
      "Improves pod development and yield potential"
    ],
    recommendedCrops: ["All leguminous crops (pulses, oilseed legumes, forage legumes)"],
    dosage: "1 Litre Per Acre",
    applicationDetails: ["Seed treatment", "Soil application"],
    applicationStage: "At sowing, transplanting, or during early crop growth",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  // ========================
  // 2. PHOSPHORUS SOLUBILIZING BIOFERTILIZERS
  // ========================
  "PHOSPHOBASE": {
    id: "PHOSPHOBASE",
    name: "PHOSPHOBASE",
    fullName: "PHOSPHOBASE (Phosphate Solubilizing Bacteria)",
    category: "Biofertilizers",
    subCategory: "Phosphorus Solubilizing Biofertilizers",
    type: "PSB Liquid Formulation",
    microbialCount: "1×10⁸ CFU/ml",
    description: "PHOSPHOBASE is a phosphate solubilizing bacterial based liquid formulation with a high concentration of minimum 1x10⁸ CFU/ml. These phosphate solubilizing bacteria solubilizes the complex phosphorus into plant available form.",
    keyAdvantages: [
      "Unlocks native and applied insoluble soil phosphorus",
      "Improves phosphorus use efficiency across soil types",
      "Liquid formulation ensures faster soil and root-zone activity",
      "Reduces the requirement for chemical phosphatic fertilizers",
      "Enhances soil microbial activity and long-term fertility"
    ],
    cropBenefits: [
      "Promotes strong root growth and early crop establishment",
      "Enhances flowering, fruiting, and seed development",
      "Improves overall plant vigor and nutrient uptake",
      "Contributes to improved yield and crop quality",
      "Helps overcome phosphorus deficiency symptoms"
    ],
    recommendedCrops: ["All crops"],
    dosage: "1 Litre Per Acre",
    applicationDetails: ["Drip irrigation / fertigation", "Soil drenching", "Foliar spray"],
    applicationStage: "At sowing, transplanting, or during early crop growth",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "MYCROLIFE": {
    id: "MYCROLIFE",
    name: "MYCRO LIFE",
    fullName: "MYCRO LIFE (Phosphate Solubilizing Fungal Biofertilizer)",
    category: "Biofertilizers",
    subCategory: "Phosphorus Solubilizing Biofertilizers",
    type: "Liquid Fungal Biofertilizer",
    description: "MYCRO LIFE is a liquid fungal Biofertilizer formulated with efficient phosphate solubilizing fungi that enhance the availability of phosphorus in the soil. It is particularly effective in low-phosphorus and high-fixation soils.",
    keyAdvantages: [
      "Fungal-based phosphorus solubilization with wider soil coverage",
      "Effective in soils with high phosphorus fixation",
      "Improves availability of native and applied phosphorus",
      "Enhances soil biological activity and nutrient cycling",
      "Complements bacterial biofertilizers for balanced nutrition"
    ],
    cropBenefits: [
      "Improves root growth and root spread",
      "Enhances early crop establishment",
      "Supports better nutrient absorption and plant vigor",
      "Helps protect roots from soil-borne stress conditions",
      "Contributes to improved yield and crop quality"
    ],
    recommendedCrops: ["All crops"],
    dosage: "1 Litre Per Acre",
    applicationDetails: ["Drip irrigation / Fertigation", "Foliar spray"],
    applicationStage: "At sowing, transplanting or during early crop growth",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "MYCORE": {
    id: "MYCORE",
    name: "MYCORE",
    fullName: "MYCORE (Mycorrhizal - VAM)",
    category: "Biofertilizers",
    subCategory: "Phosphorus Solubilizing Biofertilizers",
    type: "Granular VAM Biofertilizer",
    description: "MYCORE is a granular Vesicular Arbuscular Mycorrhizal (VAM) biofertilizer developed to improve phosphorus availability, strengthen root systems, and enhance overall plant nutrition through natural symbiotic association with plant roots.",
    keyAdvantages: [
      "Enhances phosphorus uptake from soil reserves",
      "Improves nutrient absorption efficiency beyond the root zone",
      "Strengthens root development and root resilience",
      "Induces systemic acquired resistance (SAR) against stress",
      "Supports long-term soil biological health"
    ],
    cropBenefits: [
      "Healthier and more extensive root system",
      "Improved plant vigor and nutrient balance",
      "Better tolerance to stress conditions",
      "Enhanced crop performance and yield potential",
      "Ideal solution for phosphorus-deficient soils"
    ],
    recommendedCrops: ["Field crops", "Vegetable crops", "Fruit crops", "Plantation crops", "Floriculture crops"],
    dosage: "10 kg per acre",
    applicationDetails: ["Soil application by mixing with FYM, compost, or sand"],
    applicationStage: "Suitable at planting or any crop stage",
    packSizes: ["1 kg", "5 kg", "10 kg", "25 kg", "50 kg"]
  },

  // ========================
  // 3. POTASSIUM MOBILIZING BIOFERTILIZERS
  // ========================
  "POTABASE": {
    id: "POTABASE",
    name: "POTABASE",
    fullName: "POTABASE (Potash Mobilizing Bacteria)",
    category: "Biofertilizers",
    subCategory: "Potassium Mobilizing Biofertilizers",
    type: "Liquid Biofertilizer",
    microbialCount: "1×10⁴ CFU/ml",
    description: "POTABASE is a potash mobilizing bacterial based liquid biofertilizer that solubilizes the complex potassium, making it available to plants for healthier growth and better yields. Cost-effective and eco-friendly.",
    keyAdvantages: [
      "Mobilizes fixed and unavailable soil potassium",
      "Improves potassium use efficiency",
      "Liquid formulation ensures rapid soil and root-zone activity",
      "Reduces dependence on chemical potash fertilizers",
      "Enhances soil microbial balance and long-term fertility"
    ],
    cropBenefits: [
      "Improves plant growth and overall vigor",
      "Enhances flowering, fruiting, and grain filling",
      "Improves crop quality parameters",
      "Strengthens plant tolerance to stress conditions",
      "Contributes to improved yield potential"
    ],
    recommendedCrops: ["All crops"],
    dosage: "1 Litre Per Acre",
    applicationDetails: ["Foliar spray", "Soil application"],
    applicationStage: "Flowering and fruiting stages",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "COPIOUS-K": {
    id: "COPIOUS-K",
    name: "COPIOUS-K",
    fullName: "COPIOUS-K (Potassium Mobilizing Bacteria)",
    category: "Biofertilizers",
    subCategory: "Potassium Mobilizing Biofertilizers",
    type: "Granular Biofertilizer",
    microbialCount: "5×10⁷ CFU/g",
    description: "COPIOUS-K is a carrier-based granular biofertilizer with potassium mobilizing bacteria (KMB) that improves soil potassium availability, enhances crop growth, and supports higher yield through uniform application.",
    keyAdvantages: [
      "Mobilizes insoluble and fixed potassium present in the soil",
      "Granular formulation ensures better soil contact and persistence",
      "Improves potassium use efficiency throughout the crop cycle",
      "Reduces the requirement for chemical potassic fertilizers",
      "Supports balanced soil nutrient dynamics"
    ],
    cropBenefits: [
      "Improves plant growth and crop vigor",
      "Enhances flowering, fruiting, and grain development",
      "Improves crop yield and quality",
      "Strengthens plant tolerance to abiotic stress",
      "Ensures sustained potassium availability during critical stages"
    ],
    dosage: "As per crop requirement",
    applicationDetails: ["Soil application near the root zone"],
    applicationStage: "At sowing, transplanting, or during flowering and fruiting stages",
    packSizes: ["5 kg", "10 kg", "25 kg", "50 kg"]
  },

  // ========================
  // 4. CONSORTIUM BIOFERTILIZERS (NPK)
  // ========================
  "BLOOM": {
    id: "BLOOM",
    name: "BLOOM",
    fullName: "BLOOM Liquid Consortium Biofertilizer (NPK)",
    category: "Biofertilizers",
    subCategory: "Consortium Biofertilizers (NPK)",
    type: "Liquid Consortium",
    microbialCount: "1×10⁸ CFU/ml",
    description: "BLOOM is a liquid biofertilizer formulated with a high concentration of minimum 1×10⁸ CFU per ml of free-living nitrogen-fixing bacteria, phosphate solubilizing bacteria and potash solubilizing bacteria.",
    keyAdvantages: [
      "Multi-nutrient support (N, P, K) through a single biological input",
      "Improves overall nutrient availability and uptake efficiency",
      "Liquid formulation enables quick establishment in the root zone",
      "Reduces chemical fertilizer usage",
      "Supports sustainable and eco-friendly crop nutrition"
    ],
    cropBenefits: [
      "Enhances plant vigor and vitality",
      "Promotes uniform crop growth and development",
      "Improves flowering, fruiting, and yield parameters",
      "Strengthens crop tolerance to biotic and abiotic stress",
      "Improves fertilizer response efficiency"
    ],
    recommendedCrops: ["All crops"],
    dosage: "1 Litre Per Acre",
    applicationDetails: ["Foliar spray", "Drip irrigation / Fertigation"],
    applicationStage: "Flowering and fruiting stages",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "LEQUIBASE": {
    id: "LEQUIBASE",
    name: "LEQUIBASE",
    fullName: "LEQUIBASE Liquid Consortium Biofertilizer",
    category: "Biofertilizers",
    subCategory: "Consortium Biofertilizers (NPK)",
    type: "Liquid Consortium",
    description: "LEQUIBASE is a liquid consortium biofertilizer formulated with a synergistic blend of nitrogen-fixing, phosphate solubilizing, and potassium mobilizing beneficial microorganisms.",
    keyAdvantages: [
      "Provides balanced biological nutrition through a single formulation",
      "Improves nutrient availability and uptake efficiency",
      "Enhances soil microbial activity and organic carbon dynamics",
      "Supports reduced chemical fertilizer usage"
    ],
    cropBenefits: [
      "Promotes vigorous plant growth and uniform crop stand",
      "Improves root development and nutrient absorption",
      "Enhances crop resilience to environmental stress",
      "Improves yield and crop quality",
      "Supports long-term soil fertility"
    ],
    recommendedCrops: ["All crops"],
    dosage: "5 litres per acre",
    applicationDetails: ["Foliar application"],
    applicationStage: "At sowing, transplanting, or during early crop growth or flowering and fruiting stages",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "BENIBASE": {
    id: "BENIBASE",
    name: "BENIBASE",
    fullName: "BENIBASE Granular Consortium Biofertilizer",
    category: "Biofertilizers",
    subCategory: "Consortium Biofertilizers (NPK)",
    type: "Granular Consortium",
    microbialCount: "3×10⁷ CFU/g",
    description: "BENIBASE is a granular consortium biofertilizer formulated with nitrogen fixing bacteria, phosphate solubilizing bacteria and potash mobilizing bacteria. Each gram contains at least 3x10^7 CFU/g.",
    keyAdvantages: [
      "Provides biological N, P, and K support in a single granular application",
      "Ensures uniform soil distribution and longer persistence",
      "Improves nutrient use efficiency and fertilizer response",
      "Reduces dependency on chemical fertilizers",
      "Enhances soil microbial balance and fertility"
    ],
    cropBenefits: [
      "Promotes strong early crop establishment",
      "Improves root development and nutrient uptake",
      "Enhances crop vigor and uniform growth",
      "Contributes to higher yield and better crop quality",
      "Supports sustainable soil health management"
    ],
    recommendedCrops: ["Paddy", "Cotton", "Sugarcane", "Chilli", "Other field and horticultural crops"],
    dosage: "4 kg per acre",
    applicationDetails: ["Soil application"],
    applicationStage: "At or before sowing/transplanting",
    packSizes: ["4 kg", "10 kg", "25 kg", "50 kg"]
  },

  "COPIOUS-NPK": {
    id: "COPIOUS-NPK",
    name: "COPIOUS-NPK",
    fullName: "COPIOUS-NPK Granular Consortium Biofertilizer",
    category: "Biofertilizers",
    subCategory: "Consortium Biofertilizers (NPK)",
    type: "Granular Consortium",
    microbialCount: "3×10⁷ CFU/g",
    description: "COPIOUS-NPK is a consortium based granular biofertilizer containing beneficial bacteria that enhance nutrient availability (N, P, K) and improve crop health.",
    keyAdvantages: [
      "Provides complete biological NPK nutrition through a single product",
      "Improves utilization of native and applied nutrients",
      "Granular form ensures better soil contact and longer persistence",
      "Reduces chemical fertilizer requirement",
      "Supports improved soil biological activity and fertility"
    ],
    cropBenefits: [
      "Enhances early crop establishment and uniform growth",
      "Improves root development and nutrient uptake",
      "Promotes better vegetative growth and yield parameters",
      "Improves crop tolerance to stress conditions",
      "Contributes to improved yield and crop quality"
    ],
    recommendedCrops: ["All crops"],
    dosage: "50 kg per acre",
    applicationDetails: ["Soil application near the root zone"],
    applicationStage: "At sowing or before planting",
    packSizes: ["5 kg", "10 kg", "25 kg", "50 kg"]
  },

  "COPIOUS-NP": {
    id: "COPIOUS-NP",
    name: "COPIOUS-NP",
    fullName: "COPIOUS-NP Granular Consortium Biofertilizer",
    category: "Biofertilizers",
    subCategory: "Consortium Biofertilizers (NPK)",
    type: "Granular Consortium",
    microbialCount: "3×10⁷ CFU/g",
    description: "COPIOUS-NP is a granular consortium biofertilizer formulated with efficient nitrogen-fixing and phosphate-solubilizing beneficial microorganisms to improve nitrogen and phosphorus availability.",
    keyAdvantages: [
      "Provides combined biological nitrogen and phosphorus nutrition",
      "Improves utilization of soil-bound and applied phosphorus",
      "Enhances nitrogen availability through biological processes",
      "Granular formulation ensures better soil contact and persistence",
      "Reduces chemical fertilizer requirement and input cost"
    ],
    cropBenefits: [
      "Promotes strong early crop establishment",
      "Improves root development and nutrient absorption",
      "Enhances plant vigor and uniform growth",
      "Improves yield and crop quality",
      "Supports sustainable soil fertility management"
    ],
    recommendedCrops: ["All crops"],
    dosage: "50 kg per acre",
    applicationDetails: ["Soil application by broadcasting or placement near the root zone"],
    applicationStage: "At sowing or before planting",
    packSizes: ["5 kg", "10 kg", "25 kg", "50 kg"]
  },

  // ========================
  // 5. ORGANIC MANURES & SOIL CONDITIONERS
  // ========================
  "CAMAGS": {
    id: "CAMAGS",
    name: "CAMAGS",
    fullName: "CAMAGS Bio-Enriched Organic Manure",
    category: "Organic Fertilizers",
    subCategory: "Solid Organic Manures",
    type: "Bio-Enriched Organic Manure",
    description: "CAMAGS is a premium bio-enriched organic manure produced from biodegradable plant-based raw materials through controlled microbial composting. It enriches soil with organic carbon, humus, beneficial microorganisms, and essential nutrients.",
    keyAdvantages: [
      "Improves soil organic carbon and humus content",
      "Enhances soil structure, aeration, and moisture retention",
      "Promotes beneficial microbial activity in the soil",
      "Improves nutrient availability and efficiency",
      "Supports long-term soil fertility and sustainability"
    ],
    cropBenefits: [
      "Encourages healthy root growth and crop establishment",
      "Improves plant vigor and uniform growth",
      "Enhances resistance to pests and diseases",
      "Improves crop yield and produce quality",
      "Restores degraded and nutrient-depleted soils"
    ],
    recommendedCrops: ["All crops"],
    dosage: "50 kg per acre",
    applicationDetails: ["Broadcasting and incorporation into soil before sowing or planting"],
    applicationStage: "Before sowing or planting",
    packSizes: ["5 kg", "10 kg", "25 kg", "50 kg"]
  },

  "PROMORE": {
    id: "PROMORE",
    name: "PROMORE",
    fullName: "PROMORE Phosphorus-rich Organic Fertilizer",
    category: "Organic Fertilizers",
    subCategory: "Solid Organic Manures",
    type: "Organic Bio-fertilizer",
    description: "PROMORE is an organic bio-fertilizer enriched with phosphorus in readily available form, designed to improve phosphorus nutrition and overall soil fertility as an alternative to DAP and SSP.",
    keyAdvantages: [
      "Supplies phosphorus in an organic and plant-available form",
      "Improves phosphorus use efficiency in the soil",
      "Enhances soil fertility and microbial activity",
      "Improves soil moisture retention and structure",
      "Eco-friendly alternative to chemical phosphatic fertilizers"
    ],
    cropBenefits: [
      "Promotes strong root development and early crop establishment",
      "Improves nutrient uptake and plant growth",
      "Enhances crop vigor and uniformity",
      "Contributes to higher yield and better produce quality",
      "Supports long-term soil health and productivity"
    ],
    recommendedCrops: ["All crops"],
    dosage: "50 kg per acre",
    applicationDetails: ["Broadcasting and incorporation into soil before sowing or planting"],
    applicationStage: "At or before sowing/transplanting",
    packSizes: ["5 kg", "10 kg", "25 kg", "50 kg"]
  },

  // HYDROMIN Series
  "HYDROMIN-L1": {
    id: "HYDROMIN-L1",
    name: "HYDROMIN L-1",
    fullName: "HYDROMIN L-1 (Vegetative Growth Stage)",
    category: "Organic Fertilizers",
    subCategory: "Liquid Fermented Organic Manures",
    type: "Liquid Fermented Organic Manure",
    description: "HYDROMIN L-1 is part of the HYDRoMIN Series - a range of liquid fermented organic manures formulated to provide stage-specific nutrition for vegetative growth stage.",
    keyAdvantages: [
      "Supplies essential nutrients required during early and vegetative growth stages",
      "Enhances nutrient availability and root activity",
      "Improves chlorophyll formation and canopy development"
    ],
    cropBenefits: [
      "Promotes healthy root establishment",
      "Improves leaf development and plant vigor",
      "Enhances early crop growth and uniform stand"
    ],
    recommendedCrops: ["All crops"],
    dosage: {
      soil: "5-10 litres per acre",
      foliar: "2-5 ml per litre of water"
    },
    applicationDetails: ["Soil Application", "Foliar Spray", "Drip Irrigation / Fertigation"],
    applicationStage: "Vegetative Growth Stage",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "HYDROMIN-L2": {
    id: "HYDROMIN-L2",
    name: "HYDROMIN L-2",
    fullName: "HYDROMIN L-2 (Flowering Stage)",
    category: "Organic Fertilizers",
    subCategory: "Liquid Fermented Organic Manures",
    type: "Liquid Fermented Organic Manure",
    description: "HYDROMIN L-2 provides nutrients critical for flowering and reproductive development, supporting better bud initiation and flower retention.",
    keyAdvantages: [
      "Supplies nutrients critical for flowering and reproductive development",
      "Improves nutrient translocation during flowering",
      "Supports better bud initiation and flower retention"
    ],
    cropBenefits: [
      "Improves flowering and reduces flower drop",
      "Enhances fruit and pod setting",
      "Improves overall reproductive efficiency"
    ],
    recommendedCrops: ["All crops"],
    dosage: {
      soil: "5-7 litres per acre",
      foliar: "3-5 ml per litre of water"
    },
    applicationDetails: ["Soil Application", "Foliar Spray", "Drip Irrigation"],
    applicationStage: "Flowering Stage",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "HYDROMIN-L3": {
    id: "HYDROMIN-L3",
    name: "HYDROMIN L-3",
    fullName: "HYDROMIN L-3 (Maturity & Ripening Stage)",
    category: "Organic Fertilizers",
    subCategory: "Liquid Fermented Organic Manures",
    type: "Liquid Fermented Organic Manure",
    description: "HYDROMIN L-3 supplies nutrients required for fruit development and ripening, enhancing nutrient balance during maturity and improving quality parameters.",
    keyAdvantages: [
      "Supplies nutrients required for fruit development and ripening",
      "Enhances nutrient balance during maturity",
      "Improves quality-related parameters"
    ],
    cropBenefits: [
      "Improves fruit size, color, and uniform ripening",
      "Enhances sugar accumulation and produce quality",
      "Improves yield realization and shelf life"
    ],
    recommendedCrops: ["All crops"],
    dosage: {
      soil: "3-5 litres per acre",
      foliar: "3-5 ml per litre of water"
    },
    applicationDetails: ["Soil Application", "Foliar Spray", "Drip Irrigation"],
    applicationStage: "Maturity & Ripening Stage",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  // CORBOMIN Series
  "CORBOMIN-I": {
    id: "CORBOMIN-I",
    name: "CORBOMIN-I",
    fullName: "CORBOMIN-I (Initial Stage)",
    category: "Organic Fertilizers",
    subCategory: "Liquid Fermented Organic Manures",
    type: "Liquid Fermented Organic Manure",
    description: "CORBOMIN-I is part of the CORBOMIN Series - a range of liquid fermented organic manures formulated to supply stage-specific micronutrients required during initial crop growth phase.",
    keyAdvantages: [
      "Supplies micronutrients required during initial growth stage",
      "Improves early crop establishment",
      "Enhances root development"
    ],
    cropBenefits: [
      "Promotes healthy early growth",
      "Improves nutrient uptake efficiency",
      "Enhances plant vigor from start"
    ],
    recommendedCrops: ["All crops"],
    dosage: "2-5 ml per litre of water",
    applicationDetails: ["Foliar spray", "Soil drenching"],
    applicationStage: "Initial Stage",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "CORBOMIN-B": {
    id: "CORBOMIN-B",
    name: "CORBOMIN-B",
    fullName: "CORBOMIN-B (Booster - Flowering)",
    category: "Organic Fertilizers",
    subCategory: "Liquid Fermented Organic Manures",
    type: "Liquid Fermented Organic Manure",
    description: "CORBOMIN-B acts as a booster during flowering by enhancing carbon availability and supporting reproductive growth.",
    keyAdvantages: [
      "Supports flowering stage nutrition",
      "Improves nutrient assimilation",
      "Enhances flower development"
    ],
    cropBenefits: [
      "Improved flowering",
      "Better crop vigor during reproductive stage",
      "Enhanced fruit set"
    ],
    recommendedCrops: ["All crops"],
    dosage: "3-5 ml per litre of water",
    applicationDetails: ["Foliar spray"],
    applicationStage: "Flowering Stage",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "CORBOMIN-S": {
    id: "CORBOMIN-S",
    name: "CORBOMIN-S",
    fullName: "CORBOMIN-S (Special - Maturity)",
    category: "Organic Fertilizers",
    subCategory: "Liquid Fermented Organic Manures",
    type: "Liquid Fermented Organic Manure",
    description: "CORBOMIN-S supports crop maturity by improving nutrient movement and carbon availability during ripening stage.",
    keyAdvantages: [
      "Enhances maturity process",
      "Improves nutrient translocation",
      "Supports uniform ripening"
    ],
    cropBenefits: [
      "Uniform ripening",
      "Improved yield quality",
      "Better shelf life"
    ],
    recommendedCrops: ["All crops"],
    dosage: "3-5 ml per litre of water",
    applicationDetails: ["Foliar spray"],
    applicationStage: "Maturity Stage",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "CORBOMIN-FA": {
    id: "CORBOMIN-FA",
    name: "CORBOMIN-FA",
    fullName: "CORBOMIN-FA (Foliar Application)",
    category: "Organic Fertilizers",
    subCategory: "Liquid Fermented Organic Manures",
    type: "Liquid Fermented Organic Manure",
    description: "CORBOMIN-FA is designed specifically for foliar application to improve nutrient uptake efficiency and plant metabolism.",
    keyAdvantages: [
      "Rapid foliar absorption",
      "Improves plant metabolism",
      "Quick nutrient delivery"
    ],
    cropBenefits: [
      "Enhanced crop vigor",
      "Quick response to nutrient deficiency",
      "Improved overall plant health"
    ],
    recommendedCrops: ["All crops"],
    dosage: "2-5 ml per litre of water",
    applicationDetails: ["Foliar spray"],
    applicationStage: "Throughout crop growth",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "CARBOCEN": {
    id: "CARBOCEN",
    name: "CARBOCEN",
    fullName: "CARBOCEN Liquid Organic Carbon Manure",
    category: "Organic Fertilizers",
    subCategory: "Liquid Fermented Organic Manures",
    type: "Liquid Organic Manure",
    description: "CARBOCEN is a high-quality liquid organic manure developed to enhance soil organic carbon, improve soil fertility, and promote sustainable crop growth with naturally fermented organic matter.",
    keyAdvantages: [
      "Increases soil organic carbon and improves soil structure",
      "Enhances soil microbial activity and nutrient cycling",
      "Improves water-holding capacity and soil aeration",
      "Supports efficient nutrient utilization",
      "Promotes long-term soil fertility and sustainability"
    ],
    cropBenefits: [
      "Improves root growth and nutrient uptake",
      "Enhances plant vigor and vitality",
      "Improves flowering, fruit development, and yield",
      "Strengthens crop resilience under stress conditions",
      "Improves overall crop quality"
    ],
    recommendedCrops: ["All crops"],
    dosage: {
      soil: "5-10 litres per acre",
      foliar: "2-5 ml per litre of water",
      drip: "5 litres per acre"
    },
    applicationDetails: ["Soil Application", "Foliar Spray", "Drip Irrigation / Fertigation"],
    applicationStage: "Throughout crop growth",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  // ========================
  // 6. MICRONUTRIENTS FERTILIZERS
  // ========================
  "ZINBASE": {
    id: "ZINBASE",
    name: "ZINBASE",
    fullName: "ZINBASE Zinc Solubilizing Bacteria",
    category: "Micronutrients",
    subCategory: "Zinc Fertilizers",
    type: "Liquid Biofertilizer",
    microbialCount: "1×10⁸ CFU/ml",
    description: "ZINBASE is a liquid biofertilizer formulated with efficient zinc solubilizing bacteria (ZSB) that convert insoluble and fixed forms of zinc in the soil into plant-available forms, helping to correct zinc deficiency.",
    keyAdvantages: [
      "Solubilizes unavailable zinc present in the soil",
      "Improves zinc availability and uptake efficiency",
      "Liquid formulation ensures rapid activity in the root zone",
      "Reduces dependence on chemical zinc fertilizers",
      "Enhances soil biological activity and micronutrient balance"
    ],
    cropBenefits: [
      "Corrects zinc deficiency symptoms",
      "Improves plant vigor and leaf development",
      "Enhances enzyme activity and overall plant metabolism",
      "Improves yield and crop quality",
      "Supports uniform crop growth"
    ],
    recommendedCrops: ["All crops"],
    dosage: "1 Litre Per Acre",
    applicationDetails: ["Soil application by broadcasting or placement near root zone"],
    applicationStage: "Early crop stage",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "ZINCORE": {
    id: "ZINCORE",
    name: "ZINCORE",
    fullName: "ZINCORE Chelated Zinc (Zinc Glycine)",
    category: "Micronutrients",
    subCategory: "Zinc Fertilizers",
    type: "Chelated Zinc Fertilizer",
    zincContent: "6.8%",
    description: "ZINCORE is a specialized liquid micronutrient fertilizer formulated with 6.8% chelated zinc (Zinc Glycine), where glycine acts as the chelating agent to ensure superior zinc stability and rapid absorption.",
    keyAdvantages: [
      "Chelated form ensures higher zinc availability and stability",
      "Rapid absorption through foliage and efficient internal movement",
      "Prevents zinc fixation and precipitation in spray solutions",
      "Suitable for use across multiple crop stages",
      "Compatible with most foliar nutrients and bio-stimulants"
    ],
    cropBenefits: [
      "Corrects zinc deficiency quickly and effectively",
      "Improves enzyme activity and metabolic functions",
      "Enhances chlorophyll synthesis and photosynthetic efficiency",
      "Supports better flowering, fruiting, and grain development",
      "Improves yield and produce quality"
    ],
    recommendedCrops: ["All crops"],
    dosage: "1 litre per acre",
    applicationDetails: ["Foliar Spray: 1.5-2.0 ml per litre of water"],
    applicationStage: "Throughout crop growth",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "FERTI-Ca-21%": {
    id: "FERTI-Ca-21%",
    name: "FERTI Ca-21%",
    fullName: "FERTI Ca-21% Fortified Calcium Suspension",
    category: "Micronutrients",
    subCategory: "Calcium Fertilizers",
    type: "Calcium Suspension Fertilizer",
    calciumContent: "21%",
    description: "FERTI Ca-21% is a high-concentration calcium suspension fertilizer formulated to supply readily available calcium for strong cell wall formation, improved fruit quality, and enhanced shelf life.",
    keyAdvantages: [
      "High calcium concentration for efficient nutrient correction",
      "Readily available calcium for quick crop response",
      "Improves calcium mobility to actively growing tissues",
      "Suitable for foliar and drip applications",
      "Helps prevent physiological disorders related to calcium deficiency"
    ],
    cropBenefits: [
      "Strengthens plant cell walls and structural integrity",
      "Improves fruit firmness and quality",
      "Enhances shelf life and reduces post-harvest losses",
      "Reduces incidence of blossom end rot and fruit cracking",
      "Improves plant stress tolerance"
    ],
    recommendedCrops: ["Fruit crops", "Vegetables", "Field and horticultural crops"],
    dosage: "1 litre per acre",
    applicationDetails: ["Foliar spray", "Drip irrigation"],
    applicationStage: "Active growth, flowering, and fruit development stages",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "FERTI-Ca-6%": {
    id: "FERTI-Ca-6%",
    name: "FERTI Ca-6%",
    fullName: "FERTI Ca-6% Chelated Calcium (Calcium Glycine)",
    category: "Micronutrients",
    subCategory: "Calcium Fertilizers",
    type: "Chelated Calcium Fertilizer",
    calciumContent: "6%",
    description: "FERTI Ca-6% is a specialized liquid calcium fertilizer formulated with 6% chelated calcium (Calcium Glycine), where glycine enhances calcium solubility, stability, and absorption for efficient plant uptake.",
    keyAdvantages: [
      "Chelated form ensures superior calcium availability",
      "Rapid absorption through foliage and improved internal transport",
      "Prevents calcium fixation and precipitation",
      "Suitable for repeated foliar applications",
      "Compatible with most foliar nutrients and bio-stimulants"
    ],
    cropBenefits: [
      "Improves cell wall strength and tissue firmness",
      "Enhances fruit quality, size, and uniformity",
      "Reduces physiological disorders such as blossom end rot and cracking",
      "Improves stress tolerance and overall plant health",
      "Enhances yield and marketable produce quality"
    ],
    recommendedCrops: ["Vegetables", "Fruit crops", "Field and horticultural crops"],
    dosage: "1 litre per acre",
    applicationDetails: ["Foliar spray", "Drip application"],
    applicationStage: "Critical growth and fruit development stages",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "FERTI-CANCORE": {
    id: "FERTI-CANCORE",
    name: "FERTI CANCORE",
    fullName: "FERTI CANCORE Calcium Nitrate + Magnesium",
    category: "Micronutrients",
    subCategory: "Calcium Fertilizers",
    type: "Liquid Suspension Fertilizer",
    description: "FERTI CANCORE is a high-quality liquid suspension fertilizer formulated with calcium nitrate and magnesium nitrate, supplying readily available calcium, nitrate nitrogen, and magnesium for strong vegetative growth.",
    keyAdvantages: [
      "Provides quick-acting calcium and nitrate nitrogen",
      "Supplies magnesium for improved photosynthesis",
      "Improves nutrient balance during high-demand growth stages",
      "Reduces physiological disorders related to calcium deficiency"
    ],
    cropBenefits: [
      "Strengthens cell walls and improves plant structure",
      "Enhances vegetative growth and leaf health",
      "Improves fruit firmness, size, and quality",
      "Reduces blossom end rot and related disorders"
    ],
    recommendedCrops: ["Vegetables", "Fruit crops", "Field and horticultural crops"],
    dosage: "1 litre per acre",
    applicationDetails: [
      "Foliar Application: 5-6 ml per litre of water",
      "Drip/Drench Application: 10 ml per litre of water"
    ],
    applicationStage: "Rapid growth and fruit development stages",
    packSizes: ["1 L", "5 L", "20 L", "200 L"]
  },

  "FERTI-BG": {
    id: "FERTI-BG",
    name: "FERTI-BG",
    fullName: "FERTI-BG Chelated Boron (Boron Glycine)",
    category: "Micronutrients",
    subCategory: "Boron Fertilizers",
    type: "Chelated Boron Fertilizer",
    boronContent: "5%",
    description: "FERTI-BG is a specialized liquid micronutrient fertilizer formulated with 5% chelated boron (Boron Glycine), where glycine enhances boron solubility, stability, and plant uptake for reproductive growth.",
    keyAdvantages: [
      "Chelated boron ensures higher availability and rapid absorption",
      "Prevents boron fixation and reduces toxicity risk",
      "Ensures uniform boron distribution within the plant",
      "Suitable for use during critical reproductive stages",
      "Compatible with most foliar nutrients and bio-stimulants"
    ],
    cropBenefits: [
      "Improves pollination and fertilization",
      "Enhances flower retention and seed development",
      "Strengthens cell wall formation",
      "Improves nutrient translocation and sugar movement",
      "Enhances yield and produce quality"
    ],
    recommendedCrops: ["All crops"],
    dosage: "1 litre per acre",
    applicationDetails: [
      "Foliar Spray: 2-2.5 ml per litre of water",
      "Drip Application: As per crop requirement"
    ],
    applicationStage: "Critical reproductive stages",
    packSizes: ["250 ml", "500 ml", "1 L", "5 L"]
  },

  "FERTIBORE": {
    id: "FERTIBORE",
    name: "FERTIBORE",
    fullName: "FERTIBORE Boron Ethanolamine (B 10%)",
    category: "Micronutrients",
    subCategory: "Boron Fertilizers",
    type: "Liquid Boron Fertilizer",
    boronContent: "10%",
    description: "FERTIBORE is a liquid micronutrient fertilizer formulated with 10% Boron in the form of Boron Ethanolamine, a highly efficient and readily available boron source for correcting boron deficiency.",
    keyAdvantages: [
      "High-concentration boron for effective deficiency correction",
      "Ethanolamine form ensures better solubility and absorption",
      "Rapid uptake through foliage and root zone",
      "Suitable for both foliar and soil application",
      "Safe and efficient boron delivery when used at recommended dose"
    ],
    cropBenefits: [
      "Improves flower development and pollination",
      "Enhances fruit and seed set",
      "Strengthens cell wall formation",
      "Improves nutrient translocation within the plant",
      "Supports healthy growth and improved yield potential"
    ],
    recommendedCrops: ["Field crops", "Vegetables", "Fruit crops", "Plantation and horticultural crops"],
    dosage: "250 ml per acre",
    applicationDetails: ["Foliar spray", "Soil application through irrigation"],
    applicationStage: "Flowering and reproductive stages",
    packSizes: ["250 ml", "500 ml", "1 L", "5 L"]
  },

  // ========================
  // 7. NPK FERTILIZERS
  // ========================
  "FERTI-6:0:18": {
    id: "FERTI-6:0:18",
    name: "FERTI 6:0:18",
    fullName: "FERTI 6:0:18 NK Fertilizer (Fortified with Ca, Mg & B)",
    category: "NPK Fertilizers",
    subCategory: "NPK Suspension Fertilizers",
    type: "NK Fortified Suspension Fertilizer",
    npk: "6:0:18",
    description: "FERTI 6:0:18 is a high-concentration liquid suspension fertilizer providing 6% nitrogen and 18% potassium, fortified with calcium, magnesium, and boron to meet crop nutritional needs during high potassium demand stages.",
    keyAdvantages: [
      "High potassium content for improved flowering and fruit development",
      "Balanced supply of secondary and micronutrients",
      "Improves nutrient uptake and utilization efficiency",
      "Suitable for foliar and Fertigation applications",
      "Enhances crop performance during critical growth stages"
    ],
    cropBenefits: [
      "Improves photosynthetic efficiency and energy transfer",
      "Enhances flowering, fruit set, and grain filling",
      "Strengthens cell walls and improves produce quality",
      "Improves stress tolerance and crop resilience",
      "Contributes to higher yield and better marketable produce"
    ],
    recommendedCrops: ["Fruit crops", "Vegetables", "Field and horticultural crops"],
    dosage: "250 ml per acre",
    applicationDetails: ["Foliar spray", "Drip irrigation / Fertigation"],
    applicationStage: "Flowering and fruiting stage",
    packSizes: ["250 ml", "500 ml", "1 L", "5 L"]
  },

  "FERTI-11:11:8": {
    id: "FERTI-11:11:8",
    name: "FERTI 11:11:8",
    fullName: "FERTI 11:11:8 Balanced NPK (Fortified with Zn & B)",
    category: "NPK Fertilizers",
    subCategory: "NPK Suspension Fertilizers",
    type: "Balanced NPK Suspension Fertilizer",
    npk: "11:11:8",
    description: "FERTI 11:11:8 is a balanced liquid suspension fertilizer supplying 11% nitrogen, 11% phosphorus, and 8% potassium, fortified with zinc and boron to support crops during critical growth stages.",
    keyAdvantages: [
      "Balanced NPK supply for uniform crop growth",
      "Fortification with zinc and boron addresses hidden hunger",
      "Improves nutrient uptake and metabolic efficiency",
      "Suitable for foliar and Fertigation applications",
      "Enhances fertilizer response and crop performance"
    ],
    cropBenefits: [
      "Promotes healthy vegetative and reproductive growth",
      "Improves root development and nutrient absorption",
      "Enhances flowering, fruit set, and yield",
      "Improves crop quality and uniformity",
      "Supports higher productivity under varying field conditions"
    ],
    recommendedCrops: ["All crops"],
    dosage: "250 ml per acre",
    applicationDetails: [
      "Foliar Application: 2-3 ml per litre of water",
      "Drip Irrigation: 1.25 litres per acre"
    ],
    applicationStage: "All growth stages",
    packSizes: ["250 ml", "500 ml", "1 L", "5 L"]
  },

  "FERTI-7:21:0": {
    id: "FERTI-7:21:0",
    name: "FERTI 7:21:0",
    fullName: "FERTI 7:21:0 Phosphorus-rich Fertilizer (Fortified with Zinc)",
    category: "NPK Fertilizers",
    subCategory: "NPK Suspension Fertilizers",
    type: "Phosphorus-rich Suspension Fertilizer",
    npk: "7:21:0",
    description: "FERTI 7:21:0 is a phosphorus-dominant liquid suspension fertilizer containing 7% nitrogen and 21% phosphorus (P₂O₅), fortified with 0.2% zinc, formulated to promote strong root development and early crop establishment.",
    keyAdvantages: [
      "High phosphorus content for enhanced root and reproductive development",
      "Zinc fortification improves phosphorus utilization and enzyme activity",
      "Improves early-stage nutrient availability",
      "Suitable for foliar and fertigation application",
      "Helps correct phosphorus and zinc deficiencies simultaneously"
    ],
    cropBenefits: [
      "Promotes strong root growth and better crop establishment",
      "Improves flowering and fruit/pod development",
      "Enhances nutrient uptake and energy transfer",
      "Improves crop vigor and uniform growth",
      "Contributes to higher yield potential"
    ],
    recommendedCrops: ["Field crops", "Vegetables", "Fruit crops", "Horticultural crops"],
    dosage: "250 ml per acre",
    applicationDetails: [
      "Foliar Application: 2-3 ml per litre of water",
      "Drip Irrigation: 1-1.5 litres per acre"
    ],
    applicationStage: "Early growth stage",
    packSizes: ["250 ml", "500 ml", "1 L", "5 L"]
  },

  "FERTI-8:8:8": {
    id: "FERTI-8:8:8",
    name: "FERTI 8:8:8",
    fullName: "FERTI 8:8:8 Balanced NPK Liquid Fertilizer",
    category: "NPK Fertilizers",
    subCategory: "NPK Suspension Fertilizers",
    type: "Balanced NPK Suspension Fertilizer",
    npk: "8:8:8",
    description: "FERTI 8:8:8 is a balanced liquid suspension fertilizer providing 8% nitrogen, 8% phosphorus, and 8% potassium for uniform crop growth and development, particularly suitable for sugarcane and other crops.",
    keyAdvantages: [
      "Balanced NPK ratio for uniform plant nutrition",
      "Supports both vegetative and reproductive growth stages",
      "Improves nutrient uptake efficiency",
      "Suitable for foliar spray and fertigation",
      "Compatible with most crop nutrition programs"
    ],
    cropBenefits: [
      "Enhances overall plant growth and vigor",
      "Improves root development and canopy formation",
      "Supports better flowering and fruit development",
      "Improves yield stability and produce quality",
      "Helps maintain nutrient balance throughout the crop cycle"
    ],
    recommendedCrops: ["Sugarcane", "Field crops", "Vegetables", "Fruit and horticultural crops"],
    dosage: "250 ml per acre",
    applicationDetails: [
      "Foliar Application: 2-3 ml per litre of water",
      "Drip Irrigation: 1-1.5 litres per acre"
    ],
    applicationStage: "All growth stages",
    packSizes: ["250 ml", "500 ml", "1 L", "5 L"]
  },

  "POTAFUL": {
    id: "POTAFUL",
    name: "POTAFUL",
    fullName: "POTAFUL Potassium Thiosulphate",
    category: "NPK Fertilizers",
    subCategory: "Specialty Calcium & Sulfur Fertilizers",
    type: "Potassium Thiosulphate Fertilizer",
    description: "POTAFUL is a liquid fertilizer formulated with potassium thiosulphate, supplying readily available potassium and sulphur to correct potassium deficiency and support optimal plant nutrition.",
    keyAdvantages: [
      "Supplies potassium and sulphur in highly available forms",
      "Improves potassium uptake efficiency under soil and fertigation systems",
      "Enhances nutrient balance during flowering and fruit development",
      "Suitable for drip fertigation and foliar application",
      "Rapid crop response, especially under deficiency conditions"
    ],
    cropBenefits: [
      "Promotes vigorous plant growth and improved yield potential",
      "Enhances fruit size, color, firmness, and overall quality",
      "Improves plant tolerance to environmental and moisture stress",
      "Supports efficient water regulation through improved stomatal function",
      "Enhances overall crop performance during critical growth stages"
    ],
    recommendedCrops: ["Fruit crops", "Vegetables", "Field and horticultural crops"],
    dosage: "500 ml per acre",
    applicationDetails: [
      "Foliar Application: 1 litre per acre",
      "Drip Irrigation: 2-3 litres per acre"
    ],
    applicationStage: "Flowering and fruiting stage",
    packSizes: ["500 ml", "1 L", "5 L", "20 L"]
  },

  "FERTI-CAS": {
    id: "FERTI-CAS",
    name: "FERTI CAS",
    fullName: "FERTI CAS Calcium Thiosulphate (CaTS)",
    category: "NPK Fertilizers",
    subCategory: "Specialty Calcium & Sulfur Fertilizers",
    type: "Calcium Thiosulphate Fertilizer",
    description: "FERTI CAS is a clear, chloride-free liquid fertilizer formulated with calcium thiosulphate, providing readily available calcium and sulfur to improve soil structure and enhance nutrient availability.",
    keyAdvantages: [
      "Supplies calcium and sulfur in readily available forms",
      "Improves soil structure and reduces soil compaction",
      "Helps reduce soil salinity and chloride-related stress",
      "Assists in stabilizing nitrogen and reducing nutrient losses",
      "Suitable for soil, drip, and foliar applications"
    ],
    cropBenefits: [
      "Improves calcium availability for cell wall strength",
      "Enhances sulfur nutrition for protein synthesis",
      "Improves root growth and nutrient uptake",
      "Enhances fruit quality and yield",
      "Supports overall crop vigor and stress tolerance"
    ],
    recommendedCrops: ["Field crops", "Vegetables", "Fruit crops", "Plantation and horticultural crops"],
    dosage: "500 ml per acre",
    applicationDetails: ["Foliar spray : 5–40 litres per hectare", "Drip irrigation : 10–50 litres per hectare","Soil Application: 100–300 litres per hectare "],
    applicationStage: "Vegetative stage",
    packSizes: ["500 ml", "1 L", "5 L", "20 L"]
  },

  "FERTI-SIL": {
    id: "FERTI-SIL",
    name: "FERTI SIL",
    fullName: "FERTI SIL Ortho Silicic Acid (2.0%)",
    category: "NPK Fertilizers",
    subCategory: "Specialty Calcium & Sulfur Fertilizers",
    type: "Ortho Silicic Acid Fertilizer",
    siliconContent: "2.0%",
    description: "FERTI SIL is a scientifically formulated liquid silicon fertilizer containing 2.0% water-soluble Ortho Silicic Acid, the most readily absorbable form of silicon for plants.",
    keyAdvantages: [
      "Provides silicon in the most plant-available form",
      "Strengthens plant cell walls and structural integrity",
      "Improves tolerance to abiotic stresses such as drought, heat, and cold",
      "Enhances resistance to fungal and lodging-related issues",
      "Compatible with most crop nutrition and protection programs"
    ],
    cropBenefits: [
      "Improves stem strength and overall plant robustness",
      "Reduces lodging and physical damage",
      "Enhances tolerance to environmental stress conditions",
      "Improves resistance against fungal diseases",
      "Contributes to improved yield and crop quality"
    ],
    recommendedCrops: ["Cereals", "Vegetables", "Fruit crops", "Plantation and horticultural crops"],
    dosage: "250 ml per acre",
    applicationDetails: ["Foliar spray"],
    applicationStage: "Vegetative stage",
    packSizes: ["250 ml", "500 ml", "1 L", "5 L"]
  },

  "FERTI-SILICATE": {
    id: "FERTI-SILICATE",
    name: "FERTI SILICATE",
    fullName: "FERTI SILICATE Silicon Nutrition Fertilizer",
    category: "NPK Fertilizers",
    subCategory: "Specialty Calcium & Sulfur Fertilizers",
    type: "Liquid Silicon Fertilizer",
    description: "FERTI SILICATE is a liquid silicon fertilizer supplying plant-available silicon that is efficiently absorbed and deposited in plant cell walls, strengthening plant structure and improving stress tolerance.",
    keyAdvantages: [
      "Efficient silicon absorption and deposition in plant cell walls",
      "Enhances cell wall rigidity and structural strength",
      "Supports activation of plant defense responses",
      "Reduces transpiration losses and improves water use efficiency",
      "Facilitates better nutrient uptake and utilization"
    ],
    cropBenefits: [
      "Enhanced structural integrity and stronger plant architecture",
      "Improved tolerance to drought, heat, and other abiotic stresses",
      "Increased resistance to diseases and pest pressure",
      "Better water management and crop resilience",
      "Improved overall plant growth and performance"
    ],
    recommendedCrops: ["Cereals", "Vegetables", "Fruit crops", "Plantation and horticultural crops"],
    dosage: "500 ml per acre",
    applicationDetails: ["Soil application", "Foliar spray"],
    applicationStage: "Vegetative stage",
    packSizes: ["500 ml", "1 L", "5 L", "20 L"]
  }
};

// Helper function to get all products
export const getAllProducts = () => {
  return Object.values(PRODUCTS_DATA);
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return Object.values(PRODUCTS_DATA).filter(product => product.category === category);
};

// Helper function to get products by subCategory
export const getProductsBySubCategory = (subCategory) => {
  return Object.values(PRODUCTS_DATA).filter(product => product.subCategory === subCategory);
};

// Helper function to search products
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return Object.values(PRODUCTS_DATA).filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.fullName.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};