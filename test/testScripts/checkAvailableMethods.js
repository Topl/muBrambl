const LokiJS = require('../index.js')

const loki = new LokiJS('test')
const lokiLayer = LokiJS.Requests()
const gjal = LokiJS.KeyManager('test')

function getAllFuncs(toCheck) {
    var props = [];
    var obj = toCheck;
    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter(function(e, i, arr) { 
       if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true;
    });
}

[loki, lokiLayer, gjal].map(x => console.log(getAllFuncs(x)))