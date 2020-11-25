var alp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function keyTable() {
    var next;
    var perrow = 26,
        html = "<table>";

    html += "<tr><th colspan= \"27\"> Plaintext / Ciphertext </th></tr>";
    html += "<tr><th rowspan= \"27\"> K<br>e<br>y </th></tr>";

    for (var i = 0; i < alp.length; i++) {
        html += "<tr>";
        for (var j = 0; j < alp.length; j++) {
            html += "<td style=\"text-align: center;\">" + alp[j] + "</td>";

            next = i + 1;
            if (next % perrow == 0 && next != alp.length)
                html += "</tr><tr>";
        }
        var str1 = alp.substring(1, alp.length);
        var str2 = alp.substring(0, 1);
        alp = str1.concat(str2);
    }
    html += "</tr></table>";

    document.getElementById("vtable").innerHTML = html;
}

function GetAlpNum() {
    var m = new Array;
    var a = document.getElementById("keys").value.toUpperCase().replace(/ /g, "");

    for (var i = 0; i < a.length; i++)
        m[i] = a.charCodeAt(i) - 65;
    return m;
}
//---------------------------------------------------------------------------
function Encode() {
    var k = GetAlpNum();
    var plain = document.getElementById("plaintext").value.toUpperCase().replace(/ /g, "");
    /*
    if (plain == "") {
        swal({
            title: "HEY!",
            text: "Enter your plaintext~",
            type: "warning",
            timer: 2000
        });
    }
*/
    var kk = document.getElementById("keys").value.toUpperCase().replace(/ /g, "");
    
    for (var i = 0; i < kk.length; i++) {
        var checkK = kk.charCodeAt(i);
        if (checkK < 'A'.charCodeAt(0) || checkK > 'Z'.charCodeAt(0)) {
            swal({
                title: "HEY!",
                text: "Wrong format. Please enter alphabet for Key~",
                type: "warning",
                timer: 2000
            });
        }
    }
    
    msg = "<br> Keys: " + kk + "<br> " + "<table border=1 cellpadding=10 cellspacing=0 id=\"etable\"><tr>";
    /*
	for( var i=0; i < k.length; i++)
		msg += "<td align = center> " + k[i];
    
    msg += "<tr>";
    */
    msg += "<td> Plaintext:";
    for (var i = 0; i < plain.length; i++)
        msg += "<td> " + plain[i] + "</td>";

    msg += "<tr><td> Key:";
    var newKey = udKey(plain, kk);
    for (var i = 0; i < newKey.length; i++)
        msg += "<td> " + newKey[i] + "</td>";

    var cipher = "";
    var cur = 0;
    for (var i = 0; i < plain.length; i++) {
        var c = plain.charCodeAt(i);
        console.log(c);
        if (c < 'A'.charCodeAt(0) || c > 'Z'.charCodeAt(0)) {  //not letter
            var ch = plain.charAt(i);
            cipher += ch;
        } else {
            c = c - 65;
            t = (k[cur++ % k.length] + c) % 26;
            cipher += String.fromCharCode(65 + t);
            //console.log(cipher);
        }
    }
    document.getElementById("msg").innerHTML = msg;
    document.getElementById("encode").onclick = function () {
        document.getElementById("ciphertext").value = cipher;
    }
}
//---------------------------------------------------------------------------
function Decode() {
    var k1 = GetAlpNum();

    var k = new Array;
    for (var i = 0; i < k1.length; i++)
        k[i] = (26 - k1[i]);

    var cipher = document.getElementById("ciphertext").value.toUpperCase().replace(/ /g, "");
    /*
    if (cipher == "") {
        swal({
            title: "HEY!",
            text: "Enter your ciphertext~",
            type: "warning",
            timer: 2000
        });
    }
*/
    var kk = document.getElementById("keys").value.toUpperCase().replace(/ /g, "");
    for (var i = 0; i < kk.length; i++) {
        var checkK = kk.charCodeAt(i);
        //if (c < 'A'.charCodeAt(0) || c > 'Z'.charCodeAt(0)){
        if (checkK < 'A'.charCodeAt(0) && checkK > 'Z'.charCodeAt(0)) {
            swal({
                title: "HEY!",
                text: "Wrong format. Please enter alphabet for Key~",
                type: "warning",
                timer: 2000
            });
        }
    }
    msg = "<br> Keys: " + kk + "<br>" + "<table border=1 cellpadding=10 cellspacing=1 id=\"etable\"><tr>";

    /*
	for( var i=0; i < k.length; i++)
		msg += "<td align = center> " + k[i];
    */
    msg += "<td> Ciphertext:";
    for (var i = 0; i < cipher.length; i++)
        msg += "<td> " + cipher[i];

    msg += "<tr><td> Key:";
    var newKey = udKey(cipher, kk);
    for (var i = 0; i < newKey.length; i++)
        msg += "<td> " + newKey[i];

    var plain = "";
    var cur = 0;
    for (var i = 0; i < cipher.length; i++) {
        c = cipher.charCodeAt(i);
        //if (c < 'A'.charCodeAt(0) || c > 'Z'.charCodeAt(0)){
        if (c < 65 || c > 90) {
            ch = cipher.charAt(i);
            plain += ch;
        } else {
            c = c - 65;
            t = (k[cur++ % k.length] + c) % 26;
            plain += String.fromCharCode(65 + t);
        }
    }
    //plain = plain.toLowerCase();
    document.getElementById("msg").innerHTML = msg;

    document.getElementById("decode").onclick = function (){
        console.log(plain);
        document.getElementById("plaintext").value = plain;
    }
    
}

/*-----------------------------------------------------------*/



function udKey(text, key) {
    var plain = document.getElementById("plaintext").value;
    var cipher = document.getElementById("ciphertext").value;

    if (cipher == '') {
        var text = plain.replace(/ /g, "");
    } else if (plain == '') {
        var text = cipher.replace(/ /g, "");
    }

    //var text = document.getElementById("plaintext").value.replace(/ /g, "");
    var key = document.getElementById("keys").value.toUpperCase().replace(/ /g, "");

    var newKey = '';
    var j = 0;
    for (var i = 0; i < text.length; i++) {
        if (j < key.length) {
            newKey += key.charAt(j);
            j++;
        } else {
            j = 0;
            newKey += key.charAt(j);
            j++;
        }
    }
    //document.getElementById("r").value = newKey; //test
    return newKey;
}

function clearAll() {
    document.getElementById("plaintext").value = '';
    document.getElementById("ciphertext").value = '';
    document.getElementById("keys").value = '';
    document.getElementById("msg").innerHTML = '';

}

function back() {
    window.history.go(-1);
}

// ------------------------ pop -------------------------------
/*
function popInfo() {
    //var pop = document.querySelector(".pop");

    var content = document.querySelector(".content");
    content.innerHTML =
        content.innerHTML =
        "<h1> Introduction </h1>" +

        "<p> Vigenère Cipher is a polyalphabetic cipher which is using multiple substitution alphabets. It is an evolution of the <a href=\"caesar.html\">Caesar Cipher</a>. Encryption and decryption are done based on the letters of a secret key as well as the encryption table (also call Vigenère square). Usually, the Vigenère square sizes 26x26. Each column and row contain A-Z alphabets while each alphabet shifted one position cyclically to the left as the rows progress downwards.</p>" +

        "<h1> Method </h1>" +
        "<ol>" +
        "<li>Finalizing the plaintext </li>" +
        "<li> Choosing a secret key</li>" +
        "<li> Repeating the secret key so that its length can match with plaintext.</li>" +
        "<li>Comparing the plaintext alphabet and key alphabet with the Vigenere table.</li></ol>" +

        "<h1> Mathematical Description </h1>" +

        "<p> Each letter can represent with numbers, i.e. 'A'=0, 'B'=1, 'C'=2, ... , 'Z'=25. Vigenère cipher encryption E using the key K can be represented mathematically as </p>" +
        "<p style=\"text-align: center\"> <span id=popWord> C<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) mod 26 </span></p>" +
        "<p> Similarly, decryption D using the key K can be written as: </p>" +
        "<p style=\"text-align: center\"><span id=popWord> P<sub>i</sub> = (C<sub>i</sub> -  K<sub>i</sub>) mod 26 </span></p>" +
        "<p> In which P = P<sub>1</sub> …P<sub>n</sub> is Plaintext, C = C<sub>1</sub> … C<sub>n</sub> is Ciphertext.</p>";
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