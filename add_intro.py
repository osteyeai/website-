import re

index = "c:/Users/om/Desktop/website-/index.html"
css = "c:/Users/om/Desktop/website-/assets/styles.css"
js = "c:/Users/om/Desktop/website-/assets/script.js"

with open(index, "r", encoding="utf-8") as f:
    html_content = f.read()

intro_html = """<body style="overflow: hidden;">
    <!-- ═══════════ INTRO SCREEN OVERLAY ═══════════ -->
    <div id="intro-screen">
        <div class="intro-content">
            <div class="intro-logo">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100px; height: 100px; margin-bottom: 20px;">
                    <path d="M 25 30 L 18 8 L 38 25 Z" fill="var(--accent-primary)" opacity="0.85" />
                    <path d="M 75 30 L 82 8 L 62 25 Z" fill="var(--accent-primary)" opacity="0.85" />
                    <ellipse cx="50" cy="42" rx="32" ry="28" fill="var(--text-secondary)" opacity="0.85" />
                    <ellipse cx="50" cy="45" rx="24" ry="20" fill="#1a2e42" opacity="0.9" />
                    <circle cx="38" cy="42" r="11" fill="none" stroke="var(--accent-primary)" stroke-width="2" opacity="0.6" />
                    <circle cx="62" cy="42" r="11" fill="none" stroke="var(--accent-primary)" stroke-width="2" opacity="0.6" />
                    <circle cx="38" cy="42" r="8" fill="#0a1520" />
                    <circle cx="38" cy="42" r="5" fill="var(--accent-primary)" />
                    <circle cx="62" cy="42" r="8" fill="#0a1520" />
                    <circle cx="62" cy="42" r="5" fill="var(--accent-primary)" />
                    <path d="M 47 50 L 53 50 L 50 57 Z" fill="var(--accent-primary)" opacity="0.95" />
                </svg>
                <div class="intro-brand">OSTEYE</div>
                <div class="intro-subtitle">AI-POWERED SECURITY</div>
            </div>
            
            <div class="intro-services">
                <div class="intro-service-item"><i class="fas fa-video"></i> AI CCTV SURVEILLANCE</div>
                <div class="intro-service-item"><i class="fas fa-home"></i> SMART HOME AUTOMATION</div>
                <div class="intro-service-item"><i class="fas fa-solar-panel"></i> OFF-GRID SOLAR & 4G CAMERAS</div>
                <div class="intro-service-item"><i class="fas fa-microchip"></i> 24/7 ACTIVE AI MONITORING</div>
                <div class="intro-service-item"><i class="fab fa-whatsapp"></i> INSTANT WHATSAPP ALERTS</div>
                <div class="intro-service-item terminal-type"><span class="terminal-text"></span><span class="terminal-cursor">_</span></div>
            </div>

            <button id="intro-proceed" class="btn-cta" style="opacity: 0; pointer-events: none; margin-top: 50px;">PROCEED TO WEBSITE <i class="fas fa-arrow-right"></i></button>
        </div>
    </div>
"""
html_content = html_content.replace('<body>', intro_html)
with open(index, "w", encoding="utf-8") as f:
    f.write(html_content)


with open(css, "r", encoding="utf-8") as f:
    css_content = f.read()

intro_css = """/* ═══════════ INTRO SCREEN ═══════════ */
#intro-screen {
    position: fixed;
    inset: 0;
    background: var(--bg-primary);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 0.8s ease, transform 0.8s ease;
    overflow-y: auto;
}

#intro-screen.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-20px);
}

.intro-content {
    text-align: center;
    max-width: 800px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.intro-logo {
    margin-bottom: 40px;
}

.intro-brand {
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--accent-primary);
    letter-spacing: 0.2em;
    margin-bottom: 5px;
}

.intro-subtitle {
    font-size: 0.9rem;
    color: var(--text-secondary);
    letter-spacing: 0.3em;
}

.intro-services {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
}

.intro-service-item {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    color: var(--text-primary);
    letter-spacing: 0.1em;
    opacity: 0; /* JS will fade them in */
    transform: translateY(20px);
}

.intro-service-item i {
    color: var(--accent-primary);
    margin-right: 8px;
    width: 25px;
}

.terminal-type {
    font-family: monospace;
    color: #ff3366;
    font-size: 1.15rem;
    font-weight: bold;
    text-align: center;
    text-shadow: 0 0 10px rgba(255, 51, 102, 0.4);
    opacity: 1 !important; /* Managed by JS typing */
    transform: none !important;
    height: 1.5em; /* reserve space */
    margin-top: 15px;
}

.terminal-cursor {
    animation: blink 1s step-end infinite;
}

.emergency-pulse {
    animation: pulse-red 1.5s infinite;
}

@keyframes pulse-red {
    0%, 100% { text-shadow: 0 0 10px rgba(255, 51, 102, 0.4); color: #ff3366; }
    50% { text-shadow: 0 0 25px rgba(255, 0, 0, 0.9); color: #ff0000; }
}

"""
css_content = css_content.replace('/* ═══════════ TOP TICKER ═══════════ */', intro_css + '/* ═══════════ TOP TICKER ═══════════ */')
with open(css, "w", encoding="utf-8") as f:
    f.write(css_content)


with open(js, "r", encoding="utf-8") as f:
    js_content = f.read()

# Modify JS
# 1. replace the first hero animation block
first_block = r"window\.addEventListener\('load', \(\) => {\s*gsap\.registerPlugin\(ScrollTrigger\);\s*if \(\!prefersReduced\) {\s*gsap\.from\('\.hero-tag'.*?ScrollTrigger\.refresh\(\);\s*}\);"

new_intro_js = """
        /* ═══════════ INTRO SCREEN ANIMATION ═══════════ */
        const introScreen = document.getElementById('intro-screen');
        const proceedBtn = document.getElementById('intro-proceed');
        
        window.addEventListener('load', () => {
            gsap.registerPlugin(ScrollTrigger);
            if (introScreen) {
                const tl = gsap.timeline();
                
                tl.from('.intro-logo', { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.out' })
                  .to('.intro-service-item:not(.terminal-type)', { opacity: 1, y: 0, duration: 0.5, stagger: 0.3, ease: 'power2.out' })
                  .call(() => {
                      const typeString = "> AUTO-ESCALATION TO LOCAL POLICE & OSTEYE TEAM";
                      const typeEl = document.querySelector('.terminal-text');
                      let i = 0;
                      function typeWriter() {
                          if (i < typeString.length) {
                              typeEl.textContent += typeString.charAt(i);
                              i++;
                              setTimeout(typeWriter, 35);
                          } else {
                              document.querySelector('.terminal-type').classList.add('emergency-pulse');
                              gsap.to(proceedBtn, { opacity: 1, y: 0, duration: 0.8, pointerEvents: 'auto', delay: 0.7 });
                          }
                      }
                      setTimeout(typeWriter, 300);
                  });

                proceedBtn.addEventListener('click', () => {
                    introScreen.classList.add('hidden');
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                        document.body.style.overflow = '';
                        startHeroAnimations();
                        ScrollTrigger.refresh();
                    }, 800);
                });
            } else {
                startHeroAnimations();
                ScrollTrigger.refresh();
            }
        });

        function startHeroAnimations() {
            if (!prefersReduced) {
                gsap.from('.hero-tag', { opacity: 0, y: 30, duration: 0.8, delay: 0.1 });
                gsap.from('.hero-h1', { opacity: 0, y: 40, duration: 1, delay: 0.4 });
                gsap.from('.hero-sub', { opacity: 0, y: 30, duration: 0.8, delay: 0.8 });
                gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.8, delay: 1.1 });
                gsap.from('.live-feed', { opacity: 0, y: 20, duration: 0.8, delay: 1.5, clearProps: 'all' });

                gsap.from('.timeline-step', {
                    scrollTrigger: { trigger: '.timeline', start: 'top 80%' },
                    opacity: 0, y: 40, stagger: 0.2, duration: 0.8,
                    clearProps: 'all'
                });
            }
        }
"""
js_content = re.sub(first_block, new_intro_js, js_content, flags=re.DOTALL)

# 2. remove .live-feed from bottom block since it's now in startHeroAnimations()
js_content = re.sub(r"gsap\.from\('\.live-feed', \{.*?\}\);\s*", "", js_content, flags=re.DOTALL)

# Write modified JS
with open(js, "w", encoding="utf-8") as f:
    f.write(js_content)

print("Add Intro logic executed.")
