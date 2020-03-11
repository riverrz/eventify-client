import styled from "styled-components";

const SideDrawer = ({ className, tabs, selectedTab, setSelectedTab }) => {
  return (
    <aside className={className}>
      <ul className="list">
        {tabs.map(name => (
          <li
            key={name}
            onClick={() => setSelectedTab(name)}
            className={`list-item ${
              selectedTab === name ? "list-item-active" : ""
            }`}
          >
            {name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default styled(SideDrawer)`
  width: 15%;
  min-width: 300px;
  height: 100%;
  background-color: ${({ theme }) => theme.secondaryDark};
  color: #fff;

  .list {
    padding: 2rem 0;
    .list-item {
      padding: 1rem 0;
      margin: 2rem 0;
      font-size: 1.2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
    }
    .list-item:hover,
    .list-item-active {
      background-color: ${({ theme }) => theme.secondaryWhite};
      color: #222;
    }
  }
`;
