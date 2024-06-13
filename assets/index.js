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
    }
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

    const repoElem = reposListDiv.querySelector('.repo');
    const repoWidth = repoElem.offsetWidth;

    let repoMargin = parseFloat(window.getComputedStyle(repoElem).marginRight);
    const listWidth = parseFloat(window.getComputedStyle(reposListDiv).width);
    let floatOffset = (listWidth % 1) / 2;

    if (Math.round(floatOffset * 10) / 10 == 0.2) {
        floatOffset = -0.3;
    }

    // FOR WHATEVER REASON, 8.33333 IS THE OFFSET 8.69999
    // TAKE NOTE: LEFT AND RIGHT DISTANCE SHOULD BE 8.3333... ON EITHER SIDE
    let moveAmount = (repoWidth + (repoMargin * 2)) - 8.33333 + floatOffset;

    if (Math.round(moveAmount) % 2 != 0) {
        if (floatOffset != -0.3) {
            console.log("removed float offset");
            moveAmount -= (floatOffset * 2);
        }
    }
    else {
        if (floatOffset == -0.3) {
            console.log("increased -0.3")
            floatOffset = 0.5;
            moveAmount += floatOffset;
        }
    }

    console.log(listWidth, floatOffset, repoWidth, repoMargin);

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

    let offsetIndex = 0 ;
    let isMoving = false;
    let intervalId = null;

    //reposListDiv.style.transform = `translateX(${repoMargin / 2}px)`;

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

    let leftIndex = 8;
    let rightIndex = 9;
    const elements = document.querySelectorAll('.repo');
    let elementLeft = elements[leftIndex];
    let elementRight = elements[rightIndex];
    //const reposTrack = document.querySelector('.repos-track');
    const wrapperRect = reposTrack.getBoundingClientRect();
    let elementLeftRect = elementLeft.getBoundingClientRect();
    let elementRightRect = elementRight.getBoundingClientRect();
    let distLeft = elementLeftRect.left - wrapperRect.left;
    let distRight = wrapperRect.right - elementRightRect.right;
    let diff = distLeft - distRight;
    let prevLeft = distLeft;
    let prevRight = distRight;

    console.log(distLeft, distRight, diff);
    
    window.addEventListener('resize', () => {
        repoMargin = parseFloat(window.getComputedStyle(repoElem).marginRight);

        reposListDiv.style.transition = "transform 0s";
        reposListDiv.style.transform = `translateX(${Math.round(moveAmount * offsetIndex)}px)`;
    });

    function scrollRepos(dir) {
        if (isMoving) {
            return;
        }
        
        offsetIndex += dir;
        isMoving = true;

        reposListDiv.style.transition = "transform 0.5s ease-in-out";
        reposListDiv.style.transform = `translateX(${(moveAmount * -offsetIndex)}px)`;

        reposListDiv.addEventListener('transitionend', () => {
            
            leftIndex += dir;
            rightIndex += dir;
            elementLeft = elements[leftIndex];
            elementRight = elements[rightIndex];
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
            
            /*
            if (offsetIndex == -repos.length) {
                reposListDiv.style.transition = "transform 0s";
                offsetIndex = repos.length;
                reposListDiv.style.transform = `translateX(${setWidth + (moveAmount * -offsetIndex)}px)`;
            }
            else if (offsetIndex == repos.length + 2) {
                reposListDiv.style.transition = "transform 0s";
                offsetIndex = -repos.length + 2;
                reposListDiv.style.transform = `translateX(${setWidth + (moveAmount * -offsetIndex)}px)`;
            }
            */

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

async function initBounceHandler(event) {
    event.target.classList.remove('hover');
    event.target.classList.remove("bounce");
    event.target.removeEventListener('animationend', initBounceHandler);
}

async function initAnimEnd(event) {
    event.target.removeAttribute('style');
    event.target.style.opacity = '1';
    event.target.classList.remove('fade-from-right');
    event.target.removeEventListener('animationend', initAnimEnd);
    
    event.target.classList.add('hover');
    event.target.classList.add("bounce");
    event.target.addEventListener('animationend', initBounceHandler);
}

document.addEventListener('DOMContentLoaded', async function(event) {
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
    
    const icons = [...aboutLogos, ...skillsLogos];

    icons.forEach(icon => {
        icon.children[0].addEventListener('mouseover', event => {
            event.target.classList.toggle("bounce");
        });
        icon.children[0].addEventListener('mouseleave', event => {
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
