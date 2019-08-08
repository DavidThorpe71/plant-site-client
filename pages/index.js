import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { GET_ALL_PLANTS } from "../graphql/queries";
import AddPlantForm from "../components/AddPlantForm";
import Layout from "../components/Layout";

const PlantPageLink = props => (
  <Link href="/[plantName]" as={`/${props.plant.permalink}`}>
    <a>{props.plant.name}</a>
  </Link>
);

const index = () => {
  const { loading, error, data } = useQuery(GET_ALL_PLANTS);
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  const { getPlants } = data;
  return (
    <>
      <AddPlantForm />
      <div className="plants-container">
        {getPlants.map(plant => (
          <div className="each-plant" key={plant.permalink}>
            <PlantPageLink plant={plant} />
            <p>light needs: {plant.light}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default index;
