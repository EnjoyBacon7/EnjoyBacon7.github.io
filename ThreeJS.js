import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';

const create3DEnvironment = () => {

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const fov = 90;
    const aspect = screen.width / screen.height;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    const mainLight = new THREE.DirectionalLight(0xffffff, 5);
    const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 0);

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    const loader = new GLTFLoader();

    function createCamera() {
        camera.position.set(0, 0, 10);

        window.addEventListener( 'resize', onWindowResizeCamera);

        function onWindowResizeCamera(){

            console.log("resized");
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
        }

    }

    function createLights() {
        mainLight.position.set(10, 10, 10);
        scene.add(mainLight, hemisphereLight);
    }

    function loadModels() {
        loader.load(
            // resource URL
            "Img/Mars.glb",
    
            // onLoad callback
            // Here the loaded data is assumed to be an object
            function ( glb ) {
                // Add the loaded object to the scene
                const planet = glb.scene;
                planet.scale.set(1,1,1);
                scene.add(glb.scene);
                renderer.render(scene, camera);
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
        renderer.setSize(screen.width, screen.height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.physicallyCorrectLights = false;
        
        document.getElementById("planet").appendChild(renderer.domElement);

        
        window.addEventListener( 'resize', onWindowResizeRenderer);

        function onWindowResizeRenderer(){
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight);
        }

    }

    createCamera();
    createLights();
    loadModels();
    createRenderer();

};

create3DEnvironment();

