// import React, { useState } from 'react';
// import axios from 'axios';
// import { CssBaseline, ThemeProvider, createTheme, Grid } from '@mui/material';
// import Sidebar from './Sidebar';
// import LogTable from './LogTable';
// import EventChart from './EventChart';

// const theme = createTheme();

// function App() {
//   const [logs, setLogs] = useState([]);
//   const [view, setView] = useState('table');

//   const handleTaskCommandSelect = async (taskCommand) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/log-events/?task_command=${taskCommand}`);
//       setLogs(response.data);
//     } catch (error) {
//       console.error('Error fetching log events', error);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Sidebar
//         onSelect={handleTaskCommandSelect}
//         onViewLogs={() => setView('table')}
//         onViewCharts={() => setView('chart')}
//       />
//       <Grid container spacing={3} sx={{ flexGrow: 1, pl: 30 }}>
//         <Grid item xs={12}>
//           <h1>Log Dashboard</h1>
//           {view === 'table' && <LogTable data={logs} />}
//           {view === 'chart' && <EventChart data={logs} />}
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }

// export default App;





import React, { useState } from 'react';
import axios from 'axios';
import { Container, CssBaseline, ThemeProvider, createTheme, Grid, AppBar, Toolbar, Typography } from '@mui/material';
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Log Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <TaskCommandDropdown onSelect={handleTaskCommandSelect} />
          </Grid>
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
