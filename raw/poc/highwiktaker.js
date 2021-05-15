let url = "https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard" 
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
function Extracthtml(html){
    let selectorTool = cheerio.load(html);
    let bothInningsBowler = selectorTool(".table.bowler");
    let highwicketname = "";
    let highestWickets = 0;
     for(let i = 0;i < bothInningsBowler.length;i++)
     {
      let individualInnBowlersdata = selectorTool(bothInningsBowler[i]).find("tbody tr");
      for(let j = 0;j < individualInnBowlersdata.length;j++)
      {
       let eachBowlerStats = selectorTool(individualInnBowlersdata[j]).find("td");
      let name = selectorTool(eachBowlerStats[0]).text();
      let wickets = selectorTool(eachBowlerStats[4]).text();
      //console.log("name->",name,"wickets->",wickets);
       if(highestWickets <= wickets)
       {
          highestWickets = wickets;
          highwicketname = name;
       }
    }
    // console.log("///////////////");
    }
    console.log(highwicketname,":",highestWickets);
}