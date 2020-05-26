import './index.scss';

import React from 'react';

import ReactDOM from 'react-dom';

import { Layout, Breadcrumb } from 'antd';

import { TopMenu, StepsControl, MainConfigurePanel, RenderBoard } from '@/component';

import { Provider } from 'mobx-react';

import fileStore from '@/store';

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Provider fileStore={fileStore}>
    <Layout id="total-wapper">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <TopMenu />
      </Header>
      <Content className="site-layout">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <div className="site-layout-content-top">
            <StepsControl />
          </div>
          <div className="site-layout-content-main">
            <div className="site-layout-content-main-side">
              <MainConfigurePanel />
            </div>
            <div className="site-layout-content-main-wapper">
              <RenderBoard />
            </div>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2020 Created for Hole Repaired</Footer>
    </Layout>
  </Provider>,
  document.getElementById('root')
);
