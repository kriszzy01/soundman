export const getPercentage = (currentTime: number, duration: number) => {
  let result = (currentTime / duration) * 100;
  return result;
};

export const getSeconds = (value: number) => {
  let result = value / 60;
  return +result.toFixed(2);
};
