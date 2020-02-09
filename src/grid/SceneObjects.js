import React from "react";
import classnames from "classnames";

// Right now the graphs are very basic
const getSceneObjectsFromSceneGraph = graph => graph;

const SceneObject = ({ object, gtom }) => {
  const [x, y] = gtom(object.x, object.y);
  return (
    <div
      className={classnames("scene-object", object.type)}
      style={{ top: y, left: x }}
    />
  );
};

const SceneObjects = ({ scene, gtom }) => {
  const objects = getSceneObjectsFromSceneGraph(scene);

  return (
    <>
      {objects.map(object => (
        <SceneObject object={object} gtom={gtom} key={object.id} />
      ))}
    </>
  );
};

export default SceneObjects;
