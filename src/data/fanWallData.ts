import { MotmCandidate, FanWallPost } from '../types';

export const INITIAL_MOTM_CANDIDATES: MotmCandidate[] = [
  {
    id: 'son-7',
    name: 'Son Heung-min',
    number: 7,
    position: 'FW',
    votes: 428,
    percentage: 35
  },
  {
    id: 'maddison-10',
    name: 'James Maddison',
    number: 10,
    position: 'MF',
    votes: 312,
    percentage: 26
  },
  {
    id: 'van-de-ven-37',
    name: 'Micky van de Ven',
    number: 37,
    position: 'DF',
    votes: 289,
    percentage: 24
  },
  {
    id: 'vicario-1',
    name: 'Guglielmo Vicario',
    number: 1,
    position: 'GK',
    votes: 194,
    percentage: 15
  }
];

export const INITIAL_FAN_WALL_POSTS: FanWallPost[] = [
  {
    id: 'post-1',
    author: 'ParkLane_White',
    badge: 'South Stand ST Holder',
    text: 'Atmosphere in the South Stand is deafening today! Pressing from front to back is relentless. COYS! 🤍',
    timestamp: '5 mins ago',
    likes: 47
  },
  {
    id: 'post-2',
    author: 'HighRoadYid',
    badge: 'Away Day Legend',
    text: 'Micky van de Ven is a cheat code. Running down counter attacks like an Olympic sprinter!',
    timestamp: '12 mins ago',
    likes: 31
  },
  {
    id: 'post-3',
    author: 'NorthLondonLilywhite',
    badge: 'One Hotspur+',
    text: 'Beavertown Neck Oil hitting the spot before second half. Let’s seal the 3 points boys!',
    timestamp: '24 mins ago',
    likes: 19
  }
];
