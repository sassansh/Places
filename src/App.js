import "./App.css";
import { Tabs } from "antd";
import CategoryView from "./components/CategoryView/CategoryView";
import PlaceView from "./components/PlaceView/PlaceView";
import "antd/dist/antd.css";

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Category View" key="1">
          <CategoryView />
        </TabPane>
        <TabPane tab="Place View" key="2">
          <PlaceView />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
