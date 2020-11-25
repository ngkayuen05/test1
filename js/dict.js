var dict = [
    {
        word:"Asymmetric encryption",
        def:"Used to conceal small blocks of data, such as encryption keys and hash function values, which are used in digital signatures.",
        rel:["<a href=\"rsa.html\" id=\"alink\">RSA</a>", "<a href=\"rsanum.html\" id=\"alink\">RSA with example</a>"], 
        sound:["asymmetric"]
    },
    {
        word:"Caesar cipher",
        def:"Earliest known substation cipher",
        rel:["<a href=\"caesar.html\" id=\"alink\">Caesar Cipher</a>"],
        sound:["caesar"]
    },
    {
        word:"Ciphertext",
        def:"The coded message.",
        rel:["<a href=\"https://en.wikipedia.org/wiki/Ciphertext\" id=\"alink\">Ciphertext on Wikipedia</a>"],
        sound:["ciphertext"]
    },
    {
        word:"Cryptanalysis",
        def:"Techniques used for deciphering a message without any knowledge of the enciphering details.",
        rel:["<a href=\"https://en.wikipedia.org/wiki/Cryptanalysis\" id=\"alink\">Cryptanalysis on Wikipedia</a>"],
        sound:["cryptanalysis"]
    },
    {
        word:"Cryptography",
        def:"The area of study of many schemes used for encryption. It is the science and art of transforming messages to make them secure and immune to attacks.",
        rel:["<a href=\"https://en.wikipedia.org/wiki/Cryptography\" id=\"alink\">Cryptography on Wikipedia</a>"],
        sound:["cryptography"]
    },
    {
        word:"Cryptology",
        def:"The area of cryptography and cryptanalysis.",
        rel:["<a href=\"https://dictionary.cambridge.org/us/dictionary/english/cryptology\" id=\"alink\">Cryptology on Cambridge</a>"],
        sound:["cryptology"]
    },
    {
        word:"Decipher",
        def:"Same meaning with Decryption.",
        rel:[""],
        sound:["decipher"]
    },
    {
        word:"Decryption",
        def:"Restoring the plaintext from the ciphertext.",
        rel:[""],
        sound:["decryption"]
    },
    {
        word:"Encipher",
        def:"Same meaning with Encryption.",
        rel:[""],
        sound:["encipher"]
    },
    {
        word:"Encryption",
        def:"The process of converting from plaintext to ciphertext.",
        rel:[""],
        sound:["encryption"]
    },
    {
        word:"Key",
        def:"Information used in cipher known only to sender/receiver.",
        rel:[""],
        sound:["key"]
    },
    {
        word:"Plaintext",
        def:"An original message.",
        rel:[""],
        sound:["plaintext"]
    },
    {
        word:"Polyalphabetic Cipher",
        def:"Polyalphabetic Cipher is a substitution cipher in which the cipher alphabet for the plain alphabet may be different at different places during the encryption process.",
        rel:["<a href=\"caesar.html\" id=\"alink\">Caesar Cipher</a>", "<a href=\"vigenere.html\" id=\"alink\">Vigenere Cipher</a>"],
        sound:["polyalphabetic"]
    },
    {
        word:"Product cipher",
        def:"Combining two or more simple transposition or substitution operations, hoping to result a more secure encryption.",
        rel:[""],
        sound:["product"]
    },
    {
        word:"Substitution cipher",
        def:"Substitution cipher is a method of encrypting by which units of plaintext are replaced with ciphertext, according to a fixed system;  the \"units\" may be single letters (the most common), pairs of letters, triplets of letters, mixtures of the above, and so forth.",
        rel:["<a href=\"caesar.html\" id=\"link\">Caesar Cipher</a>", "<a href=\"playfair.html\" id=\"link\">Playfair Cipher</a>"],
        sound:["substitution"]
    },
    {
        word:"Super-encryption",
        def:"An encryption operation for which the plaintext input to be transformed is the ciphertext output of a previous encryption operation.",
        rel:[""],
        sound:["superencryption"]
    },
    {
        word:"Symmetric encryption",
        def:"Used to conceal the contents of blocks or stream of data of any size, including messages, files, encryption keys, and passwords.",
        rel:["<a href=\"aes.html\" id=\"link\">AES</a>"],
        sound:["symmetric"]
    }
    
];

function init() {
    for (var i=0; i<dict.length;i++){
        document.getElementById("word_list").innerHTML += "<li onclick='show(" + i + ")' id=\"li1\"> " + dict[i].word + "</li>";
    }
}

function sound(i) {
    var wordSound = dict[i].sound;
    console.log(wordSound);

    var myWindow = "window.open(\'https://ssl.gstatic.com/dictionary/static/sounds/oxford/" +  wordSound  + "--_us_1.mp3\'" + ", " + "\'_blank\'" + ", " + "\'width=350, height=250\');";

    return myWindow;
}

function show(i) {
    sound(i);
    
    //var sounds = document.getElementById("sound");
    var sounds = '<button id =\"sound\" onclick= \" ' + sound(i)+ '\"></button>';
    console.log(sound(i));
    
    document.getElementById("word_text").innerHTML = dict[i].word + sounds;     
    document.getElementById("def").innerHTML = dict[i].def;
    
    var list = "";
    
    for (var j=0; j<dict[i].rel.length; j++) {
        list += "<li id=\"li1\">" + dict[i].rel[j] + "</li>";
        document.getElementById("related").innerHTML = list;
    }  
}

function search() {
    var query = document.getElementById("search").value.toUpperCase();
    
    if (query == "")
        return;
    
    var found = -1;
    for (var i=0; i<dict.length; i++) {
        if (query == dict[i].word.toUpperCase()){
            found = i;
            break;
        }
        else {
            document.getElementById("word_text").innerHTML = "word not found";
            document.getElementById("def").innerHTML = "not found";
            document.getElementById("related").innerHTML = "not found arr";
        }
    }
    
    if (found >= 0){
        show(found);
    }
}

function clearAll() {
    document.getElementById("search").value = "";
    document.getElementById("word_text").innerHTML = "Dictionary";
    document.getElementById("def").innerHTML = "Input sth first";
    document.getElementById("related").innerHTML = "";
}

function back() {
    window.history.go(-1);
}













