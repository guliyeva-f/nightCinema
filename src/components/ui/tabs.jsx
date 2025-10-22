import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeIcon from '@mui/icons-material/Badge';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    color: "#e3b3b3",
    minWidth: 60,
    padding: "0px_10px",
    textTransform: "none",
  },
  "& .Mui-selected": {
    color: "#fff",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTab-iconWrapper": {
    fontSize: "24px",       
  },
  "& .MuiTab-label": {
    fontSize: "16px",   
    backgroundColor: "#333",
  },
});

export default function IconLabelTabs() {
  const location = useLocation();

  const currentPath = location.pathname;
  const value =
    currentPath.includes("moviesTickets")
      ? 0
      : currentPath.includes("settingsAccount")
      ? 1
      : currentPath.includes("badgeRewards")
      ? 2
      : false;

  return (
    <CustomTabs
      value={value}
      aria-label="icon label tabs example"
      centered
    >
      <Tab
        icon={<MovieFilterIcon />}
        label="Movie"
        component={Link}
        to="/profile/moviesTickets"
      />
      <Tab
        icon={<VerifiedUserIcon />}
        label="Security"
        component={Link}
        to="/profile/settingsAccount"
      />
      <Tab
        icon={<BadgeIcon />}
        label="Badge"
        component={Link}
        to="/profile/badgeRewards"
      />
    </CustomTabs>
  );
}
