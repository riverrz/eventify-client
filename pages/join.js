import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";

const Auth = props => {
  const { router } = props;
  return <div>Join us</div>;
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
