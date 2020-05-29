import './index.scss';

import React from 'react';

import { Empty } from 'antd';

import { IPoint } from '@/model';

import { Spin } from 'antd';

import { Points, PLYLoader } from '@/component';

import { viewEnum } from '@/store/ControlStore';

import { fileStore, controlStore } from '@/store';

import { observer, inject } from 'mobx-react';

@inject('fileStore', 'controlStore')
@observer
class TopMenu extends React.Component {
  render() {
    return (
      <div className="render-board">
        <React.Fragment>
          {fileStore.hasContent ? (
            controlStore.loading ? (
              <div className="render-board-spin">
                <Spin tip="数据计算中..." />
              </div>
            ) : (
              (() => {
                if (controlStore.current === viewEnum.points_initial) {
                  return <Points data={this.formatterData(fileStore.content)} />;
                } else if (controlStore.current === viewEnum.points_repaired) {
                  return <PLYLoader path="http://127.0.0.1:8080/points_repaired.html" />;
                } else if (controlStore.current === viewEnum.mesh_initial) {
                  return <PLYLoader path="http://127.0.0.1:8080/mesh_initial.html" />;
                } else if (controlStore.current === viewEnum.mesh_repaired) {
                  return <PLYLoader path="http://127.0.0.1:8080/mesh_repaired.html" />;
                }
              })()
            )
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
