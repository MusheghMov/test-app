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
  const [usersData, setUsersData] = useState(
    JSON.parse(localStorage.getItem("users"))
  );
  const [deletedUsers, setDeletedUsers] = useState(
    JSON.parse(localStorage.getItem("deletedUsers")) || []
  );
  const [editedUser, setEditedUser] = useState();

  useEffect(() => {
    localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));
  }, [deletedUsers]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(usersData));
  }, [usersData]);

  const { isLoading, isSuccess } = useQuery("users", fetchUsers, {
    onSuccess: (data) => {
      if (!usersData) {
        setUsersData(data);
      }
    },
  });

  const newUserHandler = (newUser) => {
    setUsersData((prevUsersData) => [...prevUsersData, newUser]);
  };

  const editUserHandler = (user) => {
    setEditedUser(user);
  };

  const editAndSaveUser = (changedUser) => {
    let users = Object.keys(usersData).map((user) => {
      if (editedUser.username === usersData[user].username) {
        return (user = changedUser);
      } else {
        return usersData[user];
      }
    });
    setUsersData(users);
  };

  const deleteUserHandler = (deletedUser) => {
    setDeletedUsers((prevDeletedUsersData) => [
      ...prevDeletedUsersData,
      deletedUser,
    ]);
    let users = usersData.filter((us) => us !== deletedUser);
    setUsersData(users);
  };

  const recoverUserHandler = (recoveredUser) => {
    setUsersData((prevDeletedUsersData) => [
      ...prevDeletedUsersData,
      recoveredUser,
    ]);
    let users = deletedUsers.filter((user) => user !== recoveredUser);
    setDeletedUsers(users);
  };

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
