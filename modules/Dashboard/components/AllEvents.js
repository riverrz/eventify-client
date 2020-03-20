import styled from "styled-components";
import { isEmpty } from "ramda";
import Grid from "components/Grid";
import EventCard from "components/EventCard";
import { camel2title } from "utils";

const AllEvents = ({ className, events }) => {
  return (
    <main className={className}>
      {Object.entries(events).map(([typeOfEvent, events]) => (
        <div className="event-container" key={typeOfEvent}>
          <h2>{camel2title(typeOfEvent)}</h2>
          {!isEmpty(events) ? (
            <Grid className="event-grid">
              {events.map(event => (
                <EventCard key={event._id} event={event} />
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

export default styled(AllEvents)`
  text-align: left;
  .event-container {
    margin: 0 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.primaryDark};
  }
  .empty-events-text {
    padding: 2rem;
  }
  .event-grid {
    padding: 2rem;
  }
`;
