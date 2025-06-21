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
  
  // Initialize both GAUCHER text animations
  animateMainGaucherText();
  animateFooterGaucherText();

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

  // Animate h2 in .infoo with wavy effect
  function animateInfooH2Wavy() {
    const h2 = document.querySelector('.container_sixx .infoo .head_tw');
    if (!h2) return;
    
    const text = h2.textContent;
    h2.innerHTML = '';
    text.split('').forEach((char, i) => {
      if (char === ' ') {
        h2.appendChild(document.createTextNode(' '));
        return;
      }
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = 0;
      span.style.transform = 'translateY(20px) rotateX(90deg)';
      h2.appendChild(span);
    });
    
    const spans = h2.querySelectorAll('span');
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      ease: 'back.out(1.7)',
      stagger: 0.04,
      duration: 0.5,
      scrollTrigger: {
        trigger: h2,
        start: 'top 80%',
        scroller: document.querySelector('#main_container'),
        once: true
      }
    });
  }

  // Call the wavy animation for h2
  animateInfooH2Wavy();

  // Animate paragraph text in .infoo with a different effect
  function animateInfooParagraph() {
    const paragraph = document.querySelector('.container_sixx .infoo .head_tw_p');
    if (!paragraph) {
      console.log('Paragraph not found');
      return;
    }
    
    const text = paragraph.textContent;
    paragraph.innerHTML = '';
    paragraph.style.opacity = 0;

    function runTypewriter() {
      let currentIndex = 0;
      const typewriterInterval = setInterval(() => {
        if (currentIndex < text.length) {
          paragraph.innerHTML += text[currentIndex];
          currentIndex++;
        } else {
          clearInterval(typewriterInterval);
          // Fade in the entire paragraph after typewriter effect
          gsap.to(paragraph, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      }, 50); // Speed of typewriter effect
    }

    // Use GSAP ScrollTrigger to run typewriter when in view
    gsap.to(paragraph, {
      opacity: 1,
      duration: 0.1,
      scrollTrigger: {
        trigger: paragraph,
        start: 'top 80%',
        scroller: document.querySelector('#main_container'),
        once: true,
        onEnter: runTypewriter
      }
    });
  }

  // Call the new animation function
  animateInfooParagraph();

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

  // --- CONTAINER_SVNTH (Footer Section) - Particle/Background Effects ---
  
  // 1. Create floating particles system
  function createFooterParticles() {
    const footer = document.querySelector('.container_svnth');
    if (!footer) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    particleContainer.style.overflow = 'hidden';
    footer.style.position = 'relative';
    footer.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 3 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(255, 255, 255, 0.3)';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particleContainer.appendChild(particle);
      
      // Animate each particle
      gsap.to(particle, {
        y: -100,
        x: Math.random() * 50 - 25,
        opacity: 0,
        duration: Math.random() * 10 + 10,
        ease: 'none',
        repeat: -1,
        delay: Math.random() * 5
      });
    }
  }
  
  // 2. Ambient background pattern animation
  function animateFooterBackgroundPattern() {
    const footer = document.querySelector('.container_svnth');
    if (!footer) return;
    
    // Create animated background pattern
    const bgPattern = document.createElement('div');
    bgPattern.style.position = 'absolute';
    bgPattern.style.top = '0';
    bgPattern.style.left = '0';
    bgPattern.style.width = '100%';
    bgPattern.style.height = '100%';
    bgPattern.style.background = `
      radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%),
      linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.01) 50%, transparent 60%)
    `;
    bgPattern.style.pointerEvents = 'none';
    bgPattern.style.zIndex = '-1';
    footer.appendChild(bgPattern);
    
    // Animate background pattern
    gsap.to(bgPattern, {
      backgroundPosition: '100% 100%',
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }
  
  // 3. Subtle glow effects for social icons
  function addSocialIconsGlow() {
    const socialIcons = document.querySelectorAll('.container_svnth .socialicons i');
    
    socialIcons.forEach((icon, index) => {
      // Add glow effect
      gsap.set(icon, { 
        filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))',
        transition: 'all 0.3s ease'
      });
      
      // Subtle floating animation
      gsap.to(icon, {
        y: -5,
        duration: 2 + index * 0.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      });
      
      // Enhanced hover with glow
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.6)) brightness(1.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          filter: 'drop-shadow(0 0 0px rgba(255,255,255,0)) brightness(1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }
  
  // 4. Navigation links with ambient effects
  function addNavigationAmbientEffects() {
    const navLinks = document.querySelectorAll('.container_svnth .left li');
    
    navLinks.forEach((link, index) => {
      // Subtle ambient animation
      gsap.to(link, {
        opacity: 0.8,
        duration: 2 + index * 0.3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
      
      // Enhanced hover with ambient glow
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          opacity: 1,
          scale: 1.05,
          filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.4))',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          opacity: 0.8,
          scale: 1,
          filter: 'brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }
  
  // 5. Subtle section entrance with particle reveal
  function animateFooterEntrance() {
    const footer = document.querySelector('.container_svnth');
    if (!footer) return;
    
    gsap.set(footer, { opacity: 0, y: 30 });
    gsap.to(footer, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        scroller: document.querySelector('#main_container'),
        once: true
      }
    });
  }
  
  // Initialize particle and background effects
  function initFooterParticleEffects() {
    createFooterParticles();
    animateFooterBackgroundPattern();
    addSocialIconsGlow();
    addNavigationAmbientEffects();
    animateFooterEntrance();
  }
  
  initFooterParticleEffects();
});

// Main GAUCHER text animation function
function animateMainGaucherText() {
  const path = document.getElementById('liquid-fill-path');
  console.log('main liquid-fill-path found:', !!path);
  
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
    console.warn('Main GAUCHER text: GSAP, ScrollTrigger, or path not found!');
  }
}

// Footer GAUCHER text animation function
function animateFooterGaucherText() {
  const footerPath = document.getElementById('liquid-fill-path-footer');
  console.log('footer liquid-fill-path found:', !!footerPath);
  
  if (window.gsap && window.ScrollTrigger && footerPath) {
    const width = 2200;
    const height = 550;
    const waveHeight = 30;   // Decreased from 40 for less aggressive waves
    const waveLength = 500;  // Increased from 300 for wider, gentler waves
    const points = 100;      // Increased from 40 for a much smoother curve

    let fillProgress = 0;
    let targetFillProgress = 0;
    let phase = 0;

    function getFooterWavePath(fillLevel, phase) {
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
    footerPath.setAttribute('d', getFooterWavePath(height, 0));

    // Animate fill level with ScrollTrigger
    gsap.to({progress: 0}, {
      progress: 1,
      scrollTrigger: {
        trigger: '#liquid-text-container-footer',
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
    function animateFooterWave() {
      fillProgress += (targetFillProgress - fillProgress) * 0.04; // Decreased from 0.08 for smoother fill
      phase += 0.01; // Decreased from 0.015 for slower wave movement
      const fillLevel = height - fillProgress * height*2;
      footerPath.setAttribute('d', getFooterWavePath(fillLevel, phase));
      requestAnimationFrame(animateFooterWave);
    }
    animateFooterWave();
  } else {
    console.warn('Footer GAUCHER text: GSAP, ScrollTrigger, or path not found!');
  }
}

// Page Loading Animation
function initPageLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.loading-progress-fill');
    const percentageText = document.querySelector('.loading-percentage');
    const loadingText = document.querySelector('.loading-text');

    let progress = 0;
    const targetProgress = 100;
    const loadingSteps = [
        { progress: 20, text: 'Initializing...' },
        { progress: 40, text: 'Loading assets...' },
        { progress: 60, text: 'Preparing content...' },
        { progress: 80, text: 'Almost ready...' },
        { progress: 100, text: 'Complete!' }
    ];

    function updateProgress() {
        if (progress < targetProgress) {
            progress += Math.random() * 3 + 1; // Random increment between 1-4
            progress = Math.min(progress, targetProgress);
            
            // Update progress bar
            progressFill.style.width = progress + '%';
            percentageText.textContent = Math.round(progress) + '%';
            
            // Update loading text based on progress
            const currentStep = loadingSteps.find(step => progress <= step.progress);
            if (currentStep) {
                loadingText.textContent = currentStep.text;
            }
            
            // Continue animation
            requestAnimationFrame(updateProgress);
        } else {
            // Loading complete
            setTimeout(() => {
                // Roll up the loading screen
                loadingScreen.classList.add('loaded');
                
                // Remove loading screen after animation
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1500);
            }, 500);
        }
    }

    // Start the loading animation
    setTimeout(() => {
        updateProgress();
    }, 1000);
}

// Initialize loading animation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPageLoading();
}); 


