import { useState, useEffect } from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { pick } from "ramda";
import * as actions from "modules/LiveEvent/redux/actions";
import Instructions from "./Instructions";
import EventEngine from "./EventEngine";

function LiveEvent({ className, event, startEvent, endEvent }) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (start) {
      startEvent(event.eventId);
    }
  }, [start]);
  if (!start) {
    return <Instructions event={event} startHandler={() => setStart(true)} />;
  }
  return <EventEngine event={event} endEvent={endEvent} />;
}

const StyledLiveEvent = styled(LiveEvent)``;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(pick(["startEvent", "endEvent"], actions), dispatch);

export default connect(null, mapDispatchToProps)(StyledLiveEvent);
