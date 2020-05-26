import './index.scss';

import React from 'react';

import { Points, Lines } from '@/component';

const TopMenu = class extends React.Component {
  render() {
    return (
      <div className="render-board">
        <React.Fragment>
          <Points />
          {/* <Lines /> */}
        </React.Fragment>
      </div>
    );
  }
};

export default TopMenu;
