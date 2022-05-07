import "./App.css";
import Login from "./Components/Login";
import Card from "./Components/UI/Card";
import AddUser from "./Components/AddUser";
import { Route, Routes } from "react-router-dom";
import UserList from "./Components/UserList";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import EditUser from "./Components/EditUser";
import DeletedUsers from "./Components/DeletedUsers";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

function App() {
  const [usersData, setUsersData] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [editedUser, setEditedUser] = useState();

  const { isLoading, isSuccess } = useQuery("users", fetchUsers, {
    onSuccess: (data) => {
      if (!localStorage.getItem("users")) {
        setUsersData(data);
        localStorage.setItem("users", JSON.stringify(data));
      } else {
        setUsersData(JSON.parse(localStorage.getItem("users")));
        setDeletedUsers(JSON.parse(localStorage.getItem("deletedUsers")));
      }
    },
  });

  const newUserHandler = (newUser) => {
    usersData.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersData));
  };

  const editUserHandler = (user) => {
    setEditedUser(user);
  };

  const editAndSaveUser = (changedUser) => {
    let users = Object.keys(JSON.parse(localStorage.getItem("users"))).map(
      (user) => {
        if (
          editedUser.username ===
          JSON.parse(localStorage.getItem("users"))[user].username
        ) {
          return (user = changedUser);
        } else {
          return JSON.parse(localStorage.getItem("users"))[user];
        }
      }
    );
    localStorage.setItem("users", JSON.stringify(users));
    setUsersData(users);
  };

  const deleteUserHandler = (deletedUser) => {
    deletedUsers.push(deletedUser);
    let users = usersData.filter((us) => us !== deletedUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUsersData(JSON.parse(localStorage.getItem("users")));
    localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));
  };

  const recoverUserHandler = (recoveredUser) => {
    usersData.push(recoveredUser);
    localStorage.setItem("users", JSON.stringify(usersData));
    let users = deletedUsers.filter((user) => user !== recoveredUser);
    setDeletedUsers(users);
    localStorage.setItem("deletedUsers", JSON.stringify(users));
  };

  useEffect(() => {
    if (!localStorage.getItem("users") && usersData.length > 0) {
      localStorage.setItem("users", JSON.stringify(usersData));
    }
    if (!localStorage.getItem("deletedUsers")) {
      localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));
    }
  }, [usersData, deletedUsers]);

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
              usersData && (
                <UserList
                  data={usersData}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  onDeleteUser={deleteUserHandler}
                  onEditUser={editUserHandler}
                />
              )
            }
          />
          <Route
            exact
            path="/deleted-users"
            element={
              <DeletedUsers
                data={deletedUsers}
                onRecoverUser={recoverUserHandler}
              />
            }
          />
          <Route
            exact
            path="/add-user"
            element={<AddUser onGetNewUser={newUserHandler} />}
          />
          <Route
            exact
            path="/edit-user"
            element={
              <EditUser user={editedUser} editAndSaveUser={editAndSaveUser} />
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Card>
    </div>
  );
}

export default App;
