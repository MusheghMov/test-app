import "./App.css";
import Login from "./Components/Login";
import Card from "./Components/UI/Card";
import AddUser from "./Components/AddUser";
import { Route, Routes } from "react-router-dom";
import UserList from "./Components/UserList";
import { useQuery } from "react-query";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

function App() {
  const { isLoading, data, isSuccess } = useQuery("users", fetchUsers);
  const newUserHandler = (user) => {
    data.push(user);
  }
  return (
    <div className="App">
      <Card>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Login />} />
          <Route
            exact
            path="/user-list"
            element={
              <UserList
                data={data}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            }
          />
          <Route exact path="/add-user" element={<AddUser onGetNewUser={newUserHandler}/>} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Card>
    </div>
  );
}

export default App;
