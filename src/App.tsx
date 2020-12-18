import { BranchesOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import React from 'react';
import './App.css';
import FlowTasksComponent from './components/FlowTasksComponent';
import FlowDesignerContainer from './conntainers/FlowDesignerContainer';
import MenuContainer from './conntainers/MenuContainer';

const App = (): React.ReactElement => {
  return (
    <div className="flex flex-column">
      <div className="menu-bar mar-left-8 mar-right-8 flex">
        <BranchesOutlined />
        {<div className="grow mar-left-8">{'Flow Designer'}</div>}
      </div>
      <Divider style={{ margin: 'unset' }} />
      <div className="flex designer">
        <MenuContainer />
        <FlowTasksComponent />
        <FlowDesignerContainer />
      </div>
    </div>
  );
}

export default App;
