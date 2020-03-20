import { useState } from "react";
import { withRouter } from "next/router";
import styled from "styled-components";
import { pencil } from "react-icons-kit/fa/pencil";
import { calendarPlusO } from "react-icons-kit/fa/calendarPlusO";
import { envelope } from "react-icons-kit/fa/envelope";
import Content from "components/Content";
import AllEvents from "./AllEvents";
import SideDrawer from "./SideDrawer";
import CreateEvent from "./CreateEvent";
import { pathOr } from "ramda";

const tabs = [
  { title: "All events", icon: calendarPlusO, query: "all" },
  { title: "Create an event", icon: pencil, query: "create" },
  { title: "Invites", icon: envelope, query: "invites" }
];

const Dashboard = ({ className, allEvents, router }) => {
  const tab = pathOr(tabs[0].query, ["query", "tab"], router);
  const [selectedTab, setSelectedTab] = useState(tab);
  const handleSelection = query => {
    setSelectedTab(query);
    router.push(`/dashboard?tab=${query}`);
  };
  return (
    <main className={className}>
      <SideDrawer
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={handleSelection}
      />
      <Content open={selectedTab === tabs[0].query}>
        <AllEvents events={allEvents} />
      </Content>
      <Content open={selectedTab === tabs[1].query}>
        <CreateEvent />
      </Content>
      <Content open={selectedTab === tabs[2].query}>
        <AllEvents events={allEvents} />
      </Content>
    </main>
  );
};
const StyledDashboard = styled(Dashboard)`
  height: 100%;
  display: flex;
`;

export default withRouter(StyledDashboard);
