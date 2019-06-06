import { Query } from "react-apollo";
import { GET_PLANT_BY_PERMALINK } from "../graphql/queries";

interface Data {
  getPlant: {
    name: string;
    permalink: string;
    image: string;
  };
}

interface Variables {
  permalink: string;
}

interface Props {
  query: {
    plant: string;
  };
}

const individualPlant = (props: Props) => {
  const {
    query: { plant }
  } = props;
  return (
    <Query<Data, Variables>
      query={GET_PLANT_BY_PERMALINK}
      variables={{ permalink: plant }}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return <p>Loading</p>;
        }
        if (error) {
          return <p>Error</p>;
        }
        if (!data) {
          return <p>Error</p>;
        }
        const {
          getPlant: { name, image }
        } = data;
        return (
          <div className="plant-container">
            <h1>{name}</h1>
            {image && <img src={image} alt={name} />}
          </div>
        );
      }}
    </Query>
  );
};

export default individualPlant;
