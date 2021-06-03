import "./App.css";
import CategoryView from "./components/CategoryView/CategoryView";
import PlaceView from "./components/PlaceView/PlaceView";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <CategoryView />
      <PlaceView />
    </div>
  );
}

export default App;
