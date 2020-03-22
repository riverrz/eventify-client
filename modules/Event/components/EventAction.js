import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { pick } from "ramda";
import Button from "components/Button";
import {
  makeSelectUser,
  makeSelectParticipationTokens
} from "modules/Auth/redux/selectors";
import * as authActions from "modules/Auth/redux/actions";
import theme from "theme";

const EventAction = ({ event, user, participationTokens }) => {
  return <Button backgroundColor={theme.primaryGreen}>Pariticipate</Button>;
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  participationTokens: makeSelectParticipationTokens()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(pick(["fetchTokenSuccess"], authActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventAction);
