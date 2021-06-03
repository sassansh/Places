import "./App.css";
import CategoryView from "./components/CategoryView/CategoryView";
import PlaceView from "./components/PlaceView/PlaceView";
import { Button, DatePicker } from "antd";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <CategoryView />
      <PlaceView />
      <br />
      <DatePicker />
      <br />
      <br />
      <Button type="primary">Primary Button</Button>
    </div>
  );
}

export default App;
