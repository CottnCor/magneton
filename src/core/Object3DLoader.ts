/**
 * @description
 */

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

class Object3DRenderer {
  private obj: THREE.Group | null;
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
    this.camera = new THREE.PerspectiveCamera(27, (clientWidth || 1) / (clientHeight || 1), 5, 3600);
    this.controls = null;
    this.obj = null;
    this.animationHandle = Number.NaN;
    if (this.path) this.init();
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
    this.renderer.render(this.scene, this.camera);
  }

  private init() {
    this.camera.position.z = 2700;
    this.scene.background = new THREE.Color(0x001528);
    this.scene.fog = new THREE.Fog(0x001528, 2400, 3600);
    // manager setting
    const manager = new THREE.LoadingManager(() => {
      if (this.obj) {
        this.scene.add(this.obj);
        this.elseInit();
      }
    });
    // loader setting
    const loader = new OBJLoader(manager);
    loader.load(this.path, (obj) => {
      this.obj = obj;
    });
  }

  private elseInit() {
    // render setting
    const { devicePixelRatio } = window;
    const { clientWidth, clientHeight } = this.container;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(clientWidth || 1, clientHeight || 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);
    // controls setting
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minDistance = 360;
    this.controls.maxDistance = 36000;
    // event setting
    window.addEventListener('resize', this.handleWindowResize, false);
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
