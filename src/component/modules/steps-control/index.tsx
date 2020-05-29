import React from 'react';

import { fileStore, controlStore } from '@/store';

import { viewEnum } from '@/store/ControlStore';

import { observer, inject } from 'mobx-react';

import { FolderAddTwoTone, CloudTwoTone, GoldTwoTone, AppstoreTwoTone, BuildTwoTone } from '@ant-design/icons';

import { Steps } from 'antd';

const { Step } = Steps;

interface IState {
  current: number;
}

@inject('fileStore', 'controlStore')
@observer
class StepsControl extends React.Component<{}, IState> {
  ref: React.RefObject<HTMLInputElement>;
  constructor(props: {}) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      current: -1
    };
  }
  handleStepChanged = (current: number) => {
    if (current >= 0 && current < steps.length) {
      this.setState({ current }, () => {
        const input = this.ref.current;
        if (steps[current].key === 'step:1' && input) {
          input.click();
        } else if (steps[current].key === 'step:2') {
          controlStore.setCurrent(viewEnum.points);
        } else if (steps[current].key === 'step:3') {
          controlStore.setCurrent(viewEnum.mesh_initial);
        } else if (steps[current].key === 'step:4') {
          controlStore.setCurrent(viewEnum.mesh_repaired);
        }
        this.setState({ current: -1 });
      });
    }
  };
  handleFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (files && files.length > 0) {
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsText(file, 'UTF-8');
          reader.onload = (e) => {
            const fileContent = e.target?.result?.toString();
            if (fileContent) {
              fileStore.set('');
              fileStore.set(fileContent);
              controlStore.setCurrent(viewEnum.points);
            } else fileStore.clear();
          };
        }
      }
    }
  };
  render() {
    const { current } = this.state;
    return (
      <React.Fragment>
        <Steps className="steps-control" current={current} onChange={this.handleStepChanged} size="small">
          {steps.map((item) => (
            <Step key={item.key} title={item.title} icon={item.icon} style={{ cursor: 'pointer' }} />
          ))}
        </Steps>
        <input type="file" ref={this.ref} accept="*.txt" style={{ display: 'none' }} onChange={this.handleFileChanged} />
      </React.Fragment>
    );
  }
}

const steps = [
  {
    key: 'step:1',
    title: '导入文件',
    icon: <FolderAddTwoTone />
  },
  {
    key: 'step:2',
    title: '散乱点云',
    icon: <CloudTwoTone />
  },
  {
    key: 'step:3',
    title: '三角网格',
    icon: <GoldTwoTone />
  },
  {
    key: 'step:4',
    title: '孔洞修复',
    icon: <FolderAddTwoTone />
  },
  {
    key: 'step:5',
    title: '正交投影',
    icon: <AppstoreTwoTone />
  },
  {
    key: 'step:6',
    title: '透视投影',
    icon: <BuildTwoTone />
  }
];

export default StepsControl;
