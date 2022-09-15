import { gql } from "@apollo/client";
const ADD_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      id
      username
      age
    }
  }
`;
export default ADD_USER;
