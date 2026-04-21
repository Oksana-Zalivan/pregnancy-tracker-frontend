type Props = {
  params: Promise<{ weekNumber: string }>;
};

export default async function JourneyWeekPage({ params }: Props) {
  const { weekNumber } = await params;

  return <h1>Journey Week Page: {weekNumber}</h1>;
}
