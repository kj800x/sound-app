import "./generic-keyboard.css";

export default {
  type: "generic-keyboard",
  connectors: [
    {
      location: [0.5, 0],
      connectors: {
        OUT: "trs4"
      }
    }
  ]
};
