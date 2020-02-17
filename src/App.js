import React, { useReducer } from "react";
import "./App.css";

import classNames from "classnames";

import Grid from "./grid/Grid";
import Toolbox from "./toolbox/Toolbox";
import ItemEditor from "./itemEditor/ItemEditor";
import reducer, { initialState } from "./reducer";
import equipmentList from "./equipment";

const getSelectedItem = scene => {
  return scene.find(item => item.selected);
};

const add = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2];

const getWires = state => {
  return state.connections.map(connection => {
    const { from, to, type } = connection;
    const fromObj = state.scene[from.objectId];
    const toObj = state.scene[to.objectId];
    const fromClass = equipmentList.find(item => item.type === fromObj.type);
    const toClass = equipmentList.find(item => item.type === toObj.type);
    const fromLocation = add(
      fromClass.portGroups[from.portGroupIndex].location,
      [fromObj.x, fromObj.y]
    );
    const toLocation = add(toClass.portGroups[to.portGroupIndex].location, [
      toObj.x,
      toObj.y
    ]);
    return { type, from: fromLocation, to: toLocation };
  });
};

const App = function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedConnector, selectedCable } = state;
  const scene = Object.values(state.scene);
  const wires = getWires(state);

  const selectedItem = getSelectedItem(scene);

  return (
    <div className={classNames("App", { showItemEditor: !!selectedItem })}>
      <Grid
        scene={scene}
        wires={wires}
        onSelect={id => dispatch({ type: "SELECT", payload: { id } })}
        onDrop={(object, pos) =>
          dispatch({ type: "MOVE", payload: { id: object.id, pos, object } })
        }
        selectedCableType={selectedCable}
        onConnectorPortClick={({ portGroupIndex, objectId }) => {
          dispatch({
            type: "SET_SELECTED_CONNECTOR",
            payload: { selectedConnector: { portGroupIndex, objectId } }
          });
        }}
        selectedConnector={selectedConnector}
      />
      <ItemEditor item={selectedItem} />
      <Toolbox
        selectedCable={selectedCable}
        onSelect={selectedCable => {
          dispatch({ type: "SET_SELECTED_CABLE", payload: { selectedCable } });
        }}
        onDrop={object => {
          if (object.id !== "__NEW__") {
            dispatch({ type: "DELETE", payload: { id: object.id } });
          }
        }}
      />
    </div>
  );
};

export default App;
