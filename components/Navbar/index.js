import Link from "components/Link";
import styled from "styled-components";

const Navbar = ({ className }) => (
  <Nav className={className}>
    <ul className="nav-list">
      <Link activeClassName="nav-active" href="/">
        <NavItem>
          <a>Home</a>
        </NavItem>
      </Link>
      <Link activeClassName="nav-active" href="/join?type=register">
        <NavItem>
          <a>Join us</a>
        </NavItem>
      </Link>
    </ul>
    <h2 className="title">Eventify</h2>
  </Nav>
);

const Nav = styled.nav`
  color: #111;
`;

const NavItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  color: #8a8a8a;
  :hover,
  .active {
    border-bottom: 1px solid #333;
    color: #222;
  }
`;

export default styled(Navbar)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  .nav-list {
    flex: 0 0 30%;
    margin: 0;
    padding-left: 10%;
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
  .title {
    flex: 1;
    margin: 0;
    padding-left: 15%;
    text-align: center;
  }
  a {
    text-decoration: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    text-transform: uppercase;
  }
  @media only screen and (max-width: 768px) {
    .title {
      display: none;
    }
    .nav-list {
      padding: 0;
    }
  }
`;