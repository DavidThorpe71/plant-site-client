import { useQuery } from "@apollo/react-hooks";
import { GET_PLANT_BY_PERMALINK } from "../graphql/queries";
import PlantStyles from "../styles/PlantStyles";
import { useRouter } from "next/router";

const individualPlant = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_PLANT_BY_PERMALINK, {
    variables: {
      permalink: router && router.query && router.query.plantName
    }
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const {
    getPlant: { name, latinName, location, image, wateringInstructions, light }
  } = data;
  return (
    <PlantStyles>
      <div className="plant-container">
        <h1>{name}</h1>
        <p className="latin-name">{latinName}</p>
        {image && <img src={image} alt={name} />}
        <p>
          Origin: <span className="location">{location}</span>
        </p>
        <p>
          Watering: <span className="watering">{wateringInstructions}</span>
        </p>
        <p>
          Light: <span className="light">{light}</span>
        </p>
      </div>
    </PlantStyles>
  );
};

export default individualPlant;
