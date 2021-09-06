(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var form_1 = document.getElementById('form_1');
var name1 = document.getElementById('name1');
var name2 = document.getElementById('name2');


const goodmatch = require('yg-good-match');

form_1.addEventListener('submit', function(e)
{
    e.preventDefault();
    var result = JSON.parse(goodmatch.checkInputs(name1.value, name2.value));
    document.getElementsByClassName('match')[0].innerHTML = result.matchString + `<span class="match_percent"> ${result.percentageMatch}%</span> ${result.message}`;
});

},{"yg-good-match":2}],2:[function(require,module,exports){
function check_inputs(name1, name2)
{
  var letters = /^[A-Za-z]+$/;

  if(name1.match(letters) && name2.match(letters))
  {
    var matchString = `${name1} matches ${name2}`;
    var charCount = get_char_count_string(matchString);
    var percentageMatch = get_match_percentage(charCount);

    var obj =
    {
      "matchString": matchString,
      "percentageMatch": percentageMatch,
      "message": percentageMatch >= 80 ? ', good match' : ''
    };

    return JSON.stringify(obj);
  }
  else
  {
    alert('Make Sure inputs are only alphabetic');
  }
}

function get_char_count_string(matchString)
{
  matchString = matchString.replaceAll(' ','');

  var charCountString = '';
  while(matchString.length > 0)
  {
    var charCount = 1
    if(matchString.length > 1)
    {
      for(let i=1; i<matchString.length; i++)
      {
          if(matchString[i] == matchString[0])
          {
            charCount++;
          }
      }
    }
    charCountString += charCount;
    matchString = matchString.replaceAll(matchString[0], '');
  }
  return charCountString;
}

function get_match_percentage(charCount)
{
  var newCharCount = '';
  var length;

  if(charCount.length == 2)
  {
    return charCount;
  }

  if(charCount.length % 2 == 0)
  {
    length = charCount.length;
    for(let i=0; i<charCount.length/2; i++)
    {
      newCharCount += (parseInt(charCount[i]) + parseInt(charCount[length - 1 - i]));
    }
  }
  else if(charCount.length % 2 == 1)
  {
    length = charCount.length;
    for(let i=0; i<(charCount.length - 1)/2; i++)
    {
      newCharCount += (parseInt(charCount[i]) + parseInt(charCount[length - 1 - i]));
    }

    let remIdx = (charCount.length - 1) / 2;
    newCharCount += charCount[remIdx];
  }
  return get_match_percentage(newCharCount);
}

function processCSV(data)
{
  var males = [], females = [];

    var lines = (data.trim()).split(/\r\n|\n/);
    lines.forEach(line =>
    {
      if((line.split(',')[1].trim().toLowerCase()) == "m")
      {
        let inArray = false;
        for (var i = 0; i < males.length; i++)
        {
          if(males[i] == line.split(',')[0])
          {
            inArray = true;
          }
        }
        if(!inArray)
        {
          males.push(line.split(',')[0]);
        }
      }
      else
      {
        let inArray = false;
        for (var i = 0; i < females.length; i++)
        {
          if(females[i] == line.split(',')[0])
          {
            inArray = true;
          }
        }
        if(!inArray)
        {
          females.push(line.split(',')[0]);
        }
      }
    });
    var proccessedData = match_arrays(males, females);
    return getDataString(proccessedData);
}

function match_arrays(males, females)
{
  var someArr = [];
  males.forEach(male =>
  {
    females.forEach(female =>
    {
      let matchString = `${male} matches ${female}`;
      let charCount = get_char_count_string(matchString);
      let percentageMatch = parseInt(get_match_percentage(charCount));

      someArr.push(
        {
          "matchString": matchString,
          "percentageMatch": percentageMatch,
          "message": percentageMatch >= 80 ? ', good match' : ''
        });
    });
  });

  //sorting array
  for(let i=0; i<someArr.length-1; i++)
  {
    for(let j=i+1; j<someArr.length; j++)
    {
      if(someArr[i].percentageMatch < someArr[j].percentageMatch)
      {
        let temp = someArr[i];
        someArr[i] = someArr[j];
        someArr[j] = temp;
      }
      else if(someArr[i].percentageMatch == someArr[j].percentageMatch)
      {
        if(someArr[i].matchString > someArr[j].matchString)
        {
          let temp = someArr[i];
          someArr[i] = someArr[j];
          someArr[j] = temp;
        }
      }
    }
  }

  return someArr;
}

function getDataString(arr)
{
  var str = "";

  arr.forEach(item =>
  {
    str += `${item.matchString} \t${item.percentageMatch}% ${item.message}\n`;
  });

  return str.trim();
}

module.exports.checkInputs = check_inputs;
module.exports.getCharCount = get_char_count_string;
module.exports.getMatchPercentage = get_match_percentage;
module.exports.processCSV = processCSV;
module.exports.matchArrays = match_arrays;

},{}]},{},[1]);
