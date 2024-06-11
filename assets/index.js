function initBounceHandler(event) {
    event.target.classList.remove('hover');
    event.target.classList.remove("bounce");
    event.target.removeEventListener('animationend', initBounceHandler);
}

function initAnimEnd(event) {
    event.target.removeAttribute('style');
    event.target.style.opacity = '1';
    event.target.classList.remove('fade-from-right');
    event.target.removeEventListener('animationend', initAnimEnd);
    
    event.target.classList.add('hover');
    event.target.classList.add("bounce");
    event.target.addEventListener('animationend', initBounceHandler);
}

async function loadContent() {
    var delay = 300;
    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('about')[0].style.opacity = 1;

    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('skills')[0].style.opacity = 1;

    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('projects')[0].style.opacity = 1;
}

loadContent();

document.addEventListener('DOMContentLoaded', function() {
    var aboutLogos = document.querySelector('.about .header .logos').children;
    var skillsLogos = document.querySelector('.skills .header .logos').children;
    var delayIncrement = 0.1;

    for (var i = 0; i < aboutLogos.length; i++) {
        var child = aboutLogos[i].children[0];

        child.style.animationDelay = i * delayIncrement + 0.5 + 's';
        child.classList.add('fade-from-right');
        child.addEventListener('animationend', initAnimEnd);
    }

    for (var i = 0; i < skillsLogos.length; i++) {
        var child = skillsLogos[i].children[0];

        child.style.animationDelay = i * delayIncrement + 1 + 's';
        child.classList.add('fade-from-right');
        child.addEventListener('animationend', initAnimEnd);
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




