import { FacebookLogo } from '@assets/icons/FacebookLogo';
import { GitHubLogo } from '@assets/icons/GitHubLogo';
import { InstagramLogo } from '@assets/icons/InstagramLogo';
import { TwitterLogo } from '@assets/icons/TwitterLogo';
import { LogoModsen } from '@components/LogoModsen/LogoModsen';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <LogoModsen />
          <p className={styles.text}>
            We have images that capture every mood and inspire every vision. From
            breathtaking landscapes to vibrant portrait
          </p>
          <div className={styles.social}>
            <div className={styles.twitter}>
              <TwitterLogo />
            </div>
            <div className={styles.facebook}>
              <FacebookLogo />
            </div>
            <div className={styles.instagram}>
              <InstagramLogo />
            </div>
            <div className={styles.github}>
              <GitHubLogo />
            </div>
          </div>
        </div>
        <div className={styles.company}>
          <p className={styles.head}>COMPANY</p>
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Works</a>
          <a href="#">Career</a>
        </div>
        <div className={styles.help}>
          <p className={styles.head}>HELP</p>
          <a href="#">Customer Support</a>
          <a href="#">Delivery Details</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className={styles.FAQ}>
          <p className={styles.head}>FAQ</p>
          <a href="#">Account</a>
          <a href="#">Manage Deliveries</a>
          <a href="#">Orders</a>
          <a href="#">Payments</a>
        </div>
        <div className={styles.resources}>
          <p className={styles.head}>Resources</p>
          <a href="#">Free eBooks</a>
          <a href="#">Development Tutorial</a>
          <a href="#">How to - Blog</a>
          <a href="#">Youtube Playlist</a>
        </div>
      </div>
      <p className={styles.modsenGallery}>
        Modsen.gallery © 2000-2025, All Rights Reserved
      </p>
    </footer>
  );
};
