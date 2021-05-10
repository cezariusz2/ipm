onmessage = function (e) {

    var x = JSON.parse(e.data);
    console.log(x);
    // for(z in x[0]){
    //     x[0][z] = x[0][z].split('').map(function(c){
    //         return c === c.toUpperCase()
    //         ? c.toLowerCase()
    //         : c.toUpperCase()
    //       }).join('')
    //     //console.log(x[0][z]);
    // }
    var text = x[0]['combinedString'];
    console.log(text);
    value = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);
        if (ch.toUpperCase() != ch.toLowerCase() || ch.codePointAt(0) > 127) {
            if (ch.toUpperCase() == ch) {
                value += ch.codePointAt(0) - 'A'.codePointAt(0) + 31;
            }
            else {
                value += ch.codePointAt(0) - 'a'.codePointAt(0) + 1;
            }

        }
    }
    var jsonobj = [];
    var item = {};
    var r = value % 255;
    var g = 255 - (value % 255);
    var b = (0.5 * r > 125) ? 99 : 199;
    item['R'] = r;
    item['G'] = g;
    item['B'] = b;
    jsonobj.push(item);
    //console.log(value);
    postMessage(jsonobj);
};