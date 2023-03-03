import "./styles.css";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
window.THREE = THREE;

let camera;
let renderer;
let scene;
let controls;

init();
animate();




function init() {
    scene = new THREE.Scene();

    const fov = 5;
    const aspect = window.innerWidth / (922 * 2);
    const near = 0.1;
    const far = 1500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(25, 0, 0);

    const light = new THREE.AmbientLight(0xffffff, 5); // soft white light
    scene.add(light);

    // const pointLight = new THREE.PointLight(0x32405B, 100, 1); //green
    // pointLight.position.set(5, 0, 5);
    // scene.add(pointLight);

    // const pointLight2 = new THREE.PointLight(0x32405B, 100, 1); //red
    // pointLight2.position.set(-5, 0, 5);
    // scene.add(pointLight2);

    // const pointLight3 = new THREE.PointLight(0x32405B, 50, 1); //white
    // pointLight3.position.set(-5, 0, 5);
    // scene.add(pointLight3);

    //

    const pointLight4 = new THREE.PointLight(0xffffff, 10, 4.5); //green
    pointLight4.position.set(2.5, 1, 1.5);
    scene.add(pointLight4);

    const pointLight5 = new THREE.PointLight(0xffffff, 10, 4.5); //red
    pointLight5.position.set(2.5, 1, -2);
    scene.add(pointLight5);

    const pointLight6 = new THREE.PointLight(0xffffff, 10, 4.5); //green
    pointLight6.position.set(0.4, -0.4, 0.5);
    scene.add(pointLight6);

    // const pointLight7 = new THREE.PointLight(0xffffff, 10, 10); //red
    // pointLight5.position.set(5, -2, -4);
    // scene.add(pointLight7);

    // const pointLight6 = new THREE.PointLight(0xffffff, 10, 6); //white
    // pointLight6.position.set(0, -2, 3);
    // scene.add(pointLight6);

    //

    // const pointLight7 = new THREE.PointLight(0x32405B, 10, 1); //green
    // pointLight7.position.set(0.999, 0.015, 0.07);
    // scene.add(pointLight7);

    // const pointLight8 = new THREE.PointLight(0x32405B, 10, 1); //red
    // pointLight8.position.set(1.02, 0.015, -0.07);
    // scene.add(pointLight8);

    // const pointLight9 = new THREE.PointLight(0x32405B, 10, 1); //white
    // pointLight9.position.set(1.01, 0.015, 0);
    // scene.add(pointLight9);

    const sphereSize = 1;
    // const pointLightHelper = new THREE.PointLightHelper(pointLight6, sphereSize);
    // scene.add(pointLightHelper);

    // const pointLightHelper2 = new THREE.PointLightHelper(pointLight7, sphereSize);
    // scene.add(pointLightHelper2);

    // const pointLightHelper3 = new THREE.PointLightHelper(pointLight6, sphereSize);
    // scene.add(pointLightHelper3);

    const loader = new GLTFLoader()
    loader.load(
        'models/neo-final_v1.3.glb',
        function(gltf) {

            scene.add(gltf.scene)
                // scene.rotation.y = 45 * Math.PI / 180;
                // gltf.scene.rotation.z = -1.5 * Math.PI / 180;


        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )

    // const loader2 = new GLTFLoader()
    // loader2.load(
    //     'models/bg-boxes-11.glb',
    //     function(gltf) {
    //         scene.add(gltf.scene)
    //     },
    //     (xhr) => {
    //         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //     },
    //     (error) => {
    //         console.log(error)
    //     }
    // )




    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, 922 * 2);
    document.getElementById("c").appendChild(renderer.domElement);

    let offset, travel;
    if (window.innerWidth >= 400 && window.innerWidth <= 796) {
        offset = 0.8;
        travel = 0.5;
        camera.position.set(45, 0, 0);
    } else if (window.innerWidth >= 797 && window.innerWidth <= 1169) {
        offset = 0.5;
        travel = 0.5;
        camera.position.set(45, 0, 0);
    } else if (window.innerWidth >= 1170 && window.innerWidth <= 1687) {
        offset = 0.3;
        travel = 1;
        camera.position.set(25, 0, 0);
    } else if (window.innerWidth >= 1688 && window.innerWidth <= 2029) {
        offset = 0;
        travel = 1;
        camera.position.set(25, 0, 0);
    } else if (window.innerWidth >= 2030 && window.innerWidth <= 2399) {
        offset = 0.1;
        travel = 1;
        camera.position.set(25, 0, 0);
    } else if (window.innerWidth >= 2400) {
        offset = 0.2;
        travel = 1;
        camera.position.set(25, 0, 0);
    }

    // const parCounter = document.querySelector(".par-counter"),
    //     plus = document.querySelector(".par-plus"),
    //     minus = document.querySelector(".par-minus");

    // let count = offset;
    // plus.addEventListener("click", function() {
    //     count += 0.1;
    //     offset += 0.1;
    //     parCounter.innerText = count;
    // });
    // minus.addEventListener("click", function() {
    //     count -= 0.1;
    //     offset -= 0.1;
    //     parCounter.innerText = count;
    // });
    // parCounter.innerText = count;

    // const intCounter = document.querySelector(".int-counter"),
    //     intPlus = document.querySelector(".int-plus"),
    //     intMinus = document.querySelector(".int-minus");

    // let intCount = travel;
    // intPlus.addEventListener("click", function() {
    //     intCount += 0.5;
    //     travel += 0.5;
    //     intCounter.innerText = intCount;
    // });
    // intMinus.addEventListener("click", function() {
    //     intCount -= 0.5;
    //     travel -= 0.5;
    //     intCounter.innerText = intCount;
    // });
    // intCounter.innerText = intCount;

    window.addEventListener('resize', function()

        {

            var width = window.innerWidth;
            var height = window.innerHeight * 2;
            renderer.setSize(width, (922 * 2));
            camera.aspect = width / (922 * 2);
            camera.updateProjectionMatrix();

            if (window.innerWidth >= 400 && window.innerWidth <= 796) {
                offset = 0.8;
                travel = 0.5;
                camera.position.set(35, 0, 0);
            } else if (window.innerWidth >= 797 && window.innerWidth <= 1169) {
                offset = 0.5;
                travel = 0.5;
                camera.position.set(35, 0, 0);
            } else if (window.innerWidth >= 1170 && window.innerWidth <= 1687) {
                offset = 0.3;
                travel = 1;
                camera.position.set(25, 0, 0);
            } else if (window.innerWidth >= 1688 && window.innerWidth <= 2029) {
                offset = 0;
                travel = 1;
                camera.position.set(25, 0, 0);
            } else if (window.innerWidth >= 2030 && window.innerWidth <= 2399) {
                offset = 0.1;
                travel = 1;
                camera.position.set(25, 0, 0);
            } else if (window.innerWidth >= 2400) {
                offset = 0.2;
                travel = 1;
                camera.position.set(25, 0, 0);
            }
        });

    document.addEventListener('scroll', onMouseMove, false);

    function onMouseMove(event) {

        scene.rotation.y = offset + -(window.scrollY / window.innerWidth) * travel;
        // scene.rotation.z = -(event.clientY / window.innerHeight) * 0.09;
    }

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    // controls.enableDamping = true;
    // controls.enableZoom = true;
    // controls.enablePan = true;
    // controls.enableDamping = false;
    // controls.enableZoom = false;
    // controls.enablePan = false;
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// function playPauseVideo() {
//     let videos = document.querySelectorAll("video");
//     videos.forEach((video) => {
//         video.muted = true;
//         let playPromise = video.play();
//         if (playPromise !== undefined) {
//             playPromise.then((_) => {
//                 let observer = new IntersectionObserver(
//                     (entries) => {
//                         entries.forEach((entry) => {
//                             if (
//                                 entry.intersectionRatio !== 1 &&
//                                 !video.paused
//                             ) {
//                                 video.pause();
//                             } else if (video.paused) {
//                                 video.play();
//                             }
//                         });
//                     }, { threshold: 0.2 }
//                 );
//                 observer.observe(video);
//             });
//         }
//     });
// }

// playPauseVideo();

document.addEventListener("scroll", parallax);

function parallax(event) {
    this.querySelectorAll(".parallax-wrap video").forEach((shift) => {
        const position = shift.getAttribute("value");
        const x = (window.innerWidth - window.scrollX * position) / 500;
        const y = (window.innerHeight - window.scrollY * position) / 500;

        shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}