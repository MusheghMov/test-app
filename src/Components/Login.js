import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

export default function Login() {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Link to="/login">
          <Tab _selected={{ color: "white", bg: "blue.500" }}>LogIn</Tab>
        </Link>

        <Link to="/signup">
          <Tab _selected={{ color: "white", bg: "blue.500" }}>SignUp</Tab>
        </Link>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RegistrationForm />
        </TabPanel>
        <TabPanel>
          <RegistrationForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
