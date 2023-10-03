import { gql } from "@apollo/client";

type RegisterDTO = {
  username: string;
  email: string;
  password: string;
};

export const CREATE_USER = gql`
  mutation registerUser($data: UserDTO) {
    createUser(data: $data) {
      id
    }
  }
`;
