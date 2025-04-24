import { ModsenLogoM } from '../../assets/icons/modsenLogoIcons/ModsenLogoM';
import { ModsenLogoRest } from '../../assets/icons/modsenLogoIcons/ModsenLogoRest';
import styles from './LogoModsen.module.css';

export const LogoModsen = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.Modsen}>
        <div className={styles.M}>
          <ModsenLogoM />
        </div>

        <ModsenLogoRest className={styles.orangeCircl} />
      </div>
      <p className={styles.gallery}>GALLERY</p>
    </div>
  );
};
