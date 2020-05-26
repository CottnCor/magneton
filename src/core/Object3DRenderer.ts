/**
 * @description
 */

import * as THREE from 'three';

import { IPoint, IRange } from '@/model';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Object3DRenderer<T extends THREE.Object3D> {
  private data: T;
  private center: IPoint;
  private range: IRange;
  private scene: THREE.Scene;
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls | null;
  private animationHandle: number;

  public constructor(data: T, center: IPoint, range: IRange, container: HTMLElement) {
    this.data = data;
    this.center = center;
    this.range = range;
    this.container = container;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    const { clientWidth, clientHeight } = this.container;
    // this.camera = new THREE.PerspectiveCamera(this.center.z, (clientWidth || 1) / (clientHeight || 1), this.range.z.min, this.range.z.max);
    this.camera = new THREE.PerspectiveCamera(27, (clientWidth || 1) / (clientHeight || 1), 5, 3500);
    this.controls = null;
    this.animationHandle = Number.NaN;
    if (this.data) this.init();
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
    // environment setting
    // this.camera.position.z = this.center.z;
    this.camera.position.z = 2750;
    this.scene.background = new THREE.Color(0x001528);
    // this.scene.fog = new THREE.Fog(0x001528, this.range.z.min, this.range.z.max);
    this.scene.fog = new THREE.Fog(0x001528, 2000, 3500);
    // render setting
    this.scene.add(this.data);
    const { devicePixelRatio } = window;
    const { clientWidth, clientHeight } = this.container;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(clientWidth || 1, clientHeight || 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);
    // controls setting
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI;
    this.controls.center = new THREE.Vector3(this.center.x, this.center.y, this.center.z);
    // this.controls.minDistance = this.range.z.min;
    // this.controls.maxDistance = this.range.z.max;
    this.controls.minDistance = 1000;
    this.controls.maxDistance = 5000;
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
