import styled from "styled-components";
import Icon from 'react-icons-kit';

const SideDrawer = ({ className, tabs, selectedTab, setSelectedTab }) => {
  return (
    <aside className={className}>
      <ul className="list">
        {tabs.map(({ title, icon, query }) => (
          <li
            key={title}
            onClick={() => setSelectedTab(query)}
            className={`list-item ${
              selectedTab === query ? "list-item-active" : ""
            }`}
          >
            <Icon className="icon" size={25} icon={icon} /> 
            <span className="title">{title}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default styled(SideDrawer)`
  height: 100vh;
  background-color: ${({ theme }) => theme.secondaryDark};
  color: #fff;
  position: fixed;
  top:0;
  left: 0;
  transition: width ease-in-out 0.3s;
  width: 4rem;
  .list {
    padding: 2rem 0;
    display: flex;
    flex-flow: column nowrap;
    margin-top: 5rem;
    .list-item {
      padding: 1rem;
      margin: 1.5rem 0;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: nowrap;
    }
    .list-item:hover,
    .list-item-active {
      background-color: ${({ theme }) => theme.secondaryWhite};
      color: #222;
    }
  }
  .title {
    display: none;
    white-space: nowrap;
    overflow: hidden;

  }
  @media only screen and (min-width: 901px) {
    :hover {
      width: 15rem;
      .title {
        display: initial;
      }
      .icon {
        margin-right: 15px;
      }
    }
  }

  @media only screen and (max-width: 900px) {
    top: initial;
    bottom: 0;
    height: 4rem;
    width: 100vw;
    .list {
      margin: 0;
      padding: 0;
      height: 100%;
      flex-flow: row nowrap;
      justify-content: space-evenly;
      .list-item {
        margin: 0;
      }
    }
  }
`;
