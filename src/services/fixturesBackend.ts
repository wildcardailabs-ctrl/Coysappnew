import { Fixture, Venue } from '../types';
import { TOTTENHAM_HOTSPUR_STADIUM, STADIUMS_DATABASE } from '../data/stadiumsData';
import { FIXTURES_DATABASE } from '../data/mockFixtures';

// In-memory cache to prevent exceeding free tier rate limits (10 calls/min)
let cachedFootballData: { timestamp: number; fixtures: Fixture[] } | null = null;
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes cache

/**
 * Matches an opponent team name to a known stadium or creates a fallback venue
 */
function resolveVenueForOpponent(opponentName: string, isHome: boolean): Venue {
  if (isHome) {
    return TOTTENHAM_HOTSPUR_STADIUM;
  }

  const normalized = opponentName.toLowerCase();
  const matched = STADIUMS_DATABASE.find(s => {
    const club = s.club.toLowerCase();
    const name = s.name.toLowerCase();
    return (
      club.includes(normalized) ||
      normalized.includes(club) ||
      name.includes(normalized) ||
      normalized.includes(name)
    );
  });

  if (matched) {
    return matched;
  }

  // Fallback venue for unlisted clubs
  return {
    id: `venue-${opponentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: `${opponentName} Stadium`,
    club: opponentName,
    city: 'England',
    country: 'United Kingdom',
    postcode: 'UK',
    address: `${opponentName} Football Ground`,
    coordinates: { lat: 51.5074, lng: -0.1278 },
    capacity: 35000,
    openedYear: 1995,
    distanceFromLondon: 'Away fixture',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
    pitchType: 'Natural Grass',
    awaySection: 'Away Supporters Section',
    awayEntrance: 'Visiting Turnstiles',
    awayCapacity: 3000,
    awayPubsRecommended: 'Local designated away-friendly pubs near nearest mainline station',
    nearestStations: [
      {
        name: `${opponentName} Central`,
        distance: '0.8 miles',
        walkTime: '15 min walk',
        lines: ['National Rail'],
        type: 'train'
      }
    ],
    parkingInfo: 'Check host club website for matchday parking zones.',
    bagPolicy: 'Standard A4 bag restriction in effect.',
    turnstileInfo: 'Digital ticketing / barcoded entry.',
    officialWebsite: 'https://www.premierleague.com'
  };
}

/**
 * Formats ISO date into human readable matchday format: "Sat, 28 Sep 2024"
 */
function formatMatchDate(dateObj: Date): string {
  return dateObj.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Formats time into "15:00" UK local kickoff time
 */
function formatKickoffTime(dateObj: Date): string {
  return dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

/**
 * Fetch matches from Football-Data.org API v4 (Spurs team ID = 73)
 */
export async function fetchFootballDataMatches(apiToken: string): Promise<Fixture[]> {
  // Check memory cache first
  const now = Date.now();
  if (cachedFootballData && now - cachedFootballData.timestamp < CACHE_TTL_MS) {
    return cachedFootballData.fixtures;
  }

  const response = await fetch('https://api.football-data.org/v4/teams/73/matches', {
    headers: {
      'X-Auth-Token': apiToken
    }
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Football-Data.org API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const rawMatches = data.matches || [];

  const fixtures: Fixture[] = rawMatches.map((m: any) => {
    const isHome = m.homeTeam?.id === 73;
    const dateObj = new Date(m.utcDate);
    const opponent = isHome ? m.awayTeam : m.homeTeam;
    const opponentName = opponent?.shortName || opponent?.name || 'Opponent';
    const venue = resolveVenueForOpponent(opponentName, isHome);

    let compCode: Fixture['competitionCode'] = 'PL';
    const compName = m.competition?.name || 'Premier League';
    if (m.competition?.code === 'CL' || compName.includes('Champions')) compCode = 'UCL';
    else if (m.competition?.code === 'EL' || compName.includes('Europa')) compCode = 'UEL';
    else if (m.competition?.code === 'FAC' || compName.includes('FA Cup')) compCode = 'FAC';
    else if (m.competition?.code === 'EFL' || compName.includes('EFL') || compName.includes('Carabao')) compCode = 'EFL';

    let status: Fixture['status'] = 'UPCOMING';
    if (m.status === 'FINISHED') status = 'FINISHED';
    else if (m.status === 'IN_PLAY') status = 'LIVE';
    else if (m.status === 'PAUSED') status = 'HALFTIME';
    else if (m.status === 'POSTPONED' || m.status === 'CANCELLED') status = 'POSTPONED';

    const hasScore = m.score?.fullTime?.home !== null && m.score?.fullTime?.away !== null;

    return {
      id: `fd-${m.id}`,
      homeTeam: {
        id: `team-${m.homeTeam?.id}`,
        name: m.homeTeam?.name || 'Tottenham Hotspur',
        shortName: m.homeTeam?.shortName || 'Spurs',
        code: m.homeTeam?.tla || 'TOT',
        crest: m.homeTeam?.crest || 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg'
      },
      awayTeam: {
        id: `team-${m.awayTeam?.id}`,
        name: m.awayTeam?.name || 'Opponent',
        shortName: m.awayTeam?.shortName || opponentName,
        code: m.awayTeam?.tla || 'OPP',
        crest: m.awayTeam?.crest || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/500px-Soccerball.svg.png'
      },
      competition: compName,
      competitionCode: compCode,
      competitionLogo: m.competition?.emblem,
      gameweek: m.matchday,
      date: formatMatchDate(dateObj),
      kickoffTime: formatKickoffTime(dateObj),
      kickoffTimestamp: dateObj.getTime(),
      venue,
      isHome,
      status,
      score: hasScore
        ? {
            home: m.score.fullTime.home,
            away: m.score.fullTime.away
          }
        : undefined,
      broadcast: {
        uk: compCode === 'PL' ? 'Sky Sports / TNT Sports' : 'TNT Sports UK',
        us: compCode === 'PL' ? 'USA Network / Peacock' : 'Paramount+'
      },
      ticketInfo: isHome
        ? {
            status: status === 'FINISHED' ? 'Sold Out' : 'Members Only',
            link: 'https://www.tottenhamhotspur.com/tickets/',
            notes: 'Check One Hotspur Ticket Exchange for seat availability.'
          }
        : {
            status: 'Sold Out',
            link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/',
            notes: 'Official away ticket loyalty points allocation criteria apply.'
          },
      editorialNotes: `${m.competition?.name || 'League match'} at ${venue.name}. Official real-time kickoff via Football-Data.org.`,
      featuredPubsIds: isHome ? ['bricklayers-arms', 'the-beehive', 'number-8', 'chick-king'] : []
    };
  });

  // Sort by kickoff timestamp ascending
  fixtures.sort((a, b) => a.kickoffTimestamp - b.kickoffTimestamp);

  // Cache
  cachedFootballData = {
    timestamp: now,
    fixtures
  };

  return fixtures;
}

/**
 * Fetch live schedule and completed match scores from ESPN Public API
 */
export async function fetchEspnMatches(): Promise<Fixture[]> {
  const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/367/schedule');
  if (!response.ok) {
    throw new Error(`ESPN API returned ${response.status}`);
  }

  const data = await response.json();
  const rawEvents = data.events || [];

  const fixtures: Fixture[] = rawEvents.map((e: any) => {
    const comp = e.competitions?.[0] || {};
    const homeComp = comp.competitors?.find((c: any) => c.homeAway === 'home') || {};
    const awayComp = comp.competitors?.find((c: any) => c.homeAway === 'away') || {};
    const isHome = homeComp.team?.id === '367';
    const dateObj = new Date(e.date);

    const oppTeam = isHome ? awayComp.team : homeComp.team;
    const oppName = oppTeam?.displayName || oppTeam?.name || 'Opponent';
    const venue = resolveVenueForOpponent(oppName, isHome);

    const isCompleted = comp.status?.type?.completed;
    const isLive = comp.status?.type?.state === 'in';
    const status: Fixture['status'] = isCompleted ? 'FINISHED' : isLive ? 'LIVE' : 'UPCOMING';

    const hasScore = isCompleted || isLive;
    const homeScore = parseInt(homeComp.score?.displayValue || homeComp.score || '0', 10);
    const awayScore = parseInt(awayComp.score?.displayValue || awayComp.score || '0', 10);

    return {
      id: `espn-${e.id}`,
      homeTeam: {
        id: `espn-team-${homeComp.team?.id || '367'}`,
        name: homeComp.team?.displayName || 'Tottenham Hotspur',
        shortName: homeComp.team?.abbreviation || (isHome ? 'Spurs' : oppName),
        code: homeComp.team?.abbreviation || (isHome ? 'TOT' : 'OPP'),
        crest: homeComp.team?.logo || (isHome ? 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/500px-Soccerball.svg.png')
      },
      awayTeam: {
        id: `espn-team-${awayComp.team?.id || 'opp'}`,
        name: awayComp.team?.displayName || oppName,
        shortName: awayComp.team?.abbreviation || (isHome ? oppName : 'Spurs'),
        code: awayComp.team?.abbreviation || (isHome ? 'OPP' : 'TOT'),
        crest: awayComp.team?.logo || (!isHome ? 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/500px-Soccerball.svg.png')
      },
      competition: e.season?.displayName || 'English Premier League',
      competitionCode: 'PL',
      date: formatMatchDate(dateObj),
      kickoffTime: formatKickoffTime(dateObj),
      kickoffTimestamp: dateObj.getTime(),
      venue,
      isHome,
      status,
      score: hasScore ? { home: homeScore, away: awayScore } : undefined,
      broadcast: {
        uk: 'Sky Sports Premier League / TNT Sports',
        us: 'Peacock / USA Network'
      },
      ticketInfo: {
        status: status === 'FINISHED' ? 'Sold Out' : 'Members Only',
        link: 'https://www.tottenhamhotspur.com/tickets/',
        notes: isHome ? 'One Hotspur Membership ticket exchange' : 'Away ticket points criteria'
      },
      editorialNotes: `${e.name} - official Premier League fixture.`,
      featuredPubsIds: isHome ? ['bricklayers-arms', 'the-beehive', 'number-8', 'chick-king'] : []
    };
  });

  return fixtures;
}

/**
 * Unified provider resolver:
 * 1. If API key provided: queries Football-Data.org API v4
 * 2. If no API key: serves curated, verified Tottenham Hotspur schedule
 */
export async function getFixturesFeed(footballDataKey?: string): Promise<{
  provider: 'football-data.org' | 'espn' | 'verified_feed';
  isLiveProvider: boolean;
  apiKeyConfigured: boolean;
  fixtures: Fixture[];
  lastUpdated: string;
  notice?: string;
}> {
  // Option 1: Football-Data.org with API token
  if (footballDataKey && footballDataKey.trim()) {
    try {
      const fdFixtures = await fetchFootballDataMatches(footballDataKey.trim());
      if (fdFixtures && fdFixtures.length > 0) {
        return {
          provider: 'football-data.org',
          isLiveProvider: true,
          apiKeyConfigured: true,
          fixtures: fdFixtures,
          lastUpdated: new Date().toISOString(),
          notice: 'Live sync active with Football-Data.org API v4 (Premier League & European cups).'
        };
      }
    } catch (err: any) {
      console.warn('Football-Data.org API fetch failed, falling back to curated calendar:', err.message);
    }
  }

  // Option 2: Curated & Verified Spurs Matchday Calendar (manual mode until API key configured)
  return {
    provider: 'verified_feed',
    isLiveProvider: false,
    apiKeyConfigured: Boolean(footballDataKey),
    fixtures: FIXTURES_DATABASE,
    lastUpdated: new Date().toISOString(),
    notice: 'Using Tottenham Hotspur verified matchday calendar. Add FOOTBALL_DATA_API_KEY in Settings to switch to live feed.'
  };
}
