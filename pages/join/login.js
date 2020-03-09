import { connect } from "react-redux";
import cogoToast from "cogo-toast";
import { path, ifElse, includes, __, identity, always, pick } from "ramda";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";
import Auth from "modules/Auth/components";
import * as actions from "modules/Auth/redux/actions";
import { makeSelectLoggedIn } from "modules/Auth/redux/selectors";

const AuthPage = ({ router, signUpRequest, isLoggedIn }) => {
  if (isLoggedIn) {
    cogoToast.success("You have successfully logged in");
    router.push("/");
    return null;
  }
  return <Auth type="login" signUpRequest={signUpRequest} />;
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(pick(["signUpRequest"], actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
