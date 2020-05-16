import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import Flex from "components/Flex";

export default ({ type, choices = [] }) => (
  <Flex direction="column">
    {choices.map((choice, index) => {
      if (type === "Single Choice") {
        return (
          <div style={{ margin: "0.5rem" }}>
            <Radio name="answer" value={choice} key={index} />
          </div>
        );
      } else {
        return (
          <div style={{ margin: "0.5rem" }}>
            <Checkbox name="answer" value={choice} key={index} />
          </div>
        );
      }
    })}
  </Flex>
);
