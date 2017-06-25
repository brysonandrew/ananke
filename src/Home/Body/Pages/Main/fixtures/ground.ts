import THREE = require('three');
import {loadTexture} from "../loaders/texture";

export const loadGround = () => {
    return new Promise((resolve, reject) => {
        loadTexture("/images/grid.png").then((texture) => {
            texture["wrapS"] = texture["wrapT"] = THREE.RepeatWrapping;
            texture["anisotropy"] = 16;
            texture["repeat"].set(16, 16);
            const geometry = new THREE.PlaneGeometry( 2000, 2000, 1 );
            const material = new THREE.MeshBasicMaterial({map: texture} );
            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.y = -2.5;
            mesh.rotation.x = Math.PI * 1.5;
            resolve(mesh);
        })
    });

};