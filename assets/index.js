function initBounceHandler(event) {
    event.target.classList.toggle('hover');
    event.target.classList.toggle("bounce");
    event.target.removeEventListener('animationend', initBounceHandler);
}

function initAnimEnd(event, animName) {
    event.target.removeAttribute('style');
    event.target.classList.remove(animName);
    event.target.removeEventListener('animationend', initAnimHandler);
    
    event.target.classList.toggle('hover');
    event.target.classList.toggle("bounce");
    event.target.addEventListener('animationend', initBounceHandler);
}

function initAnimHandler(event) {
    if (event.animationName == 'fadeFromRight') {
        initAnimEnd(event, 'fade-from-right');
    } else {
        initAnimEnd(event, 'fade-from-left');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var rightLogos = document.querySelector('.right').children;
    var leftLogos = document.querySelector('.left').children;
    var delayIncrement = 0.3;

    for (var i = 0; i < rightLogos.length; i++) {
        var child = rightLogos[i].children[0];
        child.style.animationDelay = i * delayIncrement + 's';
        child.addEventListener('animationend', initAnimHandler);
    }

    for (var i = leftLogos.length - 1; i >= 0; i--) {
        leftLogos[i].style.animationDelay = ((leftLogos.length - i - 1) + rightLogos.length) * delayIncrement + 's'
        leftLogos[i].addEventListener('animationend', initAnimHandler);
    }
    
    const icons = document.querySelectorAll('[class^="devicon"], [class^="fa-"]');

    icons.forEach(icon => {
        icon.addEventListener('mouseover', event => {
            event.target.classList.toggle("bounce");
        });
        icon.addEventListener('mouseleave', event => {
            event.target.classList.toggle("bounce");
        });
    });

    const glow = document.querySelector('.glow');
    const mediaQuery = window.matchMedia('(min-width:786px)');

    function updateGlowPosition(event) {
        glow.style.left = `${event.pageX}px`;
        glow.style.top = `${event.pageY}px`;
    }

    function centerGlow(event) {
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        glow.style.left = `${containerRect.left + containerRect.width / 2}px`;
        glow.style.top = `${containerRect.top + containerRect.height / 2}px`;
    }

    function handleMediaChange(event) {
        if (event.matches) {
            document.addEventListener('mousemove', updateGlowPosition);
            window.removeEventListener('resize', centerGlow);
        } else {
            document.removeEventListener('mousemove', updateGlowPosition);
            centerGlow();
            window.addEventListener('resize', centerGlow);
        }
    }

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaChange);
});




