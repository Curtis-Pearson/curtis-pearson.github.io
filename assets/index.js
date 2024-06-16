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

async function displayGithubRepos() {
    const reposListDiv = document.querySelector('.repos-list');
    reposListDiv.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        repos.forEach(repo => {
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

            reposListDiv.appendChild(repoDiv);
        });
    }

    const repoElems = reposListDiv.querySelectorAll('.repo');
    const repoElem = repoElems[0];
    const repoArrow = document.querySelector('.repos-arrow i');
    let repoMargin = parseFloat(window.getComputedStyle(repoElem).marginRight);
    let arrowWidth = parseFloat(window.getComputedStyle(repoArrow).fontSize);
    let listWidth = parseFloat(window.getComputedStyle(reposListDiv).width);
    let moveAmount = (listWidth - arrowWidth) / 2 + repoMargin - (1.6666 * (arrowWidth / 13.3333));

    /*
    const reposTrack = document.querySelector('.repos-track');
    const trackRect = reposTrack.getBoundingClientRect();
    let prevIndex = 7;
    let nextIndex = 9;
    let prevRepo = reposListDiv.children[prevIndex];
    let nextRepo = reposListDiv.children[nextIndex];
    let prevRect = prevRepo.getBoundingClientRect();
    let nextRect = nextRepo.getBoundingClientRect();
    let prevDist = prevRect.left - trackRect.left;
    let nextDist = nextRect.left - trackRect.left;

    console.log(prevDist, nextDist, moveAmount);
    */

    let offsetIndex = 0;
    let leftIndex = ((repos.length * 3) / 2) - 1;
    let rightIndex = leftIndex + 1;
    let isMoving = false;
    let intervalId = null;

    function wrapScroll() {
        repoElems[leftIndex].style.transition = "opacity 0s";
        repoElems[rightIndex].style.transition = "opacity 0s";
        repoElems[leftIndex].style.opacity = 1;
        repoElems[rightIndex].style.opacity = 1;

        reposListDiv.style.transition = "transform 0s";
        reposListDiv.style.transform = `translateX(${(moveAmount * -offsetIndex)}px)`;
    }

    repoElems[leftIndex].style.opacity = 1;
    repoElems[rightIndex].style.opacity = 1;

    const prevButton = document.querySelector('.repos-arrow.prev');
    const nextButton = document.querySelector('.repos-arrow.next');
    const reposWrapper = document.querySelector('.repos-wrapper');

    prevButton.addEventListener('click', () => { 
        scrollRepos(-1);
        resetInterval();
    });
    nextButton.addEventListener('click', () => {
        scrollRepos(1);
        resetInterval();
    });

    reposWrapper.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    reposWrapper.addEventListener('mouseleave', () => {
        resetInterval();
    });

    /*
    let li = 8;
    let ri = 9;
    const elements = document.querySelectorAll('.repo');
    let elementLeft = elements[li];
    let elementRight = elements[ri];
    const wrapperRect = reposTrack.getBoundingClientRect();
    let elementLeftRect = elementLeft.getBoundingClientRect();
    let elementRightRect = elementRight.getBoundingClientRect();
    let distLeft = elementLeftRect.left - wrapperRect.left;
    let distRight = wrapperRect.right - elementRightRect.right;
    let diff = distLeft - distRight;
    let prevLeft = distLeft;
    let prevRight = distRight;

    console.log(distLeft, distRight, diff);
    */
    
    window.addEventListener('resize', () => {
        repoMargin = parseFloat(window.getComputedStyle(repoElem).marginRight);
        arrowWidth = parseFloat(window.getComputedStyle(repoArrow).fontSize);
        listWidth = parseFloat(window.getComputedStyle(reposListDiv).width);
        moveAmount = (listWidth - arrowWidth) / 2 + repoMargin - (1.6666 * (arrowWidth / 13.3333)) + 25;

        reposListDiv.style.transition = "transform 0s";
        reposListDiv.style.transform = `translateX(${(moveAmount * -offsetIndex)}px)`;
    });

    const transitionStyle = "0.5s ease-in-out";

    function scrollRepos(dir) {
        if (isMoving) {
            return;
        }
        
        offsetIndex += dir;
        isMoving = true;

        reposListDiv.style.transition = `transform ${transitionStyle}`;
        reposListDiv.style.transform = `translateX(${(moveAmount * -offsetIndex)}px)`;

        if (dir == 1) {
            repoElems[leftIndex].style.transition = `opacity ${transitionStyle}`;
            repoElems[leftIndex].style.opacity = 0;

            leftIndex++;
            rightIndex++;

            repoElems[rightIndex].style.transition = `opacity ${transitionStyle}`;
            repoElems[rightIndex].style.opacity = 1;
        }
        else if (dir == -1) {
            repoElems[rightIndex].style.transition = `opacity ${transitionStyle}`;
            repoElems[rightIndex].style.opacity = 0;

            leftIndex--;
            rightIndex--;

            repoElems[leftIndex].style.transition = `opacity ${transitionStyle}`;
            repoElems[leftIndex].style.opacity = 1;
        }

        reposListDiv.addEventListener('transitionend', () => {
            /*
            li += dir;
            ri += dir;
            elementLeft = elements[li];
            elementRight = elements[ri];
            elementLeftRect = elementLeft.getBoundingClientRect();
            elementRightRect = elementRight.getBoundingClientRect();
            distLeft = elementLeftRect.left - wrapperRect.left;
            distRight = wrapperRect.right - elementRightRect.right;
            diff = distLeft - distRight;
            let diffLeft = distLeft - prevLeft;
            let diffRight = distRight - prevRight;
            prevLeft = distLeft;
            prevRight = distRight;
    
            console.log(distLeft, distRight, diff, diffLeft, diffRight, (-diffLeft + diffRight));
            */

            if (offsetIndex == -repos.length - 2) {
                offsetIndex = repos.length - 2;
                leftIndex = repos.length * 2;
                rightIndex = leftIndex + 1;
                wrapScroll();
            }
            else if (offsetIndex == repos.length + 2) {
                offsetIndex = -repos.length + 2
                leftIndex = repos.length - 2;
                rightIndex = leftIndex + 1;
                wrapScroll();
            }

            isMoving = false;
        }, { once: true });
    }

    function resetInterval() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        //intervalId = setInterval(() => scrollRepos(1), 5000);
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
    console.log(window.innerHeight, window.innerWidth);
    console.log(window);

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
