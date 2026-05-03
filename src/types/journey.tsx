export type BabyData = {
  image: string;
  size: string;
  description: string;
  fact?: string; 
};

export type MomData = {
  feelings: string;
  tips: string[];
};

export type JourneyData = {
  baby: BabyData;
  mom: MomData;
};