import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(1000);

//creates lighting
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);


renderer.render(scene,camera);

//builds torus/tube object
const geometry = new THREE.TorusGeometry (10, 5, 16, 100);
const material = new THREE.MeshStandardMaterial();
const torus = new THREE.Mesh(geometry, material);

//adds torus object to the scene
scene.add(torus);

//sets background to road.jpg
const backgroundTexture = new THREE.TextureLoader().load('road.jpg');
scene.background = backgroundTexture;

//sets torus texture to tire.jpg
const tireTexture = new THREE.TextureLoader().load('tire.jpg');
material.map = tireTexture;

//camera zoom
let zoomDirection = 3; // Direction of the zoom (+ for zooming in, - for zooming out)
const zoomSpeed = .5; // Speed of the zoom

//direction for rotation
let direction = 1;

//recursive function to continually update values
function animate(){
  requestAnimationFrame(animate);

//adjusts vertical position of torus i.e. causes tire to bounce
torus.position.y+=direction*2.5;

//change vertical direction when torus reaches ground
  if (torus.position.y < 0){
    direction = direction * -1; ;
  } 

  // Slow down the speed as it goes up
  if (torus.position.y > 0 && torus.position.y <=80) {
    direction -= 0.04;
  }

  // Limit the direction within a certain range
  direction = Math.max(-1, Math.min(1, direction));

  //torus rotations, will stay consistant with direction
  torus.rotation.x += 0.05 * -zoomDirection;
  torus.rotation.y += 0.001* -zoomDirection;
  torus.rotation.z += 0.005* -zoomDirection;

  //updates camera position
  camera.position.z += zoomDirection * zoomSpeed;


  // Reverse the zoom direction when reaching the predefined distance range
  if (camera.position.z >= 1001 || camera.position.z <= 17) {
    zoomDirection *= -1;
  }


  renderer.render(scene, camera);



}

animate();