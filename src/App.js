import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import DisneyPage from "./pages/DisneyPage";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <DisneyPage />
      </div>
    </Provider>
  );
};

export default App;
