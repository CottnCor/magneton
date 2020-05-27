/**
 * @description
 */

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';

class Object3DRenderer {
  private path: string;
  private scene: THREE.Scene;
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls | null;
  private animationHandle: number;

  public constructor(path: string, container: HTMLElement) {
    this.path = path;
    this.container = container;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    const { clientWidth, clientHeight } = this.container;
    this.camera = new THREE.PerspectiveCamera(35, (clientWidth || 1) / (clientHeight || 1), 1, 15);
    this.controls = null;
    this.animationHandle = Number.NaN;
    if (this.path) this.loader();
  }

  public do() {
    this.animationHandle = window.requestAnimationFrame(() => this.do());
    this.render();
  }

  public done() {
    if (!Number.isNaN(this.animationHandle)) {
      window.cancelAnimationFrame(this.animationHandle);
    }
  }

  private render() {
    this.camera.lookAt(new THREE.Vector3(0, -0.1, 0));
    this.renderer.render(this.scene, this.camera);
  }

  private loader() {
    const loader = new PLYLoader();
    loader.load(
      this.path,
      (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0x0055ff, flatShading: true });
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        this.init();
      },
      (event: ProgressEvent) => {},
      (event: ErrorEvent) => {
        console.log(event.message);
      }
    );
  }

  private init() {
    // lights setting
    this.camera.position.set(3, 0.15, 3);
    this.scene.background = new THREE.Color(0x001528);
    this.scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
    this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
    // render setting
    const { devicePixelRatio } = window;
    const { clientWidth, clientHeight } = this.container;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(clientWidth || 1, clientHeight || 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
    // controls setting
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minDistance = 360;
    this.controls.maxDistance = 36000;
    // event setting
    window.addEventListener('resize', this.handleWindowResize, false);
  }

  private addShadowedLight(x: number, y: number, z: number, color: number, intensity: number) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    light.castShadow = true;
    light.shadow.camera.left = -1;
    light.shadow.camera.right = 1;
    light.shadow.camera.top = 1;
    light.shadow.camera.bottom = -1;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 4;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.bias = -0.001;
    this.scene.add(light);
  }

  private handleWindowResize() {
    if (this.container) {
      const { clientWidth, clientHeight } = this.container;
      if (clientWidth > 0 && clientHeight > 0) {
        this.renderer.setSize(clientWidth, clientHeight);
        this.camera.aspect = clientWidth / clientHeight;
        this.camera.updateProjectionMatrix();
      }
    }
  }
}

export default Object3DRenderer;
