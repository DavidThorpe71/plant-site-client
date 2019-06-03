import gql from "graphql-tag";

export const ADD_PLANT = gql`
  mutation addPlant(
    $name: String
    $latinName: String
    $location: String
    $image: String
    $wateringInstructions: String
    $light: Light
  ) {
    addPlant(
      name: $name
      latinName: $latinName
      location: $location
      image: $image
      wateringInstructions: $wateringInstructions
      light: $light
    ) {
      _id
      name
    }
  }
`;
