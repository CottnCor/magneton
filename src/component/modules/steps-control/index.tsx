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
          <Step key={item.key} title={item.title} icon={item.icon} style={{cursor: 'pointer'}}/>
        ))}
      </Steps>
    );
  }
};

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
    icon: <CrownTwoTone />
  },
  {
    key: 'step_5',
    title: '正交投影',
    icon: <BulbTwoTone />
  },
  {
    key: 'step_6',
    title: '透视投影',
    icon: <FolderAddTwoTone />
  }
];

export default StepsControl;
