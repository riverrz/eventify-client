import { useEffect } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { createStructuredSelector } from "reselect";
import Dashboard from "modules/Dashboard/components";
import { makeSelectLoggedIn } from "modules/Auth/redux/selectors";
import { makeSelectAllEvents } from "modules/Dashboard/redux/selectors";

const DashboardPage = ({ isLoggedIn, allEvents }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/");
    }
  }, []);
  if (!isLoggedIn) {
    return null;
  }
  return <Dashboard allEvents={allEvents} />;
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn(),
  allEvents: makeSelectAllEvents()
});

export default connect(mapStateToProps)(DashboardPage);
