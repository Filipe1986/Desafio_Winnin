
var moment = require('moment'); 
var date = moment('2016-10-11 18:06:03').format();
 

console.log(typeof new Date().getTime());
console.log(moment(date).format("DD/MM/YY HH:MM:ss"));
console.log(Date.parse( moment(date).format("DD/MM/YY HH:MM:ss")));
console.log(moment(date).format("YYYY-MM-DDTHH:MM:ss")); // for milliseconds
console.log(moment(date).format("L"));
console.log(moment(date).format("l"));