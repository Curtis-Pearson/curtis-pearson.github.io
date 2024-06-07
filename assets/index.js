function initialAnimEnd(target, animName) {
    target.removeAttribute('style');
    target.classList.remove(animName);
    target.removeEventListener('animationend', animHandler);
}

function animHandler(event) {
    switch (event.animationName) {
        case 'fadeFromRight':
            initialAnimEnd(event.target, 'fade-from-right');
            break; 
        case 'fadeFromLeft':
            initialAnimEnd(event.target, 'fade-from-left');
            break;
        default:
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var rightLogos = document.querySelector('.right').children;
    var leftLogos = document.querySelector('.left').children;
    var delayIncrement = 0.1;

    for (var i = 0; i < rightLogos.length; i++) {
        var child = rightLogos[i].children[0];
        child.style.animationDelay = i * delayIncrement + 's';
        child.addEventListener('animationend', animHandler);
    }

    for (var i = leftLogos.length - 1; i >= 0; i--) {
        leftLogos[i].style.animationDelay = ((leftLogos.length - i - 1) + rightLogos.length) * delayIncrement + 's'
        leftLogos[i].addEventListener('animationend', animHandler);
    }
});

const devIcons = document.querySelectorAll('[class^="devicon"]');
const faIcons = document.querySelectorAll('[class^="fa"]');

function toggleBounce(event) {
    event.target.classList.toggle("bounce");
}

function toggleColored(event) {
    event.target.classList.toggle("colored");
    toggleBounce(event);
}

devIcons.forEach(icon => {
    icon.addEventListener('mouseover', toggleColored);
    icon.addEventListener('mouseleave', toggleColored);
});

faIcons.forEach(icon => {
    icon.addEventListener('mouseover', toggleBounce);
    icon.addEventListener('mouseleave', toggleBounce);
})

document.addEventListener('mousemove', function(event) {
    const glow = document.querySelector('.glow');
    glow.style.left = `${event.pageX}px`;
    glow.style.top = `${event.pageY}px`;
});

