import gql from "graphql-tag";

export const GET_ALL_PLANTS = gql`
  query getPlants {
    getPlants {
      name
      permalink
      light
    }
  }
`;

export const GET_PLANT_BY_PERMALINK = gql`
  query getPlant($permalink: String) {
    getPlant(permalink: $permalink) {
      name
      latinName
      permalink
      image
    }
  }
`;
