import { useState, useEffect } from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { pick } from "ramda";
import * as actions from "modules/LiveEvent/redux/actions";
import { makeSelectDataBlob } from "modules/LiveEvent/redux/selectors";
import Instructions from "./Instructions";
import EventEngine from "./EventEngine";

function LiveEvent({
  className,
  event,
  startEvent,
  endEvent,
  blob,
  abandonEvent,
}) {
  const [start, setStart] = useState(event.type !== "Contentful");
  useEffect(() => {
    if (start) {
      startEvent({ eventId: event.eventId, type: event.type });
    }
  }, [start]);
  if (!start) {
    return <Instructions event={event} startHandler={() => setStart(true)} />;
  }
  return (
    <EventEngine
      event={event}
      endEvent={endEvent}
      abandonEvent={abandonEvent}
      blob={blob}
    />
  );
}

const StyledLiveEvent = styled(LiveEvent)``;

const mapStateToProps = createStructuredSelector({
  blob: makeSelectDataBlob(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    pick(["startEvent", "endEvent", "abandonEvent"], actions),
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StyledLiveEvent);
