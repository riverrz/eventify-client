import styled from "styled-components";
import { isEmpty } from "ramda";
import { envelope } from "react-icons-kit/fa/envelope";
import Icon from "react-icons-kit";
import { ResponsiveFlex } from "components/Flex";
import EventAction from "modules/Event/components/EventAction";
import config from "config/env";

const Event = ({ className, data, isLoggedIn }) => {
  if (isEmpty(data)) {
    return null;
  }
  const {
    title,
    description,
    banner,
    startTimeStamp,
    endTimeStamp,
    participationFees,
    creator: { username, email },
  } = data;
  return (
    <main className={className}>
      <h1 className="title">{title}</h1>
      {banner && (
        <div className="banner">
          <img src={`${config.cdnUrl}/${banner}`} alt="Event banner" />
        </div>
      )}
      <ResponsiveFlex justify="space-around">
        <section className="description">
          <h2>Description</h2>
          <p>{description}</p>
        </section>
        <section className="meta">
          <p className="participationFees">
            Participation Fees: <span>{participationFees} Coins</span>
          </p>
          <p className="start-date">Starts at: {new Date(startTimeStamp).toLocaleString()}</p>
          <p className="end-date">Ends at: {new Date(endTimeStamp).toLocaleString()}</p>
          <p className="creator">
            Creator: {username}
            <a href={`mailto:${email}`}>
              <Icon icon={envelope} size={15} />
            </a>
          </p>
          {isLoggedIn && <EventAction event={data} />}
        </section>
      </ResponsiveFlex>
    </main>
  );
};

export default styled(Event)`
  padding: 4%;
  .title {
    text-align: center;
  }
  .banner {
    margin: 2rem -4%;
    height: 70vh;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .creator {
    a {
      margin-left: 10px;
    }
  }
  .meta {
    border-top: 1px solid #222;
    padding-top: 2rem;
  }
  .participationFees span{
    background-color: yellow;
    padding: 5px;
  }
  @media only screen and (min-width: 768px) {
    .meta {
      border: none;
      padding: 0;
      border-left: 1px solid #222;
      padding-left: 2rem;
    }
  }
`;
