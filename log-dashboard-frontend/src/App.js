import React, { useState } from 'react';
import axios from 'axios';
import { Container, CssBaseline, ThemeProvider, createTheme, Grid, Toolbar, Typography } from '@mui/material';
import TaskCommandDropdown from './TaskCommandDropdown';
import LogTable from './LogTable';
import EventChart from './EventChart';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
const drawerWidth = 240;


const theme = createTheme();
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {
  const [logs, setLogs] = useState([]);
  const [view, setView] = useState(0);
  const handleTaskCommandSelect = async (taskCommand) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/log-events/?task_command=${taskCommand}`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching log events', error);
    }
  }
  const changeView = (num) => {
    setView(num);
  }
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Log Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem disablePadding>
                <ListItemText>
                  <TaskCommandDropdown onSelect={handleTaskCommandSelect} />
                  </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => changeView(0)}>
                <ListItemText primary="View Logs" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => changeView(1)}> 
                <ListItemText primary="View Charts" />
              </ListItemButton>
            </ListItem>
        </List>
       </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container component="main" maxWidth="lg">
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} style={{"display":view ==0?"":"none"}} >
            <LogTable data={logs} />
          </Grid>
          <Grid item xs={12} style={{"display":view ==1?"":"none"}}>
            <EventChart data={logs} />
          </Grid>
        </Grid>
      </Container>
        </Main>
    </Box>
    </ThemeProvider>
  );
}

export default App;
