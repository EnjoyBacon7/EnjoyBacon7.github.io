import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports/optimized/three.js';

const create3DEnvironment = () => {
    const renderer = new THREE.WebGLRenderer( {antialiasing: true});

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );

    const FOV = 20;
    const aspect = window.innerWidth/window.innerHeight;
    const nearClip = 0.1;
    const farClip = 1000;
    
    const camera = new THREE.PerspectiveCamera(FOV, aspect, nearClip, farClip);


    const scene = new THREE.Scene();

    const radius = 0.8;
    const heightSegs = 32;
    const widthSegs = 32;

    const geometry = new THREE.SphereGeometry(radius, heightSegs, widthSegs);

    var texture = new THREE.TextureLoader().load( 'Img/MarsTexture.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );

    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 3;
    camera.position.x = -1;

    var animate = (time, speed = 1) => {

        time *= 0.0001;

        const rotation = time * speed;
        
        sphere.rotation.y = -rotation;

        renderer.render(scene, camera);

        document.getElementById("planet").appendChild(renderer.domElement);
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    window.addEventListener( 'resize', onWindowResize);

    function onWindowResize(){

        console.log("resized");
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerHeight, window.innerWidth);
    }

};

create3DEnvironment();

