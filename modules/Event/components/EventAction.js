import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { pick } from "ramda";
import cogoToast from "cogo-toast";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { makeSelectParticipationTokens } from "modules/Auth/redux/selectors";
import * as authActions from "modules/Auth/redux/actions";
import theme from "theme";
import request from "lib/request";
import config from "config/env";

const EventAction = ({
  event: { eventId },
  participationTokens,
  fetchTokenSuccess
}) => {
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    fetchToken();
  }, []);
  return (
    <Button backgroundColor={theme.primaryGreen}>
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
  bindActionCreators(pick(["fetchTokenSuccess"], authActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventAction);
