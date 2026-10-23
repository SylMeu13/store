import { useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import RInput from "@/components/RInput";
import { login } from "@/features/admin/authApi";
import styled from "styled-components";

const LOGIN_TO = "/admin/products";

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;

  > form {
    max-width: 20em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`;

export default function AdminLoginPage() {
  const [logging, setLogging] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        username: z.string().nonempty("The Username is required!"),
        password: z.string().nonempty("The Password is required!"),
      }),
    ),
    disabled: logging,
  });

  function onSubmit(data) {
    setLogging(true);
    login(data.username, data.password)
      .then(() => {
        navigate(LOGIN_TO);
      })
      .catch((error) => {
        setError("username", { message: error });
        setError("password", { message: error });
      })
      .finally(() => {
        setLogging(false);
      });
  }

  return (
    <Page>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RInput
          label={"Username"}
          error={errors.username}
          {...register("username")}
        />
        <RInput
          type="password"
          label={"Password"}
          error={errors.password}
          {...register("password")}
        />
        <input type="submit" value="Log in" />
      </form>
    </Page>
  );
}
