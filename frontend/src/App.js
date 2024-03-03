import "./App.css";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import { ProvideContext } from "./Contexter";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
  return (

    <ProvideContext>
      <Router>
      <div className="App">
        <Routes>
          <Route exact path="/home/*" element={<Home></Home>} ></Route>
          <Route exact path="/" element={<LoginForm></LoginForm>} ></Route>
        </Routes>
      </div>
      </Router>
    </ProvideContext>
  );
}

export default App;
