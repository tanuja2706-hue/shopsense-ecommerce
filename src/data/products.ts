import { Product } from '../types';

export const DEMO_PRODUCTS: Product[] = [
  // Electronics
  {
    id: 'prod-el-1',
    name: 'Aura Studio Wireless Over-Ear Headphones',
    category: 'Electronics',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    description: 'Precision-tuned acoustic drivers housed in aerospace-grade aluminum. Features active hybrid noise cancellation, memory foam ear cups, and 38-hour battery longevity.',
    features: [
      '40mm custom graphene dynamic transducers',
      'Hybrid active noise cancellation with ambient mode',
      'Up to 38 hours playback with rapid USB-C charging',
      'Ultra-soft protein leather ear cushions',
      'Multi-point Bluetooth 5.3 connectivity'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true,
    isDealOfTheDay: true,
    tag: 'Top Deal'
  },
  {
    id: 'prod-el-2',
    name: 'Horizon Minimal Mechanical Keyboard',
    category: 'Electronics',
    price: 139,
    originalPrice: 165,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1000&auto=format&fit=crop',
    description: 'A low-profile 75% mechanical keyboard crafted with a CNC-milled aluminum chassis, hot-swappable tactile silent switches, and customizable warm white backlighting.',
    features: [
      'CNC anodized aluminum body with sound-dampening foam',
      'Gateron Low-Profile 2.0 tactile switches (hot-swappable)',
      'Tri-mode wireless (2.4GHz dongle, Bluetooth, Type-C)',
      'Mac and Windows keycaps included',
      'Up to 240 hours battery without backlight'
    ],
    inStock: true,
    isPopular: true,
    isDealOfTheDay: false,
    tag: 'Top Rated'
  },
  {
    id: 'prod-el-3',
    name: 'Strata Smart Obsidian Timepiece',
    category: 'Electronics',
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    description: 'Sleek matte stainless-steel case with an always-on AMOLED display. Tracks continuous heart rate, blood oxygen, sleep phases, and daily activity metrics.',
    features: [
      '1.4-inch high-density AMOLED display (454x454)',
      '5 ATM water resistance (up to 50 meters)',
      'Continuous biometric monitoring and stress estimation',
      'Interchangeable fluoroelastomer sports band',
      '7-day typical battery endurance'
    ],
    inStock: true,
    isTrending: true,
    isDealOfTheDay: true,
    tag: 'Deal of the Day'
  },

  // Mobiles
  {
    id: 'prod-mo-1',
    name: 'Apex Horizon 5G Smartphone (256GB)',
    category: 'Mobiles',
    price: 649,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
    description: 'Flagship 6.7-inch 120Hz LTPO OLED display with 50MP triple sensor system, all-day 5000mAh battery, and lightning-fast 65W charging.',
    features: [
      '6.7" QHD+ LTPO OLED 120Hz dynamic display',
      '50MP main sensor with OIS & 5x optical periscope',
      'Snapdragon 8-series processor with 12GB RAM',
      '5000mAh dual-cell battery with 65W wired charger',
      'IP68 water and dust ingress protection'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true,
    isDealOfTheDay: true,
    tag: 'Mega Deal'
  },

  // Fashion
  {
    id: 'prod-fa-1',
    name: 'Raw Selvedge Structured Overshirt',
    category: 'Fashion',
    price: 120,
    originalPrice: 150,
    rating: 4.8,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
    description: 'Woven from 100% sustainable organic heavyweight cotton twill. Features durable horn buttons, boxy architectural drape, and twin reinforced chest patch pockets.',
    features: [
      '380 GSM organic ring-spun cotton twill',
      'Natural horn buttons with reinforced cross-stitching',
      'Tailored drop-shoulder silhouette for layering',
      'Pre-washed for a soft touch with zero shrinkage',
      'Ethically made in Portugal'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true,
    isDealOfTheDay: true,
    tag: 'Trending'
  },
  {
    id: 'prod-fa-2',
    name: 'Merino Wool Relaxed Turtleneck',
    category: 'Fashion',
    price: 145,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop',
    description: 'Knitted from extrafine 19.5-micron Australian merino wool. Exceptionally soft next to skin, naturally temperature-regulating, and tailored with ribbed hem detailing.',
    features: [
      '100% certified extrafine Merino wool',
      'Natural odor resistance and thermoregulation',
      'Seamless tubular body knitting for zero chafe',
      'Classic folded collar with ribbed cuffs',
      'Dry clean or gentle hand wash'
    ],
    inStock: true,
    isTrending: false,
    isPopular: true
  },
  {
    id: 'prod-fa-3',
    name: 'Linen Pleated Relaxed Trouser',
    category: 'Fashion',
    price: 115,
    originalPrice: 135,
    rating: 4.6,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
    description: 'Casual sophistication crafted in breathable French flax linen. Features double front pleats, a concealed zip fly, and an elasticated rear waistband insert.',
    features: [
      '100% French flax linen (medium weight)',
      'Subtle double pleats with tapered ankle cut',
      'Side slash pockets and welted back pocket',
      'Unlined for optimal warm-weather ventilation',
      'Pre-softened garment wash'
    ],
    inStock: true,
    isTrending: true
  },

  // Beauty
  {
    id: 'prod-be-1',
    name: 'Botanical Barrier Recovery Face Oil',
    category: 'Beauty',
    price: 68,
    originalPrice: 85,
    rating: 4.9,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop',
    description: 'Cold-pressed botanical elixir infused with squalane, rosehip seed oil, and blue tansy. Calms redness, replenishes lipid balance, and seals in deep hydration.',
    features: [
      '100% cold-pressed organic active botanicals',
      'Plant-derived squalane for rapid absorption',
      'Naturally scented with pure blue tansy & neroli',
      'Free from parabens, synthetic fragrances, and silicones',
      'Packaged in UV-protective amber glass'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true,
    isDealOfTheDay: true,
    tag: 'Bestseller'
  },
  {
    id: 'prod-be-2',
    name: 'Hydra-Luminous Nectar Serum',
    category: 'Beauty',
    price: 54,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    description: 'Multi-molecular hyaluronic acid combined with 5% niacinamide and fermented rice water. Plumps tired skin and refines uneven texture within days.',
    features: [
      'Triple-weight hyaluronic acid matrix',
      '5% Vitamin B3 (Niacinamide) for pore refinement',
      'Fermented prebiotic postbiotic complex',
      'Dermatologist tested & non-comedogenic',
      'Cruelty-free & 100% vegan formula'
    ],
    inStock: true,
    isTrending: false,
    isPopular: true
  },
  {
    id: 'prod-be-3',
    name: 'Volcanic Mineral Clarifying Clay Mask',
    category: 'Beauty',
    price: 42,
    originalPrice: 48,
    rating: 4.7,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
    description: 'French green clay enriched with geothermal volcanic ash and soothing chamomile. Gently unclogs congested pores without stripping essential natural oils.',
    features: [
      'Bentonite and French sea clay blend',
      'Microfine volcanic ash for gentle exfoliation',
      'Organic chamomile extract prevents tight sensation',
      'Easy 10-minute rinse-off application',
      'Ideal for oily and combination skin types'
    ],
    inStock: true,
    isTrending: false
  },

  // Home & Living
  {
    id: 'prod-hl-1',
    name: 'Kanso Ceramic Pour-Over Coffee Set',
    category: 'Home & Living',
    price: 76,
    originalPrice: 95,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop',
    description: 'Wheel-thrown stoneware pour-over dripper and matching 650ml carafe. Engineered with internal spiral ribbing to extract nuanced flavor clarity.',
    features: [
      'High-fired durable Japanese clay body',
      'Matte reactive glaze finish with subtle speckles',
      'Compatible with standard #02 conical paper filters',
      'Ergonomic heat-dissipating sculpted handle',
      'Dishwasher and microwave safe'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true,
    isDealOfTheDay: true,
    tag: 'Staff Favorite'
  },
  {
    id: 'prod-hl-2',
    name: 'Nordic Solid White Oak Desk Lamp',
    category: 'Home & Living',
    price: 160,
    rating: 4.8,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop',
    description: 'Minimalist desk companion turned from solid FSC-certified white oak and brushed brass hardware. Features touch-capacitive 3-stage warm dimming.',
    features: [
      'Solid European white oak base and armature',
      'Warm 2700K integrated high-CRI LED (95+ CRI)',
      'Touch-sensitive dimmer switch integrated into brass mount',
      'Braided neutral linen power cord (2m length)',
      'Designed to last 50,000 lighting hours'
    ],
    inStock: true,
    isTrending: false,
    isPopular: true
  },
  {
    id: 'prod-hl-3',
    name: 'Hand-Knotted Merino Throw Blanket',
    category: 'Home & Living',
    price: 110,
    originalPrice: 130,
    rating: 4.7,
    reviewsCount: 53,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop',
    description: 'Airy waffle weave made from pure undyed wool. Offers lightweight warmth and tactile comfort across sofas, reading chairs, or bedscapes.',
    features: [
      '100% natural unbleached wool fibers',
      'Subtle fringe edge detail on short ends',
      'Dimensions: 130cm x 180cm (51" x 71")',
      'Hypoallergenic and naturally breathable',
      'Handcrafted by generational artisans'
    ],
    inStock: true,
    isTrending: true
  },

  // Appliances
  {
    id: 'prod-ap-1',
    name: 'AeroPulse True HEPA Air Purifier',
    category: 'Appliances',
    price: 189,
    originalPrice: 239,
    rating: 4.8,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=1000&auto=format&fit=crop',
    description: '360-degree cylindrical air filtration capturing 99.97% of airborne particulate matter. Whisper-quiet night mode with smart air quality laser sensor.',
    features: [
      'H13 Medical-Grade True HEPA + Activated Carbon',
      'Cleans up to 500 sq ft room in 15 minutes',
      'Smart PM2.5 real-time color laser indicator',
      'Whisper-quiet 22dB sleep operation',
      'Auto-speed modulation based on air conditions'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true,
    isDealOfTheDay: true,
    tag: 'Save $50'
  },
  {
    id: 'prod-ap-2',
    name: 'Kanso Precision Electric Gooseneck Kettle',
    category: 'Appliances',
    price: 85,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?q=80&w=1000&auto=format&fit=crop',
    description: 'Variable temperature control with precision degree settings for pour-over, matcha, and loose leaf teas. Features a 60-minute warm hold function.',
    features: [
      '1200W rapid boil with 0.9L capacity',
      'Precision counter-balanced ergonomic handle',
      'Digital temperature display in °F and °C',
      'Fluted gooseneck spout for steady flow rate control',
      'Built-in brew stopwatch timer'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true
  },

  // Accessories
  {
    id: 'prod-ac-1',
    name: 'Vanguard Top-Grain Leather Folio',
    category: 'Accessories',
    price: 95,
    originalPrice: 115,
    rating: 4.8,
    reviewsCount: 97,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    description: 'Vegetable-tanned full-grain cowhide designed to fit up to a 14-inch laptop, notebook, tablet, and pens. Develops a rich golden patina over time.',
    features: [
      'Full-grain Italian vegetable-tanned leather',
      'Custom brushed brass YKK Excella zippers',
      'Dedicated padded slot for 13-14" laptops',
      'Dual pen holders and business card slots',
      'Microfiber suede interior lining'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true,
    isDealOfTheDay: true,
    tag: 'Classic'
  },
  {
    id: 'prod-ac-2',
    name: 'Komorebi Handcrafted Acetate Sunglasses',
    category: 'Accessories',
    price: 125,
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
    description: 'Timeless rounded silhouette custom-carved from sustainable Italian Mazzucchelli bio-acetate. Outfitted with Category 3 polarized Carl Zeiss lenses.',
    features: [
      'Italian Mazzucchelli plant-derived bio-acetate',
      'Zeiss polarized lenses with 100% UV400 defense',
      '5-barrel German engineered hinges',
      'Anti-reflective inner lens coating',
      'Includes recycled leather hard case and cleaning cloth'
    ],
    inStock: true,
    isTrending: false
  },
  {
    id: 'prod-ac-3',
    name: 'Titanium RFID Minimalist Cardholder',
    category: 'Accessories',
    price: 48,
    originalPrice: 58,
    rating: 4.9,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
    description: 'Featherlight Grade 5 titanium plates bound by high-tension woven elastic webbing. Blocks RFID skimmers while securely carrying up to 12 cards and folded bills.',
    features: [
      'Grade 5 aerospace titanium with matte bead-blasted finish',
      'Integrated spring-steel money clip for cash',
      'RFID and NFC blocking security against wireless theft',
      'Weighs only 48 grams (1.7 oz)',
      'Lifetime hardware durability'
    ],
    inStock: true,
    isTrending: true,
    isPopular: true,
    tag: 'Bestseller'
  },

  // Lifestyle
  {
    id: 'prod-li-1',
    name: 'Artisan Brass Tabletop Compass',
    category: 'Lifestyle',
    price: 65,
    originalPrice: 80,
    rating: 4.7,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop',
    description: 'Precision-damped magnetic needle in solid antiqued brass case. A tactile desktop paperweight and functional orientation instrument.',
    features: [
      'Solid milled antiqued brass casing',
      'Liquid-damped sapphire jewel movement',
      'Felt-lined protective wooden gift box',
      'Engraved compass rose dial'
    ],
    inStock: true,
    isTrending: false,
    isPopular: true
  }
];

export const CATEGORIES_LIST = [
  {
    name: 'Electronics',
    description: 'Headphones, mechanical audio & acoustics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    count: 3
  },
  {
    name: 'Fashion',
    description: 'Organic cotton, linen & wool garments',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop',
    count: 3
  },
  {
    name: 'Beauty',
    description: 'Active botanicals, masks & skincare',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop',
    count: 3
  },
  {
    name: 'Home & Living',
    description: 'Ceramics, lighting & artisan textiles',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
    count: 3
  },
  {
    name: 'Accessories',
    description: 'Leather goods, eyewear & cardholders',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    count: 3
  }
] as const;

export const CATEGORY_SHORTCUTS = [
  {
    name: 'Electronics',
    category: 'Electronics',
    iconColor: 'bg-blue-50 text-blue-700',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Fashion',
    category: 'Fashion',
    iconColor: 'bg-amber-50 text-amber-800',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Beauty',
    category: 'Beauty',
    iconColor: 'bg-pink-50 text-pink-700',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Home & Living',
    category: 'Home & Living',
    iconColor: 'bg-emerald-50 text-emerald-700',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Accessories',
    category: 'Accessories',
    iconColor: 'bg-purple-50 text-purple-700',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Mobiles',
    category: 'Mobiles',
    iconColor: 'bg-sky-50 text-sky-700',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Appliances',
    category: 'Appliances',
    iconColor: 'bg-teal-50 text-teal-700',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Lifestyle',
    category: 'Lifestyle',
    iconColor: 'bg-orange-50 text-orange-700',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=200&auto=format&fit=crop'
  }
] as const;
