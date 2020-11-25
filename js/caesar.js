/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////wheel///////////////////////////////////////////
var inner = null,
    outer = null,
    ctx = null,

    degrees = 0,
    turn = false,
    timer = null,
    bClockwise = true,
    key = 0;

function stopTimer() {
    clearInterval(timer);
    turn = false;
}

function getAngle() {
    var shift = document.getElementById('shift'),
        angle = 0, //current angle
        key;

    if (shift !== null) {
        key = shift.value * 1.0;
        angle = (360 / 26) * (key % 26); // Calculate the angle based on the key
    }
    return angle;
}

function newAngle(angle) {
    if (angle === degrees) {
        stopTimer();
        return;
    }

    if (bClockwise) {
        degrees += 3;

        if (degrees >= 360) // Check if passed 0/360
            degrees = 0;

        if (degrees > angle) // 直接跳到嗰個字母
            degrees = angle;

    } else { //anti clockwise
        degrees -= 3;

        if (degrees < 0) // Check if passed 0/360
            degrees = (angle === 0 ? 0 : 360);

        if (degrees < angle)
            degrees = angle;
    }
}

function draw() {
    var angle = getAngle();

    newAngle(angle);
    ctx.drawImage(inner, 0, 0); // Draw the background onto the canvas
    ctx.save(); // Save the current drawing state
    ctx.translate(245, 254); // 中心點change,圍住x,y point轉
    ctx.rotate(degrees * (Math.PI / -180)); // Rotate around this point
    ctx.drawImage(outer, -245, -264); // Draw the shifted letters
    ctx.restore(); // Restore the previous drawing state
}

function checkTurn() {
    var angle = getAngle();

    if (angle !== degrees) { // If the currect angle is not the expected angle start the timer
        if (turn)
            stopTimer();

        bClockwise = angle > degrees; // Determine which way the rotation for move

        timer = setInterval(draw, 50);
        turn = true;
    }
}

function init() {
    var canvas = document.getElementById('caesar');

    if (canvas.getContext('2d')) {
        ctx = canvas.getContext('2d');

        outer = new Image();
        outer.src = 'images/caesar wheel out.png';

        inner = new Image();
        inner.src = 'images/caesar wheel.png';
        inner.onload = draw;

        setInterval(checkTurn, 1000);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////input output box///////////////////////////////////////////

var quotes = [
    'Dszquphsbqiz cfhbo jo nbuifnbujdt',
    'K nqxg etarvqnqia',
    'Hyhub Flskhu lv yxoqhudeoh, dw ohdvw wr wkh bhw xqnqrzq dwwdfn',
    'Gvctxskvetlc lew kirivexih ryqfiv xlisvc, epkifvemg kisqixvc sziv jmrmxi jmiphw, epkifve, gsqfmrexsvmgw erh gsqtyxivw',
    'Ymj xhnjshj tk xjhwjhd, gd nyx ajwd sfyzwj, nx xjhwjy',

    'Ixevzumxgvne oy kyyktzogr',
    'Haahjrz vusf nla ilaaly, ulcly nla dvyzl',
    'Qn gwc bpqvs kzgxbwozixpg qa bpm ivaemz bw gwcz xzwjtmu, bpmv gwc lwv\'b svwe epib gwcz xzwjtmu qa',
    'Rc dbnm cx kn ngynwbren cx vjtn cqrwpb ydkurl jwm lqnjy cx vjtn cqnv yarejcn',
    'Xyg sd sc ohzoxcsfo dy wkuo drsxqc zbsfkdo kxn mrokz dy wkuo drow zelvsm',

    'Lxlepfcd slnv djdepxd, aczqpddtzylwd slnv apzawp',
    'Oapqymwuzs ue yadq uybadfmzf, oapqndqmwuzs ue yadq rgz',
    'Pelcgbtencul fhpprrqf jura vg\'f ab ybatre gur jrnxrfg yvax',
    'Ps usbhzs kwhv mcifgszt. Mci\'fs rcwbu hvs psgh mci qob!',
    'Xi sdthc\'i bpiitg wdl hadlan ndj vd ph adcv ph ndj sd cdi hide',

    'Jxuhu yi iecujxydw yd oek jxqj jxu mehbt duuti',
    'Repkyzex nfiky ufzex nvcc zj nfiky ufzex gfficp rk wzijk',
    'Uzsfyw ak lzw wfv jwkmdl gx sdd ljmw dwsjfafy',
    'Extkgbgz gxoxk xqatnlml max fbgw.',
    'Fyulhcha cm u nlyumoly nbun qcff ziffiq cnm iqhyl ypylsqbyly',

    'Vi diqznohzio di fijrgzybz kvtn ocz wzno diozmzno',
    'Heba eo w fkqnjau, jkp w zaopejwpekj',
    'Vlr alk\'q exsb ql yb dobxq ql pqxoq, yrq vlr exsb ql pqxoq ql yb dobxq',
    'Lmrfgle ugjj umpi sljcqq wms bm',
    'Khud zr he xnt vdqd sn chd snlnqqnv. Kdzqm zr he xnt vdqd sn khud enqdudq.'
];


function genQuote() {
    var randomNumber = Math.floor((Math.random() * 25));
    document.getElementById('question').value = quotes[randomNumber];
    document.getElementById('shift').value = randomNumber + 1;
    document.getElementById("Encrypt").disabled = true;
    document.getElementById("Decrypt").disabled = true;
    document.getElementById("Encrypt").classList.add("disabled");
    document.getElementById("Decrypt").classList.add("disabled");
}

function doCrypt(isDecrypted) { //isDecrypted = true/ false
    var keyValue = document.getElementById("shift").value;
    var shift = parseInt(keyValue, 10); //turn to int
    if (isDecrypted)
        shift = (26 - shift) % 26;

    var plaintext = document.getElementById("question");
    var ciphertext = document.getElementById("answer");

    ciphertext.value = caesarShift(plaintext.value, shift);
}

function ran() {
    var ciphertext1 = document.getElementById("answer").value.toLowerCase();
    var plaintext = document.getElementById("question").value;
    var keyValue = document.getElementById("shift").value;
    var shift = parseInt(keyValue, 10);

    shift = (26 - shift) % 26;
    var ans = caesarShift(plaintext, shift);

    if (ciphertext1 !== '') {
        if ((ciphertext1 === ans) || (ciphertext1 === ans.toLowerCase())) {
            swal({
                title: "Bravo!",
                text: "The answer is \" " + ans + " \"",
                type: "success",
                timer: 2000
            });
        } else {
            swal({
                title: "Oops!",
                text: "Please try again :D " + ans,
                type: "error",
                timer: 2000
            });
        }
    } else {
        swal({
            title: "Hey! Tell me your answer",
            text: "Please input your answer ",
            type: "warning",
            timer: 2000
        });
    }
    document.getElementById("answer").value = '';
    document.getElementById("Encrypt").disabled = false;
    document.getElementById("Decrypt").disabled = false;
    document.getElementById("Encrypt").classList.remove("disabled");
    document.getElementById("Decrypt").classList.remove("disabled");
}

function caesarShift(text, shift) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);
        if (65 <= c && c <= 90)
            result += String.fromCharCode((c - 65 + shift) % 26 + 65); // Uppercase
        else if (97 <= c && c <= 122)
            result += String.fromCharCode((c - 97 + shift) % 26 + 97); // Lowercase
        else
            result += text.charAt(i); // Copy
    }
    return result;
}

function clearAll() {
    document.getElementById("Encrypt").disabled = false;
    document.getElementById("Decrypt").disabled = false;
    document.getElementById("Encrypt").classList.remove("disabled");
    document.getElementById("Decrypt").classList.remove("disabled");
    document.getElementById("shift").value = "1";
    document.getElementById("question").value = '';
    document.getElementById("answer").value = '';
}

//var alp = ['abcdefghijklmnopqrstuvwxyz'];

function isLetter(inputtxt) {
    if (inputtxt.charCodeAt(0) >= 65 && inputtxt.charCodeAt(0) <= 90)
        return true;
    else
        return false;
}

function bruteForce() {
    document.getElementById("shift").value = "";
    var cipher = document.getElementById("question").value.toUpperCase();
    //console.log(cipher);
    var plain = "";
    var tmp = "";
    for (var i = 1; i < 26; i++) {

        for (var j = 0; j < cipher.length; j++) {
            var c = cipher[j];
            if (isLetter(c) == true) {
                var y = c.charCodeAt(0) - 65 - i;
                if (y <= 0)
                    var x = (y + 26) % 26;
                else
                    var x = y % 26;

                if (x < 0)
                    p = String.fromCharCode(x + 91);
                else
                    p = String.fromCharCode(x + 65);
            } else //space
                p = c;

            tmp += p;
        }
        plain += ("Key=" + i + " : " + tmp + "\r");
        tmp = "";
    }
    document.getElementById("answer").value = plain;
}

function back() {
    window.history.go(-1);
}

/* --------------------------- pop Info ----------------------------------------
function popInfo() {

    var content = document.querySelector(".content");
    content.innerHTML =
        "<h1> Introduction </h1>" +
        "<p> Caesar cipher is one of the earliest known and simplest ciphers. It is a type of substitution cipher in which each letter in the plaintext is 'shifted' a certain number of places down the alphabet. The Caesar Cipher offers essentially no communication security, and it will be shown that it can be easily broken even by hand. </p>" +
        "<h1> Mathematical Description </h1>" +
        "<p> Each letter can represent with numbers, i.e. 'A'=0, 'B'=1, 'C'=2, ... , 'Z'=25. For the encryption of a letter x by a shift n, the Caesar cipher function <b>E<sub>n</sub>(x)</b> can be represented mathematically as: </p>" +
        "<p style=\"text-align: center\"> <span id=popWord> E<sub>n</sub>(x) = (x+n) mod 26 </span></p>" +
        "<p> Similarly, decryption function <b>Dn(x)</b> can be represented as: </p>" +
        "<p style=\"text-align: center\"><span id=popWord> D<sub>n</sub>(x) = (x-n) mod 26 </span></p><br><br>" +
        "<p>You can try to encrypt or decrypt a message below :D</p>" +
        "<p>Once you generate a random text, it is unable to click Encrypt and Decrypt button until you press on Sumbit or Clear button</p>";

}
*/