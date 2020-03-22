import Loader from "react-loader-spinner";

const defaultProps = {
  type: "Watch",
  color: "#00BFFF",
  height: 100,
  width: 100
};

export default props => <Loader {...defaultProps} {...props} />;
