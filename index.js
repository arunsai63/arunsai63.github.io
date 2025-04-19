import * as THREE from 'three'

// Initialize scroll variables
let scrollPosition = 0;
let scrollHeight = 0;
let ticking = false;

// --- Scene Setup ---
const scene = new THREE.Scene();

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// --- Renderer Setup ---
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Ensure canvas doesn't capture pointer events
renderer.domElement.style.pointerEvents = 'none';
renderer.domElement.setAttribute('aria-hidden', 'true');

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ffcc, 1.5, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0x8800ff, 1, 100);
pointLight2.position.set(-5, -5, -2);
scene.add(pointLight2);

// --- Main Feature Object (Code Block Structure) ---
const codeBlockGroup = new THREE.Group();
scene.add(codeBlockGroup);

// Create material with wireframe for code-like appearance
const codeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffcc,
    metalness: 0.7,
    roughness: 0.3,
    emissive: 0x003322,
    wireframe: true
});

const solidMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.8,
    roughness: 0.2
});

// Create a "code block" main structure
const mainBlock = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.5),
    solidMaterial
);
codeBlockGroup.add(mainBlock);

// Add wireframe overlay to look like code
const wireBlock = new THREE.Mesh(
    new THREE.BoxGeometry(3.02, 2.02, 0.52),
    codeMaterial
);
codeBlockGroup.add(wireBlock);

// Add "lines of code" as small cylinders
for (let i = 0; i < 8; i++) {
    const lineGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8);
    const line = new THREE.Mesh(lineGeometry, codeMaterial);
    line.rotation.z = Math.PI / 2;
    line.position.set(0, 0.7 - i * 0.2, 0.3);
    codeBlockGroup.add(line);
}

// Add floating symbols/shapes around the main block
const symbols = [];
const symbolShapes = [
    new THREE.TetrahedronGeometry(0.2),
    new THREE.OctahedronGeometry(0.2),
    new THREE.TorusKnotGeometry(0.2, 0.08, 64, 8, 2, 3)
];

for (let i = 0; i < 15; i++) {
    const symbolGeometry = symbolShapes[Math.floor(Math.random() * symbolShapes.length)];
    const symbol = new THREE.Mesh(symbolGeometry, codeMaterial);

    // Position randomly around the main block
    symbol.position.set(
        THREE.MathUtils.randFloatSpread(6) + 3, // Skew toward right side initially
        THREE.MathUtils.randFloatSpread(6),
        THREE.MathUtils.randFloatSpread(4)
    );

    symbol.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );

    codeBlockGroup.add(symbol);
    symbols.push({
        mesh: symbol,
        initialX: symbol.position.x,
        initialY: symbol.position.y,
        initialZ: symbol.position.z,
        rotationSpeed: {
            x: THREE.MathUtils.randFloat(0.005, 0.02) * (Math.random() > 0.5 ? 1 : -1),
            y: THREE.MathUtils.randFloat(0.005, 0.02) * (Math.random() > 0.5 ? 1 : -1),
            z: THREE.MathUtils.randFloat(0.005, 0.02) * (Math.random() > 0.5 ? 1 : -1)
        }
    });
}

// Initial position (right side of screen)
codeBlockGroup.position.set(5, 0, 0);
codeBlockGroup.rotation.y = -Math.PI / 4;

// --- Background Particles ---
const particlesGroup = new THREE.Group();
scene.add(particlesGroup);

const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ffcc,
    size: 0.05,
    transparent: true,
    opacity: 0.6
});

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
particlesGroup.add(particlesMesh);

// --- Scroll Handling - Completely Rewritten ---
function updateScrollHeight() {
    scrollHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 100);
}

// Use requestAnimationFrame for better scroll performance
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimation);
        ticking = true;
    }
}

function updateAnimation() {
    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.min(Math.max(scrollPosition / scrollHeight, 0), 1);

    // Update code block position and rotation based on scroll
    // From right to left
    codeBlockGroup.position.x = 5 - scrollProgress * 10;
    // From front to back
    codeBlockGroup.position.z = scrollProgress * 5 - 2;
    // Slight vertical movement
    codeBlockGroup.position.y = Math.sin(scrollProgress * Math.PI) * 2;

    // Rotate based on scroll
    codeBlockGroup.rotation.y = -Math.PI / 4 + scrollProgress * Math.PI * 2;
    codeBlockGroup.rotation.x = scrollProgress * Math.PI / 2;

    ticking = false;
}

// Handle scroll events directly without smoothing
function handleScroll() {
    scrollPosition = window.scrollY || window.pageYOffset;
    requestTick();
}

// Direct wheel event handler for maximum responsiveness
function handleWheel(e) {
    // Update scroll position directly from the event
    scrollPosition = window.scrollY || window.pageYOffset;
    requestTick();
}

// Add multiple event listeners to ensure we catch all scroll events
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('wheel', handleWheel, { passive: true });

// --- Animation Loop - Separated from scroll handling ---
function animate() {
    requestAnimationFrame(animate);

    // Animate floating symbols independently of scroll
    const time = Date.now() * 0.001;
    symbols.forEach(symbol => {
        symbol.mesh.rotation.x += symbol.rotationSpeed.x;
        symbol.mesh.rotation.y += symbol.rotationSpeed.y;
        symbol.mesh.rotation.z += symbol.rotationSpeed.z;

        // Make symbols orbit the main block with different patterns
        symbol.mesh.position.x = symbol.initialX + Math.sin(time + symbol.initialX) * 0.5;
        symbol.mesh.position.y = symbol.initialY + Math.cos(time + symbol.initialY) * 0.5;
        symbol.mesh.position.z = symbol.initialZ + Math.sin(time * 0.5 + symbol.initialZ) * 0.3;
    });

    // Rotate particle field slowly
    particlesGroup.rotation.y += 0.0002;
    particlesGroup.rotation.x += 0.0001;

    // Update lights
    pointLight.position.x = 5 * Math.cos(time * 0.5);
    pointLight.position.y = 5 * Math.sin(time * 0.5);
    pointLight2.position.x = -5 * Math.cos(time * 0.3);
    pointLight2.position.z = -2 + 5 * Math.sin(time * 0.3);

    renderer.render(scene, camera);
}

// --- Hero Section Typing Effect ---
function setupTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const typingText2 = document.getElementById('typing-text-2');

    if (typingText) {
        typingText.innerHTML = '';
        const text = './introduce.sh';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                typingText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 500);
    }

    if (typingText2) {
        typingText2.innerHTML = '';
        const text = './explore.sh';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                typingText2.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 2500);
    }
}

// --- Contact Section Typing Effect ---
function setupContactTypingEffect() {
    const typingTextContact = document.getElementById('typing-text-contact');
    const typingTextResume = document.getElementById('typing-text-resume');

    if (typingTextContact) {
        typingTextContact.innerHTML = '';
        const contactText = './connect.sh --with=arun';
        let i = 0;

        const typeWriterContact = () => {
            if (i < contactText.length) {
                typingTextContact.innerHTML += contactText.charAt(i);
                i++;
                setTimeout(typeWriterContact, 80);
            }
        };

        // Add observer to start animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriterContact, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(typingTextContact);
    }

    if (typingTextResume) {
        typingTextResume.innerHTML = '';
        const resumeText = './download_resume.sh';
        let j = 0;

        const typeWriterResume = () => {
            if (j < resumeText.length) {
                typingTextResume.innerHTML += resumeText.charAt(j);
                j++;
                setTimeout(typeWriterResume, 80);
            }
        };

        // Add observer to start animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriterResume, 2500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(typingTextResume);
    }
}


// --- Handle Window Resize ---
function onWindowResize() {
    // Update camera and renderer
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update scroll height
    updateScrollHeight();

    // Force an update of the animation
    requestTick();
}

window.addEventListener('resize', onWindowResize);

// --- Start Everything ---
window.addEventListener('DOMContentLoaded', () => {
    // Calculate initial scroll height
    updateScrollHeight();

    // Set initial scroll position
    scrollPosition = window.scrollY || window.pageYOffset;

    // Start animation loop
    animate();

    // Setup typing animations
    setupTypingAnimation();
    setupContactTypingEffect();

    // Force an initial update of the 3D scene
    requestTick();
});

// Ensure the animations work when the page is fully loaded
// window.addEventListener('load', () => {
//     updateScrollHeight();
//     requestTick();
// });