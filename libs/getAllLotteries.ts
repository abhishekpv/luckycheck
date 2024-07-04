import axios from "axios";
import cheerio from "cheerio";

const url = "https://statelottery.kerala.gov.in/index.php/lottery-result-view";
export const getAllLotteries = async () => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const rows: any = [];

  $("tbody tr").each((index, element) => {
    const row: any = {};
    row.title = $(element).find("td.text-left").text().trim();
    row.date = $(element).find("td:nth-child(2)").text().trim();
    row.link = $(element).find("td a").attr("href");
    row.id = row.link.split("=")[1];
    rows.push(row);
  });

  return { sucess: true, count: rows.length, data: rows };
};
