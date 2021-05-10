onmessage = function (e) {

    var x = JSON.parse(e.data);
    var text = x[0]['combinedString'];
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