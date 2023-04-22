import { createStore } from "redux";
const reducer = (state, action) => {
    
switch (action.type) {
case"ADD":
  state = state + action.payload; 
  break;
case"SUBTRACT":
  state = state - action.payload;
  break;
case"NewAccount":
  state = state.concat([action.payload]);
  break;
}
  return state;
};

const store = createStore(reducer,[]);

store.subscribe(() => {console.log("Store updated!",store.getState());
});

// store.dispatch({
//     type:"ADD",
//     payload: 100
// });

export default  store;