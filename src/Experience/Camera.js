import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap";

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.timeline = this.experience.timeline
        this.time = this.experience.time
        this.cursorEnabled = true

        this.lerpVector = new THREE.Vector3();
        this.lerpFactor = 0.8

        this.setInstance()
        //this.setControls()
    }


    calculateFOV(windowWidth, minWidth, maxWidth, minSize, maxSize) {
        // Normalize width between 0 and 1
        let normalizedWidth = (windowWidth - minWidth) / (maxWidth - minWidth);
        normalizedWidth = Math.max(0, Math.min(1, normalizedWidth)); // Clamp between 0 and 1

        // Interpolate between minSize and maxSize based on normalizedWidth
        return minSize + (maxSize - minSize) * normalizedWidth;
    }


    getFov()
    {
        //console.log(this.calculateFOV(this.sizes.width, 1, 800, 200, 60))
        return this.calculateFOV(this.sizes.width, 1, 800, 200, 60);

        //return 150;
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(this.getFov(), this.sizes.width / this.sizes.height, 0.1, 500)
        this.instance2 = new THREE.PerspectiveCamera(this.getFov(), this.sizes.width / this.sizes.height, 0.1, 500)
        const defaultCameraPosition = new THREE.Vector3(1.6, 3.8, 35.);

        this.instance.position.copy(defaultCameraPosition)
        this.instance2.position.copy(defaultCameraPosition)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.maxDistance = 100;
        this.controls.enabled = true;
    }

    resize()
    {
        this.instance.fov = this.getFov()
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()

        this.instance2.fov = this.getFov()
        this.instance2.aspect = this.sizes.width / this.sizes.height
        this.instance2.updateProjectionMatrix()
    }

    update()
    {
        if (this.cursorEnabled === true) {
            const lerpTarget = new THREE.Vector3();
            const targetX = this.experience.cursor.x;
            const targetY = this.experience.cursor.y;

            lerpTarget.set(targetX, targetY, this.instance.position.z)

            this.lerpVector.lerp(new THREE.Vector3().copy(lerpTarget), this.lerpFactor * this.time.delta);

            this.instance.lookAt(this.lerpVector.x - 1, 2, 0);
            this.instance2.lookAt(this.lerpVector.x - 1, 1, 0);
        }

        this.instance2.position.x = this.instance.position.x;
        this.instance2.position.y = -this.instance.position.y;
        this.instance2.position.z = this.instance.position.z;

        //this.instance.lookAt(new THREE.Vector3(-1, 2., 0));
        //this.instance2.lookAt(new THREE.Vector3(-1, 1., 0));
        //this.controls.update()
    }

    animateCameraPosition() {
        this.timeline.add(
            gsap.to(this.instance.position, {
                duration: 8,
                delay: 0.6,
                x: 6.0,
                y: 1.5,
                z: -0.05,
                ease: "power1.inOut",
            }),
            "start"
        )
    }
}
