"use client";

import { useState } from "react";
import styles from "./JourneyDetails.module.css";
import { Loader } from "@/components/shared/loader/Loader";
import { Tabs } from "./Tabs";
import { BabyTab } from "./BabyTab";
import { MomTab } from "./MomTab";
import { JourneyData } from "@/types/journey";

type Props = {
  data: JourneyData;
  isLoading: boolean;
};

export const JourneyDetails = ({ data, isLoading }: Props) => {
  const [tab, setTab] = useState<"baby" | "mom">("baby");

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <Tabs active={tab} onChange={setTab} />

      {tab === "baby" ? (
        <BabyTab data={data.baby} />
      ) : (
        <MomTab data={data.mom} />
      )}
    </div>
  );
};