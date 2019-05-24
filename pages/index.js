import React from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import { GET_ALL_PLANTS } from "../graphql/queries";
import Header from "../components/Header";
import Inner from "../components/Inner";
import HomePage from "../components/HomePage";

export default props => (
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
            <HomePage />
          </Inner>
        </>
      );
    }}
  </Query>
);
