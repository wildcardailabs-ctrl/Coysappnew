import { SupporterBadge } from '../types';

export const INITIAL_SUPPORTER_BADGES: SupporterBadge[] = [
  {
    id: 'badge-first-step',
    title: 'First Step on the High Road',
    description: 'Visited Tottenham Hotspur Stadium for your first recorded match.',
    icon: 'Trophy',
    category: 'milestone',
    unlocked: true,
    unlockedAt: '2025-08-16',
    requiredCount: 1,
    currentCount: 1
  },
  {
    id: 'badge-shelf-side-loyalist',
    title: 'South Stand Die-Hard',
    description: 'Attended 3 matches in the famous single-tier South Stand.',
    icon: 'Award',
    category: 'loyalty',
    unlocked: true,
    unlockedAt: '2025-11-02',
    requiredCount: 3,
    currentCount: 3
  },
  {
    id: 'badge-92-club-apprentice',
    title: 'Away Days Apprentice',
    description: 'Travelled and checked into at least 5 different away grounds.',
    icon: 'Compass',
    category: 'circuit',
    unlocked: false,
    requiredCount: 5,
    currentCount: 3
  },
  {
    id: 'badge-92-club-master',
    title: 'Away Days Legend',
    description: 'Checked into 15+ away grounds following Tottenham on tour.',
    icon: 'Star',
    category: 'circuit',
    unlocked: false,
    requiredCount: 15,
    currentCount: 3
  },
  {
    id: 'badge-high-road-connoisseur',
    title: 'High Road Connoisseur',
    description: 'Saved and reviewed 4 classic Tottenham matchday pubs.',
    icon: 'Beer',
    category: 'loyalty',
    unlocked: true,
    unlockedAt: '2026-01-14',
    requiredCount: 4,
    currentCount: 4
  }
];
