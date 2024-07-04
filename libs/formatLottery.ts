const lotteryRegex = /^[A-Za-z]{2} \d{6}$/g;
const formatRegex = /\s+/g;

export const formatLottery = (lottery: string) => {
  let value = lottery.replace(formatRegex, "");
  if (value.length > 2) {
    value = value.slice(0, 2) + " " + value.slice(2);
  }
  return value;
};

export const validateLottery = (lottery: string) => {
  return lottery.match(lotteryRegex);
};
