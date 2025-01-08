const ImageObjectSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
      x: { type: "number" },
      y: { type: "number" },
      width: { type: "number" },
      height: { type: "number" },
      type: { const: "image" },
      src: { type: "string" },
    },
    required: ["id", "x", "y", "width", "height", "type", "src"],
    additionalProperties: false,
  };
  
  export { ImageObjectSchema };
  