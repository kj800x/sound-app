import "./generic-di.css";

export default {
  type: "generic-di",
  connectors: [
    {
      location: [0.2, 0.2],
      connectors: {
        IN: "trs4"
      }
    },
    {
      location: [0.8, 0.2],
      connectors: {
        OUT: "xlr"
      }
    }
  ]
};
