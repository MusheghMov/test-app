import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  IconButton,
  Spinner,
} from "@chakra-ui/react";

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
  

  // console.log(data);
  if (isLoading) {
    <Spinner color="red.500" />;
  }
  if (isSuccess) {
    return (
      <div>
        <Flex justify="space-between">
          <Heading>Users List</Heading>
          <IconButton icon={<AddIcon />} onClick={addUserHandler}></IconButton>
        </Flex>
        {data.map((user) => {
          return <User userData={user}></User>;
        })}
      </div>
    );
  }
}
