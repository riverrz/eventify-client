import ContentfulEngine from "./ContentfulEngine";

function EventEngine({ event, endEvent }) {
  const { type } = event;
  if (type === "Contentful") {
    return <ContentfulEngine event={event} endEvent={endEvent} />;
  }
}

export default EventEngine;
