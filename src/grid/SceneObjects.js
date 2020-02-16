import React from "react";
import classnames from "classnames";
import "./SceneObject.css";
import equipmentList from "../equipment";
import cabling from "../cabling";
import classNames from "classnames";

// Right now the graphs are very basic
const getSceneObjectsFromSceneGraph = graph => graph;

function Connector({
  portGroup,
  portGroupIndex,
  selectedCableType,
  zoom,
  onClick,
  selectedConnector,
  objectId
}) {
  const showConnector = Object.values(portGroup.connectors).includes(
    selectedCableType
  );

  if (!showConnector) {
    return null;
  }

  const selected =
    selectedConnector &&
    selectedConnector.objectId === objectId &&
    selectedConnector.portGroupIndex === portGroupIndex;

  const connectorLocation = portGroup.location;

  const cableSkel = cabling.find(cable => cable.type === selectedCableType);

  return (
    <div
      className={classNames("cable-connector", { selected })}
      style={{
        left: connectorLocation[0] * zoom,
        top: connectorLocation[1] * zoom,
        backgroundColor: cableSkel.color,
        width: 0.2 * zoom,
        height: 0.2 * zoom
      }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick({ portGroupIndex, objectId });
      }}
    />
  );
}

export const SceneObject = ({
  object,
  gtom,
  zoom,
  onSelect,
  onConnectorClick,
  selectedCableType,
  selectedConnector
}) => {
  const skel = equipmentList.find(e => e.type === object.type);

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
      {skel.portGroups.map((portGroup, i) => (
        <Connector
          key={i}
          zoom={zoom}
          selectedCableType={selectedCableType}
          portGroup={portGroup}
          portGroupIndex={i}
          objectId={object.id}
          onClick={onConnectorClick}
          selectedConnector={selectedConnector}
        />
      ))}
    </div>
  );
};

const SceneObjects = ({
  scene,
  gtom,
  zoom,
  onSelect,
  selectedCableType,
  onConnectorPortClick,
  selectedConnector
}) => {
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
          onConnectorClick={onConnectorPortClick}
          selectedConnector={selectedConnector}
        />
      ))}
    </>
  );
};

export default SceneObjects;
