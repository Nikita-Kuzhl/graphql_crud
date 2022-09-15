import { gql } from "@apollo/client";
export const ADD_POST = gql`
  mutation createPost($id: ID, $input: PostInput) {
    createPost(id: $id, input: $input) {
      id
    }
  }
`;
export const UPDATE_POST = gql`
  mutation updatePost($id: ID, $input: PostInput) {
    updatePost(id: $id, input: $input) {
      id
    }
  }
`;
export const DELETE_POST = gql`
  mutation deletePost($id: ID) {
    deletePost(id: $id)
  }
`;
