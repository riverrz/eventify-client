import styled from "styled-components";
import Icon from 'react-icons-kit';

const SideDrawer = ({ className, tabs, selectedTab, setSelectedTab }) => {
  return (
    <aside className={className}>
      <ul className="list">
        {tabs.map(({ title, icon }) => (
          <li
            key={title}
            onClick={() => setSelectedTab(title)}
            className={`list-item ${
              selectedTab === title ? "list-item-active" : ""
            }`}
          >
            <Icon size={25} icon={icon} /> {title}
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
      padding: 1rem;
      margin: 2rem 0;
      font-size: 1.2rem;
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
