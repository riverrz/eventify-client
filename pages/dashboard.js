import { useEffect } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { createStructuredSelector } from "reselect";
import Dashboard from "modules/Dashboard/components";
import { makeSelectLoggedIn } from "modules/Auth/redux/selectors";

const DashboardPage = ({ isLoggedIn }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/");
    }
  }, []);
  if (!isLoggedIn) {
    return null;
  }
  return <Dashboard />;
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn()
});

export default connect(mapStateToProps)(DashboardPage);
