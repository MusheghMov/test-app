import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import User from "./User";

export default function DeletedUsers(props) {
  let data = props.data;
  let navigate = useNavigate();
  const backToHandler = () => {
    navigate("../user-list");
  };

  return (
    <div>
      <IconButton
        icon={<ChevronLeftIcon />}
        width="50px"
        onClick={backToHandler}
      />
      <Flex justify="space-between">
        <Heading>Deleted Users</Heading>
      </Flex>
      {data.map((user) => {
        return (
          <User
            userData={user}
            onRecoverUser={props.onRecoverUser}
            deletedUser={true}
            key={user.id}
          ></User>
        );
      })}
    </div>
  );
}
