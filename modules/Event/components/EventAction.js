import { useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { pick, merge, compose, prop, includes } from "ramda";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { makeSelectParticipationTokens, makeSelectUser } from "modules/Auth/redux/selectors";
import * as authActions from "modules/Auth/redux/actions";
import * as eventActions from "modules/Event/redux/actions";
import theme from "theme";

const EventAction = ({
  event: { eventId, title, participants },
  participationTokens,
  fetchParticipationTokenRequest,
  pariticipateRequest,
  fetchTokenLoading,
  userId
}) => {
  // fetch token when component did mount
  useEffect(() => {
    fetchParticipationTokenRequest(eventId);
  }, []);

  // btn click handler
  const handleClick = useCallback(() => {
    const token = participationTokens[eventId];
    if (token) {
      pariticipateRequest({ token, title });
    }
  }, [participationTokens, eventId, title]);

  const hasParticipated = useMemo(() => {
    return includes(userId, participants)
  }, [participants]);

  const loading = fetchTokenLoading;
  return (
    <>
      {loading && (
        <Spinner
          type="TailSpin"
          color={theme.primaryGreen}
          height={50}
          width={50}
        />
      )}
      {!loading && (
        <Button onClick={handleClick} backgroundColor={theme.primaryGreen}>
          {hasParticipated ? "Join" : "Participate"}
        </Button>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  participationTokens: makeSelectParticipationTokens(),
  fetchTokenLoading: (state) => state.auth.fetchedToken.loading,
  userId: compose(prop("userId"), makeSelectUser())
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    merge(
      pick(["fetchParticipationTokenRequest"], authActions),
      pick(["pariticipateRequest"], eventActions)
    ),
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventAction);
