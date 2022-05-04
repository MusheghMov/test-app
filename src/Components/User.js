import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import Card from "./UI/Card";

export default function User(props) {
    const userName = props.userName;
  return (
    <Card>
      <Flex align="center" justify="space-between" width="300px">
        <h3>{userName}</h3>
        <IconButton icon={<ChevronRightIcon />}></IconButton>
      </Flex>
    </Card>
  );
}
