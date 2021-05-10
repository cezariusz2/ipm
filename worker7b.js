onmessage = function (e) {
    
    var x = JSON.parse(e.data);
    console.log(x);
    for(z in x[0]){
        x[0][z] = x[0][z].split('').map(function(c){
            return c === c.toUpperCase()
            ? c.toLowerCase()
            : c.toUpperCase()
          }).join('')
        console.log(x[0][z]);
    }
    postMessage(x);
};