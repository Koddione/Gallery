import { Logo } from '@/components/Logo/Logo';
import { footerSections, socialLinks } from '@/constants/footerData';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <Logo />
          <p className={styles.text}>
            We have images that capture every mood and inspire every vision. From
            breathtaking landscapes to vibrant portrait
          </p>
          <div className={styles.social}>
            {socialLinks.map(({ component: Component, name }) => (
              <div key={name} className={styles[name]}>
                {<Component />}
              </div>
            ))}
          </div>
        </div>
        {footerSections.map(({ title, links }) => (
          <div key={title} className={styles[title.toLowerCase()]}>
            <p className={styles.head}>{title}</p>
            {links.map((link, id) => (
              <a key={id} href="#">
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};
