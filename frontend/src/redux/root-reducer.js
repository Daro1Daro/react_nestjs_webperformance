import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user.reducer";
import projectReducer from './project/project.reducer';
import resultsReducer from './results/results.reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['user', 'results', 'project']
};

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['signUpSuccess', 'signUpError', 'error']
};

const projectPersistConfig = {
  key: 'project',
  storage,
  blacklist: ['error', 'isCreating', 'isDeleting', 'isCreatingTest']
};

const resultsPersistConfig = {
  key: 'results',
  storage,
  blacklist: ['error', 'isDeleting']
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  project: persistReducer(projectPersistConfig, projectReducer),
  results: persistReducer(resultsPersistConfig, resultsReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
