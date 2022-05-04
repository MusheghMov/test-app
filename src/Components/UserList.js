import { Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import User from "./User";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

export default function UserList() {
  const { isLoading, data, isSuccess } = useQuery("users", fetchUsers);

  console.log(data);
  if (isLoading) {
    <Spinner color='red.500' />
  }
  if (isSuccess) {
    return (
      <div>
        <Heading>Users List</Heading>
        {data.map((user) => {
        return  <User userName={user.name}></User>;
      })}
      </div>
    );
  }
}
