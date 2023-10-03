"use client";
import Form from "../components/form";
import { useState } from "react";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";

type RegisterRequestProps = {
  username: string;
  email?: string;
  password: string;
};

export default function RegisterPage() {
  const [formInputs, setFormInputs] = useState<RegisterRequestProps>({
    username: "",
    password: "",
    email: "",
  });

  async function sendRegisterRequest() {
    try {
      const result = await apolloClient.mutate({
        mutation: gql`
          mutation registerUser($data: UserDTO) {
            createUser(data: $data) {
              id
            }
          }
        `,
        variables: {
          data: {
            username: formInputs.username,
            password: formInputs.password,
            email: formInputs.email,
          },
        },
      });

      toast("Usuário cadastrado com sucesso");
    } catch (err: any) {
      toast(err.message);
      return;
    }
  }

  return (
    <main className="w-full h-[100vh] bg-primaryGreen flex items-center justify-center ">
      <Form
        nameOfInputs={["Usuário", "Email", "Senha"]}
        typeOfInputs={["text", "text", "password"]}
        formAction="Registrar"
        formInputs={formInputs}
        updateFormProps={setFormInputs}
        actionButton={sendRegisterRequest}
      />
    </main>
  );
}
