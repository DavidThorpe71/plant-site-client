import React from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import { GET_ALL_PLANTS } from "../graphql/queries";

const HomePage = props => (
  <Query query={GET_ALL_PLANTS}>
    {({ data, loading, error }) => {
      if (loading) {
        return <p>Loading</p>;
      }
      if (error) {
        return <p>Error</p>;
      }
      const { getPlants } = data;
      console.log({ getPlants });
      return (
        <div className="plants-container">
          {getPlants.map(plant => (
            <div className="each-plant" key={plant.permalink}>
              <Link
                href={{
                  pathname: `/plant`,
                  query: { plant: plant.permalink }
                }}
                as={`/${plant.permalink}`}
                prefetch
              >
                <a>
                  <h1>{plant.name}</h1>
                </a>
              </Link>
              <p>light needs: {plant.light}</p>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default HomePage;
