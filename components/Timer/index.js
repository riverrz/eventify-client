import { connect } from "react-redux";
import styled from "styled-components";
import { createStructuredSelector } from "reselect";
import { makeSelectDuration } from "modules/LiveEvent/redux/selectors";
import Flex from "components/Flex";
import convertMS from "utils/convertMS";

function Timer({ className, duration }) {
  const { days, hours, minutes, seconds } = convertMS(duration);
  return (
    <Flex className={className}>
      <div className="container">
        <span className="title">Days</span>
        <div className="days">{days}</div>
      </div>
      <span className="seperator">:</span>
      <div className="container">
        <span className="title">Hours</span>
        <div className="hours">{hours}</div>
      </div>
      <span className="seperator">:</span>
      <div className="container">
        <span className="title">Minutes</span>
        <div className="minutes">{minutes}</div>
      </div>
      <span className="seperator">:</span>
      <div className="container">
        <span className="title">Seconds</span>
        <div className="seconds">{seconds}</div>
      </div>
    </Flex>
  );
}

const StyledTimer = styled(Timer)`
  .container div {
    border: 1px solid #eee;
    padding: 5px;
    border-radius: 2px;
    font-size: 1.3rem;
    text-align: center;
  }
  .container .title {
    font-weight: bold;
    font-size: 0.8rem;
  }
  .seperator {
    margin: 0 5px;
    display: flex;
    align-items: center;
    padding-top: 0.8rem;
  }
`;

const mapStateToProps = createStructuredSelector({
  duration: makeSelectDuration(),
});

export default connect(mapStateToProps)(StyledTimer);
