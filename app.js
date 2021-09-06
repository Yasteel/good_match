const goodMatch = require('yg-good-match');

var fs = require('fs');
var readme = fs.readFile('people.csv', 'utf8', function(err,data)
{
  if(err)
  {
    console.log('\nNo file Found, Please place csv file in Root Folder !!');
  }
  else
  {
    var csvData = goodMatch.processCSV(data);
    fs.writeFileSync('Output.txt', csvData);
    console.log('\nDone!\nView File "Output.txt" for results');
  }
});
