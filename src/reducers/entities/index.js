import { combineReducers } from 'redux';

import generated from './generated';
import notebooks from './notebooks';
import notes from './notes';
import tags from './tags';

export default combineReducers({
  generated,
  notes,
  notebooks,
  tags,
});
