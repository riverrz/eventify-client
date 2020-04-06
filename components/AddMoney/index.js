import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { pick } from "ramda";
import * as actions from "modules/Auth/redux/actions";
import { makeSelectAuthLoading } from "modules/Auth/redux/selectors";
import Grid from "components/Grid";
import Button from "components/Button";
import Spinner from "components/Spinner";
import theme from "theme";

const data = [5, 10, 15, 20];

function AddMoney({ className, walletUpdateRequest, loading }) {
  const [topUp, setTopUp] = useState(null);
  const selectHandler = useCallback(
    (value) => {
      setTopUp(value);
    },
    [setTopUp]
  );
  return (
    <div className={className}>
      <Grid cols="auto-fit" className="grid">
        {data.map((value) => (
          <div
            key={value}
            className={`card ${value === topUp && "active"}`}
            onClick={() => selectHandler(value)}
          >
            {value} Coins
          </div>
        ))}
      </Grid>
      {!loading && (
        <Button onClick={() => topUp && walletUpdateRequest({ amt: topUp })}>
          Proceed
        </Button>
      )}
      {loading && <Spinner height={50} width={50} />}
    </div>
  );
}

const StyledAddMoney = styled(AddMoney)`
  padding: 2rem 5%;
  text-align: center;
  .grid {
    margin-bottom: 2rem;
  }
  .card {
    background-color: #eee;
    padding: 2% 5%;
    transition: all 0.3s;
    cursor: pointer;
    text-align: center;
  }
  .card:hover,
  .card.active {
    background-color: ${theme.primaryDark};
    color: #fff;
  }
`;

const mapStateToProps = createStructuredSelector({
  loading: makeSelectAuthLoading(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(pick(["walletUpdateRequest"], actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledAddMoney);
