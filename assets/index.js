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