import produce from "immer";

const max = (a, b) => (a > b ? a : b);

const nextId = scene => {
  return (
    Object.values(scene)
      .map(item => item.id)
      .reduce(max, 0) + 1
  );
};

const mapValues = obj => f =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, f(v)]));

const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case "SELECT": {
        draft.scene = mapValues(draft.scene)(obj => ({
          ...obj,
          selected: obj.id === action.payload.id
        }));
        if (action.payload.id === undefined) {
          draft.selectedConnector = undefined;
        }
        return;
      }
      case "MOVE": {
        if (action.payload.id === "__NEW__") {
          const id = nextId(state.scene);
          draft.scene[id] = {
            ...action.payload.object,
            id,
            x: action.payload.pos[0],
            y: action.payload.pos[1]
          };
          return;
        } else {
          draft.scene[action.payload.id].x = action.payload.pos[0];
          draft.scene[action.payload.id].y = action.payload.pos[1];
          return;
        }
      }
      case "DELETE": {
        delete draft.scene[action.payload.id];
        return;
      }
      case "SET_SELECTED_CONNECTOR": {
        if (draft.selectedConnector) {
          draft.connections.push({
            from: draft.selectedConnector,
            to: action.payload.selectedConnector
          });
          draft.selectedConnector = undefined;
          return;
        } else {
          draft.selectedConnector = action.payload.selectedConnector;
          return;
        }
      }
      case "SET_SELECTED_CABLE": {
        draft.selectedCable = action.payload.selectedCable;
        draft.selectedConnector = undefined;
        return;
      }
      default: {
        return;
      }
    }
  });

export const initialState = {
  scene: {
    "0": {
      type: "generic-mic",
      id: 0,
      x: 1,
      y: 1
    },
    "1": {
      type: "generic-mic",
      id: 1,
      x: 3,
      y: 3
    }
  },
  selectedConnector: undefined,
  selectedCable: undefined,
  connections: []
};

export default reducer;
