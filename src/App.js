import React, { useReducer } from "react";
import "./App.css";

import classNames from "classnames";

import Grid from "./grid/Grid";
import Toolbox from "./toolbox/Toolbox";
import ItemEditor from "./itemEditor/ItemEditor";
import reducer, { initialState } from "./reducer";

const getSelectedItem = scene => {
  return scene.find(item => item.selected);
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { scene: rawScene, selectedConnector, selectedCable } = state;
  const scene = Object.values(rawScene);

  const selectedItem = getSelectedItem(scene);

  return (
    <div className={classNames("App", { showItemEditor: !!selectedItem })}>
      <Grid
        scene={scene}
        onSelect={id => dispatch({ type: "SELECT", payload: { id } })}
        onDrop={(object, pos) =>
          dispatch({ type: "MOVE", payload: { id: object.id, pos, object } })
        }
        selectedCableType={selectedCable}
        onConnectorPortClick={({ portGroupIndex, objectId }) => {
          console.log({ portGroupIndex, objectId });
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
}

export default App;
