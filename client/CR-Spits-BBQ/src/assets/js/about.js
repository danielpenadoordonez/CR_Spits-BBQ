document.querySelectorAll(".show-more").forEach(element => {
    let parent = element.parentNode.parentNode.parentNode.parentNode;
    let front = element.parentNode.parentNode;
    let behind = front.nextElementSibling;
    let description = behind.firstChild;
    element.addEventListener("click", () => {
        parent.classList.toggle('invert-rotate-card');
        parent.classList.toggle('rotate-card');
        front.classList.toggle('quit-front');
        behind.childNodes[0].style.opacity = "1";
    })
    behind.addEventListener('click', () => {
        front.classList.toggle('quit-front');
        parent.classList.toggle('invert-rotate-card');
        parent.classList.toggle('rotate-card');
        behind.childNodes[0].style.opacity = "0";
    })

});

var delay = 0.5;
document.querySelectorAll('.profile-card-content').forEach(card => {
    card.style.transitionDelay = delay + 's';
    delay += 0.5;
    card.classList.add('card-reveal');
})

// const srAbout = ScrollReveal({
//     origin: 'top',
//     distance: '30px',
//     duration: 1500,
//     delay: 3000,
// })

// srAbout.reveal('.nav-item'); 