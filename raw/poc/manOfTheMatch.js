let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let request = require("request");
let cheerio = require("cheerio");
request(url, cb);
function cb(error,response,html)
{
  if(error)
  {
      console.log(error);
  }
else
{
    extractHtml(html);
}
}
function extractHtml(html)
{
let selectorTool = cheerio.load(html);
let allLinkElems = selectorTool(".match-info-link-FIXTURES");
//console.log(allLinkElems.length);
for(let i = 0;i < allLinkElems.length;i++)
{
     let allLinks = selectorTool(allLinkElems[i]).attr("href");
     allLinks = "https://www.espncricinfo.com" + allLinks;
     print(allLinks);
}
}
function print(IndividualLink)
{
  request(IndividualLink, function (error,response,html)
  {
      getManofMatch(html);
  }
  )
}
function getManofMatch(html)
{
 let selectorTool = cheerio.load(html);
 let name = selectorTool(".best-player-name").text();
 let teamName = selectorTool(".best-player-team-name").text();  
 console.log(name+" of "+teamName);
}