import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Outlet } from 'react-router';

import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
