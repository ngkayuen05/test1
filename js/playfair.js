function genKey() {
    /*
    var store = "";
    var temp = "";
    var key = document.getElementById("keyword").value;
    var input_key = key.toUpperCase();
    var i, j, x, y;

    for (i = 0; i < input_key.length; i++) { //check any double word in input 
        for (j = i + 1; j < input_key.length; j++) {
            if (input_key[i] == input_key[j]) {
                i += 1;
                break;
            }
        }
        temp += input_key[i];
    }

    for (x = 0; x < 25; x++) { //整走keywords
        for (y = 0; y < temp.length; y++) {
            if (abc[x] == temp[y]) {
                x += 1;
                break;
            }
        }
        store += abc[x];
    }
    
    document.getElementById("keyString").innerHTML = temp + store;
    //return temp + store;
    */

    var store = "";
    var alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    var keyStr = document.getElementById("keyword").value;
    keyStr = keyStr.toUpperCase() + alphabet;

    var tmp = ""; //change J to I
    for (var i = 0; i < keyStr.length; i++) {
        if (keyStr.charAt(i) == "J")
            tmp += "I";
        else
            tmp += keyStr.charAt(i);
    }
    keyStr = tmp;

    for (var i = 0; i < keyStr.length; i++) {
        if (store.indexOf(keyStr.charAt(i)) < 0 && alphabet.indexOf(keyStr.charAt(i)) >= 0)
            store += keyStr.charAt(i);
    }
    document.getElementById("keyString").innerHTML = store;
}

function keyTable(key) {
    var output = '';
    for (var i = 0; i < 25; i++) {
        if (i > 0 && i % 5 == 0)
            output += "<br>\n";
        if (i % 5)
            output += " ";

        output += key.charAt(i);
    }
    return "<tt>" + output + "</tt>";
}

function updateTable() {
    var k = document.getElementById("keyString").innerHTML;
    var word = document.getElementById('alphabet');
    word.innerHTML = keyTable(k);
}

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
function clearAll() {
    document.getElementById("keyword").value = '';
    document.getElementById("result").innerHTML = '';
    document.getElementById("inputMsg").value = '';
    genKey();
    updateTable();
}

function lookup(msg, key) { //msg = inputMsg; key = keyString
    var char1, char2, row1, row2, col1, col2;

    char1 = msg.charAt(0).toUpperCase();
    char2 = msg.charAt(1).toUpperCase();
    col1 = key.indexOf(char1);
    row1 = Math.floor(col1 / 5);
    col1 = col1 % 5;
    col2 = key.indexOf(char2);
    row2 = Math.floor(col2 / 5);
    col2 = col2 % 5;

    if (row1 == row2 && col1 == col2) { // Same letter
        var xPos = key.indexOf('X');
        row2 = Math.floor(xPos / 5);
        col2 = xPos % 5;
    }

    if (row1 == row2) { // in same row
        col1 += 1;
        col2 += 1;
    } 
    else if (col1 == col2) { // in same column
        row1 += 1;
        row2 += 1;
    } 
    else { // Rectangle
        var a;
        a = col1;
        col1 = col2;
        col2 = a;
    }

    row1 = (row1 + 5) % 5; //add 1
    row2 = (row2 + 5) % 5;
    col1 = (col1 + 5) % 5;
    col2 = (col2 + 5) % 5;

    char1 = key.charAt(row1 * 5 + col1).toLowerCase();
    char2 = key.charAt(row2 * 5 + col2).toLowerCase();

    return char1 + char2;
}


function Playfair() {
    var tmp_lookup, c;
    var enc = '';
    var notAlp = '';
    var output = '';
    var key = document.getElementById("keyString").innerHTML;
    var msg = document.getElementById("inputMsg").value;

    var tmp = ""; //change J to I
    for (var i = 0; i < msg.length; i++) {
        if (msg.charAt(i) == "J" || msg.charAt(i) == "j")
            tmp += "I";
        else
            tmp += msg.charAt(i);
    }
    msg = tmp;

    for (var i = 0; i < key.length; i++) {
        c = msg.charAt(i).toUpperCase();
        if (key.indexOf(c) >= 0) {
            /*   if (msg.charAt(i) != msg.charAt(i).toUpperCase())
                enc += c.toLowerCase();
            else
        */
            enc += c;

            if (enc.length == 2) {
                tmp_lookup = lookup(enc, key);
                output += tmp_lookup.charAt(0) + notAlp + tmp_lookup.charAt(1);
                notAlp = '';
                enc = '';
            }
        } 
        else {//not char, e.g: num
            if (enc.length > 0)
                notAlp += msg.charAt(i);
            else
                output += msg.charAt(i);
        }
    }
    if (enc.length > 0) { // single last word 
        tmp_lookup = lookup(enc + 'X', key);
        output += tmp_lookup.charAt(0) + notAlp + tmp_lookup.charAt(1);
    }
    document.getElementById("result").innerHTML = output;
}

function back() {
    window.history.go(-1);
}


///////////////////////////////// popup info /////////////////////////////////

function info() {
  var information = document.getElementById("example");
  information.classList.toggle("show");
}

/*function popInfo() {
    //var pop = document.querySelector(".pop");

    var content = document.querySelector(".content");
    content.innerHTML =
        "<h1> Introduction </h1>" +

        "<p> Playfair cipher is a type of substitution cipher. It involves creating key tables that arrange the letters into a 5 × 5 square grid, where 'J' usually combine as 'I' since the letter 'J' is seldom contained in words. The keyword is in front of the alphabet. For example, keyword = “Cryptography”, the key table look like this: </p>" +
        "<img src=\"images/play_table.png\" id= \"img1\">" +

        "<h1> Algorithm Description </h1>" +
        "<ol>" + 
            "<li> Break the plaintext into a two-letter bit </li>" + 
            "<li> Encrypt or decrypt it by transpose the two-letter bit on the key table" +
                "<ol type=\"i\">" + 
                    "<li>If letters are on the <span id=popWord>same column</span>, replace them with the letters below for encryption and above for decryption.</li>" +
                    "<li>If letters are on the <span id=popWord>same row</span>, replace them with the letters right for encryption and left for decryption.</li>" +
                    "<li>If letters <span id=popWord>are not on the same row or column</span>, replace them with the letters in a diagonal location by the plaintext order.</li>" +
                    "<li>If <span id=popWord>either letters are the same</span> or <span id=popWord>only one letter is left</span> at the end, replace the last character as 'X' and continue running the algorithm program.</li>" +
                "</ol></li>" +
            "<li>Gather all the two-letter bit ciphertext</li></ol>" +
            "Here is an example: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Plaintext = \"HELLO\" <br>" + 
        "<img src=\"images/playpop.gif\" id=\"img2\">";
}

function updown() {

    document.querySelector(".updown").classList.add("showDown"); //btn
    document.querySelector(".content").classList.add("hide"); //text

    document.querySelector(".box").classList.add("hide");

    document.getElementById("btn").onclick = function () {

        document.querySelector(".content").classList.remove("hide");
        document.querySelector(".updown").classList.remove("showDown");
        document.querySelector(".box").classList.remove("hide");

        document.getElementById("btn").onclick = function () {
            updown();
        }
    }

}
*/