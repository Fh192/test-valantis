import React from 'react';
import logo from '../assets/logo.svg';
import styles from './App.module.scss';
import { Rates } from './Rates/Rates';

export const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt='Логотип' />
        <Rates />
      </div>
    </div>
  );
};
