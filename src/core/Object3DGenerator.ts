/**
 * @description
 */

import * as THREE from 'three';

import { IPoint, IRange } from '@/model';

const gainPoints = (points: IPoint[]) => {
  let center: IPoint = { x: 0, y: 0, z: 0 };
  let range: IRange = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 }, z: { min: 0, max: 0 } };
  const geometry = new THREE.BufferGeometry();
  const positions = [] as number[];
  const colors = [] as number[];
  const material = new THREE.PointsMaterial({
    size: 5,
    vertexColors: true
  });
  if (points && points.length > 0) {
    let xSum = 0;
    let ySum = 0;
    let zSum = 0;
    points.forEach((item) => {
      const point = { x: item.x * 300 - 500, y: item.y * 300 + 500, z: item.z * 2000 - 500 };
      xSum += point.x;
      ySum += point.y;
      zSum += point.z;
      updateRange(range, point);
      positions.push(point.x, point.y, point.z);
      colors.push(245, 245, 245);
    });
    center = { x: divide(xSum, points.length), y: divide(ySum, points.length), z: divide(zSum, points.length) };
  } else {
    let xSum = 0;
    let ySum = 0;
    let zSum = 0;
    let limit = 1000000;
    const n = 1000;
    while (limit > 0) {
      const x = Math.random() * n - n / 2;
      const y = Math.random() * n - n / 2;
      const z = Math.random() * n - n / 2;
      xSum += x;
      ySum += y;
      zSum += z;
      updateRange(range, { x, y, z });
      positions.push(x, y, z);
      colors.push(245, 245, 245);
      limit--;
    }
    center = { x: divide(xSum, 1000000), y: divide(ySum, 1000000), z: divide(zSum, 1000000) };
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();
  const data = new THREE.Points(geometry, material);
  return { data, center, range };
};

const gainLines = () => {
  let limit = 100000;
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
  const data = new THREE.Line(geometry, material);
  return { data, center: { x: 0, y: 0, z: 0 } };
};

const updateRange = (range: IRange, point: IPoint) => {
  if (range.x.min > point.x) range.x.min = point.x;
  if (range.y.min > point.y) range.y.min = point.y;
  if (range.z.min > point.z) range.z.min = point.z;
  if (range.x.max < point.x) range.x.max = point.x;
  if (range.y.max < point.y) range.y.max = point.y;
  if (range.z.max < point.z) range.z.max = point.z;
};

const divide = (a: number, b: number) => {
  return Math.floor((a / b) * 10000) / 10000;
};

export { gainLines, gainPoints };
