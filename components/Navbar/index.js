import { Fragment, useCallback } from "react";
import Link from "components/Link";
import styled from "styled-components";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";
import { pick } from "ramda";
import { connect } from "react-redux";
import {
  makeSelectLoggedIn,
  makeSelectBalance,
  makeSelectAuthLoading,
  makeSelectUser,
} from "modules/Auth/redux/selectors";
import * as actions from "modules/Auth/redux/actions";
import * as globalActions from "modules/Global/redux/actions";
import AddMoney from "components/AddMoney";
import Spinner from "components/Spinner";
import Flex from "components/Flex";

const Navbar = ({
  className,
  isLoggedIn,
  logoutSuccess,
  balance,
  openModal,
  authLoading,
  user: { username },
}) => {
  const addMoney = useCallback(
    () =>
      openModal({
        content: <AddMoney />,
        title: "Top-up your balance",
      }),
    [AddMoney, openModal]
  );
  return (
    <Nav className={className}>
      <h2 className="title">Eventify</h2>
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
          <Fragment>
            <Link href="/dashboard">
              <NavItem>
                <a>Dashboard</a>
              </NavItem>
            </Link>
            <Link href="/">
              <NavItem onClick={() => logoutSuccess()}>
                <a>Log out</a>
              </NavItem>
            </Link>
          </Fragment>
        )}
      </ul>
      {isLoggedIn && (
        <Flex>
          <h4>Username: {username}</h4>
          <div onClick={addMoney} style={{ cursor: "pointer" }}>
            <h4 className="balance">
              Balance:{" "}
              {authLoading ? (
                <Spinner
                  style={{ dispatch: "inline-block" }}
                  height={20}
                  width={20}
                />
              ) : (
                `${balance} Coins`
              )}
            </h4>
          </div>
        </Flex>
      )}
    </Nav>
  );
};

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
    margin-right: auto;
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .title {
    display: inline-block;
    padding-left: 10%;
  }
  .balance {
    margin-left: 1rem;
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
  isLoggedIn: makeSelectLoggedIn(),
  balance: makeSelectBalance(),
  authLoading: makeSelectAuthLoading(),
  user: makeSelectUser(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...pick(["logoutSuccess"], actions),
      ...pick(["openModal"], globalActions),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StyledNavbar);
