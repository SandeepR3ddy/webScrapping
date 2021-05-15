let url = "https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard" ;
let request = require("request");
let cheerio = require("cheerio");
request(url, cb);
function cb(error, response, html)
{
  if(error){
      console.log(error);
  }
  else{
      //console.log(html);
      Extracthtml(html);
  }
}
function Extracthtml(html)
{
  let selectorTool = cheerio.load(html);
  let batsmenTable = selectorTool(".table.batsman");
  for(let i = 0;i < batsmenTable.length;i++)
  {
      let singleInningBats = selectorTool(batsmenTable[i]).find("tbody tr .batsman-cell.text-truncate");
      for(let j = 0;j < singleInningBats.length;j++)
      {
         console.log(selectorTool(singleInningBats[j]).text());
      }
  } 
  }