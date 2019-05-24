import { Query } from "react-apollo";
import { GET_PLANT_BY_PERMALINK } from "../graphql/queries";

const plant = props => {
  const {
    query: { plant }
  } = props;
  console.log(props);
  return (
    <Query query={GET_PLANT_BY_PERMALINK} variables={{ permalink: plant }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <p>Loading</p>;
        }
        if (error) {
          return <p>Error</p>;
        }
        const {
          getPlant: { name, permalink }
        } = data;
        return <h1>{name}</h1>;
      }}
    </Query>
  );
};

export default plant;
