import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import Flex from "components/Flex";

export default ({ type, choices = [] }) => (
  <Flex direction="column">
    {choices.map((choice, index) => {
      if (type === "Single Choice") {
        return (
          <div key={index} style={{ margin: "0.5rem" }}>
            <Radio name="answer" value={choice} />
          </div>
        );
      } else {
        return (
          <div key={index} style={{ margin: "0.5rem" }}>
            <Checkbox name="answer" value={choice} />
          </div>
        );
      }
    })}
  </Flex>
);
