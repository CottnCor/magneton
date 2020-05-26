import './index.scss';

import React from 'react';

import { GainPoints } from '@/core/Object3DGenerator';

import Object3DRenderer from '@/core/Object3DRenderer';

import * as THREE from 'three';

interface IProps {}

interface IState {}

const BufferGeometryPoints = class extends React.Component<IProps, IState> {
  ref: React.RefObject<HTMLDivElement>;

  renderer: Object3DRenderer<THREE.Points> | null;

  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.renderer = null;
    this.ref = React.createRef();
  }

  componentDidMount() {
    const container = this.ref.current;
    if (container) {
      const data = GainPoints();
      this.renderer = new Object3DRenderer<THREE.Points>(data, container);
      if (this.renderer) {
        this.renderer.do();
      }
    }
  }

  componentWillUnmount() {
    if (this.renderer) {
      this.renderer.done();
    }
  }

  render() {
    return <div ref={this.ref} className="buffer-geometry-board" />;
  }
};

export default BufferGeometryPoints;
