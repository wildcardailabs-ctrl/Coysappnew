import { CachedMatchdayTicket, OfflineEmergencyCard, PubVenue, ConcourseOutlet } from '../types';

const OFFLINE_PACK_KEY = 'coys_offline_pack_v1';
const OFFLINE_MODE_PREF_KEY = 'coys_force_offline_mode';

export interface MatchdayOfflineBundle {
  cachedAt: string;
  ticket: CachedMatchdayTicket;
  emergencyContacts: OfflineEmergencyCard[];
  savedPubs: Partial<PubVenue>[];
  concourseHighlights: Partial<ConcourseOutlet>[];
  stadiumSafetyNotes: string[];
}

export const MATCHDAY_EMERGENCY_CONTACTS: OfflineEmergencyCard[] = [
  {
    service: 'THFC Supporter Safety Text Helpline',
    phone: '07537 404821',
    textService: 'Text "FOUL" or "SAFETY" + seat block/row to 07537 404821',
    description: 'Direct SMS to Stadium Control Room for anti-social behavior, safety issues, or medical distress in the stands.',
    location: 'Inside Stadium Control'
  },
  {
    service: 'Met Police Football Unit (North London)',
    phone: '020 7230 1212',
    textService: 'In emergency dial 999; non-emergency 101',
    description: 'Designated Metropolitan Police football matchday operations centre covering High Road, Seven Sisters and Northumberland Park corridors.',
    location: 'Tottenham Police Station, High Road'
  },
  {
    service: 'St John Ambulance First Aid Stations',
    phone: 'Ask any stadium steward in fluorescent orange / high-vis',
    description: '4 fully staffed medical suites: Level 1 South Stand (Block 250), Level 2 West Stand, Level 2 East Stand, Level 5 North Stand.',
    location: 'Behind Blocks 250, 102, 114, 520'
  },
  {
    service: 'TfL Victoria Line & Overground Travel Alerts',
    phone: '0343 222 1234',
    description: 'Post-match crowd control coordination for Seven Sisters & White Hart Lane stations.',
    location: 'Seven Sisters / White Hart Lane Stations'
  }
];

export const DEFAULT_CACHED_TICKET: CachedMatchdayTicket = {
  opponent: 'Manchester United',
  competition: 'Premier League',
  date: 'Sunday, 30 August 2026',
  kickoff: '16:30 BST',
  block: 'Block 254',
  row: 'Row 18',
  seat: 'Seat 104',
  turnstile: 'Turnstiles 8 - 11',
  entryGate: 'South Stand Atrium (Gate 6)'
};

export const OfflineCacheService = {
  getOfflineBundle(): MatchdayOfflineBundle | null {
    try {
      const stored = localStorage.getItem(OFFLINE_PACK_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  },

  saveOfflineBundle(bundle: MatchdayOfflineBundle): void {
    try {
      localStorage.setItem(OFFLINE_PACK_KEY, JSON.stringify(bundle));
    } catch {
      // ignore
    }
  },

  createAndSaveDefaultBundle(savedPubs: PubVenue[] = []): MatchdayOfflineBundle {
    const bundle: MatchdayOfflineBundle = {
      cachedAt: new Date().toLocaleString(),
      ticket: DEFAULT_CACHED_TICKET,
      emergencyContacts: MATCHDAY_EMERGENCY_CONTACTS,
      savedPubs: savedPubs.slice(0, 5).map(p => ({
        id: p.id,
        name: p.name,
        address: p.address,
        postcode: p.postcode,
        distance: p.distance,
        walkTime: p.walkTime,
        beersServed: p.beersServed,
        badges: p.badges
      })),
      concourseHighlights: [
        {
          name: 'The Goal Line Bar',
          stand: 'South Stand',
          level: 1,
          nearBlocks: 'Blocks 248 - 256',
          hasBottomsUpTaps: true,
          signatureItem: '65m bar with 3-second bottom-fill Neck Oil'
        },
        {
          name: 'Beavertown Microbrewery',
          stand: 'South Stand',
          level: 1,
          nearBlocks: 'Blocks 252 - 254',
          hasBottomsUpTaps: true,
          signatureItem: 'One of Our Own stout brewed behind glass'
        },
        {
          name: 'Naan & Kebab (Halal)',
          stand: 'South Stand',
          level: 1,
          nearBlocks: 'Blocks 250 - 252',
          hasBottomsUpTaps: false,
          signatureItem: 'Chicken Tikka wraps & spiced seekh kebab'
        }
      ],
      stadiumSafetyNotes: [
        'A4 Maximum Bag Size: Strictly enforced at all turnstiles. Oversized bags must be dropped at High Road car park depot.',
        '100% Cashless Stadium: All concourse bars, kiosks, and program stalls accept contactless / mobile pay only.',
        'Early Bird Concourse Offer: 20% discount on all food & beer purchased before 45 minutes to kickoff.',
        'Post-Match Station Queues: White Hart Lane has managed queue pens on High Road. Seven Sisters is a 25 min walk south with high-frequency Victoria Line tube trains.'
      ]
    };

    this.saveOfflineBundle(bundle);
    return bundle;
  },

  isForceOfflineMode(): boolean {
    try {
      return localStorage.getItem(OFFLINE_MODE_PREF_KEY) === 'true';
    } catch {
      return false;
    }
  },

  setForceOfflineMode(enabled: boolean): void {
    try {
      localStorage.setItem(OFFLINE_MODE_PREF_KEY, enabled ? 'true' : 'false');
    } catch {
      // ignore
    }
  }
};
