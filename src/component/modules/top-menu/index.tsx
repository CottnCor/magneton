import React from 'react';

import { Menu } from 'antd';

import { viewEnum } from '@/store/ControlStore';

import { fileStore, controlStore } from '@/store';

import { observer, inject } from 'mobx-react';

import {
  MailFilled,
  FolderFilled,
  FolderOpenFilled,
  SaveFilled,
  SketchSquareFilled,
  CopyFilled,
  FundFilled,
  CloseSquareFilled,
  EditFilled,
  SlidersFilled,
  GoldFilled,
  FormatPainterFilled,
  BankFilled,
  DatabaseFilled,
  ToolFilled,
  StopFilled,
  SlackSquareFilled,
  MobileFilled,
  SettingFilled
} from '@ant-design/icons';

const { SubMenu } = Menu;

interface IState {
  current: string;
}

@inject('fileStore', 'controlStore')
@observer
class TopMenu extends React.Component<{}, IState> {
  ref: React.RefObject<HTMLInputElement>;
  constructor(props: {}) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      current: ''
    };
  }
  handleLoading(busy: boolean) {
    controlStore.setLoading(busy);
  }
  handleMenuChanged = (current: string) => {
    this.setState({ current }, () => {
      const input = this.ref.current;
      if (current === 'file:1' && input) {
        input.click();
      } else if (current === 'view:1') {
        controlStore.setCurrent(viewEnum.points);
      } else if (current === 'view:2') {
        controlStore.setCurrent(viewEnum.mesh_initial);
      } else if (current === 'edit:3:2') {
        controlStore.setCurrent(viewEnum.mesh_repaired);
      } else if (current === 'file:2' || current === 'file:3') {
        if (controlStore.current === viewEnum.mesh_repaired) {
          const link = document.createElement('a');
          link.target = '_blank';
          link.download = 'Repaired.txt';
          link.href = 'http://127.0.0.1:8080/Repaired.txt';
          link.click();
        }
      } else {
        this.handleLoading(true);
      }
      this.setState({ current: '' });
    });
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
        <Menu theme="dark" onClick={(e) => this.handleMenuChanged(e.key)} selectedKeys={[current]} mode="horizontal">
          {menu.map((item) => {
            if (item.sub && item.sub.length > 0) {
              return (
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                  {item.sub.map((subMenu) => {
                    if (subMenu.sub && subMenu.sub.length > 0) {
                      return (
                        <Menu.ItemGroup key={subMenu.key} title={subMenu.title}>
                          {subMenu.sub.map((sub) => (
                            <Menu.Item key={sub.key} icon={sub.icon}>
                              {subMenu.title}
                            </Menu.Item>
                          ))}
                        </Menu.ItemGroup>
                      );
                    } else {
                      return (
                        <Menu.Item key={subMenu.key} icon={subMenu.icon}>
                          {subMenu.title}
                        </Menu.Item>
                      );
                    }
                  })}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.title}
                </Menu.Item>
              );
            }
          })}
        </Menu>
        <input type="file" ref={this.ref} accept="txt" style={{ display: 'none' }} onChange={this.handleFileChanged} />
      </React.Fragment>
    );
  }
}

export default TopMenu;

const menu = [
  {
    key: 'file',
    title: '文件',
    icon: <FolderFilled />,
    sub: [
      {
        key: 'file:1',
        title: '导入',
        icon: <FolderOpenFilled />
      },
      {
        key: 'file:2',
        title: '保存',
        icon: <SaveFilled />
      },
      {
        key: 'file:3',
        title: '另存为',
        icon: <CopyFilled />
      },
      {
        key: 'file:4',
        title: '退出',
        icon: <CloseSquareFilled />
      }
    ]
  },
  {
    key: 'edit',
    title: '编辑',
    icon: <EditFilled />,
    sub: [
      {
        key: 'edit:1',
        title: 'KNN',
        icon: <SlidersFilled />
      },
      {
        key: 'edit:2',
        title: '边界提取',
        icon: <FundFilled />
      },
      {
        key: 'edit:3',
        title: '孔洞修复',
        sub: [
          {
            key: 'edit:3:1',
            title: '散乱点云',
            icon: <GoldFilled />
          },
          {
            key: 'edit:3:2',
            title: '三角网格',
            icon: <SketchSquareFilled />
          }
        ]
      },
      {
        key: 'edit:4',
        title: 'RBF调整',
        icon: <FormatPainterFilled />
      }
    ]
  },
  {
    key: 'view',
    title: '视图',
    icon: <SettingFilled />,
    sub: [
      {
        key: 'view:1',
        title: '散乱点云',
        icon: <GoldFilled />
      },
      {
        key: 'view:2',
        title: '三角网格',
        icon: <SketchSquareFilled />
      },
      {
        key: 'view:3',
        title: '正交投影',
        icon: <DatabaseFilled />
      },
      {
        key: 'view:4',
        title: '透视投影',
        icon: <BankFilled />
      }
    ]
  },
  {
    key: 'tool',
    title: '工具',
    icon: <ToolFilled />,
    sub: [
      {
        key: 'tool:1',
        title: '旋转',
        icon: <StopFilled />
      },
      {
        key: 'tool:2',
        title: '缩放',
        icon: <MobileFilled />
      },
      {
        key: 'tool:3',
        title: '平移',
        icon: <SlackSquareFilled />
      }
    ]
  },
  {
    key: 'help',
    title: '帮助',
    icon: <MailFilled />
  }
];
