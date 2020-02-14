import "./generic-mixer.css";

export default {
  type: "generic-mixer",
  connectors: [
    {
      location: [0.5, 0],
      connectors: {
        "IN 1": "xlr",
        "IN 2": "xlr",
        "IN 3": "xlr",
        "IN 4": "xlr",
        "MAIN L": "speakon",
        "MAIN R": "speakon"
      }
    }
  ]
};
