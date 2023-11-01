
import React, { useState } from 'react';
import axios from 'axios';
import { Container, CssBaseline, ThemeProvider, createTheme, Grid } from '@mui/material';
import TaskCommandDropdown from './TaskCommandDropdown';
import LogTable from './LogTable';
import EventChart from './EventChart';

const theme = createTheme();

function App() {
  const [logs, setLogs] = useState([]);

  const handleTaskCommandSelect = async (taskCommand) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/log-events/?task_command=${taskCommand}`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching log events', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        <h1>Log Dashboard</h1>
        <TaskCommandDropdown onSelect={handleTaskCommandSelect} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LogTable data={logs} />
          </Grid>
          <Grid item xs={12}>
            <EventChart data={logs} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
