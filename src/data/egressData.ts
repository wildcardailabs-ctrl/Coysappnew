export interface StationEgressInfo {
  id: string;
  name: string;
  line: string;
  operator: string;
  walkMinutesFromStadium: number;
  postMatchQueueMinutes: number;
  preMatchQueueMinutes: number;
  holdingPensActive: boolean;
  frequency: string;
  status: 'smooth' | 'moderate' | 'heavy';
  destinations: string[];
  crowdAdvice: string;
  postMatchStrategy: string;
}

export const STATION_EGRESS_DATABASE: StationEgressInfo[] = [
  {
    id: 'white-hart-lane',
    name: 'White Hart Lane',
    line: 'London Overground',
    operator: 'Transport for London',
    walkMinutesFromStadium: 5,
    postMatchQueueMinutes: 32,
    preMatchQueueMinutes: 6,
    holdingPensActive: true,
    frequency: 'Every 4 - 6 mins (Matchday Extra Trains)',
    status: 'heavy',
    destinations: ['Liverpool Street (via Hackney Downs)', 'Enfield Town', 'Cheshunt'],
    crowdAdvice: 'Love Lane holding pens operate post-match. Queue splits: West Pen for Liverpool St, East Pen for Enfield Town.',
    postMatchStrategy: 'High queue immediately at full-time. Stay 25 mins in the South Stand concourse / Market Place for half-price post-match pints to skip the pens.'
  },
  {
    id: 'northumberland-park',
    name: 'Northumberland Park',
    line: 'Greater Anglia',
    operator: 'Greater Anglia',
    walkMinutesFromStadium: 9,
    postMatchQueueMinutes: 16,
    preMatchQueueMinutes: 4,
    holdingPensActive: false,
    frequency: 'Every 6 - 8 mins (12-car mainline trains)',
    status: 'moderate',
    destinations: ['London Liverpool Street (Direct 14 mins)', 'Stratford', 'Stansted Airport / Cambridge'],
    crowdAdvice: 'Fastest route into Central London or East London. Wide queue lines managed along Park Lane.',
    postMatchStrategy: 'Great alternative to White Hart Lane. Direct express trains to Liverpool Street clear crowds rapidly.'
  },
  {
    id: 'seven-sisters',
    name: 'Seven Sisters',
    line: 'Victoria Line & Overground',
    operator: 'London Underground',
    walkMinutesFromStadium: 25,
    postMatchQueueMinutes: 8,
    preMatchQueueMinutes: 2,
    holdingPensActive: false,
    frequency: 'Every 2 - 3 mins',
    status: 'smooth',
    destinations: ["King's Cross St. Pancras (12 mins)", 'Oxford Circus (16 mins)', 'Victoria', 'Brixton'],
    crowdAdvice: '25-minute brisk walk down Tottenham High Road with hundreds of supporters. Virtually zero ticket barrier queues.',
    postMatchStrategy: 'The insider choice for avoiding standing still in station holding pens. Grab a hot slice along High Road while walking.'
  },
  {
    id: 'tottenham-hale',
    name: 'Tottenham Hale',
    line: 'Victoria Line & Stansted Express',
    operator: 'TfL / Greater Anglia',
    walkMinutesFromStadium: 24,
    postMatchQueueMinutes: 6,
    preMatchQueueMinutes: 3,
    holdingPensActive: false,
    frequency: 'Every 2 - 4 mins',
    status: 'smooth',
    destinations: ['Victoria Line Southbound', 'Stansted Express', 'Cambridge / Bishops Stortford'],
    crowdAdvice: 'Well-lit pedestrian route via Watermead Way and Hale Village.',
    postMatchStrategy: 'Smoothest access for Victoria line passengers heading towards Stratford or Stansted.'
  }
];
