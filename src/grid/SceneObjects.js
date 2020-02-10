import React from "react";
import classnames from "classnames";

// Right now the graphs are very basic
const getSceneObjectsFromSceneGraph = graph => graph;

const SceneObject = ({ object, gtom, zoom, onSelect }) => {
  const [x, y] = gtom(object.x, object.y);
  return (
    <div
      className={classnames("scene-object", object.type)}
      style={{
        top: y,
        left: x,
        width: zoom,
        height: zoom,
        outline: object.selected ? "3px solid orange" : "none"
      }}
      draggable={true}
      onMouseDown={e => {
        e.stopPropagation();
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
