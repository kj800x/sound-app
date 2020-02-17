import "./generic-mixer.css";

export default {
  type: "generic-mixer",
  portGroups: [
    {
      location: [0.2, 0],
      connectors: {
        "IN 1": "xlr",
        "IN 2": "xlr",
        "IN 3": "xlr",
        "IN 4": "xlr",
      }
    },
    {
      location: [0.8, 0],
      connectors: {
        "MAIN L": "speakon",
        "MAIN R": "speakon"
      }
    }
  ]
};
