import { MatchdayTimelineItem } from '../types';

export const DEFAULT_MATCHDAY_TIMELINE: MatchdayTimelineItem[] = [
  {
    id: 'tl-1',
    time: '12:00',
    title: 'Leave Home / Transit Departure',
    description: 'Begin journey via Victoria Line (Seven Sisters) or London Overground (White Hart Lane). Allow extra time for matchday crowds.',
    type: 'coys',
    location: 'Central London / Home',
    iconType: 'leave'
  },
  {
    id: 'tl-2',
    time: '13:30',
    title: 'Pre-Match Pub Meetup',
    description: 'Arrive at The Bricklayers Arms or The Beehive for early pints, classic Spurs chants, and pre-match atmosphere.',
    type: 'coys',
    location: 'High Road, Tottenham',
    iconType: 'pub'
  },
  {
    id: 'tl-3',
    time: '14:45',
    title: 'Matchday Food',
    description: 'Grab Chick-King wings or enjoy the artisan street food stalls along the High Road and Park Lane.',
    type: 'coys',
    location: '753 High Road',
    iconType: 'food'
  },
  {
    id: 'tl-4',
    time: '15:15',
    title: 'Head Towards The Stadium',
    description: 'Begin stroll towards your designated entrance turnstile. Digital tickets ready on phone wallet.',
    type: 'coys',
    location: 'Worcester Avenue / Park Lane',
    iconType: 'walk'
  },
  {
    id: 'tl-5',
    time: '15:30',
    title: 'Stadium Gates & Turnstiles Open',
    description: 'OFFICIAL: All general admission turnstiles open 2 hours before kickoff. Concourse early bird food & drink discounts apply until 15:45.',
    type: 'official',
    location: 'Tottenham Hotspur Stadium Turnstiles',
    iconType: 'enter'
  },
  {
    id: 'tl-6',
    time: '16:00',
    title: 'Warm-Ups & Team Announcements',
    description: 'Players take the pitch for warmups. Watch the light show and sing along to "Can’t Smile Without You".',
    type: 'official',
    location: 'Bowl / Pitchside',
    iconType: 'enter'
  },
  {
    id: 'tl-7',
    time: '16:30',
    title: 'Kick-Off: Match Underway in N17',
    description: 'The whistle blows and the match gets underway at Tottenham Hotspur Stadium. COYS!',
    type: 'official',
    location: 'Pitch',
    iconType: 'kickoff'
  },
  {
    id: 'tl-8',
    time: '18:25',
    title: 'Post-Match Hospitality & Pints',
    description: 'Concourses and The Goal Line Bar remain open for up to two hours with live music while train queues ease.',
    type: 'coys',
    location: 'Goal Line Bar / South Stand concourse',
    iconType: 'postmatch'
  }
];
