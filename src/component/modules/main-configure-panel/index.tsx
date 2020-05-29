import './index.scss';

import React from 'react';

import { controlStore } from '@/store';

import { observer, inject } from 'mobx-react';

import { Form, Card, Input, Slider, Button, Row, Col } from 'antd';
import { SettingTwoTone, LikeTwoTone, ThunderboltTwoTone, ToolTwoTone, CheckCircleFilled } from '@ant-design/icons';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const cardStyle = {
  margin: '.6em 0'
};

@inject('controlStore')
@observer
class MainConfigurePanel extends React.Component {
  handleLoading(busy: boolean) {
    controlStore.setLoading(busy);
  }
  renderTitle(title: string) {
    return (
      <p>
        <SettingTwoTone />
        &nbsp; {title}
      </p>
    );
  }
  renderInput(defaultValue: number, min: number) {
    return <Input type="number" defaultValue={defaultValue} min={min} prefix={<ToolTwoTone />} suffix={<CheckCircleFilled style={{ color: '#ac8ece' }} />} />;
  }
  renderSlider(defaultValue: number, step: number, min: number, max: number) {
    return <Slider tooltipVisible tooltipPlacement="right" defaultValue={defaultValue} step={step} max={max} min={min} />;
  }
  render() {
    return (
      <div className="main-configure-panel">
        <Form name="validate_other" {...formItemLayout}>
          <Card style={cardStyle} title={this.renderTitle('KNN')} size="small">
            <Form.Item key="k" name="k" label="K取值">
              {this.renderSlider(18, 1, 10, 20)}
            </Form.Item>
            <Form.Item key="t" name="t" label="调控因子">
              {this.renderSlider(0.8, 0.1, 0, 1)}
            </Form.Item>
          </Card>
          <Card style={cardStyle} title={this.renderTitle('边界提取')} size="small">
            <Form.Item key="b" name="b" label="边界点提取阈值">
              {this.renderSlider(0.8, 0.1, 0.3, 1)}
            </Form.Item>
            <Form.Item key="w" name="w" label="微切平面系数">
              {this.renderInput(100, 0)}
            </Form.Item>
            <Form.Item key="c" name="c" label="边界拆分系数">
              {this.renderSlider(0.00001, 0.00001, 0, 0.001)}
            </Form.Item>
          </Card>
          <Card style={cardStyle} title={this.renderTitle('RBF调整')} size="small">
            <Form.Item key="r" name="r" label="迭代阈值">
              {this.renderSlider(0.001, 0.001, 0, 0.01)}
            </Form.Item>
          </Card>
          <Row justify="center" gutter={16}>
            <Col span={12}>
              <Button onClick={() => this.handleLoading(true)} block icon={<LikeTwoTone />} htmlType="submit">
                刷新
              </Button>
            </Col>
            <Col span={12}>
              <Button onClick={() => this.handleLoading(true)} block icon={<ThunderboltTwoTone />} htmlType="button">
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default MainConfigurePanel;
