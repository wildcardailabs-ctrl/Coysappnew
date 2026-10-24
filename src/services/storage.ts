import { UserProfile, FanTip, UserReview, AffiliateClickRecord } from '../types';
import { INITIAL_FAN_TIPS, INITIAL_USER_REVIEWS } from '../data/communityData';
import { STADIUMS_DATABASE } from '../data/stadiumsData';

const USER_PROFILE_KEY = 'coys_user_profile_v1';
const FAN_TIPS_KEY = 'coys_fan_tips_v1';
const REVIEWS_KEY = 'coys_reviews_v1';
const AFFILIATE_CLICKS_KEY = 'coys_affiliate_clicks_v1';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr_coys_supporter',
  name: 'Spurs Supporter',
  email: '',
  avatar: '',
  memberSince: '2026/27 Season',
  favoriteSection: 'South Stand (Single Tier)',
  matchesAttendedCount: 0,
  awayDaysCount: 0,
  groundsVisitedCount: 0,
  countriesVisitedCount: 0,
  savedPubIds: [],
  savedVenueIds: [],
  savedFixtureIds: [],
  savedGuideIds: [],
  visitedGrounds: [],
  attendedMatches: [],
  notificationsEnabled: {
    matchReminders: true,
    travelAlerts: true,
    fixtureChanges: true,
    awayDayGuides: true,
    postMatchHighlights: false
  }
};

export const StorageService = {
  getUserProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Automatically migrate away from legacy pre-populated mock seed
        if (parsed.id === 'usr_matt_coys') {
          localStorage.removeItem(USER_PROFILE_KEY);
          return DEFAULT_USER_PROFILE;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_USER_PROFILE;
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  },

  toggleSavePub(pubId: string): boolean {
    const profile = this.getUserProfile();
    const isSaved = profile.savedPubIds.includes(pubId);
    if (isSaved) {
      profile.savedPubIds = profile.savedPubIds.filter(id => id !== pubId);
    } else {
      profile.savedPubIds.push(pubId);
    }
    this.saveUserProfile(profile);
    return !isSaved;
  },

  toggleSaveGround(groundId: string): boolean {
    const profile = this.getUserProfile();
    const isSaved = profile.savedVenueIds.includes(groundId);
    if (isSaved) {
      profile.savedVenueIds = profile.savedVenueIds.filter(id => id !== groundId);
    } else {
      profile.savedVenueIds.push(groundId);
    }
    this.saveUserProfile(profile);
    return !isSaved;
  },

  toggleGroundVisited(stadiumId: string): boolean {
    const profile = this.getUserProfile();
    const existing = profile.visitedGrounds.find(g => g.stadiumId === stadiumId);
    let newStatus = true;

    if (existing) {
      existing.visited = !existing.visited;
      newStatus = existing.visited;
      if (newStatus && !existing.dateVisited) {
        existing.dateVisited = new Date().toISOString().split('T')[0];
      }
    } else {
      const stadium = STADIUMS_DATABASE.find(s => s.id === stadiumId);
      profile.visitedGrounds.push({
        stadiumId,
        stadiumName: stadium?.name || stadiumId,
        clubName: stadium?.club || 'Club',
        visited: true,
        dateVisited: new Date().toISOString().split('T')[0]
      });
      newStatus = true;
    }

    profile.groundsVisitedCount = profile.visitedGrounds.filter(g => g.visited).length;
    this.saveUserProfile(profile);
    return newStatus;
  },

  markMatchAttended(matchData: { fixtureId: string; opponent: string; date: string; venue: string; isHome: boolean; result: string; notes?: string }): void {
    const profile = this.getUserProfile();
    const existingIndex = profile.attendedMatches.findIndex(m => m.fixtureId === matchData.fixtureId);
    if (existingIndex >= 0) {
      profile.attendedMatches[existingIndex] = { ...matchData, id: profile.attendedMatches[existingIndex].id };
    } else {
      profile.attendedMatches.unshift({ ...matchData, id: 'att_' + Date.now() });
      profile.matchesAttendedCount += 1;
      if (!matchData.isHome) {
        profile.awayDaysCount += 1;
      }
    }
    this.saveUserProfile(profile);
  },

  getFanTips(): FanTip[] {
    try {
      const stored = localStorage.getItem(FAN_TIPS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_FAN_TIPS;
  },

  addFanTip(tip: Omit<FanTip, 'id' | 'createdAt' | 'upvotes' | 'status'>): FanTip {
    const tips = this.getFanTips();
    const newTip: FanTip = {
      ...tip,
      id: 'tip_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      upvotes: 1,
      status: 'APPROVED' // automatically approve in app demo or moderation preview
    };
    tips.unshift(newTip);
    try {
      localStorage.setItem(FAN_TIPS_KEY, JSON.stringify(tips));
    } catch {
      // ignore
    }
    return newTip;
  },

  updateFanTipStatus(tipId: string, status: 'APPROVED' | 'REJECTED'): void {
    const tips = this.getFanTips();
    const tip = tips.find(t => t.id === tipId);
    if (tip) {
      tip.status = status;
      try {
        localStorage.setItem(FAN_TIPS_KEY, JSON.stringify(tips));
      } catch {
        // ignore
      }
    }
  },

  getReviews(): UserReview[] {
    try {
      const stored = localStorage.getItem(REVIEWS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_USER_REVIEWS;
  },

  addReview(review: Omit<UserReview, 'id' | 'date' | 'status'>): UserReview {
    const reviews = this.getReviews();
    const newRev: UserReview = {
      ...review,
      id: 'rev_' + Date.now(),
      date: 'Today',
      status: 'APPROVED'
    };
    reviews.unshift(newRev);
    try {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    } catch {
      // ignore
    }
    return newRev;
  },

  recordAffiliateClick(click: Omit<AffiliateClickRecord, 'id' | 'timestamp'>): void {
    try {
      const raw = localStorage.getItem(AFFILIATE_CLICKS_KEY);
      const clicks: AffiliateClickRecord[] = raw ? JSON.parse(raw) : [];
      clicks.unshift({
        ...click,
        id: 'clk_' + Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(AFFILIATE_CLICKS_KEY, JSON.stringify(clicks.slice(0, 500)));
    } catch {
      // ignore
    }
  },

  getAffiliateClicks(): AffiliateClickRecord[] {
    try {
      const raw = localStorage.getItem(AFFILIATE_CLICKS_KEY);
      return raw ? JSON.parse(raw) : [
        { id: 'clk_1', partnerId: 'trainline', partnerName: 'Trainline', category: 'Travel', destinationUrl: 'https://thetrainline.com', page: 'Matchday Travel', timestamp: '2026-09-20T10:15:00Z' },
        { id: 'clk_2', partnerId: 'justpark', partnerName: 'JustPark', category: 'Parking', destinationUrl: 'https://justpark.com', page: 'Home Quick Action', timestamp: '2026-09-20T11:42:00Z' },
        { id: 'clk_3', partnerId: 'booking-com', partnerName: 'Booking.com', category: 'Hotels', destinationUrl: 'https://booking.com', page: 'Away Days Newcastle', timestamp: '2026-09-20T12:05:00Z' }
      ];
    } catch {
      return [];
    }
  }
};
