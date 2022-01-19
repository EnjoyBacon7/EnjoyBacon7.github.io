import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports/optimized/three.js';

const create3DEnvironment = () => {
    const renderer = new THREE.WebGLRenderer( {alpha: true, antialiasing: true});

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );

    const FOV = 40;
    const aspect = 1;
    const nearClip = 0.1;
    const farClip = 1000;
    
    const camera = new THREE.PerspectiveCamera(FOV, aspect, nearClip, farClip);


    const scene = new THREE.Scene();

    const radius = 0.8;
    const heightSegs = 64;
    const widthSegs = 64;

    const geometry = new THREE.SphereGeometry(radius, heightSegs, widthSegs);

    var texture = new THREE.TextureLoader().load( 'Img/MarsTexture.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );

    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

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

