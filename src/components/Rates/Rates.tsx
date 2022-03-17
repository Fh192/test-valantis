import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import {
  getHistoricalRates,
  getRates,
} from '../../store/reducers/currencySlice';
import { Preloader } from '../shared';
import { Rate } from './Rate/Rate';
import styles from './Rates.module.scss';

export const Rates: React.FC = () => {
  const dispatch = useDispatch();
  const { rates } = useSelector(s => s.currency);

  useEffect(() => {
    dispatch(getRates()).then(() => {
      dispatch(getHistoricalRates());
    });
  }, [dispatch]);

  return (
    <table className={styles.rates}>
      <thead className={styles.thead}>
        <tr>
          <th>Название</th>
          <th>Цена</th>
          <th>Изменение</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {rates.length ? (
          rates.map(rate => <Rate {...rate} key={rate.ID} />)
        ) : (
          <tr className={styles.preloader}>
            <td colSpan={3}>
              <Preloader size='40px' />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
