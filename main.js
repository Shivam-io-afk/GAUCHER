const circle = document.getElementById('circle');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

const smoothFactor = 0.14;

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

// Animate the liquid fill on scroll with a wavy path
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded');
  console.log('gsap:', typeof gsap !== 'undefined');
  console.log('ScrollTrigger:', typeof ScrollTrigger !== 'undefined');
  const path = document.getElementById('liquid-fill-path');
  console.log('liquid-fill-path found:', !!path);
  if (window.gsap && window.ScrollTrigger && path) {
    const width = 1200;
    const height = 350;
    const waveHeight = 30;
    const waveLength = 300;
    const points = 40;

    let fillProgress = 0; // 0 to 1
    let targetFillProgress = 0; // For smooth interpolation
    let phase = 0;

    function getWavePath(fillLevel, phase) {
      let d = `M0,${height} L0,${fillLevel}`;
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const theta = (i / points) * Math.PI * 2 * (width / waveLength) + phase;
        const y = fillLevel - Math.sin(theta) * waveHeight;
        d += ` L${x},${y}`;
      }
      d += ` L${width},${height} Z`;
      return d;
    }

    // Initial state
    path.setAttribute('d', getWavePath(height, 0));

    // Animate fill level with ScrollTrigger
    gsap.to({progress: 0}, {
      progress: 1,
      scrollTrigger: {
        trigger: '#liquid-text-container',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        scroller: document.querySelector('#main_container'),
        onUpdate: self => {
          targetFillProgress = self.progress;
        }
      }
    });

    // Animate the wave phase and smooth fill
    function animateWave() {
      fillProgress += (targetFillProgress - fillProgress) * 0.08; // Smooth interpolation
      phase += 0.01; // Constant slow speed, always animating
      const fillLevel = height - fillProgress * height;
      path.setAttribute('d', getWavePath(fillLevel, phase));
      requestAnimationFrame(animateWave);
    }
    animateWave();
  } else {
    console.warn('GSAP, ScrollTrigger, or path not found!');
  }

  // Animate section titles: NEW ARRIVALS, ABOUT US, COLLECTIONS
  function animateSectionTitle(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    // Split text into spans for each character, ignoring spaces for animation
    const text = el.textContent;
    el.innerHTML = '';
    text.split('').forEach((char, i) => {
      if (char === ' ') {
        // Insert a normal space, not animated
        el.appendChild(document.createTextNode(' '));
        return;
      }
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = 0;
      span.style.transform = 'translateY(40px) scale(0.8)';
      el.appendChild(span);
    });
    const spans = el.querySelectorAll('span');
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'back.out(1.7)',
      stagger: 0.06,
      duration: 0.7,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        scroller: document.querySelector('#main_container'),
        once: true
      }
    });
  }

  animateSectionTitle('.container_scnd .head_tw'); // NEW ARRIVALS
  animateSectionTitle('.container_thrd .head_tw'); // ABOUT US
  animateSectionTitle('.container_frth .head_tw'); // COLLECTIONS
  animateSectionTitle('.container_sixx .head_tw'); // SUBSCRIBE TO NEWSLETTER

  // Animate TIMELESS text with a wavy reveal effect
  function animateTimelessWavy() {
    const el = document.querySelector('.container_fifth .subb_container h1');
    if (!el) return;
    const text = el.textContent;
    el.innerHTML = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = 0;
      span.style.transform = 'translateY(80px)';
      el.appendChild(span);
    });
    const spans = el.querySelectorAll('span');
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      ease: 'elastic.out(1, 0.5)',
      duration: 1.2,
      stagger: {
        each: 0.08,
        from: 'center',
        amount: 0.7
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        scroller: document.querySelector('#main_container'),
        once: true
      }
    });
  }
  animateTimelessWavy();

  // Animate TIMELESS images with fade+scale in effect
  function animateTimelessImages() {
    const timelessImages = document.querySelectorAll('.container_fifth .imgcct');
    timelessImages.forEach((imgcct, i) => {
      const img = imgcct.querySelector('img');
      if (!img) return;
      gsap.set(img, { opacity: 0, scale: 0.85 });
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: imgcct,
          start: 'top 90%',
          scroller: document.querySelector('#main_container'),
          once: true
        }
      });
    });
  }
  animateTimelessImages();

  // Animate NEW ARRIVALS products with mask/wipe reveal (staggered)
  function animateNewArrivalsMaskWipe() {
    const items = document.querySelectorAll('.container_scnd .listitem');
    items.forEach((item, i) => {
      item.style.overflow = 'hidden';
      item.style.clipPath = 'inset(0 100% 0 0)';
      item.style.opacity = 1;
    });
    gsap.to(items, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1,
      ease: 'power2.out',
      stagger: 0.13,
      scrollTrigger: {
        trigger: '.container_scnd .list_cont',
        start: 'top 85%',
        scroller: document.querySelector('#main_container'),
        once: true
      }
    });
  }
  animateNewArrivalsMaskWipe();

  // Add 3D tilt + shine sweep effect on hover for NEW ARRIVALS product cards
  function addNewArrivals3DTiltShine() {
    const items = document.querySelectorAll('.container_scnd .listitem');
    items.forEach(item => {
      // Create shine element
      let shine = document.createElement('div');
      shine.style.position = 'absolute';
      shine.style.top = 0;
      shine.style.left = 0;
      shine.style.width = '100%';
      shine.style.height = '100%';
      shine.style.pointerEvents = 'none';
      shine.style.background = 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)';
      shine.style.opacity = 0;
      shine.style.transition = 'opacity 0.3s';
      shine.style.zIndex = 2;
      item.style.position = 'relative';
      item.appendChild(shine);

      let targetRotateX = 0, targetRotateY = 0;
      let currentRotateX = 0, currentRotateY = 0;
      let animationFrame;
      function animate() {
        currentRotateX += (targetRotateX - currentRotateX) * 0.15;
        currentRotateY += (targetRotateY - currentRotateY) * 0.15;
        item.style.transform = `perspective(600px) rotateX(${-currentRotateX}deg) rotateY(${currentRotateY}deg)`;
        animationFrame = requestAnimationFrame(animate);
      }
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetRotateX = ((y - centerY) / centerY) * 10;
        targetRotateY = ((x - centerX) / centerX) * 10;
        if (!animationFrame) animate();
        // Shine follows mouse X
        const shinePos = ((x / rect.width) * 100);
        shine.style.opacity = 1;
        shine.style.background = `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)`;
        shine.style.transform = `translateX(${shinePos - 50}%)`;
      });
      item.addEventListener('mouseleave', () => {
        targetRotateX = 0;
        targetRotateY = 0;
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
        // Animate back to 0 smoothly
        function reset() {
          currentRotateX += (0 - currentRotateX) * 0.15;
          currentRotateY += (0 - currentRotateY) * 0.15;
          item.style.transform = `perspective(600px) rotateX(${-currentRotateX}deg) rotateY(${currentRotateY}deg)`;
          if (Math.abs(currentRotateX) > 0.1 || Math.abs(currentRotateY) > 0.1) {
            requestAnimationFrame(reset);
          } else {
            item.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
          }
        }
        reset();
        shine.style.opacity = 0;
      });
    });
  }
  addNewArrivals3DTiltShine();

  // Animate AUTHENTICATION text (pseudo-element) using CSS variables
  function animateAuthenticationText() {
    const displayImg = document.querySelector('.container_thrd .display_img');
    if (!displayImg) return;
    gsap.set(displayImg, { '--auth-opacity': 0, '--auth-ty': '60px' });
    gsap.to(displayImg, {
      '--auth-opacity': 1,
      '--auth-ty': '0px',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: displayImg,
        start: 'top 80%',
        scroller: document.querySelector('#main_container'),
        once: true
      }
    });
  }
  animateAuthenticationText();

  // Parallax effect for COLLECTIONS images (object-position scroll)
  function animateCollectionsImageParallax() {
    const listings = document.querySelectorAll('.container_frth .boces .listing');
    listings.forEach(listing => {
      const img = listing.querySelector('div > img');
      if (!img) return;
      img.style.setProperty('--parallax-pos', '0%');
      gsap.to(img, {
        '--parallax-pos': '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: listing,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          scroller: document.querySelector('#main_container')
        }
      });
    });
  }
  animateCollectionsImageParallax();

  // --- COLLECTIONS Section Title 3D Flip/Rotate Reveal ---
  function animateCollectionsTitleFlip() {
    const el = document.querySelector('.container_frth .head_tw');
    if (!el) return;
    const text = el.textContent;
    el.innerHTML = '';
    el.style.perspective = '600px';
    text.split('').forEach((char, i) => {
      if (char === ' ') {
        el.appendChild(document.createTextNode(' '));
        return;
      }
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = 0;
      span.style.transform = 'rotateY(90deg)';
      el.appendChild(span);
    });
    const spans = el.querySelectorAll('span');
    gsap.to(spans, {
      opacity: 1,
      rotateY: 0,
      ease: 'back.out(2)',
      stagger: 0.05,
      duration: 0.5,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        scroller: document.querySelector('#main_container'),
        once: true
      }
    });
  }

  // --- COLLECTIONS Product Titles/Descriptions 3D Flip/Rotate Reveal ---
  function animateCollectionsListingsFlip() {
    const listings = document.querySelectorAll('.container_frth .boces .listing');
    listings.forEach(listing => {
      // Product Title (h2)
      const h2 = listing.querySelector('h2');
      if (h2) {
        const text = h2.textContent;
        h2.innerHTML = '';
        h2.style.perspective = '600px';
        text.split('').forEach((char, i) => {
          if (char === ' ') {
            h2.appendChild(document.createTextNode(' '));
            return;
          }
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = 0;
          span.style.transform = 'rotateY(90deg)';
          h2.appendChild(span);
        });
        const spans = h2.querySelectorAll('span');
        gsap.to(spans, {
          opacity: 1,
          rotateY: 0,
          ease: 'back.out(2)',
          stagger: 0.035,
          duration: 0.4,
          scrollTrigger: {
            trigger: listing,
            start: 'top 90%',
            scroller: document.querySelector('#main_container'),
            once: true
          }
        });
      }
      // Product Description (.description)
      const desc = listing.querySelector('.description');
      if (desc) {
        const text = desc.textContent;
        desc.innerHTML = '';
        desc.style.perspective = '600px';
        text.split('').forEach((char, i) => {
          if (char === ' ') {
            desc.appendChild(document.createTextNode(' '));
            return;
          }
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = 0;
          span.style.transform = 'rotateY(90deg)';
          desc.appendChild(span);
        });
        const spans = desc.querySelectorAll('span');
        gsap.to(spans, {
          opacity: 1,
          rotateY: 0,
          ease: 'back.out(2)',
          stagger: 0.018,
          duration: 0.3,
          scrollTrigger: {
            trigger: listing,
            start: 'top 92%',
            scroller: document.querySelector('#main_container'),
            once: true
          }
        });
      }
    });
  }

  animateCollectionsTitleFlip();
  animateCollectionsListingsFlip();
}); 
