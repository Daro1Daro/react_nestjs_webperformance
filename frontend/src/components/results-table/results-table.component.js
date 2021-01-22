import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { formatDateString } from '../../common/functions';
import { TestStatus } from '../../common/consts';

import TablePaginationActions from '../table-pagination-actions/table-pagination-actions.component';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import TableHead from '@material-ui/core/TableHead';
import withStyles from '@material-ui/core/styles/withStyles';

import './results-table.styles.scss';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const ResultsTable = ({ rows, isDeleting, deleteResults, pollResults }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const history = useHistory();

  useEffect(() => {
    for (const r of rows) {
      if (r.status === TestStatus.PENDING) pollResults(r.id);
    }
  }, [rows, pollResults]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (event, results) => {
    event.stopPropagation();
    deleteResults(results);
  };

  const handleRowClick = (id) => {
    history.push(`/single-results/${id}`);
  };

  return (
    <TableContainer className={'results-table-container'} component={Paper}>
      <Table className={'table'}>
        <TableHead>
          <TableRow>
            <StyledTableCell>WebPage</StyledTableCell>
            <StyledTableCell align="right">URL</StyledTableCell>
            <StyledTableCell align="right">Created</StyledTableCell>
            <StyledTableCell align="right">Browser</StyledTableCell>
            <StyledTableCell align="right">Connectivity</StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
          ).map((row) => (
            <TableRow key={row.id} hover onClick={() => handleRowClick(row.id)} className={'table-row'}>
              <TableCell component={'th'} scope={'row'}>
                {row.webPage.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align={'right'}>
                {row.webPage.url}
              </TableCell>
              <TableCell style={{ width: 160 }} align={'right'}>
                {formatDateString(row.created)}
              </TableCell>
              <TableCell style={{ width: 160 }} align={'right'}>
                {row.browser}
              </TableCell>
              <TableCell style={{ width: 160 }} align={'right'}>
                {row.connectivity}
              </TableCell>
              <TableCell style={{ width: 80 }} align={'center'}>
                {
                  row.status === TestStatus.PENDING
                    ? <CircularProgress/>
                    : <IconButton onClick={(event) => handleDelete(event,{ id: row.id })} disabled={isDeleting}>
                      <DeleteIcon/>
                    </IconButton>
                }
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6}/>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;