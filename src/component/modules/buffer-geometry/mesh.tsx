import './index.scss';

import React from 'react';

interface IProps {
  path: string;
}

interface IState {
  iframeHeight: string;
}

const BufferGeometryMesh = class extends React.Component<IProps, IState> {
  render() {
    return <iframe frameBorder="0" scrolling="no" style={{ overflow: 'hidden', width: '100%', height: '100%' }} src={this.props.path} />;
  }
};

export default BufferGeometryMesh;
