import './index.scss';

import React from 'react';

import * as THREE from 'three';

interface IProps {}

interface IState {}

const BufferGeometryMesh = class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="buffer-geometry-board" id="mesh-board" />;
  }
};

export default BufferGeometryMesh;
