import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-color: #fff;
  .title {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    padding: 10px;
    font-size: 20px;

    h1 {
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #014c01;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="title">
        <h1>🌵 Plant site</h1>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
