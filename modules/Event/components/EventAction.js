import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { pick, merge } from "ramda";
import cogoToast from "cogo-toast";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { makeSelectParticipationTokens } from "modules/Auth/redux/selectors";
import * as authActions from "modules/Auth/redux/actions";
import * as eventActions from "modules/Event/redux/actions";
import theme from "theme";
import request from "lib/request";
import config from "config/env";

const EventAction = ({
  event: { eventId, title },
  participationTokens,
  fetchTokenSuccess,
  pariticipateRequest
}) => {
  const [loading, setLoading] = useState(false);

  // fetch token logic
  const fetchToken = useCallback(async () => {
    try {
      if (!participationTokens[eventId]) {
        setLoading(true);
        const token = await request(
          `${config.apiUrl}/token?eventId=${eventId}`
        );
        setLoading(false);
        fetchTokenSuccess(token);
      }
    } catch (error) {
      cogoToast.error(
        "Some error occurred while fetching the participation token. Please try again later!"
      );
      setLoading(false);
    }
  }, [eventId, participationTokens]);

  // fetch token when component did mount
  useEffect(() => {
    fetchToken();
  }, []);

  // btn click handler
  const handleClick = useCallback(() => {
    const token = participationTokens[eventId];
    if (token) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      pariticipateRequest({ token, title });
    }
  }, [participationTokens, eventId, title]);
  return (
    <Button onClick={handleClick} backgroundColor={theme.primaryGreen}>
      {loading ? (
        <Spinner type="TailSpin" color="#fff" height={20} width={20} />
      ) : (
        "Participate"
      )}
    </Button>
  );
};

const mapStateToProps = createStructuredSelector({
  participationTokens: makeSelectParticipationTokens()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    merge(
      pick(["fetchTokenSuccess"], authActions),
      pick(["pariticipateRequest"], eventActions)
    ),
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventAction);
