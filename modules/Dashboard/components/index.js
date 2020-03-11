import { useState } from "react";
import styled from "styled-components";
import { pencil } from "react-icons-kit/fa/pencil";
import { calendarPlusO } from "react-icons-kit/fa/calendarPlusO";
import { envelope } from "react-icons-kit/fa/envelope";
import Content from "components/Content";
import AllEvents from "./AllEvents";
import SideDrawer from "./SideDrawer";
import CreateEvent from "./CreateEvent";

const tabs = [
  { title: "All events", icon: calendarPlusO },
  { title: "Create an event", icon: pencil },
  { title: "Invites", icon: envelope }
];

const Dashboard = ({ className, allEvents }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  return (
    <main className={className}>
      <SideDrawer
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Content open={selectedTab === tabs[0].title}>
        <AllEvents events={allEvents} />
      </Content>
      <Content open={selectedTab === tabs[1].title}>
        <CreateEvent />
      </Content>
      <Content open={selectedTab === tabs[2].title}>
        <AllEvents events={allEvents} />
      </Content>
    </main>
  );
};
export default styled(Dashboard)`
  height: 100%;
  display: flex;
`;
