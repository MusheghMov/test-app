import { AddIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, Spinner } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import User from "./User";

export default function UserList(props) {
  let data = props.data;
  let isLoading = props.isLoading;
  let isSuccess = props.isSuccess;
  let navigate = useNavigate();
  const addUserHandler = () => {
    navigate("../add-user");
  };
  const recoverUserHandler = () => {
    navigate("../deleted-users");
  };

  if (isLoading) {
    <Spinner color="red.500" />;
  }
  if (isSuccess) {
    return (
      <div>
        <Flex justify="space-between">
          <Heading>Users List</Heading>
          <div>
            <IconButton
              icon={<RepeatClockIcon />}
              onClick={recoverUserHandler}
              marginRight="2px"
            ></IconButton>
            <IconButton
              icon={<AddIcon />}
              onClick={addUserHandler}
            ></IconButton>
          </div>
        </Flex>
        {data.map((user) => {
          return (
            <User
              userData={user}
              onDeleteUser={props.onDeleteUser}
              key={user.id}
              onEditUser={props.onEditUser}
            ></User>
          );
        })}
      </div>
    );
  }
}
