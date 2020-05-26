import './index.scss';

import React from 'react';

import { Empty } from 'antd';

import { IPoint } from '@/model';

import { Points, Lines } from '@/component';

import fileStore from '@/store';

import { observer, inject } from 'mobx-react';

@inject('fileStore')
@observer
class TopMenu extends React.Component {
  render() {
    return (
      <div className="render-board">
        <React.Fragment>
          {fileStore.hasContent ? (
            <Points data={this.formatterData(fileStore.content)} />
          ) : (
            <div className="render-board-empty">
              <Empty description="请先导入数据" />
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }
  formatterData(data: string): IPoint[] {
    const points = [] as IPoint[];
    const rows = Array.from(data.trim().split(/\n/));
    if (rows && rows.length > 0) {
      rows.forEach((item) => {
        const row = item.trim().replace(/\s+/g, ' ').split(' ');
        if (row && row.length === 3) {
          try {
            points.push({ x: Number(row[0]), y: Number(row[1]), z: Number(row[2]) });
          } catch {}
        }
      });
    }
    return points;
  }
}

export default TopMenu;
