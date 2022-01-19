import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

const create3DEnvironment = () => {
    const renderer = new THREE.WebGLRenderer( {alpha: true, antialiasing: true});
    const loader = new GLTFLoader();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );

    const FOV = 40;
    const aspect = 1;
    const nearClip = 0.1;
    const farClip = 1000;
    
    const camera = new THREE.PerspectiveCamera(FOV, aspect, nearClip, farClip);

    const scene = new THREE.Scene();

    loader.load( './Img/Mars.glb', function ( gltf ) {

        scene.add( gltf.scene );

    }, undefined, function ( error ) {

        console.error( error );

    } );

    camera.position.z = 3;

    var animate = (time, speed = 1) => {

        time *= 0.0001;

        const rotation = time * speed;
        
        sphere.rotation.y = -rotation;

        renderer.render(scene, camera);

        document.getElementById("welcome").appendChild(renderer.domElement);
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    window.addEventListener( 'resize', onWindowResize);

    function onWindowResize(){

        console.log("resized");
        camera.aspect = 1;
        camera.updateProjectionMatrix();

        renderer.setPixelRatio( window.devicePixelRatio );
        var factor;
        if (window.innerHeight > window.innerWidth) {
            factor = window.innerWidth;
        }
        else {
            factor = window.innerHeight;
        }
        renderer.setSize( factor/2, factor/2);
    }

};

create3DEnvironment();

