import './index.scss';

import React from 'react';

import { Skeleton } from 'antd';

const TopMenu = class extends React.Component {
  render() {
    return (
      <div className="render-board" id="render-board">
        <React.Fragment>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </React.Fragment>
      </div>
    );
  }
};

export default TopMenu;
