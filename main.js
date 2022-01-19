const parallax = document.getElementsByClassName("parallax");
const bodyRect = document.body.getBoundingClientRect();

const initialPos = [];
for (var i = 0; i < parallax.length; i++) {
    var elementRect = parallax[i].getBoundingClientRect();
    initialPos[i] = elementRect.top - bodyRect.top;
}

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    for (var i = 0; i < parallax.length; i++) {
        parallax[i].style.backgroundPositionY = (initialPos[i]*0.7 + offset * (-0.7)) + "px";
    }
})