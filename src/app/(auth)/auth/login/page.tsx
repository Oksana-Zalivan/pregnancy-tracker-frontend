import AuthPage from "@/components/auth/AuthPage/AuthPage";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <AuthPage title="Вхід" imageSrc="/images/login-image.jpg">
      <LoginForm />
    </AuthPage>
  );
}
