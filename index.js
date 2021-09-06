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
