import { useQuery } from "@apollo/react-hooks";
import { GET_PLANT_BY_PERMALINK } from "../graphql/queries";
import PlantStyles from "../styles/PlantStyles";
import Header from "../components/Header";
import { useRouter } from "next/router";

const individualPlant = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_PLANT_BY_PERMALINK, {
    variables: {
      permalink: router.query.plantName
    }
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const {
    getPlant: { name, latinName, permalink, image }
  } = data;
  return (
    <PlantStyles>
      <div className="plant-container">
        <h1>{name}</h1>
        <p className="latin-name">{latinName}</p>
        {image && <img src={image} alt={name} />}
      </div>
    </PlantStyles>
  );
};

export default individualPlant;
