const lotteryRegex = /^[A-Za-z]{2} \d{6}$/g;
const formatRegex = /\s+/g;

const formatLottery = (lottery: string) => {
  let value = lottery.replace(formatRegex, "");
  if (value.length > 2) {
    value = value.slice(0, 2) + " " + value.slice(2);
  }
  return value;
};

const validateLottery = (lottery: string) => {
  return lottery.match(lotteryRegex);
};

const splitTitle = (title: string) => {
  const pattern = /\b\w+\s+Prize/g;
  let result = title.split(":");
  let match = result[0].match(pattern);
  result[0] = match ? match[0] : result[0];
  return result;
};

export default { formatLottery, validateLottery, splitTitle };
