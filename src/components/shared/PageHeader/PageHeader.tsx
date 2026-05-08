import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import GreetingBlock from '@/components/dashboard/GreetingBlock/GreetingBlock';
import styles from './PageHeader.module.css';

export default function PageHeader() {
  return (
    <div className={styles.pageHeader}>
      <Breadcrumbs />
      <GreetingBlock />
    </div>
  );
}
