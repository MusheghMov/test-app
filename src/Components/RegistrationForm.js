import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) {
      navigate("../user-list");
    }
    console.log(data);
  };
  const handleShowClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} spacing={3}>
      <Stack spacing={3}>
        <div>
          <Input
            isInvalid={errors.email}
            errorBorderColor="crimson"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error-text">Please enter valid email address</p>
          )}
        </div>

        <div>
          <InputGroup size="md">
            <Input
              isInvalid={errors.password}
              errorBorderColor="crimson"
              placeholder="Password"
              type={show ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: { value: 8, message: "less than 8 characters" },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <p className="error-text">
              Password is too short (min 8 characters)
            </p>
          )}
        </div>

        <Button colorScheme="blue" type="submit">
          Log in
        </Button>
      </Stack>
    </form>
  );
}
