import Link from "components/Link";
import styled from "styled-components";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";
import { pick } from "ramda";
import { connect } from "react-redux";
import { makeSelectLoggedIn } from "modules/Auth/redux/selectors";
import * as actions from "modules/Auth/redux/actions";

const Navbar = ({ className, isLoggedIn, logoutSuccess }) => (
  <Nav className={className}>
    <ul className="nav-list">
      <Link activeClassName="nav-active" href="/">
        <NavItem>
          <a>Home</a>
        </NavItem>
      </Link>
      {!isLoggedIn && (
        <Link activeClassName="nav-active" href="/join/register">
          <NavItem>
            <a>Join us</a>
          </NavItem>
        </Link>
      )}
      {isLoggedIn && (
        <Link href="/dashboard">
          <NavItem>
            <a>Dashboard</a>
          </NavItem>
        </Link>
      )}
      {isLoggedIn && (
        <Link href="/">
          <NavItem onClick={() => logoutSuccess()}>
            <a>Log out</a>
          </NavItem>
        </Link>
      )}
    </ul>
    <h2 className="title">Eventify</h2>
  </Nav>
);

const Nav = styled.nav`
  color: ${({ theme }) => theme.primaryDark};
`;

const NavItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  :hover,
  .active {
    border-bottom: 1px solid ${({ theme }) => theme.primaryDark};
  }
`;

const StyledNavbar = styled(Navbar)`
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
      flex: 1;
    }
  }
`;

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(pick(["logoutSuccess"], actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledNavbar);
