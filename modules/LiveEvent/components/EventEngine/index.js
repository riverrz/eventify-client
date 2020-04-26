import ContentfulEngine from "./ContentfulEngine";

function EventEngine({ event, endEvent, blob }) {
  const { type } = event;
  if (type === "Contentful") {
    return <ContentfulEngine event={event} endEvent={endEvent} blob={blob} />;
  }
}

export default EventEngine;
