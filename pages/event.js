import { connect } from "react-redux";
import { prop, evolve } from "ramda";
import { createStructuredSelector } from "reselect";
import { makeSelectLoggedIn } from "modules/Auth/redux/selectors";
import Event from "modules/Event/components";
import config from "config/env";

const DashboardPage = ({ isLoggedIn, event }) => {
  return <Event data={event} isLoggedIn={isLoggedIn} />;
};

DashboardPage.getInitialProps = async ({ ctx: { query } }) => {
  try {
    const eventId = prop("id", query);
    const event = await fetch(`${config.apiUrl}/event/${eventId}`).then((res) =>
      res.json()
    );
    return { event };
  } catch (error) {
    console.log(error);
  }
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn(),
});

export default connect(mapStateToProps)(DashboardPage);
