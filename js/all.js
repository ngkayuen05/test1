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


