import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import css from "./UserBar.module.css";

type UserBarProps = {
  onLogout: () => void;
};

export default function UserBar({ onLogout }: UserBarProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={css.userBar}>
      <div className={css.divider}></div>

      <div className={css.userBarRow}>
        <div className={css.Profile}>
          <img
            className={css.avatar}
                      src={user?.avatar || "/images/placeholder-avatar.jpg"}
                        alt="User Avatar"
          />
          <div className={css.avatarContent}>
            <p className={css.userName}>{user?.name}</p>
            <p className={css.userEmail}>{user?.email}</p>
          </div>
        </div>

        <button className={css.logoutLink} onClick={onLogout}>
          <svg height={24} width={24}>
            <use href="/images/sprite.svg#icon-exit"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}