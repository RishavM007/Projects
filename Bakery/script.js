const ArrName = ["NEW JOB", "BIRTHDAY", "BLOCK PARTY", "SMASH CAKE PHOTOSHOOT", "GRADUATION", "MADE IT TO FRIDAY", "WEDDING", "END OF FINALS", "CHEER UP A FRIEND", "JUST BECAUSE", "ANNIVERSARY", "DINNER PARTY"];
const Arrlength = ArrName.length;
const slidetext = document.querySelector(".slickSlider");
const ArrString = ArrName.join("&nbsp &nbsp &nbsp &nbsp");
slidetext.innerHTML = ArrString;

window.onload = () => {
    let position = 0;
    setInterval(function slider() {
        position -= 1; 
        slidetext.style.transform = `translateX(${position}px)`;
        
    
        if (position < -slidetext.scrollWidth) {
            position = window.innerWidth;
        }
    }, 5); 
};
