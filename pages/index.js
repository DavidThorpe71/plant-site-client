import React from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import { GET_ALL_PLANTS } from "../graphql/queries";
import Header from "../components/Header";
import Inner from "../components/Inner";
import AddPlantForm from "../components/AddPlantForm";

const index = props => {
  return (
    <Query query={GET_ALL_PLANTS}>
      {({ data, loading, error }) => {
        if (loading) {
          return <p>Loading</p>;
        }
        if (error) {
          return <p>Error</p>;
        }
        const { getPlants } = data;
        return (
          <>
            <Header />
            <Inner>
              <AddPlantForm />
              <div className="plants-container">
                {getPlants.map(plant => (
                  <div className="each-plant" key={plant.permalink}>
                    <Link
                      href={{
                        pathname: `/individualPlant`,
                        query: { plant: plant.permalink }
                      }}
                      as={`/${plant.permalink}`}
                      // prefetch
                    >
                      <a>
                        <h1>{plant.name}</h1>
                      </a>
                    </Link>
                    <p>light needs: {plant.light}</p>
                  </div>
                ))}
              </div>
            </Inner>
          </>
        );
      }}
    </Query>
  );
};

export default index;
