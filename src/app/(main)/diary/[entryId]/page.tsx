type Props = {
  params: Promise<{ entryId: string }>;
};

export default async function DiaryEntryPage({ params }: Props) {
  const { entryId } = await params;

  return <h1>Diary Entry Page: {entryId}</h1>;
}
