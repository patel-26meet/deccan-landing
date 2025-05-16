import { IStatsItem } from '@/interfaces/components/Statistics';

export const statsData: IStatsItem[] = [
  {
    val: '3000',
    description: 'Paid out to experts',
    isMillions: true,
    prefix: '$',
  },
  {
    val: '1000',
    description: 'Tasks completed successfully',
    isMillions: true,
    noDecimals: true,
  },
  {
    val: '700',
    description: 'Professionals across 60+ domains',
    suffix: 'K+',
  },
  {
    val: '53',
    description: 'PhDs collaborating on AI projects',
    suffix: 'K+',
  },
];
