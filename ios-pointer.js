//
// GAUCHER - Advanced iOS-Style Magnetic Pointer
//
document.addEventListener('DOMContentLoaded', () => {
  // Check for GSAP, which is required for this effect.
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded. This effect requires the GSAP library.');
    return;
  }
  
  // Create the two main cursor elements.
  const cursorDot = document.createElement('div');
  cursorDot.id = 'cursor-dot';
  document.body.appendChild(cursorDot);

  const cursorHighlighter = document.createElement('div');
  cursorHighlighter.id = 'cursor-highlighter';
  document.body.appendChild(cursorHighlighter);

  // --- State Management ---
  let dotX = 0, dotY = 0;
  let currentActiveElement = null;
  let magneticTween, textMagneticTween;
  
  // A simple state machine to prevent animation jitter
  let pointerState = 'IDLE'; // Can be IDLE, ANIMATING_IN, ACTIVE, ANIMATING_OUT

  // Use GSAP to animate the dot for a smoother feel.
  gsap.ticker.add(() => {
    gsap.to(cursorDot, {
      x: dotX,
      y: dotY,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  // --- Main Animation Loop (on mouse move) ---
  window.addEventListener('mousemove', (e) => {
    dotX = e.clientX;
    dotY = e.clientY;

    if (currentActiveElement) {
      const rect = currentActiveElement.getBoundingClientRect();
      const bufferX = 40; // Horizontal magnetic field (Left/Right)
      const bufferY = 30; // Vertical magnetic field (Top/Bottom)

      if (
        pointerState === 'ACTIVE' &&
        ( dotX < rect.left - bufferX ||
          dotX > rect.right + bufferX ||
          dotY < rect.top - bufferY ||
          dotY > rect.bottom + bufferY )
      ) {
        // --- Animate Out ---
        pointerState = 'ANIMATING_OUT';
        if (textMagneticTween) textMagneticTween.kill();
        gsap.to(currentActiveElement, { 
          x: 0, y: 0, duration: 0.2, ease: 'expo.out',
          onComplete: () => {
            pointerState = 'IDLE';
            currentActiveElement = null;
          }
        });

        if (magneticTween) magneticTween.kill();
        gsap.to(cursorDot, { scale: 1, opacity: 1, duration: 0.2, ease: 'expo.out' });
        gsap.to(cursorHighlighter, {
          x: dotX,
          y: dotY,
          width: cursorDot.offsetWidth,
          height: cursorDot.offsetHeight,
          borderRadius: '50%',
          opacity: 0,
          duration: 0.2,
          ease: 'expo.out'
        });
      } else if (pointerState === 'ACTIVE') {
        // --- Animate Magnetic Pull ---
        
        // 1. For the highlighter (very sticky)
        const highlighterTargetX = rect.left + (dotX - (rect.left + rect.width / 2)) * 0.8;
        const highlighterTargetY = rect.top + (dotY - (rect.top + rect.height / 2)) * 0.8;
        if (magneticTween) magneticTween.kill();
        magneticTween = gsap.to(cursorHighlighter, {
          x: highlighterTargetX,
          y: highlighterTargetY,
          duration: 0.3,
          ease: 'power3.out'
        });

        // 2. For the text element itself (subtle pull)
        const textTargetX = (dotX - (rect.left + rect.width / 2)) * 0.15;
        const textTargetY = (dotY - (rect.top + rect.height / 2)) * 0.15;
        if (textMagneticTween) textMagneticTween.kill();
        textMagneticTween = gsap.to(currentActiveElement, {
          x: textTargetX,
          y: textTargetY,
          duration: 0.3,
          ease: 'power3.out'
        });
      }
    }
  });

  // Define which elements will be interactive.
  const interactiveElements = document.querySelectorAll('li, p, h2, i, .description, .para, .descx, .head_tw_p, .listing, .listitem');

  const excludedTexts = [
    'NEW ARRIVALS', 'ABOUT US', 'COLLECTIONS', 
    'TIMELESS', 'SUBSCRIBE TO NEWSLETTER'
  ];

  // 2. Filter the candidates to create a clean list of interactive elements.
  const filteredElements = Array.from(interactiveElements).filter(el => {
    // Rule 1: Exclude the entire "NEW ARRIVALS" section.
    if (el.closest('.container_scnd')) {
      return false;
    }

    // Rule 2: Exclude the P tag inside a .listitem (for NEW ARRIVALS).
    if (el.tagName === 'P' && el.closest('.listitem')) {
      return false;
    }
    
    // Rule 3: Exclude elements by their text content (e.g., major headings).
    const text = el.textContent?.trim() || '';
    if (!text || excludedTexts.includes(text)) {
      return false;
    }
    
    // Ensure the element can be transformed without breaking layout.
    const display = getComputedStyle(el).display;
    if (display === 'inline') {
      el.style.display = 'inline-block';
    }

    return true;
  });

  filteredElements.forEach(el => {
    // --- EXCLUDE the GAUCHER logo in the navbar ---
    if (el.classList.contains('LOGO')) {
      return;
    }

    // --- EXCLUDE the entire .container_sixx (Newsletter) section ---
    if (el.closest('.container_sixx')) {
      return;
    }

    // --- EXCLUDE the entire .listing container and its children ---
    if (el.closest('.listing')) {
      return;
    }

    // --- EXCLUDE a p tag if it's inside a .listitem ---
    if (el.tagName === 'P' && el.closest('.listitem')) {
      return;
    }

    el.addEventListener('mouseenter', (e) => {
      // Prevent animations from stacking if one is already running IN.
      if (pointerState === 'ANIMATING_IN') return;

      // Kill any ongoing animations (especially the 'out' one) for a seamless transition.
      gsap.killTweensOf(cursorHighlighter);
      gsap.killTweensOf(cursorDot);
      if (currentActiveElement) {
        gsap.killTweensOf(currentActiveElement);
        // Instantly reset the old element's position to avoid it getting stuck.
        gsap.set(currentActiveElement, { x: 0, y: 0 });
      }

      // Set this as the currently active element
      currentActiveElement = el;
      pointerState = 'ANIMATING_IN';
      
      const rect = el.getBoundingClientRect();
      const padding = 10; // The padding around the text
      
      // Animate the dot and highlighter to their new states.
      // Using .to() instead of .fromTo() allows us to interrupt smoothly.
      gsap.to(cursorDot, { scale: 0.5, opacity: 0.5, duration: 0.2, ease: 'expo.out' });
      gsap.to(cursorHighlighter, {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + (padding * 2),
        height: rect.height + (padding * 2),
        borderRadius: '8px', // Slightly more rounded for a larger shape
        opacity: 1,
        duration: 0.2,
        ease: 'expo.out',
        onComplete: () => {
          pointerState = 'ACTIVE'; // Animation is done, now it's 'active'
        }
      });
    });

    // We no longer need individual mousemove or mouseleave listeners here,
    // as the main window.mousemove listener handles all logic.
  });

  // Hide the default system cursor.
  document.body.style.cursor = 'none';
  filteredElements.forEach(el => el.style.cursor = 'none');
  console.log('Advanced iOS Pointer Effect is now active.');
}); 