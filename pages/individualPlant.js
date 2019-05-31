import { Query } from 'react-apollo';
import { GET_PLANT_BY_PERMALINK } from '../graphql/queries';

const individualPlant = (props) => {
  const {
    query: { plant }
  } = props;
  return (
    <Query query={GET_PLANT_BY_PERMALINK} variables={{ permalink: plant }}>
      {({ data, loading, error }) => {
        console.log(error);
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

export default individualPlant;
