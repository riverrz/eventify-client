import { connect } from "react-redux";
import { path, ifElse, includes, __, identity, always, pick } from "ramda";
import { bindActionCreators } from "redux";
import Auth from "modules/Auth/components";
import * as actions from 'modules/Auth/redux/actions';

const AuthPage = props => {
  const { router, signUpRequest } = props;
  const type = ifElse(
    includes(__, ["register", "login"]),
    identity,
    always("register")
  )(path(["query", "type"], router));

  return <Auth type={type} signUpRequest={signUpRequest} />;
};

const mapDispatchToProps = dispatch => bindActionCreators(pick(['signUpRequest'], actions), dispatch);

export default connect(null, mapDispatchToProps)(AuthPage);
