export const getPercentageDifference = (num1: number, num2: number) => {
  const difference = +((num2 / num1 - 1) * 100).toFixed(2);

  return difference > 0 ? `+${difference}%` : `${difference}%`;
};
