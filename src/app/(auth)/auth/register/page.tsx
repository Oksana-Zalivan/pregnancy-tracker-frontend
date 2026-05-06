import AuthPage from "@/components/auth/AuthPage/AuthPage";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
  return (
    <AuthPage title="Реєстрація" imageSrc="/images/signup-image.jpg">
      <RegistrationForm />
    </AuthPage>
  );
}
