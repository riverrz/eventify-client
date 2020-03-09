import { useEffect } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { createStructuredSelector } from "reselect";
import { pick } from "ramda";
import { bindActionCreators } from "redux";
import Dashboard from "modules/Dashboard/components";
import {
  makeSelectEvents,
  makeSelectLoggedIn
} from "modules/Auth/redux/selectors";
import * as actions from "modules/Dashboard/redux/actions";

const DashboardPage = ({ events, isLoggedIn }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/");
    }
  }, []);
  if (!isLoggedIn) {
    return null;
  }
  return <Dashboard events={events} />;
};

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
  isLoggedIn: makeSelectLoggedIn()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(pick([], actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
