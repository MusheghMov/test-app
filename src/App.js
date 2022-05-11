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
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";

const fetchUsers = async () => {
  const allUsers = await API.graphql({ query: queries.listUsers });
  return allUsers.data.listUsers.items;
};

function App() {
  Amplify.configure(awsconfig);
  Auth.configure(awsconfig);

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

  const newUserHandler = async (newUser) => {
    const createdUser = await API.graphql(
      graphqlOperation(mutations.createUser, { input: newUser })
    );
    setUsersData((prevUsersData) => [
      ...prevUsersData,
      createdUser.data.createUser,
    ]);
  };

  const editUserHandler = (user) => {
    setEditedUser(user);
  };

  const editAndSaveUser = async (changedUser) => {
    let users = Object.keys(usersData).map((user) => {
      if (editedUser.username === usersData[user].username) {
        return (user = changedUser);
      } else {
        return usersData[user];
      }
    });
    await API.graphql({
      query: mutations.updateUser,
      variables: { input: changedUser },
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
