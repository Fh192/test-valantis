import React from 'react';
import { useSelector } from '../../../hooks';
import { IHistoricalRate } from '../../../types/currency';
import { Preloader } from '../../shared';
import { HistoricalRate } from './HistoricalRate/HistoricalRate';
import styles from './HistoricalRates.module.scss';

interface Props {
  CharCode: string;
}

export const HistoricalRates: React.FC<Props> = ({ CharCode }) => {
  const { historicalRates } = useSelector(s => s.currency);
  const rates = historicalRates
    .map(rates => rates.find(rate => rate.CharCode === CharCode))
    .filter((item): item is IHistoricalRate => !!item);

  return (
    <table className={styles.historicalRates}>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Цена</th>
          <th>Изменение</th>
        </tr>
      </thead>
      <tbody>
        {rates.length ? (
          rates.map(rate => (
            <HistoricalRate {...rate} key={rate.ID + rate.Date} />
          ))
        ) : (
          <tr>
            <td className={styles.preloader} colSpan={3}>
              <Preloader size='40px' />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
