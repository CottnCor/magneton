/**
 * @description
 */

import * as THREE from 'three';

import { IPoint } from '@/model';

const gainPoints = (points: IPoint[]) => {
  const geometry = new THREE.BufferGeometry();
  const positions = [] as number[];
  const colors = [] as number[];
  const material = new THREE.PointsMaterial({
    size: 7,
    vertexColors: true
  });
  if (points && points.length > 0) {
    const center = gainCenter(points);
    points.forEach((item) => {
      const point = { x: (item.x - center.x) * 3000, y: (item.y - center.y) * 3000, z: (item.z - center.z) * 3000 };
      positions.push(point.x, point.y, point.z);
      colors.push(255, 255, 255);
    });
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();
  return new THREE.Points(geometry, material);
};

const gainLines = (points: IPoint[]) => {
  const geometry = new THREE.BufferGeometry();
  const positions = [] as number[];
  const colors = [] as number[];
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();
  const material = new THREE.LineBasicMaterial({ vertexColors: true });
  return new THREE.Line(geometry, material);
};

const gainCenter = (points: IPoint[]) => {
  let xSum = 0;
  let ySum = 0;
  let zSum = 0;
  points.forEach((item) => {
    xSum += item.x;
    ySum += item.y;
    zSum += item.z;
  });
  return { x: divide(xSum, points.length), y: divide(ySum, points.length), z: divide(zSum, points.length) };
};

const divide = (a: number, b: number) => {
  return Math.floor((a / b) * 100000) / 100000;
};

export { gainLines, gainPoints };
