// Opening Animation
gsap.to("#minhubLogo", {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      gsap.to(".splash", {
        y: "-100%",
        duration: 1,
        delay: 0.5,
        ease: "power2.inOut"
      });
    }
  });
  
  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active"); // ← 追加！三本線 → X に変化
    navMenu.classList.toggle("open");
  });
  
  // Tabs
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });
  
  // GSAP Animations
  gsap.utils.toArray('.step, .review-card').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      }
    });
  });
  