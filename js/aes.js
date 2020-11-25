function defaultAES(encrypt) {
    var input = document.getElementById("input").value;
    var key = document.getElementById("key").value;
    var encryptedMsg = CryptoJS.AES.encrypt(input, key);
    var decryptedBytes = CryptoJS.AES.decrypt(input, key);

    if (encrypt == true)
        document.getElementById("return").value = encryptedMsg.toString();
    else {
        //console.log(encryptedMsg);
        var decryptedMsg = decryptedBytes.toString(CryptoJS.enc.Utf8);
        //console.log(decryptedMsg);
        document.getElementById("return").value = decryptedMsg;
    }
}

/*
function decrypt() {
    var cipher = document.getElementById("input").value;
    var key = document.getElementById("key").value;
    var decryptedBytes = CryptoJS.AES.decrypt(cipher, key);
    var decryptedMsg = decryptedBytes.toString(CryptoJS.enc.Utf8);
    document.getElementById("return").value = decryptedMsg;
}
*/

function enCTR(encryptCTR) {
    var input = document.getElementById("input").value;
    var key = document.getElementById("key").value;
    var iv = document.getElementById("iv").value;
    /*var key = CryptoJS.enc.Hex.parse('31323334353637383930313233343536');
    //var iv = CryptoJS.enc.Hex.parse('0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f');
*/
    var keys = CryptoJS.enc.Hex.parse(key);
    var base64 = CryptoJS.enc.Hex.parse(iv);

    var encrypted = CryptoJS.AES.encrypt(input, keys, {
        mode: CryptoJS.mode.CTR,
        iv: base64,
        padding: CryptoJS.pad.NoPadding
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, keys, {
        mode: CryptoJS.mode.CTR,
        iv: base64,
        padding: CryptoJS.pad.NoPadding
    });

    if (encryptCTR == true) {
        document.getElementById("return").value = "Ciphertext in HEX: \r" + encrypted.ciphertext.toString() + "\r\r" + "Ciphertext in BASE64: \r" + encrypted.toString();
    } else {
        document.getElementById("return").value = decrypted.toString(CryptoJS.enc.Utf8);
    }
}

/*
function deCTR() {
    var input = document.getElementById("input").value;
    var key = document.getElementById("key").value;
    var iv = document.getElementById("iv").value;
    document.getElementById("return").value = "";

    var keys = CryptoJS.enc.Hex.parse(key);
    var base64 = CryptoJS.enc.Hex.parse(iv);

    var encrypted = CryptoJS.AES.encrypt(input, keys, {
        mode: CryptoJS.mode.CTR,
        iv: base64,
        padding: CryptoJS.pad.NoPadding
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, keys, {
        mode: CryptoJS.mode.CTR,
        iv: base64,
        padding: CryptoJS.pad.NoPadding
    });

    document.getElementById("return").value = decrypted.toString(CryptoJS.enc.Utf8);
}
*/

function enCBC(encryptCBC) {
    var plainValue = document.getElementById("input").value;
    var keyValue = document.getElementById("key").value;
    var ivValue = document.getElementById("iv").value;

    var data = CryptoJS.enc.Hex.parse(plainValue);
    var key = CryptoJS.enc.Hex.parse(keyValue);
    var iv = CryptoJS.enc.Hex.parse(ivValue);

    var encrypted = CryptoJS.AES.encrypt(data, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.NoPadding
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.NoPadding
    });

    if (encryptCBC == true)
        document.getElementById("return").value = encrypted.ciphertext.toString();
    else {
        var encrypted = {};
        encrypted.key = key;
        encrypted.iv = iv;
        encrypted.ciphertext = data;
        
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            mode: CryptoJS.mode.CBC,
            iv: iv,
            padding: CryptoJS.pad.NoPadding
        });
        document.getElementById("return").value = CryptoJS.enc.Hex.stringify(decrypted);
    }
}

/*
function deCBC() {
    var plainValue = document.getElementById("input").value;
    var keyValue = document.getElementById("key").value;
    var ivValue = document.getElementById("iv").value;

    var data = CryptoJS.enc.Hex.parse(plainValue);
    var key = CryptoJS.enc.Hex.parse(keyValue);
    var iv = CryptoJS.enc.Hex.parse(ivValue);

    var encrypted = {};
    encrypted.key = key;
    encrypted.iv = iv;
    encrypted.ciphertext = data;

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.NoPadding
    });

    document.getElementById("return").value = CryptoJS.enc.Hex.stringify(decrypted);
}
*/

function example(type) {
    var chartmp = [];
    var hextmp = [];
    var first = '';
    var second = '';
    var output = '';

    var plaintmp = [];
    var hextmp1 = [];
    var first1 = '';
    var second1 = '';
    var output1 = '';

    var egkey = document.getElementById("egkey").value;
    var egplain = document.getElementById("egplain").value;
    console.log(egkey);
    var w0 = [];
    var w1 = [];
    var w2 = [];
    var w3 = [];

    for (var i = 0; i < 16; i++) {
        chartmp.push(egkey.charAt(i));
        hextmp.push(egkey.charCodeAt(i).toString(16));

        plaintmp.push(egplain.charAt(i));
        hextmp1.push(egplain.charCodeAt(i).toString(16));
    }

    for (var j = 0; j < 16; j++) {
        first += "<td>" + chartmp[j] + "</td>";
        second += "<td>" + hextmp[j] + "</td>";

        first1 += "<td>" + plaintmp[j] + "</td>";
        second1 += "<td>" + hextmp1[j] + "</td>";
    }

    if (type == "1") {
        output = "<table style=\"border-collapse: collapse; margin: 10px auto;\">" + "<tr>" + first + "</tr><tr>" + second + "</tr>" + "</table>";

        document.getElementById("ktable").innerHTML = output;
    }
    if (type == "0") {
        output1 = "<table style=\"border-collapse: collapse; margin: 10px auto;\">" + "<tr>" + first1 + "</tr><tr>" + second1 + "</tr>" + "</table>";
        document.getElementById("plaintable").innerHTML = output1;

        for (var a = 0; a < 4; a++) {
            w0.push(" " + hextmp[a]);
        }
        for (var b = 4; b < 8; b++) {
            w1.push(" " + hextmp[b]);
        }
        for (var c = 8; c < 12; c++) {
            w2.push(" " + hextmp[c]);
        }
        for (var d = 12; d < 16; d++) {
            w3.push(" " + hextmp[d]);
        }
        document.getElementById("w0").innerHTML = w0;
        document.getElementById("w1").innerHTML = w1;
        document.getElementById("w2").innerHTML = w2;
        document.getElementById("w3").innerHTML = w3;
    }
    document.getElementById("sbox").onclick = function () {
        var myWindow = window.open("", "S-box", "width=830,height=543");
        myWindow.document.write("<img src=\"images/sbox.jpg\">");
    }
}

function back() {
    window.history.go(-1);
}


// --------------------vvvv pop vvvv---------------------------
function popInfo() {
    //var pop = document.querySelector(".pop");

    var content = document.querySelector(".content");
    content.innerHTML =
        content.innerHTML =
        "<h1> Introduction </h1>" +

        "<p> Advanced Encryption Standard (AES) is a subset of the Rijndael block cipher and it is widely adopted symmetric encryption algorithm. AES is one of the common encryption methods. It mainly used to protect electronic data. Messaging apps like WhatsApp are using this algorithm. It supersedes the Data Encryption Standard (DES) due to the key size was longer. Key size of AES can be 128, 192 or 256 bits while DES encrypt data using 56 bits key. So that, cracking a 128 bits AES key would take a lot time that longer than the presumed age of the universe, AES consists a higher protection. </p>" +

        "<h1> Operation </h1>" +
        "<p>Key size is used to define the transformation rounds during the operation. AES has three version, with 10 rounds (128 bits keys), 12 rounds (192 bits keys) and 14 rounds (256 bits keys). Each round includes several processing steps:</p>" +
        "<ol>" +
        "<li><span id=popWord>SubBytes (S-box): </span> involves 16 independent byte-to-byte transformation</li>" +
        "<li><span id=popWord>ShiftRow: </span> each row is shifted to the left by following rules:" +
        "<ol type=\"i\">" +
        "<li>Row 1: no shift</li>" +
        "<li>Row 2: 1-byte shift</li>" +
        "<li>Row 3: 2-byte shift</li>" +
        "<li>Row 4: 3-byte shift</li>" +
        "</ol></li>" +
        "<li><span id=popWord>MixColumns: </span>transforms each column of the state to a new column to provide diffusion at the bit level" +
        "<ol type=\"i\">" +
        "<li>Multiplication by 02: Left shift by 1 bit. If the MSB = 1 before shift, XOR the result with 1B<sub>16</sub></li>" +
        "<li>Multiplication by 03: Write 3 * x = 2 * x ⊕ x</li>" +
        "</ol></li>" +

        "<li><span id=popWord>AddRoundKey: </span>add (i.e. XOR) a round key word with each state column matrix</li></ol>" +
        "<a href =\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\">See more in Wikipedia</a>" +
        "<img src=\"images/aes.gif\" id=\"img1\">" +

        "<h1> Mode </h1>" +
        "<ol>" +
        "<li>Electronic codebook (ECB)</li>" +
        "<li>Cipher block chaining (CBC)</li>" +
        "<li>Cipher feedback (CFB)</li>" +
        "<li>Output feedback (OFB)</li>" +
        "<li>Counter (CTR)</li></ol>";
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
// --------------------^^^^ pop ^^^^---------------------------

/* Edit from https://codepen.io/THEORLAN2/pen/Kaewmw*/

var Navegador_ = (window.navigator.userAgent || window.navigator.vendor || window.opera),
    Firfx = /Firefox/i.test(Navegador_),
    Mobile_ = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(Navegador_),
    FirfoxMobile = (Firfx && Mobile_);

var li = new Array();

function crear_select() {
    var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
    var select_ = '';
    for (var e = 0; e < div_cont_select.length; e++) {
        div_cont_select[e].setAttribute('data-indx-select', e);
        div_cont_select[e].setAttribute('data-selec-open', 'false');
        var ul_cont = document.querySelectorAll("[data-indx-select='" + e + "'] > .cont_list_select_mate > ul");
        select_ = document.querySelectorAll("[data-indx-select='" + e + "'] >select")[0];
        if (Mobile_ || FirfoxMobile) {
            select_.addEventListener('change', function () {
                _select_option(select_.selectedIndex, e);
            });
        }
        var select_optiones = select_.options;
        document.querySelectorAll("[data-indx-select='" + e + "']  > .selectedOption ")[0].setAttribute('data-n-select', e);
        document.querySelectorAll("[data-indx-select='" + e + "']  > .icon_select_mate ")[0].setAttribute('data-n-select', e);
        for (var i = 0; i < select_optiones.length; i++) {
            li[i] = document.createElement('li');

            if (select_optiones[i].selected == true || select_.value == select_optiones[i].innerHTML) {

                li[i].className = 'active';
                document.querySelector("[data-indx-select='" + e + "']  > .selectedOption ").innerHTML = select_optiones[i].innerHTML;
            };
            li[i].setAttribute('data-index', i);
            li[i].setAttribute('data-selec-index', e);

            li[i].addEventListener('click', function () {
                _select_option(this.getAttribute('data-index'), this.getAttribute('data-selec-index'));

                var x = this.getAttribute('data-index');
                console.log(x);
                if (x == "1") { //default
                    document.getElementById("btn_en").onclick = function () {
                        console.log("hi");
                        defaultAES(true);
                    }

                    document.getElementById("btn_de").onclick = function () {
                        defaultAES(false);
                    }

                } else if (x == "2") { //CTR
                    document.getElementById("btn_en").onclick = function () {
                        enCTR(true);
                    }

                    document.getElementById("btn_de").onclick = function () {
                        enCTR(false);
                    }
                } else if (x == "3") { //CBC
                    document.getElementById("btn_en").onclick = function () {
                        enCBC(true);
                    }

                    document.getElementById("btn_de").onclick = function () {
                        enCBC(false);
                    }
                } else {
                    document.getElementById("btn_en").onclick = function () {
                        console.log("hi");
                        Swal.fire({
                            title: 'Notice！',
                            text: 'Please choose a mode first~',
                            icon: 'warning'
                        });
                    }
                }

            });

            li[i].innerHTML = select_optiones[i].innerHTML;
            ul_cont[0].appendChild(li[i]);

        };
    };
}

//var cont_slc = 0;

function open_select(idx) {
    var idx1 = idx.getAttribute('data-n-select');

    var ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");

    var hg = 0;
    var slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute('data-selec-open');
    var slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];
    if (Mobile_ || FirfoxMobile) {
        if (window.document.createEvent) { // All
            var evt = window.document.createEvent("MouseEvents");
            evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            slect_element_open.dispatchEvent(evt);
        } else if (slect_element_open.fireEvent) { // IE
            slect_element_open.fireEvent("onmousedown");
        }
    } else {


        for (var i = 0; i < ul_cont_li.length; i++) {
            hg += ul_cont_li[i].offsetHeight;
        };
        if (slect_open == 'false') {
            document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'true');
            document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = hg + "px";
            document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
        } else {
            document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'false');
            document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
            document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
        }
    }

} // fin function open_select

function salir_select(indx) {
    var select_ = document.querySelectorAll("[data-indx-select='" + indx + "'] > select")[0];
    document.querySelectorAll("[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
    document.querySelector("[data-indx-select='" + indx + "'] > .icon_select_mate").style.transform = 'rotate(0deg)';
    document.querySelectorAll("[data-indx-select='" + indx + "']")[0].setAttribute('data-selec-open', 'false');
}


function _select_option(indx, selc) {
    if (Mobile_ || FirfoxMobile) {
        selc = selc - 1;
    }
    //console.log(indx);

    var li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
    var p_act = document.querySelectorAll("[data-indx-select='" + selc + "'] > .selectedOption")[0].innerHTML = li_s[indx].innerHTML;
    var select_optiones = document.querySelectorAll("[data-indx-select='" + selc + "'] > select > option");
    for (var i = 0; i < li_s.length; i++) {
        if (li_s[i].className == 'active') {
            li_s[i].className = '';
        };
        li_s[indx].className = 'active';

    };
    select_optiones[indx].selected = true;
    salir_select(selc);
}
