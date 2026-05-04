export type BabyData = {
  analogy: string | null;
  weekNumber: number;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
};

export type MomFeelingData = {
  states: string[];
  sensationDescr: string;
};

export type ComfortTip = {
  category: string;
  tip: string;
};

export type MomData = {
  weekNumber: number;
  feelings: MomFeelingData;
  comfortTips: ComfortTip[];
};

export type JourneyData = {
  baby: BabyData;
  mom: MomData;
};