"use client";
import Form from "../components/form";
import { useContext, useState } from "react";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/api/store";

type LoginRequestProps = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [formInputs, setFormInputs] = useState<LoginRequestProps>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const { loggedIn, setIsLoggedIn} = useGlobalContext();

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
      localStorage.setItem("user_token", result.data.login.token);
      toast("Logado com sucesso");
      setIsLoggedIn(true)
      router.push("/");
    } catch (err: any) {
      if (err.message === "Failed to fetch") {
        toast("Ops, isso não foi possivel no momento");
        return;
      }
      toast(err.message);
      return;
    }
  }

  return (
    <main className="w-full h-full min-h-[70vh] bg-primaryGreen flex items-center justify-center ">
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
