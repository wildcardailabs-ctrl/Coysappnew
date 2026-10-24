import { Fixture, Team, MatchLineupPlayer } from '../types';
import { TOTTENHAM_HOTSPUR_STADIUM, STADIUMS_DATABASE } from './stadiumsData';

// Helper to look up stadium safely
const getStadium = (id: string) => STADIUMS_DATABASE.find(s => s.id === id) || TOTTENHAM_HOTSPUR_STADIUM;

export const SPURS_TEAM: Team = {
  id: 'tottenham-hotspur',
  name: 'Tottenham Hotspur',
  shortName: 'Spurs',
  code: 'TOT',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/367.png',
  primaryColor: '#001C58',
  secondaryColor: '#FFFFFF'
};

export const MAN_UTD_TEAM: Team = {
  id: 'man-united',
  name: 'Manchester United',
  shortName: 'Man United',
  code: 'MAN',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/360.png',
  primaryColor: '#DA291C',
  secondaryColor: '#FBE122'
};

export const COVENTRY_TEAM: Team = {
  id: 'coventry-city',
  name: 'Coventry City',
  shortName: 'Coventry',
  code: 'COV',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/394.png',
  primaryColor: '#009FE3',
  secondaryColor: '#FFFFFF'
};

export const CHELSEA_TEAM: Team = {
  id: 'chelsea',
  name: 'Chelsea',
  shortName: 'Chelsea',
  code: 'CHE',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/363.png',
  primaryColor: '#034694',
  secondaryColor: '#FFFFFF'
};

export const CRYSTAL_PALACE_TEAM: Team = {
  id: 'crystal-palace',
  name: 'Crystal Palace',
  shortName: 'Crystal Palace',
  code: 'CRY',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/384.png',
  primaryColor: '#1B458F',
  secondaryColor: '#C4122E'
};

export const LEEDS_TEAM: Team = {
  id: 'leeds-united',
  name: 'Leeds United',
  shortName: 'Leeds',
  code: 'LEE',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/357.png',
  primaryColor: '#FFCD00',
  secondaryColor: '#1D428A'
};

export const IPSWICH_TEAM: Team = {
  id: 'ipswich-town',
  name: 'Ipswich Town',
  shortName: 'Ipswich',
  code: 'IPS',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/373.png',
  primaryColor: '#003399',
  secondaryColor: '#FFFFFF'
};

export const SUNDERLAND_TEAM: Team = {
  id: 'sunderland',
  name: 'Sunderland',
  shortName: 'Sunderland',
  code: 'SUN',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/366.png',
  primaryColor: '#EB172B',
  secondaryColor: '#FFFFFF'
};

export const FULHAM_TEAM: Team = {
  id: 'fulham',
  name: 'Fulham',
  shortName: 'Fulham',
  code: 'FUL',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/370.png',
  primaryColor: '#CC0000',
  secondaryColor: '#000000'
};

export const ARSENAL_TEAM: Team = {
  id: 'arsenal',
  name: 'Arsenal',
  shortName: 'Arsenal',
  code: 'ARS',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/359.png',
  primaryColor: '#EF0107',
  secondaryColor: '#FFFFFF'
};

export const HULL_TEAM: Team = {
  id: 'hull-city',
  name: 'Hull City',
  shortName: 'Hull',
  code: 'HUL',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/306.png',
  primaryColor: '#F5971D',
  secondaryColor: '#000000'
};

export const LIVERPOOL_TEAM: Team = {
  id: 'liverpool',
  name: 'Liverpool',
  shortName: 'Liverpool',
  code: 'LIV',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png',
  primaryColor: '#C8102E',
  secondaryColor: '#FFFFFF'
};

export const BOURNEMOUTH_TEAM: Team = {
  id: 'bournemouth',
  name: 'AFC Bournemouth',
  shortName: 'Bournemouth',
  code: 'BOU',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/349.png',
  primaryColor: '#DA291C',
  secondaryColor: '#000000'
};

export const BRIGHTON_TEAM: Team = {
  id: 'brighton',
  name: 'Brighton & Hove Albion',
  shortName: 'Brighton',
  code: 'BHA',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/331.png',
  primaryColor: '#0057B8',
  secondaryColor: '#FFCD00'
};

export const MAN_CITY_TEAM: Team = {
  id: 'man-city',
  name: 'Manchester City',
  shortName: 'Man City',
  code: 'MNC',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png',
  primaryColor: '#6CABDD',
  secondaryColor: '#1C2C5B'
};

export const NOTTINGHAM_FOREST_TEAM: Team = {
  id: 'nottingham-forest',
  name: 'Nottingham Forest',
  shortName: 'Nottm Forest',
  code: 'NFO',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/393.png',
  primaryColor: '#DD0000',
  secondaryColor: '#FFFFFF'
};

export const EVERTON_TEAM: Team = {
  id: 'everton',
  name: 'Everton',
  shortName: 'Everton',
  code: 'EVE',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/368.png',
  primaryColor: '#003399',
  secondaryColor: '#FFFFFF'
};

export const BRENTFORD_TEAM: Team = {
  id: 'brentford',
  name: 'Brentford',
  shortName: 'Brentford',
  code: 'BRE',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/337.png',
  primaryColor: '#E30613',
  secondaryColor: '#FFFFFF'
};

export const NEWCASTLE_TEAM: Team = {
  id: 'newcastle-united',
  name: 'Newcastle United',
  shortName: 'Newcastle',
  code: 'NEW',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/361.png',
  primaryColor: '#241F20',
  secondaryColor: '#FFFFFF'
};

export const ASTON_VILLA_TEAM: Team = {
  id: 'aston-villa',
  name: 'Aston Villa',
  shortName: 'Aston Villa',
  code: 'AVL',
  crest: 'https://a.espncdn.com/i/teamlogos/soccer/500/362.png',
  primaryColor: '#95BFE5',
  secondaryColor: '#670E36'
};

// Default Spurs lineup
const SPURS_STARTING_XI: MatchLineupPlayer[] = [
  { number: 1, name: 'Guglielmo Vicario', position: 'GK' },
  { number: 23, name: 'Pedro Porro', position: 'DF' },
  { number: 17, name: 'Cristian Romero', position: 'DF', isCaptain: true },
  { number: 37, name: 'Micky van de Ven', position: 'DF' },
  { number: 13, name: 'Destiny Udogie', position: 'DF' },
  { number: 8, name: 'Yves Bissouma', position: 'MF' },
  { number: 29, name: 'Pape Matar Sarr', position: 'MF' },
  { number: 10, name: 'James Maddison', position: 'MF' },
  { number: 22, name: 'Brennan Johnson', position: 'FW' },
  { number: 19, name: 'Dominic Solanke', position: 'FW' },
  { number: 7, name: 'Heung-min Son', position: 'FW', isCaptain: true }
];

export const FIXTURES_DATABASE: Fixture[] = [
  // ==========================================
  // COMPLETED MATCHES (Aug / Sep 2026)
  // ==========================================
  {
    id: 'tot-bre-played',
    homeTeam: BRENTFORD_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 22 Aug 2026',
    kickoffTime: '16:30',
    kickoffTimestamp: Date.UTC(2026, 7, 22, 15, 30),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: false,
    status: 'FINISHED',
    score: { home: 3, away: 0 },
    stats: {
      possession: [52, 48],
      shots: [14, 11],
      shotsOnTarget: [6, 3],
      corners: [5, 6],
      fouls: [11, 13],
      yellowCards: [2, 3]
    }
  },
  {
    id: 'tot-new-played',
    homeTeam: SPURS_TEAM,
    awayTeam: NEWCASTLE_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 29 Aug 2026',
    kickoffTime: '16:30',
    kickoffTimestamp: Date.UTC(2026, 7, 29, 15, 30),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'FINISHED',
    score: { home: 0, away: 2 },
    stats: {
      possession: [58, 42],
      shots: [15, 10],
      shotsOnTarget: [4, 5],
      corners: [7, 3],
      fouls: [9, 12],
      yellowCards: [1, 2]
    }
  },
  {
    id: 'nfo-tot-played',
    homeTeam: NOTTINGHAM_FOREST_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 5 Sep 2026',
    kickoffTime: '14:00',
    kickoffTimestamp: Date.UTC(2026, 8, 5, 13, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: false,
    status: 'FINISHED',
    score: { home: 0, away: 0 },
    stats: {
      possession: [44, 56],
      shots: [8, 12],
      shotsOnTarget: [2, 3],
      corners: [4, 7],
      fouls: [14, 8],
      yellowCards: [3, 1]
    }
  },
  {
    id: 'tot-eve-played',
    homeTeam: SPURS_TEAM,
    awayTeam: EVERTON_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 12 Sep 2026',
    kickoffTime: '16:30',
    kickoffTimestamp: Date.UTC(2026, 8, 12, 15, 30),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'FINISHED',
    score: { home: 0, away: 0 },
    stats: {
      possession: [62, 38],
      shots: [18, 5],
      shotsOnTarget: [6, 1],
      corners: [9, 2],
      fouls: [8, 15],
      yellowCards: [1, 4]
    }
  },
  {
    id: 'tot-avl-played',
    homeTeam: SPURS_TEAM,
    awayTeam: ASTON_VILLA_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 19 Sep 2026',
    kickoffTime: '11:30',
    kickoffTimestamp: Date.UTC(2026, 8, 19, 10, 30),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'FINISHED',
    score: { home: 2, away: 3 },
    events: [
      { id: 'ev1', minute: 23, type: 'goal', team: 'home', player: 'Brennan Johnson', assistOrSub: 'Pedro Porro' },
      { id: 'ev2', minute: 39, type: 'goal', team: 'away', player: 'Ollie Watkins', assistOrSub: 'John McGinn' },
      { id: 'ev3', minute: 58, type: 'goal', team: 'home', player: 'Dominic Solanke', assistOrSub: 'James Maddison' },
      { id: 'ev4', minute: 71, type: 'goal', team: 'away', player: 'Morgan Rogers', assistOrSub: 'Leon Bailey' },
      { id: 'ev5', minute: 88, type: 'goal', team: 'away', player: 'Jhon Durán', assistOrSub: 'Youri Tielemans' }
    ],
    stats: {
      possession: [55, 45],
      shots: [16, 14],
      shotsOnTarget: [7, 6],
      corners: [8, 4],
      fouls: [10, 11],
      yellowCards: [2, 3]
    }
  },

  // ==========================================
  // OCTOBER 2026 (From Official ESPN Fixtures)
  // ==========================================
  {
    id: 'pl-man-tot-20261010',
    homeTeam: MAN_UTD_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 10 Oct 2026',
    kickoffTime: '17:30',
    kickoffTimestamp: Date.UTC(2026, 9, 10, 16, 30),
    venue: getStadium('old-trafford'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Premier League', us: 'USA Network / Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away allocation: South-East corner tiers E230-E233. 395 loyalty points.' },
    editorialNotes: 'Massive away test under the lights at Old Trafford. Take Manchester Metrolink to Old Trafford or Exchange Quay.',
    featuredPubsIds: [],
    homeLineup: [
      { number: 24, name: 'André Onana', position: 'GK' },
      { number: 3, name: 'Noussair Mazraoui', position: 'DF' },
      { number: 4, name: 'Matthijs de Ligt', position: 'DF' },
      { number: 6, name: 'Lisandro Martínez', position: 'DF' },
      { number: 20, name: 'Diogo Dalot', position: 'DF' },
      { number: 37, name: 'Kobbie Mainoo', position: 'MF' },
      { number: 25, name: 'Manuel Ugarte', position: 'MF' },
      { number: 8, name: 'Bruno Fernandes', position: 'MF', isCaptain: true },
      { number: 16, name: 'Amad Diallo', position: 'FW' },
      { number: 11, name: 'Joshua Zirkzee', position: 'FW' },
      { number: 10, name: 'Marcus Rashford', position: 'FW' }
    ] as MatchLineupPlayer[],
    awayLineup: SPURS_STARTING_XI
  },
  {
    id: 'pl-tot-cov-20261019',
    homeTeam: SPURS_TEAM,
    awayTeam: COVENTRY_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Mon, 19 Oct 2026',
    kickoffTime: '20:00',
    kickoffTimestamp: Date.UTC(2026, 9, 19, 19, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Monday Night Football', us: 'USA Network' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category B fixture. One Hotspur member priority booking.' },
    editorialNotes: 'Monday Night Football in N17. Arrive early to sample Beavertown brewery in the South Stand Market Place.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'the-high-cross']
  },
  {
    id: 'pl-che-tot-20261024',
    homeTeam: CHELSEA_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 24 Oct 2026',
    kickoffTime: '17:30',
    kickoffTimestamp: Date.UTC(2026, 9, 24, 16, 30),
    venue: getStadium('stamford-bridge'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Main Event', us: 'NBC / Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away allocation in Shed End upper and lower tiers.' },
    editorialNotes: 'Fierce London derby at Stamford Bridge. Away fans advised to drink around Earls Court before traveling to West Brompton.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-cry-20261031',
    homeTeam: SPURS_TEAM,
    awayTeam: CRYSTAL_PALACE_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 31 Oct 2026',
    kickoffTime: '17:30',
    kickoffTimestamp: Date.UTC(2026, 9, 31, 17, 30),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Premier League', us: 'Peacock Premium' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category B London Derby. Ticket Exchange open for members.' },
    editorialNotes: 'Halloween clash under the lights at Tottenham Hotspur Stadium.',
    featuredPubsIds: ['bricklayers-arms', 'the-beehive', 'number-8']
  },

  // ==========================================
  // NOVEMBER 2026
  // ==========================================
  {
    id: 'pl-lee-tot-20261107',
    homeTeam: LEEDS_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 7 Nov 2026',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2026, 10, 7, 15, 0),
    venue: getStadium('elland-road'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live (3pm Blackout)', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away section: John Charles Stand upper/lower corners.' },
    editorialNotes: 'High-tempo trip to Elland Road. Matchday bus R2 operates from Sovereign Street outside Leeds Station directly to the stadium.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-ips-20261121',
    homeTeam: SPURS_TEAM,
    awayTeam: IPSWICH_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 21 Nov 2026',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2026, 10, 21, 15, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'TalkSPORT Live (3pm Blackout)', us: 'Peacock' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category C fixture. Family enclosures open.' },
    editorialNotes: 'Saturday 3pm kickoff in north London.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms']
  },
  {
    id: 'pl-sun-tot-20261128',
    homeTeam: SUNDERLAND_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 28 Nov 2026',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2026, 10, 28, 15, 0),
    venue: getStadium('stadium-of-light'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away supporters in North Stand Upper Tier.' },
    editorialNotes: 'Long trek to the North East. Tyne & Wear Metro connects Newcastle Central to Stadium of Light in 25 mins.',
    featuredPubsIds: []
  },

  // ==========================================
  // DECEMBER 2026
  // ==========================================
  {
    id: 'pl-tot-ful-20261202',
    homeTeam: SPURS_TEAM,
    awayTeam: FULHAM_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Wed, 2 Dec 2026',
    kickoffTime: '20:00',
    kickoffTimestamp: Date.UTC(2026, 11, 2, 20, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Amazon Prime Video', us: 'Peacock' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Midweek London derby under the floodlights.' },
    editorialNotes: 'Festive midweek Premier League match at Tottenham Hotspur Stadium.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'the-high-cross']
  },
  {
    id: 'pl-tot-ars-20261205',
    homeTeam: SPURS_TEAM,
    awayTeam: ARSENAL_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 5 Dec 2026',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2026, 11, 5, 15, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Main Event', us: 'USA Network / Peacock' },
    ticketInfo: { status: 'Sold Out', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category A. Ticket Exchange open strictly for One Hotspur+ members.' },
    editorialNotes: 'The North London Derby in N17! Arrive early as extensive security and stewarding will be active along High Road and Park Lane.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'number-8', 'chick-king']
  },
  {
    id: 'pl-hul-tot-20261212',
    homeTeam: HULL_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 12 Dec 2026',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2026, 11, 12, 15, 0),
    venue: getStadium('mkm-stadium'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away allocation in North Stand.' },
    editorialNotes: 'Winter away trip to MKM Stadium in East Yorkshire. 20 min walk from Hull Paragon Interchange through West Park.',
    featuredPubsIds: []
  },
  {
    id: 'pl-liv-tot-20261219',
    homeTeam: LIVERPOOL_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 19 Dec 2026',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2026, 11, 19, 15, 0),
    venue: getStadium('anfield'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Premier League', us: 'USA Network' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away allocation in Anfield Road Stand Lower Tier.' },
    editorialNotes: 'Crucial festive fixture at Anfield. Direct Soccerbus runs from Sandhills station.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-bou-20261226',
    homeTeam: SPURS_TEAM,
    awayTeam: BOURNEMOUTH_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 26 Dec 2026',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2026, 11, 26, 15, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Amazon Prime Video', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Boxing Day festive fixture. Limited public transport.' },
    editorialNotes: 'Traditional Boxing Day football in N17. Check special matchday train timetables from Liverpool Street.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms']
  },
  {
    id: 'pl-tot-bha-20261229',
    homeTeam: SPURS_TEAM,
    awayTeam: BRIGHTON_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Tue, 29 Dec 2026',
    kickoffTime: '19:30',
    kickoffTimestamp: Date.UTC(2026, 11, 29, 19, 30),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Amazon Prime Video', us: 'Peacock' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Festive festive period fixture.' },
    editorialNotes: 'Final home match of 2026 under the lights at Tottenham Hotspur Stadium.',
    featuredPubsIds: ['bricklayers-arms', 'the-beehive', 'the-high-cross']
  },

  // ==========================================
  // JANUARY 2027
  // ==========================================
  {
    id: 'pl-mnc-tot-20270103',
    homeTeam: MAN_CITY_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sun, 3 Jan 2027',
    kickoffTime: '16:30',
    kickoffTimestamp: Date.UTC(2027, 0, 3, 16, 30),
    venue: getStadium('etihad-stadium'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Super Sunday', us: 'NBC / Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away allocation in South Stand tiers 1-3.' },
    editorialNotes: 'New Year showdown at Etihad Stadium. Direct Metrolink trams run from Piccadilly to Etihad Campus.',
    featuredPubsIds: []
  },
  {
    id: 'pl-ful-tot-20270106',
    homeTeam: FULHAM_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Wed, 6 Jan 2027',
    kickoffTime: '19:30',
    kickoffTimestamp: Date.UTC(2027, 0, 6, 19, 30),
    venue: getStadium('craven-cottage'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'TNT Sports 1', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Putney End allocation. 300+ loyalty points.' },
    editorialNotes: 'Midweek London derby by the Thames. District Line to Putney Bridge followed by a 12 min scenic walk through Bishops Park.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-lee-20270116',
    homeTeam: SPURS_TEAM,
    awayTeam: LEEDS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 16 Jan 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 0, 16, 15, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live (3pm Blackout)', us: 'Peacock' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category B match.' },
    editorialNotes: 'Action-packed clash in north London.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms']
  },
  {
    id: 'pl-cry-tot-20270123',
    homeTeam: CRYSTAL_PALACE_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 23 Jan 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 0, 23, 15, 0),
    venue: getStadium('selhurst-park'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'TalkSPORT Live', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Arthur Wait Stand allocation.' },
    editorialNotes: 'South London away day at Selhurst Park. Southern rail trains run from London Bridge and Victoria to Thornton Heath.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-sun-20270130',
    homeTeam: SPURS_TEAM,
    awayTeam: SUNDERLAND_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 30 Jan 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 0, 30, 15, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live', us: 'Peacock' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category C fixture.' },
    editorialNotes: 'Late January Premier League action at Tottenham Hotspur Stadium.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'number-8']
  },

  // ==========================================
  // FEBRUARY 2027
  // ==========================================
  {
    id: 'pl-ips-tot-20270206',
    homeTeam: IPSWICH_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 6 Feb 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 1, 6, 15, 0),
    venue: getStadium('portman-road'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Cobbold Stand allocation. 1h 10m direct train from London Liverpool Street.' },
    editorialNotes: 'Short trip into Suffolk. Portman Road is just 5 minutes walk from Ipswich railway station.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-mnc-20270210',
    homeTeam: SPURS_TEAM,
    awayTeam: MAN_CITY_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Wed, 10 Feb 2027',
    kickoffTime: '20:00',
    kickoffTimestamp: Date.UTC(2027, 1, 10, 20, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'TNT Sports 1', us: 'USA Network' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category A blockbuster. One Hotspur priority booking.' },
    editorialNotes: 'Huge midweek clash against Manchester City in N17.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'the-high-cross']
  },
  {
    id: 'pl-bha-tot-20270220',
    homeTeam: BRIGHTON_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 20 Feb 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 1, 20, 15, 0),
    venue: getStadium('amex-stadium'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'South Stand away section. Match ticket covers free local train travel to Falmer.' },
    editorialNotes: 'South coast trip to Falmer. Trains from Victoria & London Bridge connect directly to Falmer station outside the stadium.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-liv-20270227',
    homeTeam: SPURS_TEAM,
    awayTeam: LIVERPOOL_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 27 Feb 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 1, 27, 15, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Main Event', us: 'USA Network' },
    ticketInfo: { status: 'Sold Out', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category A clash. Ticket Exchange active.' },
    editorialNotes: 'Heavyweight Premier League encounter at Tottenham Hotspur Stadium.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'number-8']
  },

  // ==========================================
  // MARCH 2027
  // ==========================================
  {
    id: 'pl-bou-tot-20270303',
    homeTeam: BOURNEMOUTH_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Wed, 3 Mar 2027',
    kickoffTime: '20:00',
    kickoffTimestamp: Date.UTC(2027, 2, 3, 20, 0),
    venue: getStadium('vitality-stadium'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'TNT Sports 2', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away allocation in East Stand (1,300 tickets).' },
    editorialNotes: 'Midweek seaside clash at Vitality Stadium. Pokesdown station is a 15 min walk through Kings Park.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-nfo-20270313',
    homeTeam: SPURS_TEAM,
    awayTeam: NOTTINGHAM_FOREST_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 13 Mar 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 2, 13, 15, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'TalkSPORT Live', us: 'Peacock' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category B fixture.' },
    editorialNotes: 'Saturday football in N17.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms']
  },
  {
    id: 'pl-eve-tot-20270320',
    homeTeam: EVERTON_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 20 Mar 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 2, 20, 15, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Bullens Road away section.' },
    editorialNotes: 'Trip to Merseyside. Merseyrail to Kirkdale or Sandhills station.',
    featuredPubsIds: []
  },

  // ==========================================
  // APRIL 2027
  // ==========================================
  {
    id: 'pl-tot-bre-20270410',
    homeTeam: SPURS_TEAM,
    awayTeam: BRENTFORD_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 10 Apr 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 3, 10, 14, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'TalkSPORT Live', us: 'Peacock' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category B London Derby.' },
    editorialNotes: 'Spring football at Tottenham Hotspur Stadium against Thomas Frank\'s Brentford.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'the-high-cross']
  },
  {
    id: 'pl-new-tot-20270417',
    homeTeam: NEWCASTLE_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 17 Apr 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 3, 17, 14, 0),
    venue: getStadium('st-james-park'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Premier League', us: 'USA Network' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Leazes End Level 7 high above the pitch.' },
    editorialNotes: 'Electric away day at St James\' Park in the heart of Newcastle upon Tyne.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-hul-20270424',
    homeTeam: SPURS_TEAM,
    awayTeam: HULL_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 24 Apr 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 3, 24, 14, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live', us: 'Peacock' },
    ticketInfo: { status: 'General Sale', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category C fixture. End of season home stretch.' },
    editorialNotes: 'Crucial home points up for grabs in late April.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms']
  },

  // ==========================================
  // MAY 2027 (From Official ESPN Fixtures)
  // ==========================================
  {
    id: 'pl-ars-tot-20270501',
    homeTeam: ARSENAL_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 1 May 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 4, 1, 14, 0),
    venue: getStadium('emirates-stadium'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Main Event', us: 'USA Network / Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Clock End Lower Tier away allocation (3,000 tickets). Highest loyalty tier.' },
    editorialNotes: 'Return North London Derby at Emirates Stadium! Strict away supporter segregation around Highbury & Islington and Finsbury Park.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-che-20270508',
    homeTeam: SPURS_TEAM,
    awayTeam: CHELSEA_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 8 May 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 4, 8, 14, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Premier League', us: 'USA Network' },
    ticketInfo: { status: 'Sold Out', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Category A London Derby.' },
    editorialNotes: 'Huge penultimate home fixture in the London derby showdown against Chelsea.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'number-8']
  },
  {
    id: 'pl-cov-tot-20270515',
    homeTeam: COVENTRY_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sat, 15 May 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 4, 15, 14, 0),
    venue: getStadium('cbs-arena'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'BBC Radio 5 Live', us: 'Peacock' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Away allocation in South Stand (3,000 tickets).' },
    editorialNotes: 'Final away road trip of the season to Coventry Building Society Arena.',
    featuredPubsIds: []
  },
  {
    id: 'pl-tot-man-20270523',
    homeTeam: SPURS_TEAM,
    awayTeam: MAN_UTD_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sun, 23 May 2027',
    kickoffTime: '15:00',
    kickoffTimestamp: Date.UTC(2027, 4, 23, 14, 0),
    venue: TOTTENHAM_HOTSPUR_STADIUM,
    isHome: true,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Main Event', us: 'NBC / Peacock' },
    ticketInfo: { status: 'Sold Out', link: 'https://www.tottenhamhotspur.com/tickets/', notes: 'Final home match of the season in N17! Lap of appreciation after final whistle.' },
    editorialNotes: 'The grand home finale against Manchester United at Tottenham Hotspur Stadium.',
    featuredPubsIds: ['the-beehive', 'bricklayers-arms', 'number-8', 'the-high-cross']
  },
  {
    id: 'pl-avl-tot-20270530',
    homeTeam: ASTON_VILLA_TEAM,
    awayTeam: SPURS_TEAM,
    competition: 'English Premier League',
    competitionCode: 'PL',
    date: 'Sun, 30 May 2027',
    kickoffTime: '16:00',
    kickoffTimestamp: Date.UTC(2027, 4, 30, 15, 0),
    venue: getStadium('villa-park'),
    isHome: false,
    status: 'UPCOMING',
    broadcast: { uk: 'Sky Sports Premier League (Simulcast)', us: 'USA Network' },
    ticketInfo: { status: 'Members Only', link: 'https://www.tottenhamhotspur.com/tickets/away-tickets/', notes: 'Final matchday of the 2026/27 Premier League campaign.' },
    editorialNotes: 'Season finale at Villa Park with all matches kicking off simultaneously at 4pm.',
    featuredPubsIds: []
  }
];
