var myElement = document.querySelector('.top-content_presentation_img');

// create a simple instance
// by default, it only adds horizontal recognizers
var bannerImg = new Hammer(myElement);

// listen to events...
bannerImg.on("panleft panright", function (ev) {
    myElement.textContent = ev.type + " gesture detected.";
});
