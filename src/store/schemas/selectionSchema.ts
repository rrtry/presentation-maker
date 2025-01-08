const SelectionSchema = {
    type: "object",
    properties: {
      selectedSlideId: { type: "string" },
    },
    required: ["selectedSlideId"],
    additionalProperties: false,
  };
  
  export { SelectionSchema };
  