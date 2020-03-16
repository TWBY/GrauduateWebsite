let loadingPage = document.getElementsByClassName("loadingPage");

window.onload = function () {
    setTimeout(function () {
        loadingPage[0].classList.add("loadingPageAni");
    }, 1000);
    setTimeout(function () {
        loadingPage[0].classList.add("loadingPageNone");
    }, 1500);

}