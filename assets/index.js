const repos = [
    { 
        'name': "curtis-pearson.github.io",
        'desc': "",
        'url': "https://github.com/Curtis-Pearson/curtis-pearson.github.io",
        'languages': ["HTML", "CSS", "JavaScript"]
    },
    {
        'name': "Networked Blackjack",
        'desc': "",
        'url': "https://github.com/Curtis-Pearson/networked-blackjack",
        'languages': ["Python"]
    },
    {
        'name': "Program Interpreter",
        'desc': "",
        'url': "https://github.com/Curtis-Pearson/program-interpreter",
        'languages': ["Python"]
    },
    {
        'name': "x86 Boot-Loader",
        'desc': "",
        'url': "https://github.com/Curtis-Pearson/x86-boot-loader",
        'languages': ["Assembly"]
    },
    {
        'name': "x86 Graphics",
        'desc': "",
        'url': "https://github.com/Curtis-Pearson/x86-graphics",
        'languages': ["Assembly", "C"]
    },
    {
        'name': "Wizard Shop",
        'desc': "",
        'url': "https://github.com/Curtis-Pearson/wizard-shop",
        'languages': ["C#"]
    }
];

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

let displayedRepos = [0, 1, 2];

async function displayGithubRepos() {
    const reposListDiv = document.querySelector('.github-repos');
    reposListDiv.innerHTML = '';

    for (let i = 0; i < displayedRepos.length; i++) {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repo';
        
        const repoName = document.createElement('h1');
        repoName.textContent = repos[i].name;

        const repoDesc = document.createElement('h2');
        repoDesc.textContent = repos[i].desc;

        const repoLangs = document.createElement('p');
        repoLangs.textContent = `Languages: ${repos[i].languages.join(', ')}`;

        const repoLink = document.createElement('a');
        repoLink.href = repos[i].url;
        repoLink.textContent = 'View Repo';

        repoDiv.appendChild(repoName);
        repoDiv.appendChild(repoDesc);
        repoDiv.appendChild(repoLangs);
        repoDiv.appendChild(repoLink);
        reposListDiv.appendChild(repoDiv);
    }
}

async function updateRepos() {
    const repoListDiv = document.querySelector('.github-repos');
    const repoDivs = document.querySelectorAll('.repo');;

    repoDivs[0].style.transition = "opacity 1s, transform 1s";
    repoDivs[0].style.opacity = 0;
    repoDivs[0].style.transformOrigin = "left center";
    repoDivs[0].style.transform = "scaleX(0)";

    let dist = repoDivs[0].offsetWidth + parseFloat(window.getComputedStyle(repoDivs[0]).marginRight);

    repoDivs[1].style.transition = "transform 1s";
    repoDivs[1].style.transform = `translateX(-${dist}px)`;
    repoDivs[2].style.transition = "transform 1s";
    repoDivs[2].style.transform = `translateX(-${dist}px)`;

    await new Promise(res => setTimeout(res, 1000));

    repoDivs[1].style.transition = "";
    repoDivs[1].style.transform = "";
    repoDivs[2].style.transition = "";
    repoDivs[2].style.transform = "";
    repoDivs[0].remove();

    let newRepo = repos[displayedRepos[2]];
    let newRepoDiv = document.createElement('div');
    newRepoDiv.className = 'repo';
    newRepoDiv.innerHTML = `
        <h1>${newRepo.name}</h1>
        <h2>${newRepo.desc}</h2>
        <p>${newRepo.languages.join(', ')}</p>
        <a href="${newRepo.url}">Link</a>
    `;
    newRepoDiv.style.opacity = 0;
    newRepoDiv.style.transformOrigin = "right center";
    newRepoDiv.style.transform = "scaleX(0)";

    repoListDiv.appendChild(newRepoDiv);

    await new Promise(res => setTimeout(res, 1));

    newRepoDiv.style.transition = "opacity 1s, transform 1s";
    newRepoDiv.style.opacity = 1;
    newRepoDiv.style.transform = "scaleX(1)";
}

async function nextRepo() {
    let i = displayedRepos.shift();
    displayedRepos.push((i + 3) % (repos.length - 1));
    updateRepos();
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

    setInterval(nextRepo, 5000);
    
    const icons = [...aboutLogos, ...skillsLogos];

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
