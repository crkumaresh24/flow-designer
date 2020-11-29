import { BranchesOutlined } from '@ant-design/icons';
import React from 'react';
import './App.css';
import FlowTasksComponent from './components/FlowTasksComponent';
import FlowDesignerContainer from './conntainers/FlowDesignerContainer';
import MenuContainer from './conntainers/MenuContainer';

const App = (): React.ReactElement => {
  return (
    <div className="flex flex-column">
      <div className="menu-bar mar-left-8 mar-right-8 flex grow">
        <BranchesOutlined />
        {<div className="grow mar-left-8">{'Flow Designer'}</div>}
        <MenuContainer />
      </div>
      <div className="flex">
        <FlowTasksComponent />
        <FlowDesignerContainer />
      </div>
    </div>
  );
}

export default App;
