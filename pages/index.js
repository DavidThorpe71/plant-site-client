import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { GET_ALL_PLANTS } from "../graphql/queries";

const Title = styled.h1`
  font-family: "Roboto";
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default () => (
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
        <div className="plants-container">
          <Title>Plant site</Title>
          {getPlants.map(item => (
            <div className="each-plant" key="item.permalink">
              <a href={`/${item.permalink}`}>
                <h1>{item.name}</h1>
              </a>
              <p>light needs: {item.light}</p>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);
