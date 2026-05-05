import { useAuthStore } from "@/store/authStore";

export default function AuthBar() {
    const user = useAuthStore((state) => state.user);

    return (
        <div>
            {user ? `Привіт, ${user.name}!` : "UserBar"}
        </div>
    );
}