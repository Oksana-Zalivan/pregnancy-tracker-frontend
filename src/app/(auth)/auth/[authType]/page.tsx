type Props = {
  params: Promise<{ authType: string }>;
};

export default async function AuthPage({ params }: Props) {
  const { authType } = await params;

  return <h1>Auth Page: {authType}</h1>;
}
