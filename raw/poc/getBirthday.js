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
      Extracthtml(html);
  }
}
//function cb1(error, response, html)
//{
 // if(error){
  //    console.log(error);
 // }
 // else{
   //   return html;
  //}
//}
function Extracthtml(html)
{
  let selectorTool = cheerio.load(html);
  let batsmenTable = selectorTool(".table.batsman");
  let bothTeamNames = selectorTool(".Collapsible h5");
  for(let i = 0;i < batsmenTable.length;i++)
  {  
      let singleTeamName = selectorTool(bothTeamNames[i]).text();
      singleTeamName = singleTeamName.split("INNINGS")[0];
      singleTeamName = singleTeamName.trim();
      let singleInningBats = selectorTool(batsmenTable[i]).find("tbody tr .batsman-cell.text-truncate");
      let singleInningBatsLink = selectorTool(batsmenTable[i]).find("tbody tr .batsman-cell.text-truncate a");
      for(let j = 0;j < singleInningBats.length;j++)
      {
         //  let htmlOflinks = request(singleInningBatsLink,cb1);      
          // let $ = cheerio.load(htmlOflinks); 
          // let birthdayPart = $(".player-card-description.gray-900")[1];
          // let birthday = $(birthdayPart).text();
        let IndividualBatsmen = selectorTool(singleInningBats[j]).text();
        let link = selectorTool(singleInningBatsLink[j]).attr("href");
        print(link,IndividualBatsmen,singleTeamName);
        // console.log(IndividualBatsmen,"of",singleTeamName);
     //console.log(link);  
    }
  } 
  }
  function print(link,IndividualBatsmen,singleTeamName)
  {
      link = "https://www.espncricinfo.com" + link; 
      request(link , cb);
      function cb(error,response,html)
      {
          if(error)
          {
        console.log(error);  
        }
        else
        {
            getBirthdays(html,IndividualBatsmen,singleTeamName);
        }
    }
  }
  function getBirthdays(html,IndividualBatsmen,singleTeamName)
  {
     let selectorTool = cheerio.load(html);
     let birthdayElem = selectorTool(".player-card-description.gray-900");
     let birthday = selectorTool(birthdayElem[1]).text();
     console.log("name", IndividualBatsmen,"plays for",singleTeamName,"birthday",birthday);
  }