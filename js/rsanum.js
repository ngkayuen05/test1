function gcd(e, phi) { //greatest commond division
    e = Math.abs(e);
    phi = Math.abs(phi);
    while (phi) {
        var tmp = phi;
        phi = e % phi;
        e = tmp;
    }
    return e;
}

function findE(phi, P, Q) { //such that e is relatively prime
    var gcdtmp = 0;
    var e = 2; //test for every e from 2

    phi = (P - 1) * (Q - 1);

    while (gcdtmp != 1) {
        e += 1;
        gcdtmp = gcd(e, phi);
    }
    return e;
}

function extendEuclid(E, phi) {
    var x1 = 1;
    var x2 = 0;

    var y1 = 0;
    var y2 = 1;

    var r1 = phi;
    var r2 = E;

    var count = 0;
    var output = '';
    
    var first = "<tr><td>" + r1 + "</td><td>" + " " + "</td><td>" + x1 + "</td><td>" + y1 + "</td></tr>";

    var second = "<tr><td>" + r2 + "</td><td>" + " " + "</td><td>" + x2 + "</td><td>" + y2 + "</td></tr>";

    while (r2 != 0) { // 7 mod 160
        
        q = Math.floor(r1 / r2); // q = 22
        x3 = x1 - q * y1; //x3 = 1-(22 * 0) = 1
        y3 = x2 - q * y2; //y3 = 0-(22 * 1) = -22
        r3 = r1 - q * r2; //r3 = 160 - (22 * 7) = 6 ->mod
        
        if (r2 != 1){
            output += "<tr>" + "<td>" + r3 + "</td>" + "<td>" + q + "</td>" + "<td>" + x3 + "</td>" + "<td>" + y3 + "</td>" + "</tr>";
        }
        //update
        x1 = y1;
        x2 = y2;
        r1 = r2;

        y1 = x3;
        y2 = y3;
        r2 = r3;  
    }
    //console.log(r2);
    if (r2 == 0) {
            output += "<tr>" + "<td>" + r3 + "</td>" + "<td>" + q + "</td>" + "<td>" + " " + "</td>" + "<td>" + " " + "</td>" + "</tr>";
        }
    
    var out = "<table style=\"border-collapse: collapse; margin: 10px auto;\"><tr> <th>r<sub>i</sub></th> <th>q<sub>i</sub></th> <th>x<sub>i</sub></th> <th>y<sub>i</sub></th> </tr>" + first + second + output + "</table>";
    //console.log(output);
    dtable.innerHTML = out;

    lastX = x1;
    lastY = x2;

    if (lastY < 0)
        inverse = lastY + phi;
    else
        inverse = lastY;

    return inverse;
    //console.log(inverse);
}

function findFactors(phi) {
    var factor = [];

    for (var i = 1; i <= Math.floor(Math.sqrt(phi)); i++)
        if (phi % i === 0) {
            factor.push(" " + i);
            if (phi / i !== i)
                factor.push(" " + (phi / i));
        }
    factor.sort(function (x, y) {
        return x - y;
    });
    return factor;
}

function showResult(P, Q) {    
    var phi = (P - 1) * (Q - 1);
    var e = findE(phi, P, Q);
    var d = extendEuclid(e, phi);
    var factor = findFactors(phi);

    if (tmp.length == 0) {
        document.getElementById("PQ").innerHTML = P * Q;
        document.getElementById("phi").innerHTML = phi;
        document.getElementById("e").innerHTML = e;
        document.getElementById("factor").innerHTML = factor;
        document.getElementById("d").innerHTML = d;
    }
}

function encrypt(P, Q, isEncrypt) {
    var input = document.getElementById("M1").value;
    var M = input.charCodeAt(0);

    var phi = (P - 1) * (Q - 1);
    var e = findE(phi, P, Q);
    var d = extendEuclid(e, phi);
    var n = P * Q;

    var C = Math.pow(M, e) % n;

    if (isEncrypt) {
        var line1 = "Letter " + input + " is equal to " + M + " in ASCII. <br>";
        var line2 = "So, C = " + M + "<sup>" + e + "</sup> mod (" + n + ") = " + C;
        var out = line1 + line2;
        document.getElementById("C1").innerHTML = C;

        document.getElementById("C2").value = C;
        document.getElementById("EText").innerHTML = out;

    } else {
        var res = mpmod(C, d, n);
        console.log(res);
        var M2 = String.fromCharCode(res);
        document.getElementById("M2").innerHTML = M2;

        
        var line1 = "We use the encrpted word as the example: C = " + C + "<br>";
        var line2 = "So, M = " + C + "<sup>" + d + "</sup> mod (" + n + ") = " + res + " = " + M2 + " according to ASCII table.";
        var line3 = "It is equivalent to M!!"
        var out = line1 + line2;

        document.getElementById("DText").innerHTML = out;
    }
}

function mpmod(M, d, n) {
    var result = 1;
    while (d > 0) {
        if ((d % 2) == 1) {
            result = (result * M) % n;
        }
        M = (M * M) % n;
        d = Math.floor(d / 2);
    }
    return (result);
}

function back() {
    window.history.go(-1);
}

function next() {
    window.location = "rsa.html";
}

///////////////////////////////// popup info /////////////////////////////////
/*
function popInfo() {
    var content = document.querySelector(".content");
    content.innerHTML =
        "<h1> Introduction </h1>" +

        "<p> RSA is an asymmetric system. It is required to use a public key and private key to do the encryption and decryption. Once a message has been encrypted with the public key, it can only be decrypted the corresponding private key. So, receiver need to keep their own private secure and share around the public one. </p>" +

        "<p> The creation a public key based on two prime numbers (p and q). In real situation, both prime numbers should choose from a sufficiently large set to avoid others to get the key value. Both sender and receiver must know the common value n. Anyone can use the public key (e) to encrypt a message while only receiver knows the value of private key (d). </p>" +

        "<p> n is calculated by p * q.  </p>" +
        "<p>User can select e such that e is relatively prime to &#934;(n) = (p - 1)(q - 1). </p>" +
        "<p> d value can be determined using the extended Euclid's algorithm. </p>" +
        "<p>However, RSA is a relatively slow algorithm, it is hardly used to encrypt user data. RSA is used common in passing around encrypted shared keys for symmetric key cryptography, that perform encryption at a faster speed.</p>";
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

/* Edit from https://codepen.io/THEORLAN2/pen/Kaewmw*/

var Navegador_ = (window.navigator.userAgent || window.navigator.vendor || window.opera),
    Firfx = /Firefox/i.test(Navegador_),
    Mobile_ = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(Navegador_),
    FirfoxMobile = (Firfx && Mobile_);

var li = new Array();
var tmp = [];
//var P, Q;

function crear_select() {
    var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
    var select_ = '';
    for (var e = 0; e < div_cont_select.length; e++) {
        div_cont_select[e].setAttribute('data-indx-select', e);
        div_cont_select[e].setAttribute('data-selec-open', 'false');
        var ul_cont = document.querySelectorAll("[data-indx-select='" + e + "'] > .cont_list_select_mate > ul");
        select_ = document.querySelectorAll("[data-indx-select='" + e + "'] >select")[0];
        //console.log(select_.);

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


                var P, Q;
                if (tmp.length == "2") {
                    P = tmp[0];
                    Q = tmp[1];
                    tmp.pop();
                    tmp.pop();
                } else if (tmp.length < "2") {
                    P = 0;
                    Q = 0;
                }
                showResult(P, Q);

                document.getElementById("submit1").onclick = function () {
                    encrypt(P, Q, true);
                }

                document.getElementById("submit2").onclick = function () {
                    encrypt(P, Q, false);
                }

            });

            li[i].innerHTML = select_optiones[i].innerHTML;
            ul_cont[0].appendChild(li[i]);

        };
    };
}

function open_select(idx) {
    var idx1 = idx.getAttribute('data-n-select');
    //var x = this.getAttribute('data-index');

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
var tmp = [];

function salir_select(indx) {
    var select_ = document.querySelectorAll("[data-indx-select='" + indx + "'] > select")[0];

    tmp.push(select_.value); // return selected value
    console.log(tmp);

    document.querySelectorAll("[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
    document.querySelector("[data-indx-select='" + indx + "'] > .icon_select_mate").style.transform = 'rotate(0deg)';
    document.querySelectorAll("[data-indx-select='" + indx + "']")[0].setAttribute('data-selec-open', 'false');
}


function _select_option(indx, selc) {
    /*   if (Mobile_ || FirfoxMobile) {
        selc = selc - 1;
    }
*/
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

/*
var tmp = [];

function returnP(indx, selc, isP) {
    var li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
    tmp.push(li_s[indx].innerHTML);

    //console.log(tmp);
    var P, Q;
    if (tmp.length == 2) {

        P = tmp[0];
        Q = tmp[1];
        tmp.pop();
    } else {
        P = 0;
    }

    if (isP == true) {
        return P;
    } else if (isP == false) {
        return Q;
    }
}





function returnQ(indx, selc) {

    var li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
var tmp = [];
    tmp.push(li_s[indx].innerHTML);

    //console.log(tmp);
    var Q;
    //if (tmp.length == 2) {
        //P = tmp[0];
        Q = tmp[0];
    //}
    //console.log(P);
    //console.log(Q);
    //return P;
    return Q;
}
*/
