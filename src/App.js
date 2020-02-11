import React, { useReducer } from "react";
import "./App.css";

import Grid from "./grid/Grid";
import Toolbox from "./toolbox/Toolbox";

const INITIAL_SCENE = [
  {
    type: "microphone",
    id: "mic",
    x: 1,
    y: 1
  },
  {
    type: "microphone",
    id: "mic2",
    x: 3,
    y: 3
  }
];

const nextId = state => {
  return state.reduce((acc, obj) => (acc > obj.id ? acc : obj.id), 0) + 1;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT": {
      return state.map(obj => ({
        ...obj,
        selected: obj.id === action.payload.id
      }));
    }
    case "MOVE": {
      if (action.payload.id === "__NEW__") {
        console.log(action.payload.object);
        return [
          ...state,
          {
            ...action.payload.object,
            id: nextId(state),
            x: action.payload.pos[0],
            y: action.payload.pos[1]
          }
        ];
      } else {
        return state.map(obj => {
          if (obj.id === action.payload.id) {
            return {
              ...obj,
              x: action.payload.pos[0],
              y: action.payload.pos[1]
            };
          } else {
            return obj;
          }
        });
      }
    }
    default: {
      return state;
    }
  }
};

function App() {
  const [scene, dispatch] = useReducer(reducer, INITIAL_SCENE);

  console.log(scene);

  return (
    <div className="App">
      <div className="grid-container">
        <Grid
          scene={scene}
          onSelect={id => dispatch({ type: "SELECT", payload: { id } })}
          onDrop={(object, pos) =>
            dispatch({ type: "MOVE", payload: { id: object.id, pos, object } })
          }
        />
      </div>
      <Toolbox />
    </div>
  );
}

export default App;
