import { TextObjectSchema } from './TextObjectSchema.ts';
import { ImageObjectSchema } from './ImageObjectSchema.ts';

const PresentationSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    slides: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          background: { type: "string" },
          objects: {
            type: "array",
            items: {
              oneOf: [
                TextObjectSchema, 
                ImageObjectSchema,
              ],
            },
            minItems: 0,
          },
        },
        required: ["id", "background", "objects"],
        additionalProperties: false,
      },
    },
  },
  required: ["title", "slides"],
  additionalProperties: false,
};

export { PresentationSchema };
