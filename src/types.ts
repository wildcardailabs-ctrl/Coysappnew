export type TabType = 'home' | 'matchday' | 'away-days' | 'explore' | 'my-coys';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  crest: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface Venue {
  id: string;
  name: string;
  club: string;
  clubBadge?: string;
  city: string;
  country: string;
  postcode: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  capacity: number;
  openedYear: number;
  builtYear?: number;
  league?: string;
  distanceFromLondon?: string;
  awayPubsRecommended?: string;
  transportNotes?: string;
  image: string;
  pitchType: string;
  awaySection: string;
  awayEntrance: string;
  awayCapacity?: number;
  nearestStations: {
    name: string;
    distance: string;
    walkTime: string;
    lines: string[];
    type: 'train' | 'tube' | 'overground';
  }[];
  parkingInfo: string;
  bagPolicy: string;
  turnstileInfo: string;
  officialWebsite: string;
  ticketOfficePhone?: string;
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'card' | 'sub' | 'var';
  team: 'home' | 'away';
  player: string;
  assistOrSub?: string;
  detail?: string;
}

export interface MatchLineupPlayer {
  number: number;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  isCaptain?: boolean;
}

export interface MatchStats {
  possession: [number, number]; // [home, away]
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
}

export interface Fixture {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  competition: string;
  competitionCode: 'PL' | 'UCL' | 'UEL' | 'FAC' | 'EFL';
  competitionLogo?: string;
  gameweek?: number;
  round?: string;
  date: string; // ISO string or format "Sun 15 Sep 2024"
  kickoffTime: string; // "16:30"
  kickoffTimestamp: number;
  venue: Venue;
  isHome: boolean;
  status: 'UPCOMING' | 'LIVE' | 'HALFTIME' | 'FINISHED' | 'POSTPONED';
  liveMinute?: number;
  score?: {
    home: number;
    away: number;
  };
  events?: MatchEvent[];
  stats?: MatchStats;
  homeLineup?: MatchLineupPlayer[];
  awayLineup?: MatchLineupPlayer[];
  broadcast?: {
    uk?: string;
    us?: string;
  };
  ticketInfo?: {
    status: 'Sold Out' | 'Guest Sale' | 'Members Only' | 'General Sale';
    link: string;
    notes: string;
  };
  editorialNotes?: string;
  featuredPubsIds?: string[];
}

export interface PubVenue {
  id: string;
  name: string;
  category: 'Pub' | 'Bar' | 'Food' | 'Cafe' | 'Restaurant';
  stadiumId: string; // which stadium it is near (e.g. 'tottenham-hotspur-stadium' or away ground id)
  distance: string; // "0.4 miles"
  walkTime: string; // "8 min walk"
  rating: number; // 4.7
  reviewsCount: number;
  priceLevel?: '£' | '££' | '£££';
  address: string;
  postcode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  image: string;
  badges: string[]; // ["Spurs friendly", "Pre-match", "Food", "Craft beer", "Family friendly", "Great atmosphere", "Away fans"]
  spursFriendly: boolean;
  awayFansWelcome: boolean;
  atmosphereRating: number; // 1-5
  beersServed: string[];
  foodAvailable: boolean;
  foodStyle?: string;
  openingHours: string;
  phone?: string;
  website?: string;
  bookingUrl?: string;
  googleMapsUrl: string;
  editorialSummary: string;
  verifiedByCoys: boolean;
}

export interface TransitLineStatus {
  id: string;
  name: string;
  mode: 'tube' | 'overground' | 'train' | 'bus';
  status: 'Good service' | 'Minor delays' | 'Severe delays' | 'Part suspended';
  statusSeverity: number;
  reason?: string;
  lastUpdated: string;
}

export interface MatchdayTimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'coys' | 'official';
  location?: string;
  iconType: 'leave' | 'pub' | 'food' | 'walk' | 'enter' | 'kickoff' | 'postmatch';
}

export interface FanTip {
  id: string;
  authorName: string;
  authorAvatar?: string;
  venueId: string; // stadiumId or pubId
  venueName: string;
  category: 'travel' | 'pub' | 'food' | 'atmosphere' | 'stadium';
  content: string;
  createdAt: string;
  upvotes: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface UserReview {
  id: string;
  authorName: string;
  authorId?: string;
  venueId: string;
  venueName: string;
  rating: number;
  atmosphere: number;
  service: number;
  comment: string;
  date: string;
  status: 'APPROVED' | 'PENDING';
}

export interface ArticleGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'MATCHDAY GUIDES' | 'AWAY DAYS' | 'PUBS' | 'TRAVEL' | 'STADIUMS' | 'TIPS' | 'FEATURES';
  featuredImage: string;
  readTime: string;
  publishedAt: string;
  author: string;
  summary: string;
  content: string[];
  relatedStadiumId?: string;
}

export interface AffiliatePartner {
  id: string;
  name: string;
  category: 'Travel' | 'Hotels' | 'Parking' | 'Tickets' | 'Merchandise' | 'Food';
  logo: string;
  headline: string;
  ctaText: string;
  targetUrl: string;
  badge?: string;
  commissionRate?: string;
  active: boolean;
}

export interface AffiliateClickRecord {
  id: string;
  partnerId: string;
  partnerName: string;
  category: string;
  fixtureId?: string;
  destinationUrl: string;
  page: string;
  timestamp: string;
}

export interface UserGroundVisit {
  stadiumId: string;
  stadiumName: string;
  clubName: string;
  visited: boolean;
  dateVisited?: string;
  matchScore?: string;
  competition?: string;
  notes?: string;
}

export interface UserAttendedMatch {
  id: string;
  fixtureId: string;
  opponent: string;
  date: string;
  venue: string;
  isHome: boolean;
  result: string; // e.g. "W 3-1"
  competition?: string;
  block?: string;
  row?: string;
  seat?: string;
  companion?: string;
  rating?: number; // 1-10
  photoUrl?: string;
  notes?: string;
  manOfTheMatch?: string;
}

export interface SupporterBadge {
  id: string;
  title: string;
  description: string;
  category: 'derby' | 'circuit' | 'loyalty' | 'milestone';
  icon: string;
  requiredCount: number;
  currentCount: number;
  unlocked: boolean;
  unlockedAt?: string;
}

// 1. In-Stadium Concourse & Bar Guide Types
export interface ConcourseOutlet {
  id: string;
  name: string;
  stand: 'South Stand' | 'East Stand' | 'West Stand' | 'North Stand';
  level: 1 | 2 | 4 | 5;
  category: 'beer' | 'food' | 'merch';
  nearBlocks: string;
  beersServed?: string[];
  hasBottomsUpTaps: boolean;
  dietaryOptions: {
    vegan: boolean;
    halal: boolean;
    kosher: boolean;
    glutenFree: boolean;
    kidFriendly: boolean;
  };
  signatureItem: string;
  queueStatus: 'low' | 'moderate' | 'busy';
  description: string;
}

export interface TurnstileBlockAdvice {
  id: string;
  blocks: string;
  stand: string;
  gateLetter: string;
  recommendedTime: string;
  queueStatus: 'green' | 'amber' | 'red';
  waitMinutes: number;
  tip: string;
}

export interface BagDropDepot {
  id: string;
  name: string;
  location: string;
  walkMinutes: number;
  price: string;
  hours: string;
  acceptedItems: string;
  notes: string;
}

// 2. Away Day Companion Types
export type AwayPubSafetyClass = 'away-friendly' | 'neutral-strict' | 'home-only';

export interface AwayPubSafetyGuide {
  id: string;
  stadiumId: string;
  pubName: string;
  safetyClass: AwayPubSafetyClass;
  colorsPermitted: boolean;
  ticketCheckRequired: boolean;
  distanceToTurnstiles: string;
  walkTime: string;
  address: string;
  policePresence: 'High' | 'Medium' | 'Low';
  advisoryNote: string;
}

export interface CoachDepartureInfo {
  matchId: string;
  opponent: string;
  departurePoint: string;
  departureTime: string;
  boardingLocation: string;
  serviceStationStop: string;
  estimatedReturn: string;
  coachNumber?: string;
  pricePerSeat: string;
  bookingStatus: 'Available' | 'Few Left' | 'Sold Out';
}

export interface LoyaltyPointsCutoffTier {
  fixtureId: string;
  opponent: string;
  competition: string;
  venueName: string;
  tier: 'Tier A+' | 'Tier A' | 'Tier B' | 'Tier C';
  allocationSize: number;
  typicalCutoffPoints: number;
  lastSeasonCutoff: number;
  seasonTicketWindow: string;
  oneHotspurPlusWindow: string;
  guidance: string;
}

// 3. Chant Book & Fan Wall Types
export interface SpursChant {
  id: string;
  title: string;
  category: 'classic' | 'player' | 'away' | 'derby';
  playerTarget?: string;
  tuneOrOrigin: string;
  lyrics: string[];
  rhythmBpm: number;
  melodyNotes: number[]; // frequencies in Hz for synth melody
  lore: string;
  whenSung: string;
}

export interface FanWallPost {
  id: string;
  author: string;
  avatar?: string;
  badge?: string;
  text: string;
  timestamp: string;
  likes: number;
  isMotmVote?: boolean;
  motmPlayer?: string;
}

export interface MotmCandidate {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  votes: number;
  percentage: number;
}

// 4. Offline Matchday Mode Types
export interface OfflineEmergencyCard {
  service: string;
  phone: string;
  textService?: string;
  description: string;
  location?: string;
}

export interface CachedMatchdayTicket {
  opponent: string;
  competition: string;
  date: string;
  kickoff: string;
  block: string;
  row: string;
  seat: string;
  turnstile: string;
  entryGate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  favoriteSection: string;
  matchesAttendedCount: number;
  awayDaysCount: number;
  groundsVisitedCount: number;
  countriesVisitedCount: number;
  savedPubIds: string[];
  savedVenueIds: string[];
  savedFixtureIds: string[];
  savedGuideIds: string[];
  visitedGrounds: UserGroundVisit[];
  attendedMatches: UserAttendedMatch[];
  notificationsEnabled: {
    matchReminders: boolean;
    travelAlerts: boolean;
    fixtureChanges: boolean;
    awayDayGuides: boolean;
    postMatchHighlights: boolean;
  };
}

export interface WeatherData {
  tempCelsius: number;
  feelsLikeCelsius: number;
  condition: string;
  iconCode: string;
  rainProbability: number;
  windSpeedMph: number;
  humidity: number;
  stadiumName: string;
  isAvailable: boolean;
}
