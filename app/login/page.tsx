"use client";
import Form from "../components/form";
import { CreatedContext } from "@/app/layout";
import { useContext, useState } from "react";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

type LoginRequestProps = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { setUserIsLogged } = useContext(CreatedContext);
  const [formInputs, setFormInputs] = useState<LoginRequestProps>({
    username: "",
    password: "",
  });

  async function sendLoginRequest() {
    try {
      const result = await apolloClient.mutate({
        mutation: gql`
          mutation login($data: LoginUserDTO) {
            login(data: $data) {
              id
              token
            }
          }
        `,
        variables: {
          data: {
            username: formInputs.username,
            password: formInputs.password,
          },
        },
      });
      console.log(result);
      localStorage.setItem("user_token", result.data.login.token);
      toast("Logado com sucesso");
      redirect("/");
    } catch (err: any) {
      toast(err.message);
      return;
    }
  }

  return (
    <main className="w-full h-[100vh] bg-primaryGreen flex items-center justify-center ">
      <Form
        nameOfInputs={["Usuário", "Senha"]}
        typeOfInputs={["text", "password"]}
        formAction="Login"
        formInputs={formInputs}
        updateFormProps={setFormInputs}
        actionButton={sendLoginRequest}
      />
    </main>
  );
}
