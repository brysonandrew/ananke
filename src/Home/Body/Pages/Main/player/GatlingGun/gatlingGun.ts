import THREE = require('three');
import { createGun } from './gunParts';
import { easeMotion } from "../../controls/motion";

export class GatlingGun {

    gun = new THREE.Group;
    bullets = new THREE.Group;
    gunParts;
    gunBarrel;
    warmUp = 0;
    rate = 0;
    count = 0;
    barrelTurnRate = 0;
    gunRotateRate = 0;

    constructor() {}

    assemble() {
        this.gun.add(createGun());
        this.gun.scale.set(0.2,0.2,0.2);
        this.gun.position.set(0, 9, -4);
        this.gunParts = this.gun.children[0].children;
        this.gunBarrel = this.gunParts[this.gunParts.length - 1];
    }

    addBullet(sourceObject) {
        const amount = 2;
        const spread = 2;

        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xffffff );

        const positions = new Float32Array( amount * 3 );

        positions.forEach((_, i) => {
            const startingPointX = -spread * Math.sin(sourceObject.rotation.y);
            const startingPointZ = -spread * Math.cos(sourceObject.rotation.y);
            vertex.x = Math.sin(sourceObject.rotation.y)
                        * -Math.random()
                        * spread * 2 - startingPointX;
            vertex.y = Math.random() *  spread - spread * 0.5;
            vertex.z = Math.cos(sourceObject.rotation.y)
                        * -Math.random()
                        * spread * 2 - startingPointZ;
            vertex.toArray((positions as any), i * 3);

            sizes[i] = spread * 2 + i * 2;

            color.setHSL(60, 1, 0.95);
            color.toArray((colors as any), i * 3);
        });

        let geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( 0xffffff ) },
                texture:   { value: new THREE.TextureLoader().load( "/images/player/spark3.png" ) }
            },
            vertexShader:   `uniform float amplitude;
                                attribute float size;
                                attribute vec3 customColor;
                                varying vec3 vColor;
                            void main() {
                                vColor = customColor;
                                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                                gl_PointSize = size * ( 300.0 / -mvPosition.z );
                                gl_Position = projectionMatrix * mvPosition;
                            }`,
            fragmentShader: `uniform vec3 color;
                                uniform sampler2D texture;
                                varying vec3 vColor;
                            void main() {
                                gl_FragColor = vec4( color * vColor, 1.0 );
                                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
                            }`,
            blending:       THREE.AdditiveBlending,
            depthTest:      true, //puts an ugly square around the bullets, but this is necessary or they will appear through the car
            transparent:    true
        } );

        let bullet = new THREE.Points( geometry, material );

        bullet.position.set(
            sourceObject.position.x,
            sourceObject.position.y + 9,
            sourceObject.position.z
        );

        bullet.rotation.set(
            sourceObject.rotation.x,
            sourceObject.rotation.y,
            sourceObject.rotation.z
        );

        bullet["life"] = 0;

        this.bullets.add(bullet);
    }

    fireBullets() {
        const bulletSpeed = 10;

        this.bullets.children.forEach((bullet, i) => {
            bullet.position.x -= Math.sin(bullet.rotation.y) * bulletSpeed;
            bullet.position.z -= Math.cos(bullet.rotation.y) * bulletSpeed;
            if (bullet["life"] === 500) {
                this.bullets.children.splice(i, 1);
            }
            bullet["life"]++;
        });
    }

    fire(isFiring, sourceObject) {
        this.gunBarrel.rotation.z+=easeMotion(isFiring, 5, 0.25, this.barrelTurnRate);
        this.fireBullets();
        if (isFiring) {
            this.addBullet(sourceObject);
        }
    }

    render() {
        return this.gun;
    }

    renderBullets() {
        return this.bullets
    }
}
