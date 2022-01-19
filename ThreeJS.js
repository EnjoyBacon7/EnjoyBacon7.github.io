import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';

const create3DEnvironment = () => {

    const scene = new THREE.Scene();

    createCamera();
    createLights();
    loadModels();
    createRenderer();

    function createCamera() {
        const fov = 35;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(-1.5, 1.5, 10);

        window.addEventListener( 'resize', onWindowResizeCamera);

        function onWindowResizeCamera(){

            console.log("resized");
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
        }

    }

    function createLights() {
        const mainLight = new THREE.DirectionalLight(0xffffff, 5);
        mainLight.position.set(10, 10, 10);
    
        const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 5);
        scene.add(mainLight, hemisphereLight);
    }

    function loadModels() {
        const loader = new GLTFLoader();
    
        loader.load(
            // resource URL
            "Img/Mars.glb",
    
            // onLoad callback
            // Here the loaded data is assumed to be an object
            function ( obj ) {
                // Add the loaded object to the scene
                scene.add( obj.scene );
            },
    
            // onProgress callback
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
    
            // onError callback
            function ( err ) {
                console.error( 'An error happened' );
            }
    );
    };

    function createRenderer() {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.physicallyCorrectLights = true;
        
        document.getElementById("planet").appendChild(renderer.domElement);

        window.addEventListener( 'resize', onWindowResizeRenderer);

        function onWindowResizeRenderer(){
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight);
        }

    }

};

create3DEnvironment();

