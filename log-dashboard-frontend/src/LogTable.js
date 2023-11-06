// import React from 'react';
// import { useTable, usePagination } from 'react-table';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

// const LogTable = ({ data }) => {
//   const columns = React.useMemo(
//     () => [
//       // { Header: 'Timestamp', accessor: 'event_context.datetime' },
//       // { Header: 'System Call', accessor: 'event_context.syscall_name' },
//       { Header: 'Timestamp', accessor: 'event_context.datetime' },
//       { Header: 'System Call', accessor: 'event_context.syscall_name' },
//       { Header: 'Return Value', accessor: 'event_context.retval' },
//       { Header: 'Host PID', accessor: 'event_context.task_context.host_pid' },
//       { Header: 'Host PPID ', accessor: 'event_context.task_context.host_ppid' },
//       { Header: 'PID', accessor: 'event_context.task_context.pid' },
//       { Header: 'PPID', accessor: 'event_context.task_context.ppid' },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     gotoPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0, pageSize: 50 },
//     },
//     usePagination
//   );

//   const handleChangePage = (event, newPage) => {
//     gotoPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPageSize(Number(event.target.value));
//   };

//   return (
//     <Paper>
//       <TableContainer>
//         <Table {...getTableProps()}>
//           <TableHead>
//             {headerGroups.map(headerGroup => (
//               <TableRow {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                   <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHead>
//           <TableBody {...getTableBodyProps()}>
//             {page.map(row => {
//               prepareRow(row);
//               return (
//                 <TableRow {...row.getRowProps()}>
//                   {row.cells.map(cell => (
//                     <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
//                   ))}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         component="div"
//         count={data.length}
//         rowsPerPage={pageSize}
//         page={pageIndex}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// };

// export default LogTable;

// LogTable.js
import React from 'react';
import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Define a default column filter
const DefaultColumnFilter = ({
  column: { filterValue, setFilter },
}) => {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      onClick={(e) => {
        e.stopPropagation(); // Stop the event from propagating to the column sort handler
      }}
      placeholder={`Search...`}
      style={{ width: '100%' }} // You can adjust the width as necessary
    />
  );
};


// This would be the LogTable component accepting data and columns as props
const LogTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Timestamp',
        accessor: 'event_context.datetime',
        filterable: false,
      },
      {
        Header: 'System Call',
        accessor: 'event_context.syscall_name',
        Filter: DefaultColumnFilter, // Use the default filter for this column
        filter: 'includes', // Use the 'includes' filter type
      },
      {
        Header: 'Return Value',
        accessor: 'event_context.retval',
      },
      {
        Header: 'Host PID',
        accessor: 'event_context.task_context.host_pid',
      },
      {
        Header: 'Host PPID',
        accessor: 'event_context.task_context.host_ppid',
      },
      {
        Header: 'PID',
        accessor: 'event_context.task_context.pid',
      },
      {
        Header: 'PPID',
        accessor: 'event_context.task_context.ppid',
      },
      // Add other columns here...
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter }, // Define a default filter UI for all columns
      initialState: { pageIndex: 0, pageSize: 20 }, // Set the initial state of pageIndex and pageSize
    },
    useFilters, // useFilters before usePagination
    useSortBy,
    usePagination
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  }
  // Render the UI for your table
  return (
    <Paper>
      <TableContainer>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {column.render('Header')}
                      {/* Sort direction indicator */}
                      {column.isSorted ? (column.isSortedDesc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : null}
                    </div>
                    {/* Render the column's filter UI */}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />
    </Paper>
  );
};


export default LogTable;
