import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import TaskCommandDropdown from './TaskCommandDropdown';

const drawerWidth = 240;

const Sidebar = ({ onSelect, onViewLogs, onViewCharts }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem>
          <TaskCommandDropdown onSelect={onSelect} />
        </ListItem>
        <Divider />
        <ListItem button onClick={onViewLogs}>
          <ListItemText primary="View Logs Table" />
        </ListItem>
        <ListItem button onClick={onViewCharts}>
          <ListItemText primary="View Charts" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
