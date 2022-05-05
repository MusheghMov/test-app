import { ChevronRightIcon } from "@chakra-ui/icons";
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

export default function User(props) {
  const user = props.userData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card>
      <Flex align="center" justify="space-between" width="300px">
        <h3>{user.name}</h3>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={onOpen}
        ></IconButton>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <p>{user.phone}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Edit User</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
