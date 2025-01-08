import { PresentationSchema } from './PresentationSchema.ts'
import { SelectionSchema } from './selectionSchema.ts'

const EditorSchema = {
  type: "object",
  properties: {
    presentation: PresentationSchema,
    selection: {
      oneOf: [
        { type: "null" },
        SelectionSchema,
      ],
    },
    objectId: { type: "string" },
  },
  required: ["presentation", "selection", "objectId"],
  additionalProperties: false,
};

export { EditorSchema };
