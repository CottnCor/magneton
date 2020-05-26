import React from 'react';

import fileStore from '@/store';

import { observer, inject } from 'mobx-react';

import { FolderAddTwoTone, CloudTwoTone, GoldTwoTone, AppstoreTwoTone, BuildTwoTone } from '@ant-design/icons';

import { Steps } from 'antd';

const { Step } = Steps;

interface IState {
  current: number;
}

@inject('fileStore')
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
        if (steps[current].key === 'step_1' && input) {
          input.click();
          this.setState({ current: -1 });
        }
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
    key: 'step_1',
    title: '导入文件',
    icon: <FolderAddTwoTone />
  },
  {
    key: 'step_2',
    title: '孔洞修复',
    icon: <FolderAddTwoTone />
  },
  {
    key: 'step_3',
    title: '散乱点云',
    icon: <CloudTwoTone />
  },
  {
    key: 'step_4',
    title: '三角网格',
    icon: <GoldTwoTone />
  },
  {
    key: 'step_5',
    title: '正交投影',
    icon: <AppstoreTwoTone />
  },
  {
    key: 'step_6',
    title: '透视投影',
    icon: <BuildTwoTone />
  }
];

export default StepsControl;
