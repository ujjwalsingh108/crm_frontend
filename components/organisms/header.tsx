import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  styled,
} from "@mui/material";

// Import Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Types for props
interface HeaderProps {
  onMenuClick: () => void;
  currentUser?: {
    name?: string;
    avatar?: string;
  };
}

// Create a styled component for the logo
const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(2),
  "& svg": {
    marginRight: theme.spacing(1),
  },
}));

// Navigation items
const navItems = [
  { label: "Home", href: "/home" },
  { label: "Leads", href: "/leads" },
  { label: "Contacts", href: "/contacts" },
  { label: "Accounts", href: "/accounts" },
  { label: "Deals", href: "/deals" },
  { label: "Tasks", href: "/tasks" },
  { label: "Meetings", href: "/meetings" },
  { label: "Calls", href: "/calls" },
  { label: "Projects", href: "/projects" },
];

// Create the CRM Header component
const Header: React.FC<HeaderProps> = ({ onMenuClick, currentUser }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  // Handler for user menu
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  // Handler for more menu
  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{ backgroundColor: "white" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left section: Logo and navigation */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LogoContainer>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="#0066CC"
              />
              <path
                d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                fill="#0066CC"
              />
              <path
                d="M12 12C9.33 12 4 13.34 4 16V18H20V16C20 13.34 14.67 12 12 12Z"
                fill="#0066CC"
              />
            </svg>
            <Typography variant="h6" fontWeight="bold" color="primary">
              CRM
            </Typography>
          </LogoContainer>

          {/* Navigation links */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.slice(0, 8).map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: "text.primary",
                  mx: 0.5,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
                href={item.href}
              >
                {item.label}
              </Button>
            ))}
            <IconButton color="inherit" onClick={handleMoreMenuOpen}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={moreMenuAnchor}
              open={Boolean(moreMenuAnchor)}
              onClose={handleMoreMenuClose}
            >
              {navItems.slice(8).map((item) => (
                <MenuItem key={item.label} onClick={handleMoreMenuClose}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Right section: Actions and profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Upgrade button */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button variant="text" color="primary" size="small" sx={{ mr: 1 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="caption" display="block">
                  Free
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  UPGRADE
                </Typography>
              </Box>
            </Button>
          </Box>

          {/* Action icons */}
          <Tooltip title="Add new">
            <IconButton color="inherit">
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Search">
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Apps">
            <IconButton color="inherit">
              <AppsIcon />
            </IconButton>
          </Tooltip>

          {/* User profile */}
          <Tooltip title="Account">
            <IconButton
              onClick={handleUserMenuOpen}
              size="small"
              sx={{ ml: 1 }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#f5f5f5",
                  color: "#666",
                }}
                alt={currentUser?.name || "User"}
                src={currentUser?.avatar || ""}
              />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
