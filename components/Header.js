import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-color: #fff;
  .title {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    font-family: "Roboto";
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
    h1 {
      margin: 0;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="title">
        <h1>Plant site</h1>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
