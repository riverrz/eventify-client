import { useState, useCallback } from "react";
import styled from "styled-components";
import Grid from "components/Grid";
import Button from "components/Button";
import theme from "theme";

const data = [5, 10, 15, 20];

function AddMoney({ className }) {
  const [topUp, setTopUp] = useState(null);
  const selectHandler = useCallback(
    (value) => {
      setTopUp(value);
    },
    [setTopUp]
  );
  return (
    <div className={className}>
      <Grid cols={4} className="grid">
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
      <Button>Proceed</Button>
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

export default StyledAddMoney;
