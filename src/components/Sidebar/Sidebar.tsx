import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ISidebar } from '../../types/Sidebar/Sidebar';
import { useDispatch } from 'react-redux';

const statusColor = (status: string) => {
  switch (status) {
    case 'Activated':
      return 'text-PrimaryPurple';
    case 'Completed':
      return 'text-green-800';
    case 'In Progress':
      return 'text-orange-400';
    case 'Not Started':
      return 'text-red-500';
    default:
      return 'text-PrimaryPurple';
  }
};
const navBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#5400CF', 
  padding: '10px',
};

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '10px',
  borderRadius: '5px',
  background: '#5400CF',
};
const countStyle = {
  marginLeft: '5px',
  padding: '2px 3px',
  color: 'red',
  fontSize: '16px',
  backgroundColor: 'white',
  border: '1px solid white',
  borderRadius: '50%',
};
const Sidebar = (props: ISidebar) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSubNav, setSubnav] = useState(false);
  return (
    <div>
      <div style={navBarStyle}>
        {props.options &&
          props.options.map((navigationOption) => {
            let isActivatedTab = false;
            const currentPath = props.activeTab?.replace('/', '');
            if (currentPath?.startsWith(navigationOption.value)) {
              isActivatedTab = true;
            }
            return (
              <div key={navigationOption.title}>
                <Link
                  style={navLinkStyle}
                  to={navigationOption.isAllow ? navigationOption.link : '#'}
                >
                  {/* <span
                    className={`icon inline-block ${
                      props.activeTab && isActivatedTab ? '' : ''
                    }  w-5 h-5
                       transition-all duration-300`}
                  >
                    <NavigationItemIconRender
                      componetName={navigationOption.iconDetails.icon}
                      props={navigationOption.iconDetails.props}
                    />
                  </span> */}
                  {<span>{navigationOption.title}</span>}
                  {navigationOption.subNavigationOptions &&
                    navigationOption.subNavigationOptions.length > 0 && (
                      <span
                        onClick={() => {
                          setSubnav((prev) => !prev);
                        }}
                      >
                        {/* <BackArrow
                          className={`w-full h-full  ${openSubNav ? 'rotate-90' : '-rotate-90'}`}
                        /> */}
                      </span>
                    )}
                </Link>
                {navigationOption.subNavigationOptions &&
                  navigationOption.subNavigationOptions.length > 0 &&
                  openSubNav && (
                    <div>
                      <ul>
                        {navigationOption.subNavigationOptions &&
                          navigationOption.subNavigationOptions.map((subNav, index) => {
                            let isActivatedTab = false;
                            const currentPath = props.activeTab?.replace('/', '');
                            if (currentPath?.startsWith(subNav.value)) {
                              isActivatedTab = true;
                            }
                            return (
                              <Link to={subNav.link}>
                                <li>
                                  <p>
                                    <span>Step {index + 1}: </span>
                                    <span>{subNav.title}</span>
                                  </p>
                                  <span>{subNav.status}</span>
                                </li>
                              </Link>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                {navigationOption.count !== undefined && navigationOption.count > 0 && (
                  <span style={countStyle}>{navigationOption.count}</span>
                )}
              </div>
            );
          })}

        <div
          style={navLinkStyle}
          onClick={
            props.processLogOff !== undefined && props.processLogOff === false
              ? props?.logOffHandler
              : () => {
                  return null;
                }
          }
        >
          <span
            // style={navLinkStyle}
            onClick={() => {
              navigate('/auth/login');
            }}
          >
            Log off
          </span>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;
