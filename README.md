# Good Match
### By Yasteel Gungapursat


This Program uses a custom node package made to process any two given names
and output a corresponding match percentage.

To Install said node package use the following code
```
npm i yg-good-match
```

A front end is available to use to input two names and view the resulting match percentage.

A Node application can be run from a command window by executing the following line 
```
npm app.js
```

## Basic Functions of Package available

### checkInputs
This function takes in two parameters and returns a JSON string with properties as shown below
```javascript
checkInputs(name1, name2);
```

```JSON
{
      "matchString": matchString,
      "percentageMatch": percentageMatch,
      "message": percentageMatch
}
```

### processCSV
This function takes in data read from a CSV file and returns a string formatted for printing line by line

```javascript
processCSV(data)
```
