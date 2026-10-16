export type Language = 'ja' | 'en' | 'zh' | 'ko';

export type RegionId = 'kyoto' | 'tokyo' | 'osaka';

export interface Region {
  id: RegionId;
  name: Record<Language, string>;
  center: [number, number];
}

export interface RuleQuiz {
  id: string;
  regionId: RegionId;
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correctIndex: number;
  explanation: Record<Language, string>;
  pointsReward: number;
}

export interface Spot {
  id: string;
  regionId: RegionId;
  name: Record<Language, string>;
  description: Record<Language, string>;
  lat: number;
  lng: number;
  isPopular: boolean; // true: 有名・高混雑 / false: 穴場・空いている
  pointsReward: number;
}

// 顧客（ユーザー）管理データモデル
export interface UserProfile {
  id: string;
  language: Language;
  selectedRegionId: RegionId | null;
  pointsBalance: number;
  completedQuizIds: string[];
  visitedSpotIds: string[];
  createdAt: string;
}
