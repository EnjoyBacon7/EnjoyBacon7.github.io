import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';

const create3DEnvironment = () => {

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const fov = 15;
    const aspect = screen.width / screen.height;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    const mainLight = new THREE.DirectionalLight(0xffffff, 10);
    const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 1.5);

    const loader = new GLTFLoader();

    function createCamera() {
        camera.position.set(0, 0, 3);

        window.addEventListener( 'resize', onWindowResizeCamera);

        function onWindowResizeCamera(){

            console.log("resized");
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
        }

    }

    function createLights() {
        mainLight.position.set(5, 3, 5);
        scene.add(mainLight, hemisphereLight);
    }

    function loadModelsglb() {
        loader.load(
            // resource URL
            "Img/testcut.glb",
    
            // onLoad callback
            // Here the loaded data is assumed to be an object
            function ( glb ) {
                // Add the loaded object to the scene
                const planet = glb.scene;
                planet.scale.set(1,1,1);
                planet.position.x = 1.2;
                scene.add(glb.scene);

                var SPEED = 0.0005;

                function rotatePlanet() {
                    //planet.rotation.x -= SPEED * 1;
                    planet.rotation.y -= SPEED;
                    //planet.rotation.z -= SPEED * 1;
                }

                function render() {
                    requestAnimationFrame(render);
                    rotatePlanet();
                    renderer.render(scene, camera); // Ne fonctionne que dans la fonction glb
                }
                render();
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

    function loadModelRT() {

        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const texture = new THREE.TextureLoader().load( "Img/MarsTexture.jpg" );
        const normals = new THREE.TextureLoader().load( "Img/MarsTextureNormal.jpg");
        const material = new THREE.MeshBasicMaterial({map: texture, normalMap: normals});
    
        
        const planet = new THREE.Mesh(geometry, material);
        planet.position.x = 1.2;
        scene.add(planet);
        
        function rotatePlanet() {
            //planet.rotation.x -= SPEED * 1;
            planet.rotation.y -= 0.0005;
            //planet.rotation.z -= SPEED * 1;
        }

        function render() {
            requestAnimationFrame(render);
            rotatePlanet();
            renderer.render(scene, camera); // Ne fonctionne que dans la fonction glb
        }
        render();


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
    
    loadModelRT();
    createRenderer();

};

create3DEnvironment();

