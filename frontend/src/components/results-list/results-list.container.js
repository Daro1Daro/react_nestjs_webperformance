import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { deleteResultsStart } from '../../redux/results/results.actions';
import { selectIsDeletingResults } from '../../redux/results/results.selectors';

import ResultsList from './results-list.component';
import WithSpinner from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
  isDeleting: selectIsDeletingResults,
});

const mapDispatchToProps = dispatch => ({
  deleteResults: project => dispatch(deleteResultsStart(project)),
})

const ResultsListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithSpinner
)(ResultsList);

export default ResultsListContainer;
