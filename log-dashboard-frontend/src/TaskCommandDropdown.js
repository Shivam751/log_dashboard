// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TaskCommandDropdown = ({ onSelect }) => {
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/task-commands/')
//       .then(response => {
//         setOptions(response.data);
//       })
//       .catch(error => console.error('Error fetching task commands', error));
//   }, []);

//   return (
//     <select onChange={e => onSelect(e.target.value)} defaultValue="">
//       <option value="" disabled>Select Task Command</option>
//       {options.map(option => (
//         <option key={option} value={option}>{option}</option>
//       ))}
//     </select>
//   );
// };

// export default TaskCommandDropdown;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TaskCommandDropdown = ({ onSelect }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/task-commands/')
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => console.error('Error fetching task commands', error));
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="task-command-select-label">Task Command</InputLabel>
      <Select
        labelId="task-command-select-label"
        id="task-command-select"
        value={selectedOption}
        label="Task Command"
        onChange={handleChange}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TaskCommandDropdown;
