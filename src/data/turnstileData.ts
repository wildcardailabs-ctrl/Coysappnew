export interface BlockMapping {
  blockNumber: string;
  standName: 'South Stand' | 'East Stand' | 'West Stand' | 'North Stand';
  tier: 'Lower Tier' | 'Middle / Premium' | 'Upper Tier';
  turnstileGates: string;
  recommendedEntryTime: string;
  stepFreeGate: string;
  nearestBar: string;
  nearestFood: string;
  approachRoute: string;
  queueStatus: 'low' | 'moderate' | 'busy';
  estimatedWaitMins: number;
  tips: string;
}

export const STADIUM_BLOCK_DATABASE: BlockMapping[] = [
  // SOUTH STAND (The famous single tier, 17,500 fans)
  {
    blockNumber: '248',
    standName: 'South Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 1 – 4 (South-West Atrium)',
    recommendedEntryTime: '55 mins before KO',
    stepFreeGate: 'Entrance 3 (Level 1 Lift)',
    nearestBar: 'The Goal Line Bar (West end) & Beavertown Tap',
    nearestFood: 'The Market Place (Naan & Kebab, Chicken)',
    approachRoute: 'High Road South approach via Love Lane or Park Lane',
    queueStatus: 'low',
    estimatedWaitMins: 3,
    tips: 'Quickest route into South Stand; direct escalators straight into the Market Place.'
  },
  {
    blockNumber: '252',
    standName: 'South Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 5 – 11 (South Stand Central)',
    recommendedEntryTime: '70 mins before KO',
    stepFreeGate: 'Entrance 8 (Dedicated Accessible Gate)',
    nearestBar: 'Beavertown Corner Microbrewery & Goal Line Bar',
    nearestFood: 'N17 Grill (Artisan smash burgers)',
    approachRoute: 'South Podium / Park Lane Plaza',
    queueStatus: 'moderate',
    estimatedWaitMins: 6,
    tips: 'Most popular gate for pre-match pints. Head inside 1h early for pre-match concourse pricing.'
  },
  {
    blockNumber: '254',
    standName: 'South Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 5 – 11 (South Stand Central)',
    recommendedEntryTime: '65 mins before KO',
    stepFreeGate: 'Entrance 8 (Central Lift)',
    nearestBar: 'Goal Line Bar (Central taps, fast bottoms-up dispense)',
    nearestFood: 'The Market Place Fish & Chips & Sourdough Pizza',
    approachRoute: 'South Podium via Worcester Avenue or Park Lane',
    queueStatus: 'busy',
    estimatedWaitMins: 8,
    tips: 'Heart of the South Stand safe standing area. Rapid Bottoms-Up beer dispense right behind Block 254.'
  },
  {
    blockNumber: '256',
    standName: 'South Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 12 – 16 (South-East Corner)',
    recommendedEntryTime: '50 mins before KO',
    stepFreeGate: 'Entrance 13 (Level 1 Access)',
    nearestBar: 'Goal Line Bar (East Section) & Beavertown',
    nearestFood: 'Market Place Wok Station & Pies',
    approachRoute: 'Worcester Avenue via Northumberland Park approach',
    queueStatus: 'low',
    estimatedWaitMins: 4,
    tips: 'Fastest exit post-match to Northumberland Park rail station.'
  },
  {
    blockNumber: '451',
    standName: 'South Stand',
    tier: 'Upper Tier',
    turnstileGates: 'Entrances 1 – 4 (South-West Atrium)',
    recommendedEntryTime: '60 mins before KO',
    stepFreeGate: 'Entrance 3 (Lift to Level 4/5)',
    nearestBar: 'Shelf Side Bar (Upper Concourse)',
    nearestFood: 'Upper South Pie & Pasty Express',
    approachRoute: 'South-West Podium escalators to Level 4',
    queueStatus: 'low',
    estimatedWaitMins: 3,
    tips: 'Take the fast express escalators directly to Level 4 rather than stairs.'
  },
  {
    blockNumber: '453',
    standName: 'South Stand',
    tier: 'Upper Tier',
    turnstileGates: 'Entrances 12 – 16 (South-East Atrium)',
    recommendedEntryTime: '55 mins before KO',
    stepFreeGate: 'Entrance 13 (Lift to Level 4/5)',
    nearestBar: 'Upper Goal Line Express Taps',
    nearestFood: 'Shelf Side Artisan Pretzels & Pies',
    approachRoute: 'East Podium escalators',
    queueStatus: 'low',
    estimatedWaitMins: 4,
    tips: 'Spectacular bird’s eye view over the pitch. Quick toilets at rear of Block 453.'
  },

  // WEST STAND (High Road side, main reception)
  {
    blockNumber: '102',
    standName: 'West Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 30 – 34 (West Stand Lower)',
    recommendedEntryTime: '60 mins before KO',
    stepFreeGate: 'Entrance 32 (West Accessible Hub)',
    nearestBar: 'West Atrium Craft Bar',
    nearestFood: 'Lineker’s Traditional Fish & Chips',
    approachRoute: 'High Road direct gate entrance',
    queueStatus: 'moderate',
    estimatedWaitMins: 6,
    tips: 'Facing High Road; bag search lines peak 35 mins before kick-off. Arrive 50m early.'
  },
  {
    blockNumber: '106',
    standName: 'West Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 35 – 38 (West-North Corner)',
    recommendedEntryTime: '50 mins before KO',
    stepFreeGate: 'Entrance 37 (Accessible Lift)',
    nearestBar: 'Tottenham High Road Lounge & Draught Bar',
    nearestFood: 'West Stand Gourmet Burgers',
    approachRoute: 'High Road / Bill Nicholson Way',
    queueStatus: 'low',
    estimatedWaitMins: 4,
    tips: 'Very close to players’ tunnel and dugout seats.'
  },
  {
    blockNumber: '502',
    standName: 'West Stand',
    tier: 'Upper Tier',
    turnstileGates: 'Entrances 30 – 34 (West Stand Upper)',
    recommendedEntryTime: '65 mins before KO',
    stepFreeGate: 'Entrance 32 (Express Upper Lift)',
    nearestBar: 'Panorama Sky Bar (Level 5)',
    nearestFood: 'Level 5 Tapas & Classic Hot Dogs',
    approachRoute: 'West Atrium Express Escalator',
    queueStatus: 'low',
    estimatedWaitMins: 3,
    tips: 'Incredible acoustics; easy access to the stadium sky lounge.'
  },

  // EAST STAND (Worcester Avenue side)
  {
    blockNumber: '110',
    standName: 'East Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 17 – 20 (East Stand Family Section)',
    recommendedEntryTime: '55 mins before KO',
    stepFreeGate: 'Entrance 18 (Family & Step-Free Entry)',
    nearestBar: 'East Stand Family Taphouse',
    nearestFood: 'The Kitchen (Kid-friendly meal boxes, chicken tenders)',
    approachRoute: 'Worcester Avenue (East Podium)',
    queueStatus: 'low',
    estimatedWaitMins: 2,
    tips: 'Dedicated turnstiles with child-height scanning pillars and friendly family stewards.'
  },
  {
    blockNumber: '122',
    standName: 'East Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 21 – 23 (East Stand Central)',
    recommendedEntryTime: '50 mins before KO',
    stepFreeGate: 'Entrance 22 (East Lift Access)',
    nearestBar: 'Worcester Avenue Ale & Cider Dispensary',
    nearestFood: 'East Concourse Loaded Fries & Bratwurst',
    approachRoute: 'Worcester Avenue via Northumberland Park link',
    queueStatus: 'low',
    estimatedWaitMins: 3,
    tips: 'Direct exit onto Worcester Avenue; minimal crowd crush after the final whistle.'
  },
  {
    blockNumber: '522',
    standName: 'East Stand',
    tier: 'Upper Tier',
    turnstileGates: 'Entrances 17 – 23 (East Escalator Core)',
    recommendedEntryTime: '60 mins before KO',
    stepFreeGate: 'Entrance 18 (Express East Lift)',
    nearestBar: 'East Upper Horizon Bar',
    nearestFood: 'Level 5 Hot Pasties & Craft Cider',
    approachRoute: 'East Podium external escalators to Level 5',
    queueStatus: 'low',
    estimatedWaitMins: 4,
    tips: 'Views out over the city skyline before heading to your seats.'
  },

  // NORTH STAND (Park Lane / Paxton end)
  {
    blockNumber: '114',
    standName: 'North Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 24 – 27 (North Stand / Away Section when applicable)',
    recommendedEntryTime: '60 mins before KO',
    stepFreeGate: 'Entrance 25 (North-East Accessible)',
    nearestBar: 'North Concourse Draught Bar',
    nearestFood: 'Paxton Pies & Hot Dogs',
    approachRoute: 'Paxton Terrace or Northumberland Park path',
    queueStatus: 'moderate',
    estimatedWaitMins: 5,
    tips: 'Dedicated segregation barriers in place on matchdays with away supporter allocations.'
  },
  {
    blockNumber: '118',
    standName: 'North Stand',
    tier: 'Lower Tier',
    turnstileGates: 'Entrances 27 – 29 (North Stand West Corner)',
    recommendedEntryTime: '45 mins before KO',
    stepFreeGate: 'Entrance 28 (Paxton Lift)',
    nearestBar: 'Park Lane Local Cider Bar',
    nearestFood: 'Artisan Hot Sandwiches & Vegetarian Pasty',
    approachRoute: 'Paxton Road via Tottenham High Road north',
    queueStatus: 'low',
    estimatedWaitMins: 2,
    tips: 'Shortest queue lines around the stadium perimeter between 1:45 PM and 2:30 PM.'
  },
  {
    blockNumber: '516',
    standName: 'North Stand',
    tier: 'Upper Tier',
    turnstileGates: 'Entrances 24 – 29 (North Escalator Tower)',
    recommendedEntryTime: '55 mins before KO',
    stepFreeGate: 'Entrance 25 (North Upper Lift)',
    nearestBar: 'Paxton Upper Bar',
    nearestFood: 'Upper North Deli & Confectionery',
    approachRoute: 'Paxton Terrace stairs and escalators',
    queueStatus: 'low',
    estimatedWaitMins: 3,
    tips: 'Great panoramic pitch angle right behind the goal.'
  }
];

export function lookupBlock(blockInput: string): BlockMapping | null {
  const clean = blockInput.replace(/\D/g, '');
  if (!clean) return null;
  const match = STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === clean);
  if (match) return match;

  // Approximate fallback by range
  const num = parseInt(clean, 10);
  if (num >= 248 && num <= 260) return STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === '254')!;
  if (num >= 448 && num <= 460) return STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === '451')!;
  if (num >= 101 && num <= 108) return STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === '102')!;
  if (num >= 501 && num <= 508) return STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === '502')!;
  if (num >= 109 && num <= 113) return STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === '110')!;
  if (num >= 518 && num <= 530) return STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === '522')!;
  if (num >= 114 && num <= 124) return STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === '114')!;
  if (num >= 509 && num <= 517) return STADIUM_BLOCK_DATABASE.find(b => b.blockNumber === '516')!;

  return STADIUM_BLOCK_DATABASE[0];
}
