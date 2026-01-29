// products.js   (plain .js file – no .mjs needed)
import nitrobaseImage from '../src/assets/nitrbase.png';
import Beni_Base_4kg from '../src/assets/Beni_Base_4kg.png';
import Camags from '../src/assets/Camags.png';
import cancore from '../src/assets/cancore.png';
import carbo_min from '../src/assets/carbo_min.png';
import carbomin1 from '../src/assets/CARBOMIN - I(INITIAL).png';
import cas from '../src/assets/cas.png';
import CARBOMINBOOSTER from '../src/assets/CARBOMINBOOSTER.png';
import CARBOMINFA from '../src/assets/CARBOMINFA.png';
import CARBOMINSPECIAL from '../src/assets/CARBOMINSPECIAL.png';
import CopiousNp from '../src/assets/Copious-Np.png';
import CopiousNPK from '../src/assets/CopiousNPK.png';
import fertibg from '../src/assets/fertibg.png';
import fertica6 from '../src/assets/fertica6.png';
import fertica21 from '../src/assets/fertica21.png';
import ferti_eleven from '../src/assets/ferti_eleven.png';
import ferti_seven from '../src/assets/ferti_seven.png';
import carbocen from '../src/assets/corbcen.png';
import ZINBASE from '../src/assets/ZINBASE.png';
import t8 from '../src/assets/t8.png';
import promore from '../src/assets/Promore.png';
import CopiousK from '../src/assets/CopiousK.png';
import HYDROMINLEVEL3 from '../src/assets/HYDROMINLEVEL3.png';
import bloom from '../src/assets/bloom.png';
import phospobase from '../src/assets/phospobase.png';
import mycore from '../src/assets/mycore.png';
import photobase from '../src/assets/photobase.png';
import zincore from '../src/assets/zincore.png';
import microlife from '../src/assets/microlife.png';
import dfnc from '../src/assets/dfnc.png';
import HYDROMINLEVEL2 from '../src/assets/HYDROMINLEVEL2.png';
import HYDROMINLEVEL1 from '../src/assets/HYDROMINLEVEL1.png';
import ferti6018 from '../src/assets/ferti6018.png';
import liquidbase from '../src/assets/liquidbase.png';


export const products = [
  // ────────────────────── 1. NITROGEN-FIXING BIOFERTILIZERS ──────────────────────
  {
    id: "1",
    name: "Fertibase Nitrobase",
    image: nitrobaseImage,
    desc: "Fertibase Nitrobase is a liquid biofertilizer formulated with nitrogen-fixing bacteria that convert atmospheric nitrogen into plant-usable forms.",
    category: "Liquid Nitrogen-Fixing Biofertilizer",
    metaTitle: "Fertibase Nitrobase is a Liquid Nitrogen-Fixing Biofertilizer for Crop Growth",
    metaKeywords: "nitrogen-fixing biofertilizer, liquid biofertilizer, organic nitrogen supplement, Fertibase Nitrobase, nitrogen fertilizer alternative",
    overview: "Fertibase Nitrobase is a liquid biofertilizer formulated with nitrogen-fixing bacteria that convert atmospheric nitrogen into plant-usable forms. It provides a natural and sustainable nitrogen source for crops, enhancing plant growth, improving soil fertility, and reducing the need for chemical fertilizers.",
    whatIs: "Fertibase Nitrobase is a liquid biofertilizer containing highly efficient nitrogen-fixing bacteria that naturally convert atmospheric nitrogen into plant-usable forms. It provides a sustainable nitrogen source that enhances plant growth, reduces the need for chemical fertilizers, and supports long-term soil health. Nitrobase is ideal for farmers who want stronger roots, greener leaves, and higher yields through eco-friendly biological nutrition.",
    howItWorks: "Beneficial bacteria in Nitrobase colonize plant roots and fix nitrogen from the air. They convert atmospheric nitrogen (N₂) into plant-available ammonia (NH₃). This continuous nitrogen supply promotes steady, balanced plant growth throughout the crop cycle.",
    whyChoose: "Nitrobase uses advanced microbial technology to enhance soil nitrogen cycling and plant vigor. It not only increases yield but also reduces chemical nitrogen usage, helping farmers save input costs while maintaining soil balance.",
    benefits: [
      { title: "Enhanced Nitrogen Fixation", desc: "Fixes atmospheric nitrogen into ammonium form readily absorbed by roots." },
      { title: "Reduced Fertilizer Costs", desc: "Can reduce synthetic nitrogen fertilizer use by 25–30%." },
      { title: "Improved Plant Growth", desc: "Stimulates natural growth hormones for stronger stems and greener leaves." },
      { title: "Better Water Efficiency", desc: "Increases plants’ ability to absorb and retain moisture, improving yield under rain-fed conditions." },
      { title: "Healthy Soil", desc: "Boosts beneficial microbial activity and improves soil structure." }
    ],
    dosage: [
      { method: "Seed Treatment", dosage: "250 ml per 10 kg of seed", timing: "Before sowing", details: "Mix evenly and shade-dry before planting." },
      { method: "Foliar Spray", dosage: "1 liter per acre", timing: "Vegetative stage", details: "Mix 2–3 ml per liter of water." },
      { method: "Drip Irrigation", dosage: "1 liter per acre", timing: "Early growth stage", details: "Apply through irrigation system." }
    ],
    crops: ["Paddy", "Maize", "Cotton", "Sugarcane", "Pulses", "Vegetables", "Banana", "All Field & Horticultural Crops"],
    techInfo: [
      { key: "Type", value: "Liquid Biofertilizer" },
      { key: "Microbial Count", value: "≥ 1 × 10⁸ CFU/ml" },
      { key: "Active Organisms", value: "Nitrogen-Fixing Bacteria" },
      { key: "Shelf Life", value: "12 months from the date of manufacture" }
    ],
    packSizes: ["1 L", "5 L", "20 L"],
    faqs: [
      { question: "What is Fertibase Nitrobase?", answer: "Fertibase Nitrobase is a liquid biofertilizer containing nitrogen-fixing bacteria that convert atmospheric nitrogen into forms plants can use, promoting sustainable crop growth." },
      { question: "How does Nitrobase reduce fertilizer costs?", answer: "By naturally fixing nitrogen from the air, Nitrobase minimizes the need for synthetic urea or DAP, helping farmers save up to 25–30% on chemical fertilizers." },
      { question: "Is Nitrobase safe for all crops?", answer: "Yes, Nitrobase is suitable for all field and horticultural crops, including paddy, cotton, banana, sugarcane, and vegetables." },
      { question: "Can Nitrobase be mixed with other fertilizers?", answer: "It is compatible with most biofertilizers and organic inputs, but should not be mixed with chemical bactericides or fungicides." },
      { question: "When should Nitrobase be applied?", answer: "Apply Nitrobase at the early vegetative stage for maximum benefit. For longer crops like sugarcane or banana, repeat application every 30–45 days." }
    ]
  },
  {
    id: "2",
    name: "DFNC",
    image: dfnc,
    desc: "High-efficiency liquid biofertilizer (1x10⁹ CFU/ml) with free-living and endophytic nitrogen-fixing bacteria.",
    category: "Nitrogen-Fixing Biofertilizers",
    details: "Boosts nitrogen availability, improves plant growth, and enhances water use efficiency.",
    benefits: [
      "Fixes 20-40 kg nitrogen/ha.",
      "Reduces fertilizer use by 25-30%.",
      "Promotes stronger growth and higher yields.",
      "Enhances moisture absorption."
    ],
    dosage: "1 litre per acre",
    application: "Seed treatment and foliar spray",
    crops: "All field crops"
  },
  // {
  //   id: "3",
  //   name: "FERTIRHIZO",
  //   image: "/images/fertirhizo.jpg",
  //   desc: "Revolutionary biofertilizer (1x10⁹ CFU/ml) with free-living and endophytic nitrogen-fixing bacteria.",
  //   category: "Nitrogen-Fixing Biofertilizers",
  //   details: "Boosts nitrogen availability, enhances plant growth, and improves water use efficiency.",
  //   benefits: [
  //     "Boosts nitrogen fixation (20-40 kg/ha).",
  //     "Cuts chemical fertilizer use by 25-30%.",
  //     "Promotes stronger, healthier plant growth.",
  //     "Improves water efficiency and yield."
  //   ],
  //   dosage: "1 litre per acre",
  //   application: "Seed treatment and foliar spray",
  //   crops: "All crops"
  // },
  {
    id: "4",
    name: "BLOOM",
    image: bloom,
    desc: "Liquid biofertilizer (min. 1x10⁸ CFU/ml) with free-living and endophytic nitrogen-fixing bacteria.",
    category: "Nitrogen-Fixing Biofertilizers",
    details: "Converts atmospheric nitrogen (N2) into plant-usable forms, promoting healthy crop growth.",
    benefits: [
      "High efficient microbial strain can fix atmospheric nitrogen and supplies it to plants",
      "Improves plant vigour and vitality",
      "Improves vegetative growth",
      "Reduces usage of chemical fertilizers"
    ],
    dosage: "1 L per acre",
    application: "Apply through foliar or drip application",
    crops: "All crops"
  },

  // ────────────────────── 2. PHOSPHORUS-FIXING / SOLUBILIZING BIOFERTILIZERS ──────────────────────
  {
    id: "5",
    name: "PHOSPHOBASE",
    image: phospobase,
    desc: "Liquid biofertilizer (min. 1x10⁹ CFU/ml) with phosphorus solubilizing bacteria.",
    category: "Phosphorus-Fixing / Solubilizing Biofertilizers",
    details: "Unlocks soil phosphorus, boosts plant growth, and improves crop yield.",
    benefits: [
      "Mobilizes 25-30 kg phosphorus/ha.",
      "Cuts phosphorus fertilizer use by 20-25%.",
      "Stimulates root growth hormones.",
      "Increases yield by 15-20%."
    ],
    dosage: "1 litre per acre",
    application: "Drip irrigation/drenching and foliar spray",
    crops: "All crops"
  },
  {
    id: "6",
    name: "PROMORE",
    image: promore,
    desc: "Organic bio-fertilizer enriched with readily available phosphorus.",
    category: "Phosphorus-Fixing / Solubilizing Biofertilizers",
    details: "Substitute for DAP/SSP, increases phosphorus uptake and soil fertility.",
    benefits: [
      "Enables efficient growth.",
      "Increases moisture retention.",
      "Promotes microbial activity.",
      "Controls pest & diseases."
    ],
    dosage: "50 kg per acre",
    application: "Basal application",
    crops: "All crops"
  },

  // ────────────────────── 3. FUNGI-BASED / MYCORRHIZAL BIOFERTILIZERS ──────────────────────
  {
    id: "7",
    name: "MYCORE",
    image: mycore,
    desc: "Biofertilizer with Vesicular Arbuscular Mycorrhiza (VAM) spores in granular/liquid form.",
    category: "Fungi-Based / Mycorrhizal Biofertilizers",
    details: "Enhances phosphorus uptake, strengthens roots, improves nutrient absorption and plant health.",
    benefits: [
      "Enhanced Phosphorus Uptake",
      "High viable spores with lipid content",
      "Improves systemic acquired resistance against biotic and abiotic stress"
    ],
    dosage: "5 kg per acre",
    application: "Can be used at any stage of the crops",
    crops: "All crops"
  },
  {
    id: "8",
    name: "MyCROLIFE",
    image: microlife,
    desc: "Revolutionary biofertilizer with fungi in solid granules or liquid form.",
    category: "Fungi-Based / Mycorrhizal Biofertilizers",
    details: "Boosts phosphorus uptake in low-P soils, increases mycorrhizal fungi for long-term absorption.",
    benefits: [
      "Boosts phosphorus uptake in low-P soils",
      "Increases mycorrhizal fungi for long-term nutrient absorption",
      "Protects roots from soil-borne diseases"
    ],
    dosage: "3-5 litres/acre",
    application: "Apply during planting or shortly thereafter",
    crops: "All crops"
  },

  // ────────────────────── 4. POTASSIUM-FIXING / SOLUBILIZING BIOFERTILIZERS ──────────────────────
  {
    id: "9",
    name: "POTABASE",
    image: photobase,
    desc: "Liquid biofertilizer (min. 1x10⁸ CFU/ml) with Potassium Mobilizing Bacteria.",
    category: "Potassium-Fixing / Solubilizing Biofertilizers",
    details: "Solubilizes complex potassium, making it available to plants for healthier growth and better yields.",
    benefits: [
      "Solubilizes potash and supplies it to plants",
      "Reduces usage of chemical fertilizers",
      "Improves plant growth and yield"
    ],
    dosage: "1 litre per acre",
    application: "Foliar Spray: Apply during fruiting stage",
    crops: "Fruits, Vegetables"
  },
  {
    id: "10",
    name: "COPIOUS-K",
    image: CopiousK,
    desc: "High-potency biofertilizer (min. 5x10⁷ CFU/g) with Potassium Mobilizing Bacteria.",
    category: "Potassium-Fixing / Solubilizing Biofertilizers",
    details: "Boosts soil potassium availability and crop productivity.",
    benefits: [
      "Solubilizes complex potash into plant-available form",
      "Reduces usage of chemical fertilizers",
      "Improves plant growth and yield"
    ],
    dosage: "Apply at fruiting stage",
    application: "Suitable for all crops",
    crops: "All crops"
  },

  // ────────────────────── 5. ZINC / MICRONUTRIENT BIOFERTILIZERS ──────────────────────
  {
    id: "11",
    name: "ZIN BASE - ZINBASE",
    image: ZINBASE,
    desc: "Liquid biofertilizer (min. 1x10⁸ CFU/ml) with zinc-solubilizing bacteria.",
    category: "Zinc / Micronutrient Biofertilizers",
    details: "Unlocks soil-bound zinc, supporting healthy crop growth and yield.",
    benefits: [
      "Solubilizes complex zinc for plant use",
      "Reduces chemical fertilizer usage",
      "Addresses zinc deficiency and improves plant vigour"
    ],
    dosage: "1 litre per acre",
    application: "Drip and foliar application",
    crops: "Paddy, Wheat, Maize"
  },
  {
    id: "12",
    name: "ZINCORE",
    image: zincore,
    desc: "Chelated Zinc as Zinc Glycine Liquid (Zn 6.8%) for enhanced zinc availability.",
    category: "Zinc / Micronutrient Biofertilizers",
    details: "Ensures rapid absorption and better nutrient utilization.",
    benefits: [
      "Enhanced Zinc Availability",
      "Better Nutrient Utilization",
      "Rapid Absorption",
      "Improved Protein Synthesis",
      "Stress Resistance"
    ],
    dosage: "1.5 to 2.0 ml per liter of water",
    application: "Foliar Spray",
    crops: "All crops"
  },
  {
    id: "13",
    name: "FERTI-BG",
    image: fertibg,
    desc: "Chelated Boron as Boron Glycine Liquid (B 5%) for improved pollination and fruit set.",
    category: "Zinc / Micronutrient Biofertilizers",
    details: "Enhances boron solubility and bioavailability.",
    benefits: [
      "Enhanced Boron Absorption",
      "Cell Wall Strengthening",
      "Improved Pollination and Seed Development",
      "Efficient Nutrient Transport",
      "Stress Resistance"
    ],
    dosage: "2-2.5 ml per liter of water",
    application: "Foliar Spray / Drip",
    crops: "Fruits, Vegetables"
  },

  // ────────────────────── 6. MULTI-NUTRIENT / NPK BIOFERTILIZERS ──────────────────────
  {
    id: "14",
    name: "COPIOUS-NPK",
    image: CopiousNPK,
    desc: "Consortium biofertilizer (min. 3x10⁷ CFU/g) with N, P, K bacteria.",
    category: "Multi-Nutrient / NPK Biofertilizers",
    details: "Enhances nutrient availability and crop health.",
    benefits: [
      "Boosts nitrogen fixation, solubilizes P and K",
      "Improves systemic resistance to stress",
      "Increases yield, reduces chemical fertilizers"
    ],
    dosage: "Apply at sowing or before planting",
    application: "For all crops",
    crops: "All crops"
  },
  {
    id: "15",
    name: "COPIOUS-NP",
    image: CopiousNp,
    desc: "Granular biofertilizer (min. 3x10⁷ CFU/g) delivering nitrogen and phosphorus.",
    category: "Multi-Nutrient / NPK Biofertilizers",
    details: "Promotes nitrogen fixation and phosphorus availability.",
    benefits: [
      "Promotes N fixation and P availability",
      "Enhances crop stress tolerance",
      "Increases yield and quality by 25-30%, reduces fertilizer use by 20-25%"
    ],
    dosage: "Apply at or before sowing",
    application: "Paddy, cotton, sugarcane, chilli (crop-specific variants)",
    crops: "Paddy, Cotton, Sugarcane, Chilli"
  },
  {
    id: "16",
    name: "BENIBASE",
    image: Beni_Base_4kg,
    desc: "Granular biofertilizer (min. 3x10⁷ CFU/g) with N, P, K bacteria.",
    category: "Multi-Nutrient / NPK Biofertilizers",
    details: "Provides essential nutrients in granular form for sustainable growth.",
    benefits: [
      "Enhances nutrient uptake",
      "Improves stress tolerance",
      "Boosts yield and crop quality"
    ],
    dosage: "4 kg per acre",
    application: "Apply at or before sowing",
    crops: "Paddy, Cotton, Sugarcane, Chilli"
  },
  {
    id: "17",
    name: "LEQUIBASE Liquid Consortia",
    image: liquidbase,
    desc: "Specialized liquid consortia to enhance soil fertility and nutrient availability.",
    category: "Multi-Nutrient / NPK Biofertilizers",
    details: "Blend of beneficial microorganisms for improved soil health.",
    benefits: [
      "Enhanced Nutrient Availability",
      "Reduced Chemical Fertilizer Use",
      "Environmental Sustainability",
      "Improved Soil Health",
      "Increased Crop Yield and Quality"
    ],
    dosage: "100 ml per 10 liters of water",
    application: "Foliar Application",
    crops: "All crops"
  },

  // ────────────────────── 7. ORGANIC MANURE / LIQUID FERMENTED MANURE ──────────────────────
  {
    id: "18",
    name: "CAMAGS",
    image: Camags,
    desc: "Premium bio-enriched organic manure from plant-based materials via microbial composting.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Provides organic matter, humus, microbes, and NPK.",
    benefits: [
      "Promotes efficient plant growth and microbial activity",
      "Increases soil moisture retention",
      "Enhances resistance to pests and diseases",
      "Improves yield and organic carbon"
    ],
    dosage: "200–300 kg per acre",
    application: "Basal / top dressing",
    crops: "All crops"
  },
  {
    id: "19",
    name: "HVDROMIN L-1 (Vegetative)",
    image: HYDROMINLEVEL1,
    desc: "Liquid fermented organic manure for vegetative growth stage.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Enhances nutrient availability and root growth.",
    benefits: [
      "Improved Nutrient Availability",
      "Supports Vigorous Vegetative Growth",
      "Moisture Retention & Reduced Evaporation",
      "Bentonite as Microbial Carrier"
    ],
    dosage: "5-10 L/acre (soil), 2-5 ml/L (foliar)",
    application: "Soil, Foliar, Drip",
    crops: "All crops"
  },
  {
    id: "20",
    name: "HVDROMIN L-2 (Flowering)",
    image: HYDROMINLEVEL2,
    desc: "Liquid fermented manure for flowering and fruit setting.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Supplies P and K for bud initiation and flower retention.",
    benefits: [
      "Improved Nutrient Availability",
      "Supports Flowering",
      "Moisture Retention",
      "Bentonite Carrier"
    ],
    dosage: "5-7 L/acre (soil), 3-5 ml/L (foliar)",
    application: "Soil, Foliar, Drip",
    crops: "Fruits, Vegetables"
  },
  {
    id: "21",
    name: "HVDROMIN L-3 (Maturity)",
    image: HYDROMINLEVEL3,
    desc: "Liquid fermented manure for fruit ripening and quality.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Supplies K and micronutrients for better color, size, and shelf life.",
    benefits: [
      "Improved Nutrient Availability",
      "Enhances Sugar & Firmness",
      "Moisture Retention",
      "Bentonite Carrier"
    ],
    dosage: "3-5 L/acre (soil), 3-5 ml/L (foliar)",
    application: "Soil, Foliar, Drip",
    crops: "Fruits"
  },
  {
    id: "22",
    name: "CARBOMIN-I (Initial)",
    image: carbomin1,
    desc: "Liquid fermented organic manure for early vegetative growth.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Promotes root development and chlorophyll production.",
    benefits: [
      "Enhanced Nutrient Availability",
      "Stimulates Early Growth",
      "Improves Soil Structure",
      "Boosts Moisture Retention"
    ],
    dosage: "5-10 L/acre (soil), 2-5 ml/L (foliar)",
    application: "Soil, Foliar, Drip",
    crops: "All crops"
  },
  {
    id: "23",
    name: "CARBOMIN-B (Booster)",
    image: CARBOMINBOOSTER,
    desc: "Liquid fermented manure for flowering stage.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Provides P and K for healthy flower development.",
    benefits: [
      "Enhanced Nutrient Availability",
      "Reduces Flower Drop",
      "Improves Soil Structure",
      "Eco-Friendly"
    ],
    dosage: "5-7 L/acre (soil), 3-5 ml/L (foliar)",
    application: "Soil, Foliar, Drip",
    crops: "Flowering crops"
  },
  {
    id: "24",
    name: "CARBOMIN-S (Special)",
    image: CARBOMINSPECIAL,
    desc: "Liquid fermented manure for fruit maturity and ripening.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Supplies K and micronutrients for uniform fruit growth.",
    benefits: [
      "Enhanced Nutrient Availability",
      "Improves Sugar & Shelf Life",
      "Improves Soil Structure",
      "Gradual Release"
    ],
    dosage: "3-5 L/acre (soil), 3-5 ml/L (foliar)",
    application: "Soil, Foliar, Drip",
    crops: "Fruits"
  },
  {
    id: "25",
    name: "CARBOMIN-FA",
    image: CARBOMINFA,
    desc: "Foliar-grade liquid fermented organic manure.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Quick nutrient boost during critical growth stages.",
    benefits: [
      "Rapid Absorption",
      "Supports All Growth Stages",
      "Compatible with Bio-stimulants",
      "Eco-Friendly"
    ],
    dosage: "2-5 ml per liter of water",
    application: "Foliar Spray every 7-15 days",
    crops: "All crops"
  },
  {
    id: "26",
    name: "CARBOCEN",
    image: carbocen,
    desc: "High-quality liquid organic manure with fermented organic matter and microbes.",
    category: "Organic Manure / Liquid Fermented Manure",
    details: "Enriches soil structure and microbial activity.",
    benefits: [
      "Boosts Soil Microbial Activity",
      "Reduces Fertilizer Dependency",
      "Promotes Flowering & Fruit Development",
      "Gradual Nutrient Release"
    ],
    dosage: "5-10 L/acre (soil), 2-5 ml/L (foliar)",
    application: "Soil, Foliar, Drip",
    crops: "All crops"
  },

  // ────────────────────── 8. SPECIALTY FERTILIZERS (CALCIUM, BORON, NPK SUSPENSIONS) ──────────────────────
  {
    id: "27",
    name: "FERTI Ca-21%",
    image: fertica21,
    desc: "Fortified Calcium Suspension (Ca-21%) for cell wall strength and fruit quality.",
    category: "Zinc / Micronutrient Biofertilizers",
    details: "Provides readily available calcium for physiological processes.",
    benefits: [
      "Enhanced Cell Wall Strength",
      "Increased Shelf Life",
      "Improved Fruit Quality",
      "Stress Resistance"
    ],
    dosage: "As per label",
    application: "Foliar / Drip",
    crops: "Fruits, Vegetables"
  },
  {
    id: "28",
    name: "FERTI-Ca-6%",
    image: fertica6,
    desc: "Chelated Calcium as Calcium Glycine Liquid (Ca 6%).",
    category: "Zinc / Micronutrient Biofertilizers",
    details: "Enhances calcium solubility and uptake.",
    benefits: [
      "Enhanced Calcium Absorption",
      "Better Nutrient Utilization",
      "Rapid Absorption",
      "Improved Cell Wall Strength",
      "Stress Resistance"
    ],
    dosage: "2-2.5 ml per liter of water",
    application: "Foliar / Drip",
    crops: "All crops"
  },
  {
    id: "29",
    name: "FERTI (6:0:18)",
    image: ferti6018,
    desc: "NK 6:0:18 Suspension fortified with Ca, Mg, Boron.",
    category: "Multi-Nutrient / NPK Biofertilizers",
    details: "Supports photosynthesis, flowering, and cell wall strength.",
    benefits: [
      "Enhanced Photosynthesis & Growth",
      "Improved Flowering & Fruit Set",
      "Strengthened Cell Walls",
      "Stress Resistance"
    ],
    dosage: "250 ml per acre",
    application: "Foliar / Drip",
    crops: "All crops"
  },
  {
    id: "30",
    name: "FERTI (11:11:8)",
    image: ferti_eleven,
    desc: "Balanced NPK (11:11:8) fortified with Zn & Boron.",
    category: "Multi-Nutrient / NPK Biofertilizers",
    details: "Meets nutritional needs during critical growth stages.",
    benefits: [
      "Balanced Macronutrient Supply",
      "Enhanced Nutrient Uptake",
      "Micronutrient Fortification",
      "Improved Yield and Quality"
    ],
    dosage: "2-3 ml/L (foliar), 1.25 L/acre (drip)",
    application: "Foliar / Drip",
    crops: "All crops"
  },
  {
    id: "31",
    name: "FERTI CANCORE",
    image: cancore,
    desc: "Calcium Nitrate + Magnesium Suspension.",
    category: "Zinc / Micronutrient Biofertilizers",
    details: "Promotes robust growth and reduces blossom end rot.",
    benefits: [
      "Enhanced Calcium Absorption",
      "Balanced Nutrient Supply",
      "Increased Stress Tolerance",
      "Improved Magnesium Availability",
      "Reduced Blossom End Rot"
    ],
    dosage: "5-6 ml/L (foliar), 10 ml/L (drip)",
    application: "Foliar / Drip",
    crops: "Tomato, Capsicum"
  },
  {
    id: "32",
    name: "FERTI (7:21:0)",
    image: ferti_seven,
    desc: "High Phosphorus (21% P₂O₅) with 7% N and 0.2% Zn.",
    category: "Multi-Nutrient / NPK Biofertilizers",
    details: "Addresses phosphorus deficiency and enhances root/flowering.",
    benefits: [
      "Enhanced Root Development",
      "Improved Flowering and Fruiting",
      "Zinc Enrichment",
      "Balanced Nutrient Supply"
    ],
    dosage: "2-3 ml/L (foliar), 1-1.5 L/acre (drip)",
    application: "Foliar / Drip",
    crops: "All crops"
  },
  {
    id: "33",
    name: "FERTI 8:8:8",
    image: t8,
    desc: "Balanced NPK (8:8:8) liquid fertilizer for sugarcane.",
    category: "Multi-Nutrient / NPK Biofertilizers",
    details: "Supports growth and development of sugarcane.",
    benefits: [
      "Enhanced Photosynthesis",
      "Suitable for Sugarcane",
      "Drip Compatible"
    ],
    dosage: "2-3 ml/L (foliar), 1-1.5 L/acre (drip)",
    application: "Foliar / Drip",
    crops: "Sugarcane"
  },
  {
    id: "34",
    name: "FERTI CAS",
    image: cas,
    desc: "Calcium Thiosulphate (CaS₂O₃) Liquid Fertilizer.",
    category: "Zinc / Micronutrient Biofertilizers",
    details: "Chloride-free dual nutrient (Ca + S) source.",
    benefits: [
      "Enhanced Nutrient Availability",
      "Reduced Soil Salinity",
      "Nitrogen Stabilization",
      "Improved Soil Structure",
      "Increased Fruit Quality"
    ],
    dosage: "5-40 L/ha (foliar), 10-50 L/ha (drip), 100-300 L/ha (soil)",
    application: "Foliar / Drip / Soil",
    crops: "All crops"
  }
];

