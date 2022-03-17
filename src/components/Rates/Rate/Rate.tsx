import classNames from 'classnames/bind';
import getSymbolFromCurrency from 'currency-symbol-map';
import React, { useState } from 'react';
import { IRate } from '../../../types/currency';
import { getPercentageDifference } from '../../../utils';
import { HistoricalRates } from '../HistoricalRates/HistoricalRates';
import styles from './Rate.module.scss';

export const Rate: React.FC<IRate> = ({
  Value,
  Previous,
  Nominal,
  CharCode,
  Name,
}) => {
  const cn = classNames.bind(styles);

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const countryCode = CharCode.slice(0, 2).toLowerCase();
  const change = getPercentageDifference(Value, Previous);
  const flag = `https://flagcdn.com/${countryCode}.svg`;

  const toggleIsHistoryVisible = () => {
    setIsHistoryVisible(visible => !visible);
  };

  return (
    <>
      <tr
        className={styles.rate}
        title={`${Nominal} ${Name} = ${Value} Российских рублей`}
        onClick={toggleIsHistoryVisible}
      >
        <td className={styles.currency} data-label='Название'>
          <img src={flag} alt='' className={styles.flag} />
          <span>{CharCode}</span>
        </td>

        <td className={styles.value} data-label='Цена'>
          <span>{Value.toFixed(2)}₽</span>
          <span className={styles.nominal}>
            {Nominal}
            {getSymbolFromCurrency(CharCode)}
          </span>
        </td>

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

      {isHistoryVisible && (
        <tr>
          <td colSpan={3}>
            <HistoricalRates CharCode={CharCode} />
          </td>
        </tr>
      )}
    </>
  );
};
