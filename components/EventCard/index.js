import styled from "styled-components";
import Icon from "react-icons-kit";
import { calendar } from "react-icons-kit/fa/calendar";
import Flex from "components/Flex";
import Link from "components/Link";
import config from 'config/env';

const EventCard = ({ className, event }) => {
  const { title, description, banner, startTimeStamp, endTimeStamp, eventId } = event;
  return (
    <Link href={`/event?id=${eventId}`}>
      <div className={className}>
        {banner && (
          <div className="img-container">
            <img src={`${config.cdnUrl}/${banner}`} alt="Event Banner" />
          </div>
        )}
        <div className="primary-container">
          <h3 className="title">{title}</h3>
          <p className="description truncate">{description}</p>
          <Flex justify="space-between">
            <div className="date-container">
              <div>
                <Icon size={25} icon={calendar} /> Start Date
              </div>
              <div className="date">{new Date(startTimeStamp).toDateString()}</div>
            </div>
            <div className="date-container">
              <div>
                <Icon size={25} icon={calendar} /> End Date
              </div>
              <div className="date">{new Date(endTimeStamp).toDateString()}</div>
            </div>
          </Flex>
        </div>
      </div>
    </Link>
  );
};

export default styled(EventCard)`
  color: ${({ theme }) => theme.primaryWhite};
  border-radius: 15px;
  .title {
    text-align: center;
    margin-top: 0;
  }
  .img-container {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .primary-container {
    background-color: ${({ theme }) => theme.primaryPink};
    padding: 5%;
    font-size: 1.1rem;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;
    :hover {
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
  }
  .date {
    margin: 10px 0;
  }
  .truncate {
    width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media only screen and (max-width: 1400px) {
    .truncate {
      width: 240px;
    }
  }
`;
