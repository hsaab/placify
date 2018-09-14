import { combineReducers } from "redux";
import list from "./list.js";
import place from "./place.js";
import user from "./user.js";
import search from "./search.js";

const rootReducer = combineReducers({
  list,
  place,
  user,
  search
});

export default rootReducer;
