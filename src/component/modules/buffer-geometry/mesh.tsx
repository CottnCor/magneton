import './index.scss';

import React from 'react';

import Object3DLoader from '@/core/Object3DLoader';

interface IProps {
  path: string;
}

interface IState {}

const BufferGeometryMesh = class extends React.Component<IProps, IState> {
  ref: React.RefObject<HTMLDivElement>;

  loader: Object3DLoader | null;

  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.loader = null;
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { path } = this.props;
    const container = this.ref.current;
    if (path && container) {
      this.loader = new Object3DLoader(path, container);
      if (this.loader) {
        this.loader.do();
      }
    }
  }

  componentWillUnmount() {
    if (this.loader) {
      this.loader.done();
    }
  }

  render() {
    return <div ref={this.ref} className="buffer-geometry-board" />;
  }
};

export default BufferGeometryMesh;
