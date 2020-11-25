function doEncrypt(isEncrypt) {
    var privkey = document.getElementById("privkey").value;
    var pubkey = document.getElementById("pubkey").value;
    var inputText = document.getElementById("input").value;

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubkey);
    var encrypted = encrypt.encrypt(inputText);

    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privkey);
    var original = decrypt.decrypt(encrypted);

    if (isEncrypt) //true
        document.getElementById("result").value = encrypted;
    else
        document.getElementById("result").value = original;

    if (original != inputText)
        alert("Something went wrong");
}

function genKey(x) {
    var keySize = parseInt(x);

    if (keySize != "0")
        var crypt = new JSEncrypt({
            default_key_size: keySize
        });

    crypt.getKey();

    document.getElementById("privkey").value = crypt.getPrivateKey();
    document.getElementById("pubkey").value = crypt.getPublicKey();
}

function result(form) {
    var p = (form.bit.options[form.bit.selectedIndex].value);
    console.log(p);
}

function back() {
    window.history.go(-1);
}

///////////////////////////////// popup info /////////////////////////////////
/*
function popInfo() {
    var content = document.querySelector(".content");
    content.innerHTML =
        "<h1>You can try to encrypt a message by RSA here :D </h1>"+
        "<p>Typical RSA key sizes are 1024, 2048 or 4096 bits. Different length of prime number is generated depending on the key size picked. </p>" +
        "<p>However, it is not secure to have rsa encrption in Javascript. It is better use OpenSSL. </p>" + 
        "<p>Click <a href=\"https://www.openssl.org/\">here</a> to get OpenSSL. </p>"
    ;
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

/* ------------ Edit from https://codepen.io/THEORLAN2/pen/Kaewmw ----------- */

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
                //console.log(x);
                if (x == "1") { //512
                    genKey("512");
                } else if (x == "2") { //1024
                    genKey("1024");
                } else if (x == "3") { //2048
                    genKey("2048");

                } else if (x == "4") { //4096
                    /*
                    if (y == "1"){
                    Swal.fire({
                        title: '<strong>It may need to spend some time</strong>',
                        icon: 'info',
                        html: 'Please wait until it\'s done :D',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                    });
                        y = 2;
                        
                        if (y == "2") {
                        genKey("4096");
                        
                    }
                        
                    }
                    */
                    alert("It may need to spend some time :D");
                    genKey("4096");
                }
            });

            li[i].innerHTML = select_optiones[i].innerHTML;
            ul_cont[0].appendChild(li[i]);

        };
    };
}

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

}

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
