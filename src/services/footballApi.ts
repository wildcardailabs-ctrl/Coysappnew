import { Fixture, MatchEvent } from '../types';
import { FIXTURES_DATABASE } from '../data/mockFixtures';

export interface FootballFeedStatus {
  provider: 'football-data.org' | 'espn' | 'verified_feed';
  providerName: string;
  isLive: boolean;
  apiKeyConfigured: boolean;
  lastUpdated: string;
  notice?: string;
}

export interface FootballDataProvider {
  name: string;
  isLive: boolean;
  getStatus(): FootballFeedStatus;
  getUpcomingFixtures(): Promise<Fixture[]>;
  getNextSpursFixture(): Promise<Fixture>;
  getFixtureDetails(fixtureId: string): Promise<Fixture | null>;
  getLiveMatchEvents(fixtureId: string): Promise<MatchEvent[]>;
}

class FootballDataService implements FootballDataProvider {
  name = 'Football-Data.org / Live Feed';
  isLive = false;
  private cachedStatus: FootballFeedStatus = {
    provider: 'verified_feed',
    providerName: 'Football-Data.org (Verified Schedule)',
    isLive: false,
    apiKeyConfigured: false,
    lastUpdated: new Date().toISOString()
  };
  private cachedFixtures: Fixture[] = FIXTURES_DATABASE;

  getStatus(): FootballFeedStatus {
    return this.cachedStatus;
  }

  async getUpcomingFixtures(forceRefresh = false): Promise<Fixture[]> {
    try {
      const res = await fetch(`/api/fixtures${forceRefresh ? '?refresh=true' : ''}`).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.fixtures && Array.isArray(json.fixtures) && json.fixtures.length > 0) {
          this.isLive = Boolean(json.isLiveProvider);
          const providerName = json.provider === 'football-data.org'
            ? 'Football-Data.org API v4'
            : json.provider === 'espn'
            ? 'ESPN Live Match Feed'
            : 'Verified Matchday Calendar';

          this.cachedStatus = {
            provider: json.provider || 'espn',
            providerName,
            isLive: Boolean(json.isLiveProvider),
            apiKeyConfigured: Boolean(json.apiKeyConfigured),
            lastUpdated: json.lastUpdated || new Date().toISOString(),
            notice: json.notice
          };

          this.cachedFixtures = json.fixtures;
          return json.fixtures;
        }
      }
    } catch (err) {
      console.warn('Could not fetch /api/fixtures, using fallback:', err);
    }

    return this.cachedFixtures;
  }

  async getNextSpursFixture(): Promise<Fixture> {
    const fixtures = await this.getUpcomingFixtures();
    const upcoming = fixtures.find(f => f.status === 'UPCOMING' || f.status === 'LIVE');
    return upcoming || fixtures[0] || FIXTURES_DATABASE[0];
  }

  async getFixtureDetails(fixtureId: string): Promise<Fixture | null> {
    const fixtures = await this.getUpcomingFixtures();
    const found = fixtures.find(f => f.id === fixtureId);
    return found || null;
  }

  async getLiveMatchEvents(fixtureId: string): Promise<MatchEvent[]> {
    const fixture = await this.getFixtureDetails(fixtureId);
    return fixture?.events || [];
  }
}

export const FootballService = new FootballDataService();
