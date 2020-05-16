import Checkbox from "components/Checkbox";
import Radio from "components/Radio";

export default ({ type, choices = [] }) =>
  choices.map((choice, index) => {
    if (type === "Single Choice") {
      return <Radio name="answer" value={choice} key={index} />;
    } else {
      return <Checkbox name="answer" value={choice} key={index} />;
    }
  });
