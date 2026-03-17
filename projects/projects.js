const CONFIG = {
  slideCount: 4,
  spacingX: 45,

  pWidth: 14,
  pHeight: 18,

  camZ: 30,
  wallAngleY: -0.25,

  snapDelay: 200,
  lerpSpeed: 0.06,
};

const totalGalleryWidth = CONFIG.slideCount * CONFIG.spacingX;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x680319);
scene.fog = new THREE.Fog(0xfde558, 10, 110);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, CONFIG.camZ);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById("canvas-container").appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xfde558, 0.6);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xfde558, 0.5);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

const galleryGroup = new THREE.Group();
scene.add(galleryGroup);

const textureLoader = new THREE.TextureLoader();
const planeGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);

const images = [
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80",
  "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=800&q=80",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800&q=80",
];

const paintingGroups = [];

for (let i = 0; i < CONFIG.slideCount; i++) {
  const group = new THREE.Group();
  group.position.set(i * CONFIG.spacingX, 0, 0);
  const mat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(images[i]),
  });
  const mesh = new THREE.Mesh(planeGeo, mat);
  const edges = new THREE.EdgesGeometry(planeGeo);
  const outline = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xfde558 }),
  );

  const shadowGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.15,
  });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.position.set(0.8, -0.8, -0.5);

  const lineZ = -1;
  const lineLen = CONFIG.spacingX;
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-lineLen / 2, 14, lineZ),
    new THREE.Vector3(lineLen / 2, 14, lineZ),
    new THREE.Vector3(-lineLen / 2, -14, lineZ),
    new THREE.Vector3(lineLen / 2, -14, lineZ),
  ]);
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color: 0xfde558 }),
  );

  group.add(shadow);
  group.add(mesh);
  group.add(outline);
  group.add(lines);

  galleryGroup.add(group);
  paintingGroups.push(group);
}

galleryGroup.rotation.y = CONFIG.wallAngleY;
galleryGroup.position.x = 8;

let currentScroll = 0;
let targetScroll = 0;
let snapTimer = null;
let mouse = { x: 0, y: 0 };

function snapToNearest() {
  const index = Math.round(targetScroll / CONFIG.spacingX);
  targetScroll = index * CONFIG.spacingX;
}

window.addEventListener("wheel", (e) => {
  targetScroll += e.deltaY * 0.1;
  if (snapTimer) clearTimeout(snapTimer);
  snapTimer = setTimeout(snapToNearest, CONFIG.snapDelay);
});

let touchStart = 0;
window.addEventListener("touchstart", (e) => {
  touchStart = e.touches[0].clientX;
  if (snapTimer) clearTimeout(snapTimer);
});

window.addEventListener("touchmove", (e) => {
  const diff = touchStart - e.touches[0].clientX;
  targetScroll += diff * 0.6;
  touchStart = e.touches[0].clientX;
  if (snapTimer) clearTimeout(snapTimer);
});

window.addEventListener("touchend", () => {
  snapToNearest();
});

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

function updateUI(scrollX) {
  const rawIndex = Math.round(scrollX / CONFIG.spacingX);
  const safeIndex =
    ((rawIndex % CONFIG.slideCount) + CONFIG.slideCount) % CONFIG.slideCount;
  for (let i = 0; i < CONFIG.slideCount; i++) {
    const el = document.getElementById(`slide-${i}`);
    if (el) {
      if (i === safeIndex) el.classList.add("active");
      else el.classList.remove("active");
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  currentScroll += (targetScroll - currentScroll) * CONFIG.lerpSpeed;
  const xMove = currentScroll * Math.cos(CONFIG.wallAngleY);
  const zMove = currentScroll * Math.sin(CONFIG.wallAngleY);
  camera.position.x = xMove;
  camera.position.z = CONFIG.camZ - zMove;
  paintingGroups.forEach((group, i) => {
    const originalX = i * CONFIG.spacingX;
    const distFromCam = currentScroll - originalX;
    const shift =
      Math.round(distFromCam / totalGalleryWidth) * totalGalleryWidth;
    group.position.x = originalX + shift;
  });
  camera.rotation.x = mouse.y * 0.05;
  camera.rotation.y = -mouse.x * 0.05;
  updateUI(currentScroll);
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
