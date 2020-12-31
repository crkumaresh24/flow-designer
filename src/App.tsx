
import React from 'react';
import './App.css';
import FlowTasksComponent from './components/FlowTasksComponent';
import FlowDesignerContainer from './containers/FlowDesignerContainer';
import MenuContainer from './containers/MenuContainer';
import TitleBarContainer from './containers/TitleBarContainer';

const App = (): React.ReactElement => {

  const [openTools, setOpenTools] = React.useState(false);
  const toggleOpenTools = () => setOpenTools(!openTools);

  return (
    <div className="flex flex-column">
      <TitleBarContainer />
      <div className="flex designer">
        <MenuContainer toggleOpenTools={toggleOpenTools} />
        {openTools && <FlowTasksComponent />}
        <FlowDesignerContainer />
      </div>
    </div>
  );
}

export default App;
