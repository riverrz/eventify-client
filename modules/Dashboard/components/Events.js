import styled from "styled-components";
import { isEmpty } from "ramda";
import Grid from "components/Grid";
import EventCard from "components/EventCard";
import { camel2title } from "utils";

const Events = ({ className, data }) => {
  return (
    <main className={className}>
      {Object.entries(data).map(([typeOfEvent, events]) => (
        <div className="event-container" key={typeOfEvent}>
          <h2>{camel2title(typeOfEvent)}</h2>
          {!isEmpty(events) ? (
            <Grid className="event-grid">
              {events.map(event => (
                <EventCard key={event.eventId} event={event} />
              ))}
            </Grid>
          ) : (
            <p className="empty-events-text">Wow so empty here ....</p>
          )}
        </div>
      ))}
    </main>
  );
};

export default styled(Events)`
  text-align: left;
  .event-container:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.primaryDark};
  }
  .empty-events-text {
    padding: 2rem;
  }
  .event-grid {
    padding: 2rem;
  }
  .event-container {
    h2 {
      text-align: center;
    }
  }
  @media only screen and (min-width: 768px) {
    .event-container {
      margin: 0 2rem;
    }
  }
`;
