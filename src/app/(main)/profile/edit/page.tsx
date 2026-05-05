import OnboardingPage from '@/components/onboarding/OnboardingPage/OnboardingPage';
import OnboardingForm from '@/components/onboarding/onboarding-form/OnboardingForm';

export default function OnboardingSection() {
  return (
    <OnboardingPage
      title="Давайте познайомимось ближче"
      imageSrc="/images/onboarding-image.jpg"
    >
      <OnboardingForm />
    </OnboardingPage>
  );
}
