import {
  DeleteIcon,
  EditIcon,
  InfoOutlineIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import Card from "./UI/Card";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function User(props) {
  const user = props.userData;
  const { isOpen, onOpen, onClose } = useDisclosure();

  let navigate = useNavigate();
  const navigateToEditUserHandler = () => {
    props.onEditUser(user);
    navigate("../edit-user");
  };

  const deleteUser = () => {
    props.onDeleteUser(user);
  };

  const recoverUser = () => {
    props.onRecoverUser(user);
  };

  return (
    <Card>
      <Flex align="center" justify="space-between" width="300px">
        <h3>{user.name}</h3>
        <div>
          {props.deletedUser ? (
            <IconButton
              _hover={{ backgroundColor: "green", color: "white" }}
              onClick={recoverUser}
              icon={<RepeatClockIcon />}
              marginRight="2px"
            ></IconButton>
          ) : (
            <>
              <IconButton
                _hover={{ backgroundColor: "crimson", color: "white" }}
                onClick={deleteUser}
                icon={<DeleteIcon />}
                marginRight="2px"
              ></IconButton>
              <IconButton
                icon={<EditIcon />}
                onClick={navigateToEditUserHandler}
                marginRight="2px"
              ></IconButton>
            </>
          )}

          <IconButton icon={<InfoOutlineIcon />} onClick={onOpen}></IconButton>
        </div>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name} Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Phone: {user.phone}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
