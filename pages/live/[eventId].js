import { connect } from "react-redux";
import { prop, evolve } from "ramda";
import { createStructuredSelector } from "reselect";
import { makeSelectLoggedIn } from "modules/Auth/redux/selectors";
import LiveEvent from "modules/LiveEvent/components";
import config from "config/env";
import { useEffect } from "react";

const LiveEventPage = ({ isLoggedIn, event, router }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, []);
  if (!isLoggedIn) {
    return null;
  }
  return <LiveEvent event={event} />;
};

LiveEventPage.getInitialProps = async ({ ctx: { query } }) => {
  try {
    const eventId = prop("eventId", query);
    const event = await fetch(`${config.apiUrl}/event/${eventId}`).then((res) =>
      res.json()
    );
    return { event: evolveEvent(event) };
  } catch (error) {
    console.log(error);
  }
};

const transformations = {
  startTimeStamp: (date) => new Date(date).toLocaleString(),
  endTimeStamp: (date) => new Date(date).toLocaleString(),
};

const evolveEvent = evolve(transformations);

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn(),
});

export default connect(mapStateToProps)(LiveEventPage);
