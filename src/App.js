import "./App.css";
import Login from "./Components/Login";
import Card from "./Components/UI/Card";
import { Route, Routes } from "react-router-dom";
import UserList from "./Components/UserList";

function App() {
  return (
    <div className="App">
      <Card>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Login />} />
          <Route exact path="/user-list" element={<UserList />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Card>
    </div>
  );
}

export default App;
