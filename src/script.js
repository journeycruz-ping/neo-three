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
    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 2);
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
                    markers: false,
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

    const loader2 = new THREE.GLTFLoader()
    loader2.load(
        'models/bg-boxes-9.glb',
        function(gltf) {
            scene.add(gltf.scene)


            gsap.registerPlugin(ScrollTrigger);

            gsap.to(gltf.scene.rotation, {
                scrollTrigger: {
                    trigger: "#trigger",
                    start: "+=150px",
                    end: "+=360px",
                    markers: false,
                    scrub: true,
                    toggleActions: "restart pause resume pause"
                },
                y: Math.PI
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
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
}


function animate() {
    requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);
}

function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        video.muted = true;
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                            } else if (video.paused) {
                                video.play();
                            }
                        });
                    }, { threshold: 0.2 }
                );
                observer.observe(video);
            });
        }
    });
}

playPauseVideo();