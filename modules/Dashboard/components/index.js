import styled from "styled-components";
import { useState } from "react";
import Content from "components/Content";
import AllEvents from "./AllEvents";
import SideDrawer from "./SideDrawer";
import CreateEvent from "./CreateEvent";

const tabs = ["All events", "Create an event", "Invites"];

const Dashboard = ({ className, allEvents }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <main className={className}>
      <SideDrawer
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Content open={selectedTab === tabs[0]}>
        <AllEvents events={allEvents} />
      </Content>
      <Content open={selectedTab === tabs[1]}>
        <CreateEvent />
      </Content>
      <Content open={selectedTab === tabs[2]}>
        <AllEvents events={allEvents} />
      </Content>
    </main>
  );
};
export default styled(Dashboard)`
  height: 100%;
  display: flex;
`;
