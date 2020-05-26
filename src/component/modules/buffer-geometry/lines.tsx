import './index.scss';

import React from 'react';

import { IPoint } from '@/model';

import { gainLines } from '@/core/Object3DGenerator';

import Object3DRenderer from '@/core/Object3DRenderer';

import * as THREE from 'three';

interface IProps {
  data: IPoint[];
}

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
    // const { data } = this.props;
    // const container = this.ref.current;
    // if (container) {
    //   const { data: lins, center } = gainLines(data);
    //   this.renderer = new Object3DRenderer<THREE.Line>(lins, center, container);
    //   if (this.renderer) {
    //     this.renderer.do();
    //   }
    // }
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
