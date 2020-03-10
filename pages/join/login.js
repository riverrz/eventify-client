import { connect } from "react-redux";
import cogoToast from "cogo-toast";
import { path, pick } from "ramda";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";
import Auth from "modules/Auth/components";
import * as actions from "modules/Auth/redux/actions";
import { makeSelectLoggedIn } from "modules/Auth/redux/selectors";

const AuthPage = ({ router, signUpRequest, isLoggedIn, loading }) => {
  if (isLoggedIn) {
    cogoToast.success("You have successfully logged in");
    router.push("/");
    return null;
  }
  return <Auth type="login" signUpRequest={signUpRequest} loading={loading} />;
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn(),
  loading: path(["auth", "loading"])
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(pick(["signUpRequest"], actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
