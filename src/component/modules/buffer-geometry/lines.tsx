import './index.scss';

import React from 'react';

import { GainLines } from '@/core/Object3DGenerator';

import Object3DRenderer from '@/core/Object3DRenderer';

import * as THREE from 'three';

interface IProps {}

interface IState {}

const BufferGeometryLines = class extends React.Component<IProps, IState> {
  ref: React.RefObject<HTMLDivElement>;

  renderer: Object3DRenderer<THREE.Line> | null;

  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.renderer = null;
    this.ref = React.createRef();
  }

  componentDidMount() {
    const container = this.ref.current;
    if (container) {
      const data = GainLines();
      this.renderer = new Object3DRenderer<THREE.Line>(data, container);
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

export default BufferGeometryLines;
