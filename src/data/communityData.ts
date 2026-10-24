import { FanTip, UserReview, AffiliatePartner } from '../types';

export const INITIAL_FAN_TIPS: FanTip[] = [
  {
    id: 'tip-1',
    authorName: 'Harry_N17',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    venueId: 'tottenham-hotspur-stadium',
    venueName: 'Tottenham Hotspur Stadium',
    category: 'travel',
    content: 'After full-time, the queues for White Hart Lane can stretch 45 minutes down the street. If you need the Victoria Line, walking 15-20 mins straight down the High Road to Seven Sisters is often much faster and keeps you moving!',
    createdAt: '2026-09-18',
    upvotes: 48,
    status: 'APPROVED'
  },
  {
    id: 'tip-2',
    authorName: 'SpursGirl94',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    venueId: 'bricklayers-arms',
    venueName: 'The Bricklayers Arms',
    category: 'pub',
    content: 'If you want a spot in the beer garden at The Bricklayers, arrive at least 3 hours before kickoff. Bring cash or a card ready for the outdoor bottle bar to skip the inside queues!',
    createdAt: '2026-09-15',
    upvotes: 39,
    status: 'APPROVED'
  },
  {
    id: 'tip-3',
    authorName: 'DaveySpurs',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    venueId: 'tottenham-hotspur-stadium',
    venueName: 'Tottenham Hotspur Stadium',
    category: 'food',
    content: 'The Beavertown Neck Oil taps inside the South Stand Goal Line Bar pour in under 3 seconds using the bottom-up magnet cups. Do not pick at the magnet until you have finished your drink!',
    createdAt: '2026-09-10',
    upvotes: 62,
    status: 'APPROVED'
  },
  {
    id: 'tip-4',
    authorName: 'AwayLadMark',
    authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
    venueId: 'old-trafford',
    venueName: 'Old Trafford (Manchester United Away)',
    category: 'travel',
    content: 'For travelling Spurs fans at Old Trafford: take the Metrolink tram to Exchange Quay or Wharfside instead of Old Trafford station to completely bypass home fan congestion on matchday.',
    createdAt: '2026-09-12',
    upvotes: 54,
    status: 'APPROVED'
  }
];

export const INITIAL_USER_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    authorName: 'Steve M.',
    venueId: 'bricklayers-arms',
    venueName: 'The Bricklayers Arms',
    rating: 5,
    atmosphere: 5,
    service: 5,
    comment: 'Unbelievable matchday energy. Nothing compares to the singing in the beer garden when the sun is out.',
    date: '14 Sep 2026',
    status: 'APPROVED'
  },
  {
    id: 'rev-2',
    authorName: 'Chloe T.',
    venueId: 'the-beehive',
    venueName: 'The Beehive',
    rating: 5,
    atmosphere: 5,
    service: 4,
    comment: 'Great outdoor screen and burgers. Staff work exceptionally hard to keep the queues moving.',
    date: '10 Sep 2026',
    status: 'APPROVED'
  },
  {
    id: 'rev-3',
    authorName: 'Paul G.',
    venueId: 'the-high-cross',
    venueName: 'The High Cross',
    rating: 4,
    atmosphere: 4,
    service: 5,
    comment: 'Charming micro-pub walking up from Seven Sisters. Much more relaxed than the High Road mega-pubs.',
    date: '02 Sep 2026',
    status: 'APPROVED'
  }
];

export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    id: 'trainline',
    name: 'Trainline',
    category: 'Travel',
    logo: 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=200&q=80',
    headline: 'Matchday Rail & Split Tickets',
    ctaText: 'Book Train Tickets',
    targetUrl: 'https://www.thetrainline.com/?utm_source=coys_matchday_companion',
    badge: 'Save up to 61%',
    commissionRate: '3.5%',
    active: true
  },
  {
    id: 'justpark',
    name: 'JustPark',
    category: 'Parking',
    logo: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=200&q=80',
    headline: 'Guaranteed Matchday Driveway Parking',
    ctaText: 'Reserve Parking',
    targetUrl: 'https://www.justpark.com/search/?q=Tottenham+Hotspur+Stadium&utm_source=coys',
    badge: '100% Reserved',
    commissionRate: '8.0%',
    active: true
  },
  {
    id: 'booking-com',
    name: 'Booking.com',
    category: 'Hotels',
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
    headline: 'Spurs Away Day Hotels',
    ctaText: 'Find Supporter Hotels',
    targetUrl: 'https://www.booking.com/?aid=coys_matchday',
    badge: 'Free Cancellation',
    commissionRate: '4.0%',
    active: true
  },
  {
    id: 'spurs-shop',
    name: 'Spurs Official Shop',
    category: 'Merchandise',
    logo: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
    headline: 'Official Nike Match Kits & Gear',
    ctaText: 'Shop Lilywhites Gear',
    targetUrl: 'https://shop.tottenhamhotspur.com/?utm_source=coys_app',
    badge: 'Official Club Store',
    commissionRate: '5.0%',
    active: true
  }
];
