import { SportType } from '../models/activity.model';
import { SPORTS } from '../constants/sports.constants';

export const SPORT_LABELS: Record<SportType, string> = SPORTS.reduce(
  (acc, s) => ({ ...acc, [s.value]: s.label }),
  {} as Record<SportType, string>
);
