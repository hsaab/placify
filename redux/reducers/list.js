import shortid from 'shortid';

let initialState = {
  types: [],
  count: 0
}

const list = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case 'ADDNEWLIST':
      let newState = Object.assign({}, state);
      let id = { id: shortid.generate() };
      let name = { name: action.list[0].toUpperCase() + action.list.slice(1) };
      let count = { count: 0 };
      let newList = Object.assign({}, id, name, count);
      newState.types.push(newList);
      newState.count++;
      return newState;
    case 'ADDPLACETOLIST':
      let newState1 = Object.assign({}, state);
      newState1.types.forEach((list) => {
        if(list.id === action.listId) {
          list.count++;
        }
      });
      return newState1;
    default:
      return state
  }
}

export default list;
