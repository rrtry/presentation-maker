const TextObjectSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
      x: { type: "number" },
      y: { type: "number" },
      width: { type: "number" },
      height: { type: "number" },
      type: { const: "text" },
      text: { type: "string" },
      fontFamily: { type: "string" },
      fontSize: { type: "number" },
      fontColor: { type: "string" },
    },
    required: ["id", "x", "y", "width", "height", "type", "text", "fontFamily", "fontSize", "fontColor"],
    additionalProperties: false,
};
  
export { TextObjectSchema };
  