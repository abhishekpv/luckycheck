import axios from "axios";
// const PdfParse = require("pdf-parse");
const categoryRegex =
  /\d+(st|nd|rd|th) Prize Rs\s*:\s*[\d,\/-]+|Cons Prize-Rs\s*:\s*[\d,\/-]+/g;
const secondaryCategoryRegex = /\d+(st|nd|rd|th) Prize-Rs\s*:\s*[\d,\/-]+/g;
const footerRegex = /Page.*?\n/g;
const lotteryRegex = /[a-zA-Z]+\s+\d+/g;

const url =
  "https://result.keralalotteries.com/viewlotisresult.php?drawserial=";

const downloadPdf = async (url: string) => {
  const downloadedPdf = await axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .catch((err) => {
      console.log("error", err);
    });
  if (downloadedPdf?.data.length == 0) {
    return false;
  }
  const fileData = Buffer.from(downloadedPdf?.data, "utf8");
  return fileData;
};

const formatData = (result: any, matches: any) => {
  const output = [];
  for (let i = 0; i < matches.length - 1; i++) {
    let startIndex = result.indexOf(matches[i]);
    if (startIndex === -1) return "";
    startIndex += matches[i].length;

    let endIndex = result.indexOf(matches[i + 1], startIndex);
    if (endIndex === -1) return "";

    output.push({
      title: matches[i],
      data: result.substring(startIndex, endIndex),
    });
  }

  output.push({
    title: matches[matches.length - 1],
    data: result.split(matches[matches.length - 1])[1],
  });
  return output;
};

const fetchMainPrize = (data: any) => {
  const result = data.split("THIRUVANANTHAPURAM")[1];
  const matches = result.match(categoryRegex);
  const output: any = formatData(result, matches);

  return output.map((item: any) => {
    return { ...item, data: item.data.match(lotteryRegex) };
  });
};

const fetchSecondaryPrize = (data: any) => {
  const result = data.split("The prize winners")[0];
  const matches = result.match(secondaryCategoryRegex);
  const output: any = formatData(result, matches);
  return output.map((item: any) => {
    const data = item.data.replace(/\n/g, "").trim();
    const splitData = [];
    for (let i = 0; i < data.length; i += 4) {
      splitData.push(data.substring(i, i + 4));
    }
    return { ...item, data: splitData };
  });
};

const parseDataFromText = (data: any) => {
  const categorisedData = data
    .replace(footerRegex, "")
    .split("FOR THE TICKETS ENDING WITH THE FOLLOWING NUMBERS");
  const mainPrize = fetchMainPrize(categorisedData[0]);
  const secondaryPrize = fetchSecondaryPrize(categorisedData[1]);
  return { mainPrize, secondaryPrize };
};

const findLottery = (data: any, lottery: any) => {
  let found = false;
  const result: any = {};
  data.mainPrize.map((item: any) => {
    if (item.data.includes(lottery)) {
      found = true;
      result.lottery = lottery;
      result.title = item.title;
      result.category = "mainPrize";
      result.data = item.data;
    }
  });
  if (!found) {
    data.secondaryPrize.map((item: any) => {
      if (item.data.includes(lottery)) {
        found = true;
        result.lottery = lottery;
        result.title = item.title;
        result.category = "secondaryPrize";
        result.data = item.data;
      }
    });
  }
  if (!found) {
    return false;
  }
  return result;
};

const extractFileData = async (pdf: any, lottery: any) => {
  //   const parsedPdf = await PdfParse(pdf);
  const parsedPdf = { text: "string" };
  const lotteryData = parseDataFromText(parsedPdf.text);
  if (lottery) {
    const winnerData = findLottery(lotteryData, lottery);
    if (!winnerData) {
      return {
        lotteryStatus: { status: "There is no prize for this lottery." },
        ...lotteryData,
      };
    }
    return { lotteryStatus: winnerData, ...lotteryData };
  }
  return lotteryData;
};

export const findWinner = async (pdf: string, lottery?: string) => {
  if (!pdf) {
    let message = "";
    if (!pdf) {
      message = "No pdf id provided.";
    } else {
      message = "No lottery no provided.";
    }
    return {
      success: false,
      error: message,
    };
  }
  const downloadedPdf = await downloadPdf(url + pdf);
  if (!downloadedPdf) {
    return {
      success: false,
      error: "No pdf found.",
    };
  }
  const result = await extractFileData(downloadedPdf, lottery);
  return {
    success: true,
    data: result,
  };
};
