import React from 'react';

import { Steps } from 'antd';
import { FolderAddTwoTone, CloudTwoTone, CrownTwoTone, BulbTwoTone } from '@ant-design/icons';

const { Step } = Steps;

interface IProps {}

interface IState {
  current: number;
}

const StepsControl = class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      current: 0
    };
  }
  handleStepChanged = (current: number) => {
    this.setState({ current }, () => {});
  };
  render() {
    const { current } = this.state;
    return (
      <Steps className="steps-control" current={current} onChange={this.handleStepChanged} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
    );
  }
};

const steps = [
  {
    title: '导入',
    content: '文件导入',
    icon: <FolderAddTwoTone />
  },
  {
    title: '散乱点云模型',
    content: '散乱点云模型',
    icon: <CloudTwoTone />
  },
  {
    title: '三角网格模型',
    content: '三角网格模型',
    icon: <CrownTwoTone />
  },
  {
    title: '空洞修复',
    content: '空洞修复',
    icon: <BulbTwoTone />
  },
  {
    title: '导入',
    content: '文件导入',
    icon: <FolderAddTwoTone />
  },
  {
    title: '散乱点云模型',
    content: '散乱点云模型',
    icon: <CloudTwoTone />
  }
];

export default StepsControl;
