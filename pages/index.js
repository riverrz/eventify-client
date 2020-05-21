import styled from "styled-components";
import Flex from "components/Flex";
import { Icon } from "react-icons-kit";
import { calendar } from "react-icons-kit/fa/calendar";
import { plus } from "react-icons-kit/fa/plus";
import { user } from "react-icons-kit/fa/user";

const Index = ({ className }) => {
  return (
    <main className={className}>
      <h2>Welcome to Eventify!</h2>
      <Flex justify="space-evenly" className="container">
        <div className="tile">
          <Icon className="icon" icon={plus} size={30} />
          <h2>Create!</h2>
          <p>
            Create events for free and manage who gets to participate in them!
          </p>
        </div>
        <div className="tile">
          <Icon className="icon" icon={calendar} size={30} />
          <h2>Events!</h2>
          <p>
            Eventify allows you to create either Generic or Contentful events!
          </p>
        </div>
        <div className="tile">
          <Icon className="icon" icon={user} size={30} />
          <h2>Participate!</h2>
          <p>Participate in invited events</p>
        </div>
      </Flex>
    </main>
  );
};

export default styled(Index)`
  color: #222;
  text-align: center;
  .container {
    margin: 2rem 0;
  }
  .tile {
    flex: 1;
    background-color: dodgerblue;
    padding: 1rem;
    margin: 1rem;
    min-height: 15rem;
    color: #fff;
  }
`;
