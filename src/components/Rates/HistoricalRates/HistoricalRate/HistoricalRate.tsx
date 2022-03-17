import classNames from 'classnames/bind';
import React from 'react';
import { IHistoricalRate } from '../../../../types/currency';
import { getPercentageDifference } from '../../../../utils';
import styles from './HistoricalRate.module.scss';

export const HistoricalRate: React.FC<IHistoricalRate> = ({
  Date: dt,
  Value,
  Previous,
}) => {
  const cn = classNames.bind(styles);

  const change = getPercentageDifference(Value, Previous);
  const date = new Date(dt).toLocaleDateString();

  return (
    <tr className={styles.historicalRate}>
      <td data-label='Дата'>{date}</td>
      <td data-label='Ценна'>{Value.toFixed(2)}₽</td>
      <td
        className={cn('change', {
          positive: change[0] === '+',
          negative: change[0] === '-',
        })}
        data-label='Изменение'
      >
        {change}
      </td>
    </tr>
  );
};
