const goodMatch = require('yg-good-match');

var fs = require('fs');
var readme = fs.readFile('people.csv', 'utf8', function(err,data)
{
  var csvData = goodMatch.processCSV(data);
  fs.writeFileSync('Output.txt', csvData);
  console.log('Done!!');
});
