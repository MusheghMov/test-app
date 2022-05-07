import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Heading, IconButton, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AddUser.css";

export default function EditUser(props) {
  let editUser = props.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  let navigate = useNavigate();
  const backToHandler = () => {
    navigate("../user-list");
  };
  const onSubmit = (data) => {
    props.editAndSaveUser(data);
    backToHandler();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <IconButton
          icon={<ChevronLeftIcon />}
          width="50px"
          onClick={backToHandler}
        />
        <Heading>Edit User</Heading>
        <div>
          <Input
            type="text"
            defaultValue={editUser.name}
            {...register("name", { required: true, maxLength: 80 })}
          />
          {errors.name && <p className="error-text">This field is required</p>}
        </div>
        <div>
          <Input
            defaultValue={editUser.email}
            type="text"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <p className="error-text">Please enter valid email address</p>
          )}
        </div>
        <div>
          <Input
            defaultValue={editUser.phone}
            type="tel"
            placeholder="Mobile number"
            {...register("phone", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          {errors.phone && (
            <p className="error-text">Please enter valid mobile number</p>
          )}
        </div>
        <div>
          <Input
            defaultValue={editUser.username}
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="error-text">Please enter valid email address</p>
          )}
        </div>

        <Button colorScheme="blue" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
