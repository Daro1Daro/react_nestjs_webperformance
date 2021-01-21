import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { deleteResultsStart, pollSingleResultsStart } from '../../redux/results/results.actions';
import { selectIsDeletingResults } from '../../redux/results/results.selectors';

import ResultsTable from './results-table.component';
import WithSpinner from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
  isDeleting: selectIsDeletingResults,
});

const mapDispatchToProps = dispatch => ({
  deleteResults: project => dispatch(deleteResultsStart(project)),
  pollResults: resultsId => dispatch(pollSingleResultsStart(resultsId)),
})

const ResultsTableContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithSpinner
)(ResultsTable);

export default ResultsTableContainer;
