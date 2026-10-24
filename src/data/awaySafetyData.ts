import { AwayPubSafetyGuide, CoachDepartureInfo, LoyaltyPointsCutoffTier } from '../types';

export const AWAY_PUB_SAFETY_DIRECTORY: AwayPubSafetyGuide[] = [
  // Old Trafford (Manchester United)
  {
    id: 'ot-away-1',
    stadiumId: 'old-trafford',
    pubName: 'Hotel Football (The Basement / Cafe Football)',
    safetyClass: 'away-friendly',
    colorsPermitted: true,
    ticketCheckRequired: true,
    distanceToTurnstiles: '0.1 miles',
    walkTime: '3 min walk',
    address: '99 Sir Matt Busby Way, Stretford, Manchester M16 0SZ',
    policePresence: 'High',
    advisoryNote: 'Directly opposite away turnstiles. Extremely popular with Spurs away fans; £1 entrance fee goes to local charity. Away shirts fully welcome.'
  },
  {
    id: 'ot-away-2',
    stadiumId: 'old-trafford',
    pubName: 'The Matchstick Man & The Lime Bar (Salford Quays)',
    safetyClass: 'away-friendly',
    colorsPermitted: true,
    ticketCheckRequired: false,
    distanceToTurnstiles: '0.8 miles',
    walkTime: '15 min walk',
    address: 'Salford Quays, MediaCityUK, Manchester M50 3HP',
    policePresence: 'Medium',
    advisoryNote: 'Scenic walk across the footbridge to the ground. Welcomes visiting supporters with good food and spacious terrace.'
  },
  {
    id: 'ot-away-3',
    stadiumId: 'old-trafford',
    pubName: 'The Bishop Blaize',
    safetyClass: 'home-only',
    colorsPermitted: false,
    ticketCheckRequired: true,
    distanceToTurnstiles: '0.2 miles',
    walkTime: '4 min walk',
    address: '708 Chester Rd, Stretford, Manchester M32 0SF',
    policePresence: 'High',
    advisoryNote: 'STRICTLY HOME FANS ONLY. Historic United terrace pub; door security will check United season tickets. Do NOT wear Spurs colours or attempt entry.'
  },

  // Stamford Bridge (Chelsea)
  {
    id: 'sb-away-1',
    stadiumId: 'stamford-bridge',
    pubName: 'The Courtfield (Earl’s Court)',
    safetyClass: 'away-friendly',
    colorsPermitted: true,
    ticketCheckRequired: false,
    distanceToTurnstiles: '1.2 miles',
    walkTime: '20 min walk (or 2 stops on District line)',
    address: '187 Earls Court Rd, London SW5 9AN',
    policePresence: 'Medium',
    advisoryNote: 'Traditional gathering hub for Spurs away support at Chelsea. Right outside Earls Court station. Colours welcome, vocal atmosphere.'
  },
  {
    id: 'sb-away-2',
    stadiumId: 'stamford-bridge',
    pubName: 'The Goose (Fulham Broadway)',
    safetyClass: 'neutral-strict',
    colorsPermitted: false,
    ticketCheckRequired: false,
    distanceToTurnstiles: '0.3 miles',
    walkTime: '6 min walk',
    address: '248 North End Rd, London SW6 1NJ',
    policePresence: 'High',
    advisoryNote: 'Large mixed pub. Bouncers enforce strict "NO COLOURS" rule on derby days. Keep coats zipped up.'
  },
  {
    id: 'sb-away-3',
    stadiumId: 'stamford-bridge',
    pubName: 'The Butcher’s Hook & The Chelsea Pensioner',
    safetyClass: 'home-only',
    colorsPermitted: false,
    ticketCheckRequired: true,
    distanceToTurnstiles: '0.1 miles',
    walkTime: '2 min walk',
    address: '477 Fulham Rd, London SW6 1HL',
    policePresence: 'High',
    advisoryNote: 'STRICTLY HOME FANS ONLY. Right opposite the Shed End. Strict home ticket checks and aggressive refusal for away fans.'
  },

  // Emirates Stadium (Arsenal)
  {
    id: 'ars-away-1',
    stadiumId: 'emirates-stadium',
    pubName: 'The Coronet (Wetherspoon, Holloway Road)',
    safetyClass: 'neutral-strict',
    colorsPermitted: false,
    ticketCheckRequired: false,
    distanceToTurnstiles: '0.4 miles',
    walkTime: '8 min walk',
    address: '338 Holloway Rd, London N7 6NJ',
    policePresence: 'High',
    advisoryNote: 'Large capacity. On derby day, police permit sensible away fans inside ONLY if colours are covered. Expect bag checks.'
  },
  {
    id: 'ars-away-2',
    stadiumId: 'emirates-stadium',
    pubName: 'Twelve Pins / Blackstock Pub (Finsbury Park)',
    safetyClass: 'home-only',
    colorsPermitted: false,
    ticketCheckRequired: true,
    distanceToTurnstiles: '0.8 miles',
    walkTime: '15 min walk',
    address: 'Finsbury Park / Blackstock Road, London N4',
    policePresence: 'High',
    advisoryNote: 'STRICTLY ARSENAL TERRITORY. Police cordons active; do NOT congregate here in Spurs colours.'
  },
  {
    id: 'ars-away-3',
    stadiumId: 'emirates-stadium',
    pubName: 'Highbury & Islington Central Pubs (The Famous Cock)',
    safetyClass: 'neutral-strict',
    colorsPermitted: false,
    ticketCheckRequired: true,
    distanceToTurnstiles: '0.7 miles',
    walkTime: '12 min walk',
    address: 'Highbury Corner, London N5 1RA',
    policePresence: 'High',
    advisoryNote: 'Heavy police escort for away trains arriving from Seven Sisters. Follow the official away fan walking corridor.'
  },

  // Anfield (Liverpool)
  {
    id: 'anfield-away-1',
    stadiumId: 'anfield',
    pubName: 'The Arkles',
    safetyClass: 'away-friendly',
    colorsPermitted: true,
    ticketCheckRequired: true,
    distanceToTurnstiles: '0.2 miles',
    walkTime: '4 min walk',
    address: '77 Anfield Rd, Liverpool L4 0TJ',
    policePresence: 'High',
    advisoryNote: 'Historically the designated away supporters pub right by Stanley Park. Spurs colours permitted, great away singing.'
  },
  {
    id: 'anfield-away-2',
    stadiumId: 'anfield',
    pubName: 'The Sandon & The Albert',
    safetyClass: 'home-only',
    colorsPermitted: false,
    ticketCheckRequired: true,
    distanceToTurnstiles: '0.1 miles',
    walkTime: '2 min walk',
    address: 'Walton Breck Rd, Liverpool L4 0RQ',
    policePresence: 'High',
    advisoryNote: 'Birthplace of Liverpool FC; strictly home Kopites only. Avoid wearing visiting shirts along Walton Breck Road.'
  }
];

export const OFFICIAL_COACH_SERVICES: CoachDepartureInfo[] = [
  {
    matchId: 'tot-mun-away',
    opponent: 'Manchester United (Old Trafford)',
    departurePoint: 'Tottenham Hotspur Stadium - Lilywhite House / Sainsbury’s Car Park',
    departureTime: '08:30 AM (KO 16:30)',
    boardingLocation: 'Opposite Percy House, High Road Tottenham',
    serviceStationStop: 'Keele Services M6 (Northbound) - 35 min stop',
    estimatedReturn: '23:30 PM back at Lilywhite House',
    coachNumber: 'THFC Away Coach #4 & #5',
    pricePerSeat: '£38.00 Return',
    bookingStatus: 'Available'
  },
  {
    matchId: 'tot-che-away',
    opponent: 'Chelsea (Stamford Bridge)',
    departurePoint: 'London Rail / Dedicated Tube Escort',
    departureTime: '13:00 PM (Seven Sisters Victoria Line convoy)',
    boardingLocation: 'Seven Sisters Underground Station Southbound Platform',
    serviceStationStop: 'Direct line to Victoria / Earls Court',
    estimatedReturn: '19:45 PM back in Tottenham',
    pricePerSeat: 'TfL Oyster / Contactless (£3.40)',
    bookingStatus: 'Available'
  },
  {
    matchId: 'tot-bou-away',
    opponent: 'AFC Bournemouth (Vitality Stadium)',
    departurePoint: 'Lilywhite House Car Park',
    departureTime: '09:00 AM',
    boardingLocation: 'Lilywhite House Bay C',
    serviceStationStop: 'Rownhams Services M27 - 30 min stop',
    estimatedReturn: '21:00 PM',
    pricePerSeat: '£34.00 Return',
    bookingStatus: 'Few Left'
  }
];

export const LOYALTY_POINTS_CUTOFFS: LoyaltyPointsCutoffTier[] = [
  {
    fixtureId: 'away-ars',
    opponent: 'Arsenal (Emirates Stadium)',
    competition: 'Premier League',
    venueName: 'Emirates Stadium',
    tier: 'Tier A+',
    allocationSize: 3003,
    typicalCutoffPoints: 462,
    lastSeasonCutoff: 458,
    seasonTicketWindow: 'Window opens 4 weeks before match',
    oneHotspurPlusWindow: 'Very rare - typically sells out to Season Ticket holders with 420+ pts',
    guidance: 'Highest loyalty point requirement of the season. Season ticket holders with 450+ points guaranteed; ballot for lower brackets.'
  },
  {
    fixtureId: 'away-che',
    opponent: 'Chelsea (Stamford Bridge)',
    competition: 'Premier League',
    venueName: 'Stamford Bridge',
    tier: 'Tier A+',
    allocationSize: 3050,
    typicalCutoffPoints: 395,
    lastSeasonCutoff: 388,
    seasonTicketWindow: 'Opens 4 weeks before match',
    oneHotspurPlusWindow: 'Rarely reaches One Hotspur+ members',
    guidance: 'Extremely high demand London derby. Need minimum 380 points to stand a realistic chance.'
  },
  {
    fixtureId: 'away-mun',
    opponent: 'Manchester United (Old Trafford)',
    competition: 'Premier League',
    venueName: 'Old Trafford',
    tier: 'Tier A',
    allocationSize: 3120,
    typicalCutoffPoints: 285,
    lastSeasonCutoff: 274,
    seasonTicketWindow: 'Opens 5 weeks before match',
    oneHotspurPlusWindow: 'Can drop to One Hotspur+ members with 180+ points for Sunday evening kickoffs',
    guidance: 'Good chance for dedicated away supporters. Sunday 16:30 TV kickoff depresses London rail demand slightly, lowering cutoff.'
  },
  {
    fixtureId: 'away-liv',
    opponent: 'Liverpool (Anfield)',
    competition: 'Premier League',
    venueName: 'Anfield',
    tier: 'Tier A',
    allocationSize: 2950,
    typicalCutoffPoints: 340,
    lastSeasonCutoff: 332,
    seasonTicketWindow: 'Opens 5 weeks before match',
    oneHotspurPlusWindow: 'Rarely drops to members',
    guidance: 'Anfield away end in the Anfield Road Lower/Upper stands. Requires strong loyalty total.'
  },
  {
    fixtureId: 'away-bou',
    opponent: 'AFC Bournemouth (Vitality Stadium)',
    competition: 'Premier League',
    venueName: 'Vitality Stadium',
    tier: 'Tier A+',
    allocationSize: 1320,
    typicalCutoffPoints: 410,
    lastSeasonCutoff: 405,
    seasonTicketWindow: 'Opens 4 weeks before match',
    oneHotspurPlusWindow: 'Will not reach members',
    guidance: 'Smallest away allocation in the Premier League (just 1,320 tickets). Extremely difficult to acquire.'
  },
  {
    fixtureId: 'away-eve',
    opponent: 'Everton (Goodison Park / Bramley-Moore)',
    competition: 'Premier League',
    venueName: 'Goodison Park',
    tier: 'Tier B',
    allocationSize: 2980,
    typicalCutoffPoints: 175,
    lastSeasonCutoff: 168,
    seasonTicketWindow: 'Opens 4 weeks before match',
    oneHotspurPlusWindow: 'Usually available to One Hotspur+ members with 120+ points',
    guidance: 'Excellent starter away day for supporters building loyalty points.'
  },
  {
    fixtureId: 'away-facup',
    opponent: 'FA Cup 3rd / 4th Round (Away)',
    competition: 'FA Cup',
    venueName: 'Varies',
    tier: 'Tier C',
    allocationSize: 5800,
    typicalCutoffPoints: 95,
    lastSeasonCutoff: 80,
    seasonTicketWindow: 'Opens 3 weeks before match',
    oneHotspurPlusWindow: 'Open ballot to all One Hotspur members',
    guidance: 'FA Cup rules mandate 15% ground capacity (up to 6,000 tickets). Best opportunity for new away-day travelers!'
  }
];

export interface RailDisruptionNotice {
  id: string;
  terminal: 'London Euston' | 'London Kings Cross' | 'London St Pancras';
  operator: string;
  affectedCorridor: string;
  primaryDestinations: string[];
  status: 'Critical Work' | 'Moderate Delays' | 'Normal Service';
  weekendDates: string;
  natureOfWork: string;
  impactSummary: string;
  proTravelAdvice: string;
  alternativeRoute: string;
}

export const RAIL_DISRUPTIONS_DATA: RailDisruptionNotice[] = [
  {
    id: 'rail-euston-wcml',
    terminal: 'London Euston',
    operator: 'Avanti West Coast & London Northwestern Railway',
    affectedCorridor: 'West Coast Main Line (WCML)',
    primaryDestinations: ['Manchester (Old Trafford & Etihad)', 'Liverpool (Anfield & Goodison)', 'Birmingham (Villa Park & Molineux)'],
    status: 'Critical Work',
    weekendDates: 'Upcoming Weekends (Sat/Sun)',
    natureOfWork: 'HS2 terminal track realignment at Euston & bridge renewal near Milton Keynes Central.',
    impactSummary: 'Reduced hourly timetable. Selected services terminate at Milton Keynes or Northampton with rail-replacement bus coaches.',
    proTravelAdvice: 'For Villa Park (Birmingham), take Chiltern Railways from London Marylebone to Birmingham Moor Street / Snow Hill. Never rely on Sunday late-night Euston return trains.',
    alternativeRoute: 'Marylebone -> Birmingham Moor Street (Chiltern) or St Pancras -> Sheffield/Manchester (EMR)'
  },
  {
    id: 'rail-kings-cross-ecml',
    terminal: 'London Kings Cross',
    operator: 'LNER, Great Northern & Grand Central',
    affectedCorridor: 'East Coast Main Line (ECML)',
    primaryDestinations: ['Newcastle (St James\' Park)', 'Leeds (Elland Road)', 'Edinburgh / Scotland'],
    status: 'Moderate Delays',
    weekendDates: 'Selected Autumn Weekends',
    natureOfWork: 'Digital signalling (ETCS) installation between Welwyn Garden City and Hitchin.',
    impactSummary: 'Weekend diversions via Hertford North; journey times extended by 35–45 minutes on LNER services to Newcastle.',
    proTravelAdvice: 'Book reserved seats early. LNER will not carry standing passengers on delayed matchday specials. Check Thameslink connections.',
    alternativeRoute: 'St Pancras -> Sheffield (EMR) with CrossCountry connection to the North East'
  },
  {
    id: 'rail-st-pancras-midland',
    terminal: 'London St Pancras',
    operator: 'East Midlands Railway (EMR) & Thameslink',
    affectedCorridor: 'Midland Main Line & Thameslink Core',
    primaryDestinations: ['Nottingham (City Ground)', 'Leicester (King Power)', 'Sheffield (Bramall Lane)', 'Luton / Brighton'],
    status: 'Normal Service',
    weekendDates: 'Regular Matchday Timetable',
    natureOfWork: 'Electrification testing between Kettering and Wigston (overnight only).',
    impactSummary: 'Daytime services running on standard timetable. Minor 10-minute speed restrictions south of Bedford.',
    proTravelAdvice: 'Direct trains from St Pancras reach Leicester in 65 mins and Nottingham in 95 mins. Convenient direct Thameslink route to Luton Airport Parkway.',
    alternativeRoute: 'Direct EMR InterCity services depart hourly from Platforms 1-4'
  }
];

export interface AwayAllotmentGuide {
  id: string;
  stadiumName: string;
  club: string;
  city: string;
  standardPLAllocation: number;
  cupAllocation: number;
  safeStandingAvailable: boolean;
  safeStandingSection: string;
  standName: string;
  turnstileGate: string;
  nearestTransit: string;
  atmosphereRating: number; // out of 5
  keyAdvice: string;
}

export const PREMIER_LEAGUE_AWAY_ALLOTMENTS: AwayAllotmentGuide[] = [
  {
    id: 'allot-anfield',
    stadiumName: 'Anfield',
    club: 'Liverpool',
    city: 'Liverpool',
    standardPLAllocation: 3000,
    cupAllocation: 6000,
    safeStandingAvailable: true,
    safeStandingSection: 'Anfield Road Stand (Lower & Upper Tier rail seating blocks)',
    standName: 'New Anfield Road Stand',
    turnstileGate: 'Turnstiles Q, R & S',
    nearestTransit: 'Sandhills Station (Soccerbus) or Kirkdale (15 min walk)',
    atmosphereRating: 5,
    keyAdvice: 'Strict safe-standing rail seating installed in rear of Lower and front of Upper Anfield Road. Extremely steep view from the upper tier; concourse bar cuts off beer service 10 mins before half-time.'
  },
  {
    id: 'allot-villa-park',
    stadiumName: 'Villa Park',
    club: 'Aston Villa',
    city: 'Birmingham',
    standardPLAllocation: 3000,
    cupAllocation: 6000,
    safeStandingAvailable: true,
    safeStandingSection: 'Doug Ellis Stand Lower (Blocks Q & P with licensed standing rails)',
    standName: 'Doug Ellis Stand',
    turnstileGate: 'Turnstiles 71 - 77',
    nearestTransit: 'Witton Station (5 min walk to away turnstiles, separated queue)',
    atmosphereRating: 4.8,
    keyAdvice: 'Use Witton Station rather than Aston post-match for the dedicated away queue directly onto Birmingham New Street platforms. Licensed rail seating allows vocal standing throughout 90 mins.'
  },
  {
    id: 'allot-etihad',
    stadiumName: 'Etihad Stadium',
    club: 'Manchester City',
    city: 'Manchester',
    standardPLAllocation: 3000,
    cupAllocation: 5500,
    safeStandingAvailable: true,
    safeStandingSection: 'South Stand Level 1 (Blocks 113–115 full rail seating)',
    standName: 'South Stand (Levels 1, 2 & 3)',
    turnstileGate: 'Entrances L1, L2, L3',
    nearestTransit: 'Etihad Campus Metrolink tram (direct from Piccadilly)',
    atmosphereRating: 4.5,
    keyAdvice: 'Spurs fans usually occupy South Stand Level 1 and Level 2. Level 1 features dedicated rail seats and spacious concourses with cashless card-only payment.'
  },
  {
    id: 'allot-old-trafford',
    stadiumName: 'Old Trafford',
    club: 'Manchester United',
    city: 'Manchester',
    standardPLAllocation: 3000,
    cupAllocation: 9000,
    safeStandingAvailable: true,
    safeStandingSection: 'South-East Quadrant Lower (Rail seating installed in Blocks E230–E232)',
    standName: 'South-East Corner / East Stand',
    turnstileGate: 'Turnstiles E21–E27',
    nearestTransit: 'Old Trafford Metrolink or Wharfside (10 min walk)',
    atmosphereRating: 4.7,
    keyAdvice: 'Safe standing barrier rails installed across 1,500 seats in the South-East quadrant. High police presence on Sir Matt Busby Way post-match with controlled away escorts.'
  },
  {
    id: 'allot-st-james-park',
    stadiumName: 'St James\' Park',
    club: 'Newcastle United',
    city: 'Newcastle',
    standardPLAllocation: 3200,
    cupAllocation: 6000,
    safeStandingAvailable: false,
    safeStandingSection: 'Standard plastic bucket seats (No rail seating yet on Level 7)',
    standName: 'Sir John Hall / Leazes Stand Level 7',
    turnstileGate: 'Turnstiles 89 - 94',
    nearestTransit: 'St James Metro Station (directly underneath stadium)',
    atmosphereRating: 4.6,
    keyAdvice: 'The infamous "Gods" away section: 14 flights of stairs (over 140 steps) up to the roof rafters. Spectacular panoramic bird’s-eye view, but leg-burning climb; use the lift if mobility impaired.'
  },
  {
    id: 'allot-molineux',
    stadiumName: 'Molineux',
    club: 'Wolverhampton Wanderers',
    city: 'Wolverhampton',
    standardPLAllocation: 2960,
    cupAllocation: 4800,
    safeStandingAvailable: true,
    safeStandingSection: 'Stan Cullis / Steve Bull Stand lower corner with safe standing rails',
    standName: 'Steve Bull Stand Lower',
    turnstileGate: 'Gate 4 & 5',
    nearestTransit: 'Wolverhampton Rail Station (10 min walk through subway)',
    atmosphereRating: 4.2,
    keyAdvice: 'Compact away end with great acoustic roof reverberation. Rail seats fitted along the entire lower tier. 10 min straightforward walk from Wolverhampton station.'
  }
];

