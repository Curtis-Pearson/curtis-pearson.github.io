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
    const delay = 300;

    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('about')[0].style.opacity = 1;

    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('skills')[0].style.opacity = 1;

    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('projects')[0].style.opacity = 1;
}

loadContent();

document.addEventListener('DOMContentLoaded', function() {
    const aboutLogos = document.querySelector('.about .header .logos').children;
    const skillsLogos = document.querySelector('.skills .header .logos').children;
    const delayIncrement = 0.1;

    for (let i = 0; i < aboutLogos.length; i++) {
        let child = aboutLogos[i].children[0];

        child.style.animationDelay = i * delayIncrement + 0.5 + 's';
        child.classList.add('fade-from-right');
        child.addEventListener('animationend', initAnimEnd);
    }

    for (let i = 0; i < skillsLogos.length; i++) {
        let child = skillsLogos[i].children[0];

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

    const pythonText = document.querySelector('.program-language.python');
    const pythonIcon = document.querySelector('.fa-python');
    pythonText.addEventListener('mouseover', function() {
        pythonIcon.classList.add('hover');
        pythonIcon.classList.add('bounce');
    });
    pythonText.addEventListener('mouseleave', function() {
        pythonIcon.classList.remove('hover');
        pythonIcon.classList.remove('bounce');
    });
    pythonIcon.addEventListener('mouseover', function() {
        pythonText.classList.add('hover');
    });
    pythonIcon.addEventListener('mouseleave', function() {
        pythonText.classList.remove('hover');
    });

});




