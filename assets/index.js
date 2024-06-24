const repos = [
    { 
        'name': "curtis-pearson.github.io",
        'desc': "Portfolio website.",
        'url': "https://github.com/Curtis-Pearson/curtis-pearson.github.io",
        'languages': ["HTML", "CSS", "JavaScript"]
    },
    {
        'name': "Networked Blackjack",
        'desc': "Standard Blackjack game with Client/Server Python sockets.",
        'url': "https://github.com/Curtis-Pearson/networked-blackjack",
        'languages': ["Python"]
    },
    {
        'name': "Program Interpreter",
        'desc': "Basic Python-like program language interpreter with Binary and Unary operations, boolean logic, string handling and global variables.",
        'url': "https://github.com/Curtis-Pearson/program-interpreter",
        'languages': ["Python"]
    },
    {
        'name': "x86 Boot-Loader",
        'desc': "16-bit x86 boot-loader that can be used to view sections of paged memory.",
        'url': "https://github.com/Curtis-Pearson/x86-boot-loader",
        'languages': ["Assembly"]
    },
    {
        'name': "x86 Graphics",
        'desc': "16-bit x86 programmable graphics renderer.",
        'url': "https://github.com/Curtis-Pearson/x86-graphics",
        'languages': ["Assembly", "C"]
    },
    {
        'name': "Wizard Shop",
        'desc': "Interactable multi-window GUI of a wizard-themed shop.",
        'url': "https://github.com/Curtis-Pearson/wizard-shop",
        'languages': ["C#"]
    },
];

function getViewport() {
    const phoneMaxWidth = 480;
    const phoneMaxHeight = 926;
    const tabletMaxWidth = 1080;
    const tabletMaxHeight = 1366;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';

    let screenType;

    if (width <= phoneMaxWidth && height <= phoneMaxHeight || width <= phoneMaxHeight && height <= phoneMaxWidth) {
        screenType = 'phone';
    } 
    else if (width <= tabletMaxWidth && height <= tabletMaxHeight || width <= tabletMaxHeight && height <= tabletMaxWidth) {
        screenType = 'tablet';
    } 
    else {
        screenType = 'computer';
    }

    return {
        screenType: screenType,
        orientation: orientation
    };
}

let display = [0, 1];

async function displayGithubRepos() {
    const reposList = document.querySelector('.repos-list');
    let repoDivs = reposList.children;
    let viewport = getViewport();
    let intervalId = setInterval(() => updateRepos("right"), 5000);

    function createRepoDiv(index) {
        const repo = repos[display[index]];
        let languages = ``;
    
        repo.languages.forEach(language => {
            languages += `
                <div class="repo-language">
                    <div class="language ${language.toLowerCase().replace('#', 's')}"></div>
                    <p>${language}</p>
                </div>
            `;
        });
    
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repo';
        repoDiv.innerHTML = `
            <div class="repo-inner">
                <a href="${repo.url}">
                    <h1>${repo.name}</h1>
                </a>
                <h2>${repo.desc}</h2>
                <div class="repo-languages">${languages}</div>
            </div>
        `;
        
        return repoDiv;
    }

    reposList.appendChild(createRepoDiv(0));
    reposList.appendChild(createRepoDiv(1));
    repoDivs[0].style.opacity = 1;
    repoDivs[1].style.opacity = 1;

    let isMoving = false;

    function updateRepos(dir) {
        if (isMoving) {
            return;
        }

        const dist = parseFloat(window.getComputedStyle(repoDivs[0]).width) + 20;
        isMoving = true;
        repoDivs = reposList.children;

        switch (dir) {
            case "right":
                for (let i = 0; i < display.length; i++) {
                    display[i]++;
                    if (display[i] >= repos.length) {
                        display[i] = 0;
                    }
                }

                reposList.insertAdjacentElement("beforeend", createRepoDiv(1));
                reposList.offsetHeight;

                for (let j = 0; j < repoDivs.length; j++) {
                    repoDivs[j].style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
                    repoDivs[j].style.transform = `translateX(${-dist}px)`;
                }

                repoDivs[0].style.opacity = 0;
                repoDivs[1].style.opacity = 1;
                repoDivs[2].style.opacity = 1;

                setTimeout(function() {
                    for (let j = 0; j < repoDivs.length; j++) {
                        repoDivs[j].style.transition = 'transform 0s, opacity 0s';
                        repoDivs[j].style.transform = `translateX(0%)`;
                    }
                    repoDivs[0].remove();
                    isMoving = false;
                }, 1000);

                break;

            case "left":
                for (let i = 0; i < display.length; i++) {
                    display[i]--;
    
                    if (display[i] < 0) {
                        display[i] = repos.length - 1;
                    }
                }
                
                reposList.insertAdjacentElement("afterbegin", createRepoDiv(0));
                reposList.offsetHeight;

                for (let j = 0; j < repoDivs.length; j++) {
                    repoDivs[j].style.transition = 'transform 0s, opacity 0s';
                    repoDivs[j].style.transform = `translateX(${-dist}px)`;
                }
                
                reposList.offsetHeight;

                for (let j = 0; j < repoDivs.length; j++) {
                    repoDivs[j].style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
                    repoDivs[j].style.transform = `translateX(0%)`;
                }

                repoDivs[0].style.opacity = 1;
                repoDivs[2].style.opacity = 0;

                if (viewport.screenType == 'phone' || viewport.screenType == 'tablet') {
                    if (viewport.orientation == 'portrait') {
                        repoDivs[1].style.opacity = 0;
                    }
                }

                setTimeout(function() {
                    repoDivs[2].remove();
                    repoDivs[0].style.transition = 'transform 0s, opacity 0s';
                    repoDivs[1].style.transition = 'transform 0s, opacity 0s';
                    isMoving = false;
                }, 800);
                
                break;

            default:
                isMoving = false;
                break;
        }
    }

    const prevButton = document.querySelector('.repos-arrow.prev');
    const nextButton = document.querySelector('.repos-arrow.next');
    const reposWrapper = document.querySelector('.repos-wrapper');

    prevButton.addEventListener('click', () => { 
        updateRepos("left");
        resetInterval();
    });
    nextButton.addEventListener('click', () => {
        updateRepos("right");
        resetInterval();
    });
    reposWrapper.addEventListener('mouseover', () => {
        clearInterval(intervalId);
    });
    reposWrapper.addEventListener('mouseleave', () => {
        resetInterval();
    });
    window.addEventListener('resize', () => {
        resetInterval();
        viewport = getViewport();

        if (viewport.screenType == 'phone' || viewport.screenType == 'tablet') {
            if (viewport.orientation == 'portrait') {
                repoDivs[1].style.opacity = 0;
            }
            else {
                repoDivs[1].style.opacity = 1;
            }
        }
        else {
            repoDivs[1].style.opacity = 1;
        }
    });

    function resetInterval() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(() => updateRepos("right"), 5000);
    }

    resetInterval();
}

async function loadContent() {
    const delay = 300;

    displayGithubRepos();

    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('about')[0].style.opacity = 1;

    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('skills')[0].style.opacity = 1;

    await new Promise(res => setTimeout(res, delay));
    document.getElementsByClassName('projects')[0].style.opacity = 1;
}

loadContent();

async function initAnimEnd(event) {
    event.target.removeAttribute('style');
    event.target.style.opacity = '1';
    event.target.classList.remove('fade-from-right');
    event.target.classList.add('hover');
    event.target.classList.add("bounce");

    event.target.addEventListener('animationend', () => {
        event.target.classList.remove('hover');
        event.target.classList.remove("bounce");
    }, { once: true });
}

document.addEventListener('DOMContentLoaded', async function(event) {
    const aboutLogos = document.querySelector('.about .header .logos').children;
    const skillsLogos = document.querySelector('.skills .header .logos').children;
    const delayIncrement = 0.1;

    for (let i = 0; i < aboutLogos.length; i++) {
        let child = aboutLogos[i].children[0];

        child.style.animationDelay = i * delayIncrement + 0.5 + 's';
        child.classList.add('fade-from-right');
        child.addEventListener('animationend', initAnimEnd, { once: true });
    }

    for (let i = 0; i < skillsLogos.length; i++) {
        let child = skillsLogos[i].children[0];

        child.style.animationDelay = i * delayIncrement + 1 + 's';
        child.classList.add('fade-from-right');
        child.addEventListener('animationend', initAnimEnd, { once: true });
    }
    
    const icons = [...aboutLogos, ...skillsLogos];

    icons.forEach(icon => {
        icon.children[0].addEventListener('mouseover', event => {
            event.target.classList.toggle("bounce");
        });
        icon.children[0].addEventListener('mouseleave', event => {
            event.target.classList.toggle("bounce");
        });
    });

    const programLanguages = document.querySelectorAll('.program-language');

    for (let i = 0; i < programLanguages.length; i++) {
        let lang = programLanguages[i];

        if (lang.classList[1] == "batch") {
            continue;
        }

        let langIcon = skillsLogos[i-1].children[0];

        lang.addEventListener('mouseover', () => {
            langIcon.classList.add('hover');
            langIcon.classList.add('bounce');
        });
        lang.addEventListener('mouseleave', () => {
            langIcon.classList.remove('hover');
            langIcon.classList.remove('bounce');
        });
        langIcon.addEventListener('mouseover', () => {
            lang.classList.add('hover');
        });
        langIcon.addEventListener('mouseleave', () => {
            lang.classList.remove('hover');
        });
    }

    const repoArrows = document.querySelectorAll('.repos-arrow');

    repoArrows.forEach(arrow => {
        arrow.addEventListener('mouseenter', () => {
            arrow.children[0].classList.add('hover');
        });
        arrow.addEventListener('mouseleave', () => {
            arrow.children[0].classList.remove('hover');
        });
    })

});
