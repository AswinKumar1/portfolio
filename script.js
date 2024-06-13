const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Create cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x007bff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-2, 0, -5);
scene.add(cube);

// Create sphere (abstract model)
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 0, -5);
scene.add(sphere);

// Create robot-like model
const robotGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const robotMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const robot = new THREE.Mesh(robotGeometry, robotMaterial);
robot.position.set(0, 1, -8);
scene.add(robot);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube and sphere
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    // Robot bobbing animation
    robot.position.y = 1 + Math.sin(Date.now() * 0.001) * 0.5;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
