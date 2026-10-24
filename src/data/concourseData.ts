import { ConcourseOutlet, TurnstileBlockAdvice, BagDropDepot } from '../types';

export const CONCOURSE_OUTLETS: ConcourseOutlet[] = [
  {
    id: 'goal-line-bar',
    name: 'The Goal Line Bar',
    stand: 'South Stand',
    level: 1,
    category: 'beer',
    nearBlocks: 'Blocks 248 - 256',
    beersServed: ['Beavertown Neck Oil', 'Beavertown Gamma Ray', 'Beavertown Bones Lager', 'Heineken', 'Guinness'],
    hasBottomsUpTaps: true,
    dietaryOptions: {
      vegan: true,
      halal: false,
      kosher: false,
      glutenFree: true,
      kidFriendly: false
    },
    signatureItem: 'Fresh Neck Oil poured in 3 seconds via magnet Bottoms-Up cup',
    queueStatus: 'moderate',
    description: "Europe's longest continuous bar spanning 65 metres across the entire South Stand goal line. Houses 40 fast-dispense bottom-pour stations."
  },
  {
    id: 'beavertown-microbrewery',
    name: 'Beavertown Corner Microbrewery',
    stand: 'South Stand',
    level: 1,
    category: 'beer',
    nearBlocks: 'Blocks 252 - 254 (South-East Corner)',
    beersServed: ['One of Our Own (Stout)', 'Neck Oil Session IPA', 'Lupuloid IPA', 'Nanobot Light IPA'],
    hasBottomsUpTaps: true,
    dietaryOptions: {
      vegan: true,
      halal: false,
      kosher: false,
      glutenFree: false,
      kidFriendly: false
    },
    signatureItem: 'One of Our Own - exclusive club stout brewed right behind the glass',
    queueStatus: 'busy',
    description: 'The world’s first microbrewery inside a football stadium. Brews over 1 million pints a year with visible stainless steel conditioning tanks.'
  },
  {
    id: 'naan-and-kebab',
    name: 'Naan & Kebab (Market Place)',
    stand: 'South Stand',
    level: 1,
    category: 'food',
    nearBlocks: 'Blocks 250 - 252',
    beersServed: ['Beavertown Neck Oil', 'Amstel'],
    hasBottomsUpTaps: false,
    dietaryOptions: {
      vegan: true,
      halal: true,
      kosher: false,
      glutenFree: false,
      kidFriendly: true
    },
    signatureItem: 'Chicken Tikka Fresh Naan Wrap with pickled onions & mint raita (Halal)',
    queueStatus: 'moderate',
    description: 'Fresh tandoor naans baked on-site with authentic spiced halal chicken, lamb seekh, or grilled paneer.'
  },
  {
    id: 'linekers-fish-and-chips',
    name: "Lineker's Traditional Fish & Chips",
    stand: 'East Stand',
    level: 2,
    category: 'food',
    nearBlocks: 'Blocks 112 - 114',
    beersServed: ['Beavertown Bones Lager', 'Orchard Thieves'],
    hasBottomsUpTaps: true,
    dietaryOptions: {
      vegan: false,
      halal: true,
      kosher: false,
      glutenFree: true,
      kidFriendly: true
    },
    signatureItem: 'Sustainably sourced North Sea haddock in crispy batter with chunky chips',
    queueStatus: 'low',
    description: 'Named in honour of Spurs legend Gary Lineker. Authentic chippy style served in branded newspaper cones with mushy peas.'
  },
  {
    id: 'n17-grill-and-burgers',
    name: 'N17 Grill & Sourdough Smash Burgers',
    stand: 'West Stand',
    level: 2,
    category: 'food',
    nearBlocks: 'Blocks 101 - 104',
    beersServed: ['Beavertown Neck Oil', 'Guinness', 'Bones Lager'],
    hasBottomsUpTaps: true,
    dietaryOptions: {
      vegan: true,
      halal: true,
      kosher: false,
      glutenFree: true,
      kidFriendly: true
    },
    signatureItem: 'Double dry-aged smash patty on brioche with secret N17 burger sauce',
    queueStatus: 'low',
    description: 'High-speed burger kitchen. Offers halal beef patties, plant-based Beyond meat smashers, and gluten-free seeded buns.'
  },
  {
    id: 'market-place-pizza',
    name: 'South Stand Sourdough Pizza Co.',
    stand: 'South Stand',
    level: 1,
    category: 'food',
    nearBlocks: 'Blocks 253 - 256',
    beersServed: ['Moretti', 'Neck Oil'],
    hasBottomsUpTaps: true,
    dietaryOptions: {
      vegan: true,
      halal: false,
      kosher: false,
      glutenFree: true,
      kidFriendly: true
    },
    signatureItem: '48-hour fermented Margherita slice & Plant-based spicy vegan pepperoni',
    queueStatus: 'moderate',
    description: 'Neapolitan style sourdough pizza ovens churning out blistered crust slices in under 90 seconds.'
  },
  {
    id: 'kosher-and-deli',
    name: 'The Kosher Kitchen (Hermolis Certified)',
    stand: 'East Stand',
    level: 1,
    category: 'food',
    nearBlocks: 'Block 118',
    beersServed: ['Kosher Bottled Beers', 'Soft Drinks'],
    hasBottomsUpTaps: false,
    dietaryOptions: {
      vegan: true,
      halal: false,
      kosher: true,
      glutenFree: true,
      kidFriendly: true
    },
    signatureItem: 'Warm salt beef on rye with pickled cucumber & latkes',
    queueStatus: 'low',
    description: 'Dedicated hermetically sealed Kosher preparation point certified by the London Beth Din (KLBD).'
  },
  {
    id: 'shelf-bar-upper',
    name: 'The Shelf Bar (Level 5)',
    stand: 'East Stand',
    level: 5,
    category: 'beer',
    nearBlocks: 'Blocks 518 - 524',
    beersServed: ['Beavertown Neck Oil', 'Heineken', 'Guinness'],
    hasBottomsUpTaps: true,
    dietaryOptions: {
      vegan: true,
      halal: false,
      kosher: false,
      glutenFree: true,
      kidFriendly: false
    },
    signatureItem: 'Panoramic east London skyline pints with swift magnet taps',
    queueStatus: 'low',
    description: 'Tribute to White Hart Lane’s historic Shelf. Incredible terrace views over Northumberland Development Project.'
  },
  {
    id: 'chicken-house-north',
    name: 'The Chicken Shack (North Stand)',
    stand: 'North Stand',
    level: 2,
    category: 'food',
    nearBlocks: 'Blocks 119 - 124',
    beersServed: ['Beavertown Neck Oil', 'Bones Lager'],
    hasBottomsUpTaps: true,
    dietaryOptions: {
      vegan: true,
      halal: true,
      kosher: false,
      glutenFree: false,
      kidFriendly: true
    },
    signatureItem: 'Buttermilk chicken tenders & Korean gochujang wings (Halal)',
    queueStatus: 'low',
    description: 'Crispy fried tenders, kid-sized mini boxes with chips, and spicy cauliflower wings for plant-based fans.'
  }
];

export const TURNSTILE_ADVICE: TurnstileBlockAdvice[] = [
  {
    id: 'tb-south-west',
    blocks: 'Blocks 1 – 7',
    stand: 'South-West Atrium',
    gateLetter: 'Gates 1 - 4',
    recommendedTime: '60 mins before KO',
    queueStatus: 'green',
    waitMinutes: 2,
    tip: 'Fastest route into South Stand; direct escalators to Level 1 Market Place.'
  },
  {
    id: 'tb-south-main',
    blocks: 'Blocks 8 – 16',
    stand: 'South Stand Main Entry',
    gateLetter: 'Gates 5 - 11',
    recommendedTime: '75 mins before KO',
    queueStatus: 'amber',
    waitMinutes: 7,
    tip: 'Heavily favoured by fans heading straight to Goal Line Bar. Use Gates 1-4 to avoid bottlenecks.'
  },
  {
    id: 'tb-south-east',
    blocks: 'Blocks 17 – 25',
    stand: 'South-East Corner',
    gateLetter: 'Gates 12 - 16',
    recommendedTime: '45 mins before KO',
    queueStatus: 'green',
    waitMinutes: 3,
    tip: 'Closest to Northumberland Park station pedestrian flow; very wide concourse ramp.'
  },
  {
    id: 'tb-east-stand',
    blocks: 'Blocks 26 – 40',
    stand: 'East Stand',
    gateLetter: 'Gates 17 - 23',
    recommendedTime: '50 mins before KO',
    queueStatus: 'green',
    waitMinutes: 3,
    tip: 'Separate turnstiles for family section (Blocks 109-110) with special children entry scanners.'
  },
  {
    id: 'tb-north-stand',
    blocks: 'Blocks 41 – 47',
    stand: 'North Stand',
    gateLetter: 'Gates 24 - 29',
    recommendedTime: '45 mins before KO',
    queueStatus: 'green',
    waitMinutes: 2,
    tip: 'Direct access to Park Lane & North Stand upper tiers. Almost zero queues before 2:15 PM.'
  },
  {
    id: 'tb-west-stand',
    blocks: 'Blocks 48 – 64',
    stand: 'West Stand & High Road',
    gateLetter: 'Gates 30 - 38',
    recommendedTime: '60 mins before KO',
    queueStatus: 'amber',
    waitMinutes: 5,
    tip: 'Faces High Road; search lines can build between 45 and 20 mins before KO.'
  }
];

export const BAG_DROP_DEPOTS: BagDropDepot[] = [
  {
    id: 'bag-high-road',
    name: 'High Road Dedicated Bag Drop',
    location: 'Opposite Tottenham Police Station, High Road N17',
    walkMinutes: 4,
    price: '£10 per bag',
    hours: 'Opens 3h before KO, closes 1h after final whistle',
    acceptedItems: 'Large rucksacks, suitcases, laptop bags, shopping luggage',
    notes: 'Strict A4 size bag limit enforced inside stadium turnstiles. Clear transparent bags permitted.'
  },
  {
    id: 'bag-northumberland-park',
    name: 'Northumberland Park Station Depot',
    location: 'Station Forecourt (West car park)',
    walkMinutes: 7,
    price: '£10 per bag',
    hours: 'Opens 2.5h before KO, closes 75 mins after final whistle',
    acceptedItems: 'Travel luggage, oversized umbrellas, sports holdalls',
    notes: 'Ideal for fans arriving via Greater Anglia / Stansted Express trains directly from Liverpool Street.'
  }
];

export interface StadiumLandmark {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  stand: string;
  highlightStat: string;
  description: string;
  features: string[];
  timingAdvice: string;
  badge: string;
  photoUrl: string;
}

export const STADIUM_LANDMARKS: StadiumLandmark[] = [
  {
    id: 'landmark-goal-line-bar',
    name: 'The Goal Line Bar',
    subtitle: "Europe's Longest Continuous Bar (65 Metres)",
    location: 'Level 1, Directly behind the South Stand Goal',
    stand: 'South Stand (White Wall)',
    highlightStat: '65m Length • 60+ Taps • 3s Bottoms-Up Dispense',
    description: "Stretching an incredible 65 metres across the entire breadth of the 17,500-capacity South Stand, this is the longest continuous bar in any European stadium. Engineered with state-of-the-art bottom-up magnetic dispensing valves to pour a fresh pint in under three seconds.",
    features: [
      '60 fast-dispense bottom-up draught taps',
      'Direct concourse view into the South Stand bowl',
      'Full draught lineup: Neck Oil, Bones Lager, Amstel, Heineken & Guinness',
      'Post-match live acoustics & supporter singing hub'
    ],
    timingAdvice: 'Arrive 75–60 mins prior to kickoff to enjoy the 20% Early Bird concourse discount and avoid peak rush.',
    badge: 'European Record Landmark',
    photoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'landmark-beavertown-microbrewery',
    name: 'Beavertown In-House Microbrewery',
    subtitle: "The World's First Stadium Microbrewery",
    location: 'South-East Corner, Level 1 (near Blocks 252–254)',
    stand: 'South Stand / East Corner',
    highlightStat: '1,000,000+ Pints/Year • Fresh On-Site Brewing',
    description: "Tottenham Hotspur Stadium partnered with legendary London craft brewer Beavertown to construct the world’s first microbrewery inside a sports venue. Visitors can see the gleaming stainless steel fermentation and conditioning tanks behind floor-to-ceiling glass.",
    features: [
      'Brews stadium-exclusive "One of Our Own" Stout and special matchday IPAs',
      'Draught tanks piped straight to surrounding taps for ultra-fresh craft taste',
      'Distinctive cosmic Beavertown artwork and visual concourse decor',
      'Specialist craft beer flights available on non-matchday stadium tours'
    ],
    timingAdvice: 'Lines peak 30 minutes before kickoff. Head down immediately when turnstiles open for conversational tastings with the team.',
    badge: 'World First Innovation',
    photoUrl: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'landmark-skywalk-cockerel',
    name: 'The Dare Skywalk & Golden Cockerel',
    subtitle: '46.8m High Glass Apex & 1961 Scale Cockerel',
    location: 'South Stand Roof Exterior & Glass Walkway',
    stand: 'South Stand Roof Apex',
    highlightStat: '46.8m Elevation • 360° London Skyline • 1961 Replica Dent',
    description: "An exhilarating roof walkway experience that takes supporters to the apex of the stadium roof, stepping out onto a transparent glass viewing deck directly over the center spot. Crowned by a scaled replica of the club's iconic 1961 double-winning golden cockerel — including the original indentation left by Paul Gascoigne!",
    features: [
      'Climb 100+ steps along the roof catwalk wearing custom climb harness',
      'Glass-bottom viewing deck suspended 46.8 metres above the pristine turf',
      'Touch the Golden Cockerel overlooking the 17,500-seat South Stand',
      'Optional "The Drop" controlled descent from the stadium exterior'
    ],
    timingAdvice: 'Non-matchdays and pre-match morning slots available via club booking; illuminated in Lilywhite under floodlights.',
    badge: 'Iconic Stadium Summit',
    photoUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1200&q=80'
  }
];

export interface AccessibilityGuideItem {
  id: string;
  title: string;
  category: 'sensory' | 'turnstile' | 'audio' | 'facilities';
  stand: string;
  location: string;
  badgeText: string;
  description: string;
  amenities: string[];
  accessProcedure: string;
}

export const ACCESSIBILITY_SENSORY_GUIDE: AccessibilityGuideItem[] = [
  {
    id: 'acc-sensory-suite',
    title: 'North Stand Sensory Suite',
    category: 'sensory',
    stand: 'North Stand',
    location: 'Level 4, Block 416 (North Stand)',
    badgeText: 'Shippey Campaign Certified',
    description: 'A dedicated, sound-dampened matchday suite designed specifically for neurodivergent supporters, children with autism, and fans susceptible to sensory overload. Features a clear double-glazed pitch view with variable acoustic controls.',
    amenities: [
      'Acoustic soundproof glass allowing visual match enjoyment in calm quietude',
      'Tactile sensory toys, bubble tubes, and gentle color-shifting fiber optic lighting',
      'Weighted lap blankets and sound-cancelling ear defenders available',
      'Trained disability liaison stewards stationed throughout the match'
    ],
    accessProcedure: 'Bookable through the THFC Disability Access Team (access@tottenhamhotspur.com) prior to matchday.'
  },
  {
    id: 'acc-quiet-rooms',
    title: 'Quiet Rooms & Multi-Faith Prayer Spaces',
    category: 'facilities',
    stand: 'South & North Stands',
    location: 'Level 1 South Stand (near Block 250) & Level 2 North Stand (Block 114)',
    badgeText: 'Drop-In Sanctuary',
    description: 'Tranquil sanctuary rooms designed for supporters needing a peaceful, low-stimulation respite or prayer space during the matchday hustle.',
    amenities: [
      'Dimmer-controlled warm ambient lighting and cushioned seating',
      'Wudu ablution facilities available adjacent to multi-faith spaces',
      'Zero-alcohol, low-noise zone open before, during, and after games'
    ],
    accessProcedure: 'Open to all match ticket holders; speak with any Information Point steward for immediate escort.'
  },
  {
    id: 'acc-turnstiles-4-11',
    title: 'Accessible Turnstiles: Entrances 4 & 11',
    category: 'turnstile',
    stand: 'West Stand & Worcester Avenue',
    location: 'Entrance 4 (High Road West) & Entrance 11 (Worcester Ave East)',
    badgeText: 'Step-Free Dedicated Entry',
    description: 'Wide-aisle, automated level-access gates providing seamless barrier-free entry for wheelchair users, mobility scooter operators, and fans with walking aids.',
    amenities: [
      'Extra-wide automated gates with motorized radar-key assisted scanning',
      'Zero steps, level thresholds with direct access to stadium passenger lifts',
      'Mobility scooter charging and secure storage bay on site',
      'Priority dedicated bag-search tables with respectful, trained accessibility staff'
    ],
    accessProcedure: 'Print or download your digital ticket. Both Entrances 4 and 11 open 2 hours prior to kickoff.'
  },
  {
    id: 'acc-audio-commentary',
    title: 'Audio-Descriptive Match Commentary',
    category: 'audio',
    stand: 'All Stands / Information Hubs',
    location: 'Collection at Information Point 1 (South Stand Level 1) & Level 2 Atrium',
    badgeText: 'Complimentary Radio Service',
    description: 'Specially trained audio descriptive commentators deliver real-time, highly detailed 90-minute radio commentary so visually impaired fans never miss a touch or referee gesture.',
    amenities: [
      'Lightweight high-frequency radio receiver headsets tuned to stadium broadcast',
      'Zero latency direct transmission with ear-cup or lanyard options',
      'Compatible with personal 3.5mm headphones or hearing aid induction loops'
    ],
    accessProcedure: 'Complimentary service for home and away supporters. Request upon arrival at Information Point 1.'
  },
  {
    id: 'acc-changing-places',
    title: 'Changing Places Accessible Restrooms',
    category: 'facilities',
    stand: 'West Stand & East Stand',
    location: 'Level 1 West Stand (Block 101) & Level 3 East Stand Atrium',
    badgeText: 'Full Hoist & Adult Table',
    description: 'Spacious, high-specification Changing Places facilities that go far beyond standard accessible toilets to support fans with complex physical disabilities.',
    amenities: [
      'Ceiling track overhead hoist system (up to 200kg capacity)',
      'Height-adjustable adult changing bench and privacy curtain screen',
      'Centralized peninsular toilet with grab rails on both sides',
      'Accessible emergency pull-cord linked directly to the Stadium Control Room'
    ],
    accessProcedure: 'Accessible via universal RADAR key or on request from any nearby accessibility steward.'
  }
];

