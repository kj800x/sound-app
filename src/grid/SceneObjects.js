import React from "react";
import classnames from "classnames";
import "./SceneObject.css";
import equipmentList from "../equipment";
import cabling from "../cabling";

// Right now the graphs are very basic
const getSceneObjectsFromSceneGraph = graph => graph;

function Connector({ cableType, connectorLocation, zoom }) {
  const cableSkel = cabling.find(cable => cable.type === cableType);

  return (
    <div
      className="cable-connector"
      style={{
        left: connectorLocation[0] * zoom,
        top: connectorLocation[1] * zoom,
        backgroundColor: cableSkel.color,
        width: 0.2 * zoom,
        height: 0.2 * zoom
      }}
    />
  );
}

export const SceneObject = ({
  object,
  gtom,
  zoom,
  onSelect,
  selectedCableType
}) => {
  const skel = equipmentList.find(e => e.type === object.type);

  const showConnector = Object.values(skel.connectors).includes(
    selectedCableType
  );

  const [x, y] = gtom(-object.x, -object.y);
  return (
    <div
      className={classnames("scene-object", object.type, {
        selected: object.selected
      })}
      style={{
        top: -y,
        left: -x,
        width: zoom,
        height: zoom
      }}
      draggable={true}
      onMouseDown={e => {
        e.stopPropagation();
      }}
      onDragStart={e => {
        const rect = e.target.getBoundingClientRect();
        e.dataTransfer.setData("object", JSON.stringify(object));
        e.dataTransfer.setData("mousePosX", e.pageX - rect.left);
        e.dataTransfer.setData("mousePosY", e.pageY - rect.top);
      }}
      onClick={e => {
        e.stopPropagation();
        onSelect(object.id);
      }}
    >
      {showConnector && (
        <Connector
          connectorLocation={skel.connectorLocation}
          zoom={zoom}
          cableType={selectedCableType}
        />
      )}
    </div>
  );
};

const SceneObjects = ({ scene, gtom, zoom, onSelect, selectedCableType }) => {
  const objects = getSceneObjectsFromSceneGraph(scene);

  return (
    <>
      {objects.map(object => (
        <SceneObject
          object={object}
          gtom={gtom}
          key={object.id}
          zoom={zoom}
          onSelect={onSelect}
          selectedCableType={selectedCableType}
        />
      ))}
    </>
  );
};

export default SceneObjects;
