var questions = [
    {
        q: "The ________ is the original message before transformation.",
        option:["Ciphertext","Plaintext","Secret-text","None of the above"],
        answer: 1,
        explain: "Plaintext means the original message."
    },
    {
        q: "________ is the science and art of transforming messages to make them secure and immune to attacks.",
        option:["Cryptoanalysis","Cryptography","Cryptology","None of the above"],
        answer: 1,
        explain: "Cryptography means the area of study of many schemes used for encryption. It is the science and art of transforming messages to make them secure and immune to attacks."
    },
    {
        q: "In ________ cipher, the same key is used by both the sender and receiver.",
        option:["Symmetric-key","Asymmetric-key","All of the above","None of the above"],
        answer: 0,
        explain: "Symmetric-key algorithms are algorithms for cryptography that use the same cryptographic keys for both encryption of plaintext and decryption of ciphertext."
    },
    {
        q: "In an asymmetric-key cipher, the sender uses the ________ key and reciver uses the ________ key.",
        option:["Private, Public","Private, Private","Public, Public","Public, Private"],
        answer: 3,
        explain: "The sender uses the Public key and reciver uses the Private key in an asymmetric-key cipher."
    },
    {
        q: "________ cipher replace(s) one character with another character. ",
        option:["Substitution","Transposition","Block","Stream"],
        answer: 0,
        explain: "A substitution cipher is a method of encrypting by which units of plaintext are replaced with ciphertext, according to a fixed system."
    },
    {
        q: "Suppose that there are two primes, p = 229 and q = 61. Find the value of n and Φ(n).",
        option:["7793, 34565","5853, 23452","17146, 69262","13969, 13680"],
        answer: 3,
        explain: "n = p*q = 229*61 = 13969 and Φ(n) = (p – 1)(q – 1) = (229 – 1)(61 – 1) = 228*60 = 13680."
    },
    {
        q: "Asymmetric key cryptography is used for all of the following except: ",
        option:["Encryption of data ","Access control","Nonrepudiation","Steganography"],
        answer: 3,
        explain: "Steganography is the hiding of a message inside of another medium."
    },
    {
        q: "What is an important disadvantage of using a public key algorithm compared to a symmetric algorithm?",
        option:["A symmetric algorithm provides better access control","A symmetric algorithm is a faster process","A symmetric algorithm is more difficult to implement","A symmetric algorithm provides nonrepudiation"],
        answer: 1,
        explain: "Processing efficiency of asymmetric cryptography is less than symmetric cryptography due to relative computational processing resources needed. Its lower performance is a disadvantage of asymmetric cryptography."
    },
    {
        q: "A way to defeat frequency analysis as a method to determine the key is to use ________.",
        option:["Substitution ciphers","Transposition ciphers","Polyalphabetic ciphers","Inversion ciphers"],
        answer: 2,
        explain: "The use of several alphabets for substituting the plaintext is called polyalphabetic ciphers. It is designed to make the breaking of a cipher by frequency analysis more difficult."
    },
    {
        q: "How many rounds does the AES-192 perform?",
        option:["10","12","14","16"],
        answer: 1,
        explain: "AES 192 performs 12 rounds."
    }
];

var qIndex = 0;     //decide which q come out (random num)
var index = 0;      //count q

function load() {
    var Qnum = document.querySelector(".Qnum");
    var question = document.querySelector(".question");
    var option1 = document.querySelector(".option1");
    var option2 = document.querySelector(".option2");
    var option3 = document.querySelector(".option3");
    var option4 = document.querySelector(".option4");
    var totalQ = document.querySelector(".totalQ");
    
    totalQ.innerHTML = questions.length;

    Qnum.innerHTML=index+1;
    question.innerHTML = questions[qIndex].q;
    option1.innerHTML = questions[qIndex].option[0];
    option2.innerHTML = questions[qIndex].option[1];
    option3.innerHTML = questions[qIndex].option[2];
    option4.innerHTML = questions[qIndex].option[3];
    index++;
}

//timer //every 1s
var count = 00;
var interval = setInterval(function(){
    document.getElementById("timer").innerHTML = count;
    count++;
    if (count === 1000){    //stop at 1000 sec
        clearInterval(interval);
        endGame();
        alert("You're out of time!");
    }
}, 1000);

var score = 0;

function check(e) {
    if (e.id == questions[qIndex].answer){
        e.classList.add("correct");
        updateTracker("correct");
        score++;
    }
    else {
        e.classList.add("wrong");
        updateTracker("wrong");
    }
    disable();
}

function disable() {
    var options = document.querySelector(".option").children;
    for (var i=0; i<options.length; i++) {
        options[i].classList.add("disable");
        if (options[i].id == questions[qIndex].answer) { // force show correct answer
            options[i].classList.add("correct");
        }
    }
}

function enable() {
    var options = document.querySelector(".option").children;
    for (var i=0; i<options.length; i++) {
        options[i].classList.remove("disable", "correct", "wrong");
    }
}

var tmp = new Array;

function randomQ() {
    var random = Math.floor(Math.random()*questions.length);
    var same = 0;
    
    if (index == questions.length)
        endGame();
    else {
        if (tmp.length == 0) {              //first
            qIndex = random;
            load();
        }
        else {
            for (var i=0; i<tmp.length; i++) {
                if (tmp[i] == random) {
                    same = 1;
                    randomQ();
                    break;
                }
            }
            
            if (same == 0) {
                qIndex = random;
                load();
            }
        }
        tmp.push(random);
    }
}

function answerTracker() {
    var answerTracker = document.querySelector(".answer_tracker");
    
    for (var i=0; i<questions.length; i++) {
        var div = document.createElement("div");
        answerTracker.appendChild(div);
    }
}

function updateTracker(check) {
    var answerTracker = document.querySelector(".answer_tracker");
    answerTracker.children[index-1].classList.add(check);
}

function next() {
    var options = document.querySelector(".option").children;
    if (!options[0].classList.contains("disable")){ //haven't choose the answer
        //alert("please choose answer first");
        Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
    }
    else {
        randomQ();
        enable();   //enable user to choose again
    }
}

function endGame() {
    document.querySelector(".endGame").classList.add("show");
    
    var totalQ = document.querySelector(".totalQ2");
    totalQ.innerHTML = questions.length;
    
    var corrAns = document.querySelector(".correctAns");
    corrAns.innerHTML = score;
    
    var percent = document.querySelector(".percent");
    var score100 = (score/questions.length)*100;
    percent.innerHTML = score100 + ' Marks';
    
    
    var text = document.querySelector(".text");
    if (score100 >= 80) {
        text.innerHTML = "Brilliant!";
    }
    else if (score100 >= 50) {
        text.innerHTML = "Keep it Up!";
    }
    else {
        text.innerHTML = "Add Oil!";
    }
}

function retry() {
    window.location.reload();
}

function allAns() {
    document.querySelector(".allAns").classList.add("showUp");  //btn
    
    document.querySelector(".ans").classList.add("show"); //text
    
    var QAE = document.querySelector(".QAE");
    var Q, A, E;

    for (var i=0; i<questions.length; i++) {
        Q = questions[i].q;
        var index = questions[i].answer;
        A = questions[i].option[index];
        E = questions[i].explain;
        
        QAE.innerHTML += "<b> Question: </b>" + Q + "<br><b> Answer: </b>" + A + "<br><b> Explaination: </b>" + E + "<br><br>";
    }
    
    document.getElementById("btn").onclick = function() {
        document.querySelector(".ans").classList.remove("show");
        document.querySelector(".allAns").classList.remove("showUp");
        
        document.getElementById("btn").onclick = function() {
            allAns();
        }
    }
}

function back() {
    window.history.go(-1);
}







