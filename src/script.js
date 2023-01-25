import "./styles.css";

let camera;
let renderer;
let scene;
let controls;

init();
animate();

function init() {
    scene = new THREE.Scene();

    const fov = 5;
    const aspect = window.innerWidth / (window.innerHeight * 2);
    const near = 0.1;
    const far = 1500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(5, 0, 0);
    scene.rotation.y = -270 * Math.PI / 180;
    const ambient = new THREE.AmbientLight(0xffffff, 0);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 0);
    light.position.set(50, 50, 100);
    scene.add(light);

    const loader = new THREE.GLTFLoader()
    loader.load(
        'models/neo-v1.glb',
        function(gltf) {

            scene.add(gltf.scene)

            gsap.registerPlugin(ScrollTrigger);

            gsap.to(gltf.scene.rotation, {
                scrollTrigger: {
                    trigger: "#trigger",
                    start: "+=150px",
                    end: "+=360px",
                    markers: true,
                    scrub: true,
                    toggleActions: "restart pause resume pause"
                },
                y: Math.PI * 2
            });
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight * 2);
    document.getElementById("c").appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; //拖拉慣性
    controls.enableZoom = false; //相機變焦移動
    controls.enablePan = false; //相機平移

}

function animate() {
    requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);
}

let videos = document.getElementsByTagName("video");

function checkScroll() {
    let fraction = 0.001;

    let video = videos[0];

    let x = video.offsetLeft,
        y = video.offsetTop,
        w = video.offsetWidth,
        h = video.offsetHeight,
        r = x + w, //right
        b = y + h, //bottom
        visibleX, visibleY, visible;

    visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
    visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

    visible = visibleX * visibleY / (w * h);

    if (visible > fraction && !video.ended) {
        video.play();
    }

}

window.addEventListener('scroll', checkScroll, false);
window.addEventListener('resize', checkScroll, false);