import styled from "styled-components";
import { useState, useCallback } from "react";
import { reject, equals } from "ramda";
import Grid from "components/Grid";
import Button from "components/Button";
import theme from "theme";

function ModuleForm({
  submitHandler,
  open,
  next,
  className,
  modulesLoading,
  modules,
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
      {!modulesLoading && (
        <Grid cols="auto-fit" className="grid">
          {modules.map(({ name, moduleId }) => {
            const classes = ["card"];
            if (selectedModules.includes(moduleId)) {
              classes.push("active");
            }
            if (genericEvent) {
              classes.push("disabled");
            }

            return (
              <div
                key={moduleId}
                className={classes.join(" ")}
                onClick={() => !genericEvent && handleModuleSelection(moduleId)}
              >
                {name}
              </div>
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
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default styled(ModuleForm)`
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
  .card.disabled {
    cursor: not-allowed;
    background-color: #ddd;
    color: #bbb;
  }
  .card:not(.disabled):hover,
  .card.active {
    background-color: ${theme.primaryDark};
    color: #fff;
  }

  p input {
    vertical-align: middle;
  }
  p label {
    vertical-align: middle;
  }
`;
