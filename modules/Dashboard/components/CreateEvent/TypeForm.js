import styled from "styled-components";
import { useState, useCallback } from "react";
import Grid from "components/Grid";
import Button from "components/Button";
import Card from "components/Card";
import theme from "theme";

const types = ["Websocket Based", "Generic", "Contentful"];

function ModuleForm({
  submitHandler,
  open,
  next,
  className,
  back,
  initalType = null,
  createEvent,
}) {
  if (!open) {
    return null;
  }
  const [selectedType, setSelectedType] = useState(initalType);

  const handleSubmit = useCallback(() => {
    submitHandler({ type: selectedType });
    if (selectedType === "Generic") {
      createEvent();
    } else {
      next();
    }
  }, [selectedType, submitHandler]);

  return (
    <div className={className}>
      {
        <Grid cols="auto-fit" className="grid">
          {types.map((type) => {
            return (
              <Card
                key={type}
                active={selectedType === type}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Card>
            );
          })}
        </Grid>
      }
      <Button
        className="btn"
        backgroundColor={theme.primaryDark}
        onClick={back}
      >
        Back
      </Button>
      <Button className="btn" onClick={handleSubmit}>
        {selectedType === "Generic" ? "Submit" : "Next"}
      </Button>
    </div>
  );
}

export default styled(ModuleForm)`
  padding: 2rem 5%;
  text-align: center;
  .grid {
    margin-bottom: 2rem;
  }
  .btn {
    margin: 20px;
  }
`;
