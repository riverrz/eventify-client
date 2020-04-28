import ContentfulEngine from "./ContentfulEngine";

function EventEngine({ event, endEvent, blob }) {
  const { type } = event;
  if (type === "Contentful") {
    return (
      <ContentfulEngine
        event={event}
        endEvent={endEvent}
        blob={blob}
        totalQuestions={blob ? Object.keys(blob).length : 0}
      />
    );
  }
}

export default EventEngine;
