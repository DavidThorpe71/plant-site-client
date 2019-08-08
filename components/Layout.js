import Header from "./Header";
import Inner from "./Inner";

// const layoutStyle = {
//   margin: 20,
//   padding: 20,
//   border: '1px solid #DDD'
// };

const Layout = props => (
  <>
    <Header />
    <Inner>{props.children}</Inner>
  </>
);

export default Layout;
