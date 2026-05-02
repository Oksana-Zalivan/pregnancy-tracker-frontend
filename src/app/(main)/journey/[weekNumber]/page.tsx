"use client";
import axios from "axios";
import { useState, use, useEffect } from "react";
import Image from "next/image"; // Оптимізація зображень
import Breadcrumbs from "@/components/layout/breadcrumbs/Breadcrumbs";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import TasksReminderCard from "@/components/tasks/TasksReminderCard/TasksReminderCard";
import JourneyWeeksNavigation from "./JourneyWeeksNavigation";
import s from "./JourneyPage.module.css";

// Додаємо інтерфейси для типізації даних
interface JourneyData {
  image?: string;
  analogy?: string;
  babyDevelopment?: string;
  interestingFact?: string;
  feelings?: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips?: Array<{
    category: string;
    tip: string;
  }>;
}

interface PageProps {
  params: Promise<{ weekNumber: string }>;
}

export default function JourneyPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const weekFromUrl = Number(resolvedParams.weekNumber) || 1;

  const [activeTab, setActiveTab] = useState<"baby" | "mom">("baby");

  const [data, setData] = useState<JourneyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint =
          activeTab === "baby"
            ? `/api/weeks/${weekFromUrl}/baby`
            : `/api/weeks/${weekFromUrl}/mom-body`;

        // Використовуємо Axios
        const response = await axios.get(endpoint);

        // Axios автоматично парсить JSON, дані вже в response.data
        setData(response.data);
      } catch (error) {
        // Axios кидає помилку автоматично, якщо статус не 2xx
        console.error("Помилка завантаження через axios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [weekFromUrl, activeTab]);

  return (
    <div className={s.pageContainer}>
      <Breadcrumbs />

      {/* Прибираємо userName, якщо він не використовується, щоб не дратувати лінтер */}
      <GreetingBlock userName="Ганна" />

      <section className={s.weeksSection}>
        <JourneyWeeksNavigation currentWeek={weekFromUrl} />
      </section>

      <div className={s.tabsWrapper}>
        <button
          className={`${s.tabButton} ${activeTab === "baby" ? s.active : ""}`}
          onClick={() => setActiveTab("baby")}
        >
          Розвиток малюка
        </button>
        <button
          className={`${s.tabButton} ${activeTab === "mom" ? s.active : ""}`}
          onClick={() => setActiveTab("mom")}
        >
          Тіло мами
        </button>
      </div>

      <div className={s.contentArea}>
        {loading ? (
          <div className={s.loader}>Завантаження...</div>
        ) : activeTab === "baby" ? (
          <div className={s.babyCard}>
            <div className={s.babyInfoWrapper}>
              <div className={s.imageContainer}>
                {/* Використовуємо Next.js Image для LCP */}
                <Image
                  src={data?.image || "/images/placeholder-baby.png"}
                  alt="Малюк"
                  width={400}
                  height={300}
                  priority // Пріоритет завантаження для головного фото
                  className={s.babyImage}
                />
                <p className={s.imageSub}>
                  Ваш малюк зараз розміром з {data?.analogy}
                </p>
              </div>
              <div className={s.babyTextContent}>
                <p className={s.babyDescription}>{data?.babyDevelopment}</p>
                <div className={s.factBlock}>
                  <h4>
                    <Image
                      src="/icons/star.svg"
                      alt="star"
                      width={20}
                      height={20}
                    />
                    Цікавий факт тижня
                  </h4>
                  <p>{data?.interestingFact}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.momGrid}>
            <div className={s.mainCol}>
              <section className={s.feelingsBlock}>
                <h3>Як ви можете почуватись</h3>
                <div className={s.tags}>
                  {data?.feelings?.states.map((tag) => (
                    <span key={tag} className={s.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className={s.sensationDescr}>
                  {data?.feelings?.sensationDescr}
                </p>
              </section>

              <section className={s.comfortTips}>
                <h3>Поради для вашого комфорту</h3>
                <div className={s.tipsList}>
                  {data?.comfortTips?.map((item, index) => (
                    <div key={index} className={s.tipItem}>
                      <Image
                        src={`/icons/${item.category.toLowerCase()}.svg`}
                        alt={item.category}
                        width={24}
                        height={24}
                      />
                      <div>
                        <strong>{item.category}</strong>
                        <p>{item.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className={s.sideCol}>
              <TasksReminderCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
