const circle = document.getElementById('circle');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

const smoothFactor = 0.1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    circle.style.opacity = '1';
});

function animate() {
    currentX += (mouseX - currentX) * smoothFactor;
    currentY += (mouseY - currentY) * smoothFactor;

    circle.style.left = currentX + 'px';
    circle.style.top = currentY + 'px';

    requestAnimationFrame(animate);
}


document.addEventListener('mouseleave', (e) => {
    circle.style.opacity = '0';
    circle.style.transition = "0.05s linear"
});




// animate();
