import React from "react";
import classnames from "classnames";
import "./SceneObject.css";

// Right now the graphs are very basic
const getSceneObjectsFromSceneGraph = graph => graph;

export const SceneObject = ({ object, gtom, zoom, onSelect }) => {
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
    />
  );
};

const SceneObjects = ({ scene, gtom, zoom, onSelect }) => {
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
        />
      ))}
    </>
  );
};

export default SceneObjects;
