import { LogoSvg } from '@/assets/icons/logoIcons/logoSvg';

import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.logoSvg}>
        <LogoSvg />
      </div>
      <p className={styles.gallery}>GALLERY</p>
    </div>
  );
};
