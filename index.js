
import * as THREE from 'three'

// --- Scene Setup ---
const scene = new THREE.Scene()

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5 // Start closer

// --- Renderer Setup ---
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true, // Smoother edges
    alpha: true // Allow transparency if needed, though background is dark
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio) // Adjust for high-density displays

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0x404040, 2) // Soft white light
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0x00ffcc, 1.5, 100) // Cyan point light
pointLight.position.set(5, 5, 5)
scene.add(pointLight)
const pointLight2 = new THREE.PointLight(0x8800ff, 1, 100) // Purple point light
pointLight2.position.set(-5, -5, -2)
scene.add(pointLight2)


// --- Geometry and Materials (Coding Theme) ---
const shapes = []
const shapeGroup = new THREE.Group() // Group shapes for easier manipulation

// Material for shapes - slightly metallic/reflective
const shapeMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa, // Base color gray
    metalness: 0.7, // More metallic
    roughness: 0.3, // Less rough, more shiny
    emissive: 0x111111 // Slight self-illumination
})

// Create various geometric shapes (like code blocks, data structures)
const geometries = [
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.ConeGeometry(0.2, 0.4, 8),
    new THREE.TorusGeometry(0.2, 0.08, 8, 20),
    new THREE.IcosahedronGeometry(0.25, 0), // Polyhedron
    new THREE.OctahedronGeometry(0.25, 0)
]

// Distribute shapes randomly in space
for (let i = 0; i < 150; i++) { // Reduced number for performance
    const geometry = geometries[Math.floor(Math.random() * geometries.length)]
    const shape = new THREE.Mesh(geometry, shapeMaterial)

    // Position shapes in a wider, less deep area initially
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(15)) // Spread out more
    shape.position.set(x, y, z - 5) // Position them further back initially

    // Random rotation
    shape.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    )

    // Random scale
    const scale = THREE.MathUtils.randFloat(0.5, 1.5)
    shape.scale.set(scale, scale, scale)

    shapeGroup.add(shape)
    shapes.push(shape) // Keep track for animation
}
scene.add(shapeGroup)


// --- Scroll Interaction ---
let currentScroll = 0
let targetScroll = 0
const scrollSensitivity = 0.0005 // How much scroll affects camera/scene

function handleScroll() {
    // Get scroll position (works across browsers)
    targetScroll = window.pageYOffset || document.documentElement.scrollTop
}
window.addEventListener('scroll', handleScroll, { passive: true })


// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate)

    // Smooth scroll interpolation (lerp)
    currentScroll += (targetScroll - currentScroll) * 0.05

    // Animate shapes
    const time = Date.now() * 0.0005 // Time factor for subtle movement
    shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 + Math.sin(time + index * 0.1) * 0.0005
        shape.rotation.y += 0.002 + Math.cos(time + index * 0.15) * 0.0005
    })

    // Rotate the entire group slowly
    shapeGroup.rotation.y += 0.0005

    // Move camera based on scroll (subtle effect)
    // camera.position.z = 5 - currentScroll * scrollSensitivity // Zoom effect
    camera.position.y = -currentScroll * scrollSensitivity * 2 // Pan effect

    // Make lights follow camera slightly or move independently
    pointLight.position.x = 5 * Math.cos(time * 0.5)
    pointLight.position.y = 5 * Math.sin(time * 0.5)
    pointLight2.position.x = -5 * Math.cos(time * 0.3)
    pointLight2.position.z = -2 + 5 * Math.sin(time * 0.3)


    // Look slightly towards the center or adjust based on scroll
    camera.lookAt(scene.position.x, scene.position.y - currentScroll * scrollSensitivity, scene.position.z)


    renderer.render(scene, camera)
}

// --- Handle Window Resize ---
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', onWindowResize)

// --- Start Animation ---
// Ensure DOM is ready before starting animation loop
window.onload = () => {
    handleScroll() // Initialize scroll position
    animate()
}
