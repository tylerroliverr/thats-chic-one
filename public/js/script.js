    // const lenis = new Lenis();

    // function raf(time) {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);


// ------------------------------------------------------------------------ START SMOOTH LINK JUMPS --------------------------------- //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const { hash } = anchor;
        document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
    });
});

const customCursor = document.getElementById('custom-cursor');
const customPointer = document.getElementById('custom-pointer');
const cursorContainer = document.getElementById('cursor-container');
const link = document.querySelectorAll('.link');
const images = document.querySelectorAll('.memories-feed-img');

document.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    customCursor.style.transform = `translate(${x - customCursor.clientWidth / 2}px, ${y - customCursor.clientHeight / 2}px)`;
    customPointer.style.transform = `translate(${x - customPointer.clientWidth / 2}px, ${y - customPointer.clientHeight / 2}px)`;
});

document.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    customPointer.style.transform = `translate(${x - customPointer.clientWidth / 2}px, ${y - customPointer.clientHeight / 2}px)`;
});

document.documentElement.addEventListener('mouseleave', function () {
    customCursor.classList.remove('visible');
    cursorContainer.classList.remove('visible');
    customCursor.classList.add('hidden');
});

document.documentElement.addEventListener('mouseenter', function () {
    customCursor.classList.remove('hidden');
    customCursor.classList.add('visible');
    cursorContainer.classList.add('visible');
});

document.documentElement.addEventListener('mousemove', function handleMouseMove() {
    document.documentElement.removeEventListener('mousemove', handleMouseMove);

    customCursor.classList.remove('hidden');
    customCursor.classList.add('visible');
    cursorContainer.classList.add('visible');
}, { once: true });