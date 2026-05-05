 "use client"
import css from "./UserBar.module.css";

type User = {
    name: string;
    email: string;
    avatar?: string;
};

type UserBarProps = {
    user: User;
    onLogout: () => void;
    onNavigate?: () => void;
};

export default function UserBar({ user, onLogout, onNavigate}: UserBarProps) {
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
                        <p className={css.userName}>{user.name}</p>
                        <p className={css.userEmail}>{user.email}</p>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label="Вийти з аккаунта"
                    className={css.logoutLink}
                    onClick={() => {
                        onNavigate?.();
                        onLogout();
                    }}
                >
                    <svg height={24} width={24}>
                        <use href="/images/sprite.svg#icon-exit"></use>
                    </svg>
                </button>
            </div>
        </div>
    );
}

