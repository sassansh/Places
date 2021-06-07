import "./App.css";
import { Tabs } from "antd";
import CategoryView from "./components/CategoryView/CategoryView";
import PlaceView from "./components/PlaceView/PlaceView";
import "antd/dist/antd.css";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function App() {
  return (
    <Tabs className="App" defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Category View" key="1">
        <CategoryView />
      </TabPane>
      <TabPane tab="Place View" key="2">
        <PlaceView />
      </TabPane>
    </Tabs>
  );
}

export default App;
