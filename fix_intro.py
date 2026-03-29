import re

js_file = "c:/Users/om/Desktop/website-/assets/script.js"

with open(js_file, "r", encoding="utf-8") as f:
    js_content = f.read()

# 1. Wrap particles initialization into initParticles() and remove direct call
particles_block_start = r"try \{\s*if \(typeof particlesJS !== 'undefined'\) \{"
particles_block_end = r"\}\s*catch \(e\) \{\s*console\.warn\('Particles\.js failed to initialize:', e\);\s*\}"

particles_match = re.search(f"({particles_block_start}.*?{particles_block_end})", js_content, flags=re.DOTALL)
if particles_match:
    old_particles = particles_match.group(1)
    new_particles = f"function initParticles() {{\n            {old_particles}\n        }}"
    js_content = js_content.replace(old_particles, new_particles)

# 2. Add initParticles() to startHeroAnimations()
target_start_hero = r"function startHeroAnimations\(\) \{"
new_start_hero = "function startHeroAnimations() {\n            if (typeof initParticles === 'function') initParticles();"
js_content = js_content.replace("function startHeroAnimations() {", new_start_hero)

# 3. Speed up intro animation parameters to make it feel less "slow"
# original: stagger: 0.3
js_content = js_content.replace("stagger: 0.3", "stagger: 0.15")

# original typing speed: 35
js_content = js_content.replace("setTimeout(typeWriter, 35)", "setTimeout(typeWriter, 20)")

# Write back
with open(js_file, "w", encoding="utf-8") as f:
    f.write(js_content)

print("Fix applied successfully.")
