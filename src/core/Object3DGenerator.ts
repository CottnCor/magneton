/**
 * @description
 */

import * as THREE from 'three';

const GainPoints = () => {
  let limit = 1000000;
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];
  const n = 1000;
  while (limit > 0) {
    // positions
    const x = Math.random() * n - n / 2;
    const y = Math.random() * n - n / 2;
    const z = Math.random() * n - n / 2;
    positions.push(x, y, z);
    // colors
    colors.push(245, 245, 245);
    limit--;
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();
  const material = new THREE.PointsMaterial({
    size: 7,
    vertexColors: true
  });
  return new THREE.Points(geometry, material);
};

const GainLines = () => {
  let limit = 1000000;
  const r = 800;
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];
  while (limit > 0) {
    const x = Math.random() * r - r / 2;
    const y = Math.random() * r - r / 2;
    const z = Math.random() * r - r / 2;
    positions.push(x, y, z);
    colors.push(245, 245, 245);
    limit--;
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();
  const material = new THREE.LineBasicMaterial({ vertexColors: true });
  return new THREE.Line(geometry, material);
};

export { GainLines, GainPoints };
