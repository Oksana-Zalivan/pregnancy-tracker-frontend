import styles from './GreetingBlock.module.css';

interface GreetingBlockProps {
  userName?: string;
}

const GreetingBlock = ({ userName }: GreetingBlockProps) => {
  // Основне привітання: "Вітаю, Ганно!". 
  // Логіка для незареєстрованого користувача:
  const greetingText = userName ? `Доброго ранку, ${userName}!` : "Доброго ранку!";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{greetingText}</h1>
    </div>
  );
};

export default GreetingBlock;