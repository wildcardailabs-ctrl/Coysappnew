import React, { useState, useEffect } from 'react';
import { TabType, Fixture, Venue, PubVenue, ArticleGuide, FanTip, UserReview, WeatherData, TransitLineStatus, UserProfile, AffiliatePartner } from './types';
import { FIXTURES_DATABASE } from './data/mockFixtures';
import { STADIUMS_DATABASE, TOTTENHAM_HOTSPUR_STADIUM } from './data/stadiumsData';
import { PUBS_DATABASE } from './data/pubsData';
import { GUIDES_DATABASE } from './data/guidesData';
import { AFFILIATE_PARTNERS } from './data/communityData';

import { StorageService } from './services/storage';
import { WeatherService } from './services/weatherApi';
import { TransportService } from './services/transportApi';
import { FootballService, FootballFeedStatus } from './services/footballApi';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { MatchdayView } from './components/MatchdayView';
import { AwayDaysView } from './components/AwayDaysView';
import { ExploreView } from './components/ExploreView';
import { MyCoysView } from './components/MyCoysView';

import { AdminCMS } from './components/AdminCMS';
import { SearchModal } from './components/SearchModal';
import { NotificationsModal } from './components/NotificationsModal';
import { StadiumAwayGuideModal } from './components/StadiumAwayGuideModal';
import { PubDetailModal } from './components/PubDetailModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Navigation & Screen state
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [activeFixture, setActiveFixture] = useState<Fixture>(() => {
    return FIXTURES_DATABASE.find(f => f.status === 'UPCOMING' || f.status === 'LIVE') || FIXTURES_DATABASE[0];
  });
  const [allFixtures, setAllFixtures] = useState<Fixture[]>(FIXTURES_DATABASE);
  const [isLiveFootball, setIsLiveFootball] = useState(false);
  const [feedStatus, setFeedStatus] = useState<FootballFeedStatus>(() => FootballService.getStatus());
  const [isRefreshingFixtures, setIsRefreshingFixtures] = useState(false);

  // Entities state
  const [stadiums, setStadiums] = useState<Venue[]>(STADIUMS_DATABASE);
  const [pubs, setPubs] = useState<PubVenue[]>(PUBS_DATABASE);
  const [guides, setGuides] = useState<ArticleGuide[]>(GUIDES_DATABASE);
  const [affiliates, setAffiliates] = useState<AffiliatePartner[]>(AFFILIATE_PARTNERS);
  const [affiliateClicks, setAffiliateClicks] = useState(StorageService.getAffiliateClicks());

  // User Profile & Community state
  const [userProfile, setUserProfile] = useState<UserProfile>(() => StorageService.getUserProfile());
  const [fanTips, setFanTips] = useState<FanTip[]>(() => StorageService.getFanTips());
  const [reviews, setReviews] = useState<UserReview[]>(() => StorageService.getReviews());

  // Weather & Transit live state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [transitUpdates, setTransitUpdates] = useState<TransitLineStatus[]>([]);
  const [matchdayTab, setMatchdayTab] = useState<'overview' | 'travel' | 'pubs' | 'stadium'>('overview');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedStadiumForModal, setSelectedStadiumForModal] = useState<Venue | null>(null);
  const [selectedPubForModal, setSelectedPubForModal] = useState<PubVenue | null>(null);

  // Manual refresh fixtures from backend
  const handleRefreshFixtures = async () => {
    setIsRefreshingFixtures(true);
    try {
      const res = await FootballService.getUpcomingFixtures(true);
      if (res && res.length > 0) {
        setAllFixtures(res);
        const upcoming = res.find(f => f.status === 'UPCOMING' || f.status === 'LIVE') || res[0];
        setActiveFixture(upcoming);
        setIsLiveFootball(FootballService.isLive);
        setFeedStatus(FootballService.getStatus());
      }
    } finally {
      setIsRefreshingFixtures(false);
    }
  };

  // Load live fixtures & transit on initial mount
  useEffect(() => {
    // 1. Football Data
    FootballService.getUpcomingFixtures().then((res) => {
      if (res && res.length > 0) {
        setAllFixtures(res);
        const upcoming = res.find(f => f.status === 'UPCOMING' || f.status === 'LIVE') || res[0];
        setActiveFixture(upcoming);
        setIsLiveFootball(FootballService.isLive);
        setFeedStatus(FootballService.getStatus());
      }
    });

    // 2. Live Transport Updates
    TransportService.getLiveTransportUpdates().then((t) => {
      setTransitUpdates(t);
    });
  }, []);

  // Weather Data updates when active fixture's stadium changes
  useEffect(() => {
    const targetVenue = activeFixture.venue || TOTTENHAM_HOTSPUR_STADIUM;
    setWeatherLoading(true);
    WeatherService.getWeatherForStadium(
      targetVenue.coordinates.lat,
      targetVenue.coordinates.lng,
      targetVenue.name
    ).then((w) => {
      setWeather(w);
      setWeatherLoading(false);
    }).catch(() => {
      setWeatherLoading(false);
    });
  }, [activeFixture.id, activeFixture.venue?.id]);

  // Handler: Save Pub toggle
  const handleToggleSavePub = (pubId: string) => {
    StorageService.toggleSavePub(pubId);
    setUserProfile(StorageService.getUserProfile());
  };

  // Handler: Toggle Ground Visited
  const handleToggleVisitedGround = (stadiumId: string) => {
    StorageService.toggleGroundVisited(stadiumId);
    setUserProfile(StorageService.getUserProfile());
  };

  // Handler: Add Fan Tip
  const handleAddFanTip = (tipData: Omit<FanTip, 'id' | 'createdAt' | 'upvotes' | 'status'>) => {
    const created = StorageService.addFanTip(tipData);
    setFanTips(StorageService.getFanTips());
  };

  // Handler: Add Review
  const handleAddReview = (reviewData: Omit<UserReview, 'id' | 'date' | 'status'>) => {
    const created = StorageService.addReview(reviewData);
    setReviews(StorageService.getReviews());
  };

  // Handler: Affiliate Click
  const handleAffiliateClick = (partner: AffiliatePartner, page: string) => {
    StorageService.recordAffiliateClick({
      partnerId: partner.id,
      partnerName: partner.name,
      category: partner.category,
      destinationUrl: partner.targetUrl,
      page
    });
    setAffiliateClicks(StorageService.getAffiliateClicks());
  };

  // Quick action router from Home
  const handleQuickAction = (action: 'travel' | 'pubs' | 'stadium' | 'tickets') => {
    if (action === 'travel') {
      setMatchdayTab('travel');
    } else if (action === 'pubs') {
      setMatchdayTab('pubs');
    } else if (action === 'stadium') {
      setMatchdayTab('stadium');
    } else {
      setMatchdayTab('overview');
    }
    setCurrentTab('matchday');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visitedGroundIds = userProfile.visitedGrounds.filter(g => g.visited).map(g => g.stadiumId);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex flex-col font-sans selection:bg-[#4ea8de] selection:text-[#06142e]">
      {/* Top Sticky Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (tab === 'matchday') {
            setMatchdayTab('overview');
          }
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        isAdminOpen={isAdminOpen}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        userAvatar={userProfile.avatar}
        isLiveFootball={isLiveFootball}
      />

      {/* Main App Container */}
      <main className="flex-1 w-full max-w-md mx-auto sm:max-w-xl md:max-w-2xl px-3.5 sm:px-4 pt-3">
        {currentTab === 'home' && (
          <HomeView
            nextFixture={activeFixture}
            allFixtures={allFixtures}
            venue={activeFixture.venue}
            weather={weather}
            weatherLoading={weatherLoading}
            guides={guides}
            fanTips={fanTips}
            affiliates={affiliates}
            feedStatus={feedStatus}
            isRefreshing={isRefreshingFixtures}
            onRefreshFixtures={handleRefreshFixtures}
            onViewMatchdayGuide={() => {
              setMatchdayTab('overview');
              setCurrentTab('matchday');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickAction={handleQuickAction}
            onSelectArticle={() => {
              setCurrentTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectFixture={(f) => {
              setActiveFixture(f);
              setMatchdayTab('overview');
              setCurrentTab('matchday');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAffiliateClick={handleAffiliateClick}
          />
        )}

        {currentTab === 'matchday' && (
          <MatchdayView
            fixture={activeFixture}
            venue={activeFixture.venue}
            pubsList={pubs}
            savedPubIds={userProfile.savedPubIds}
            onToggleSavePub={handleToggleSavePub}
            transitUpdates={transitUpdates}
            initialTab={matchdayTab}
            onNavigateToAwayGuide={(venueId) => {
              const ground = stadiums.find(s => s.id === venueId);
              if (ground) {
                setSelectedStadiumForModal(ground);
              }
            }}
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        )}

        {currentTab === 'away-days' && (
          <AwayDaysView
            stadiums={stadiums}
            visitedGroundIds={visitedGroundIds}
            onToggleVisited={handleToggleVisitedGround}
            onSelectStadium={(stadium) => setSelectedStadiumForModal(stadium)}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreView
            guides={guides}
            fanTips={fanTips}
            onAddTip={handleAddFanTip}
            onSelectStadiumId={(stadiumId) => {
              const s = stadiums.find(item => item.id === stadiumId);
              if (s) {
                setSelectedStadiumForModal(s);
              }
            }}
          />
        )}

        {currentTab === 'my-coys' && (
          <MyCoysView
            profile={userProfile}
            onUpdateProfile={(updated) => {
              StorageService.saveUserProfile(updated);
              setUserProfile(updated);
            }}
            pubsList={pubs}
            stadiumsList={stadiums}
            guidesList={guides}
            onSelectPub={(pub) => setSelectedPubForModal(pub)}
            onSelectStadium={(stadium) => setSelectedStadiumForModal(stadium)}
            onToggleVisitedGround={handleToggleVisitedGround}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        fixtures={allFixtures}
        stadiums={stadiums}
        pubs={pubs}
        guides={guides}
        onSelectFixture={(f) => {
          setActiveFixture(f);
          setCurrentTab('matchday');
        }}
        onSelectStadium={(s) => setSelectedStadiumForModal(s)}
        onSelectPub={(p) => setSelectedPubForModal(p)}
        onSelectGuide={() => setCurrentTab('explore')}
      />

      {/* Live Matchday Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onViewTravel={() => {
          setCurrentTab('matchday');
        }}
        onViewTickets={() => {
          setCurrentTab('matchday');
        }}
      />

      {/* Stadium Away Guide Dossier Modal */}
      {selectedStadiumForModal && (
        <StadiumAwayGuideModal
          stadium={selectedStadiumForModal}
          isOpen={Boolean(selectedStadiumForModal)}
          onClose={() => setSelectedStadiumForModal(null)}
          isVisited={visitedGroundIds.includes(selectedStadiumForModal.id)}
          onToggleVisited={(id) => handleToggleVisitedGround(id)}
          onOpenTravel={() => {
            setSelectedStadiumForModal(null);
            setCurrentTab('matchday');
          }}
        />
      )}

      {/* Pub Detail Modal */}
      {selectedPubForModal && (
        <PubDetailModal
          pub={selectedPubForModal}
          isOpen={Boolean(selectedPubForModal)}
          onClose={() => setSelectedPubForModal(null)}
          isSaved={userProfile.savedPubIds.includes(selectedPubForModal.id)}
          onToggleSave={() => handleToggleSavePub(selectedPubForModal.id)}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      )}

      {/* Admin CMS & Moderation Modal */}
      <AdminCMS
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        stadiums={stadiums}
        onAddStadium={(newStadium) => setStadiums([newStadium, ...stadiums])}
        pubs={pubs}
        onAddPub={(newPub) => setPubs([newPub, ...pubs])}
        guides={guides}
        onAddGuide={(newGuide) => setGuides([newGuide, ...guides])}
        fanTips={fanTips}
        onUpdateTipStatus={(id, status) => {
          StorageService.updateFanTipStatus(id, status);
          setFanTips(StorageService.getFanTips());
        }}
        affiliates={affiliates}
        affiliateClicks={affiliateClicks}
      />

      {/* Cloud Firebase Authentication Modal (Google & Email Registration) */}
      <AuthModal />
    </div>
  );
}
