import styled from "styled-components";
import { useState, useCallback } from "react";
import { reject, equals } from "ramda";
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
  modulesLoading,
  modules,
  back,
}) {
  if (!open) {
    return null;
  }
  const [selectedModules, setSelectedModules] = useState([]);
  const [genericEvent, setGenericEvent] = useState(false);

  const handleSubmit = useCallback(() => {
    submitHandler({ modules: selectedModules });
    next();
  }, [selectedModules, setSelectedModules]);

  const handleModuleSelection = useCallback(
    (value) => {
      let newSelectedModules = [];
      if (selectedModules.includes(value)) {
        newSelectedModules = reject(equals(value), selectedModules);
      } else {
        newSelectedModules = newSelectedModules.concat(value);
      }
      setSelectedModules(newSelectedModules);
    },
    [selectedModules, setSelectedModules]
  );

  return (
    <div className={className}>
      {(
        <Grid className="grid">
          {types.map((type) => {
            return (
              <Card
                key={type}
                active={selectedModules.includes(moduleId)}
                disabled={genericEvent}
                onClick={() => !genericEvent && handleModuleSelection(moduleId)}
              >
                {name}
              </Card>
            );
          })}
        </Grid>
      )}
      <p>
        <input
          type="checkbox"
          name="isGeneric"
          id="generic"
          onChange={() => {
            setGenericEvent(!genericEvent);
            setSelectedModules([]);
          }}
        />
        <label htmlFor="generic">Create it as a generic event instead</label>
      </p>
      <Button
        className="btn"
        backgroundColor={theme.primaryDark}
        onClick={back}
      >
        Back
      </Button>
      <Button className="btn" onClick={handleSubmit}>
        Submit
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

  p input {
    vertical-align: middle;
  }
  p label {
    vertical-align: middle;
  }
  .btn {
    margin: 20px;
  }
`;
