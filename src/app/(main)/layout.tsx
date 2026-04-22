import MainLayout from "@/components/layout/main-layout/main-layout";

export default function MainSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
