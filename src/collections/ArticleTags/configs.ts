import { CollectionConfig } from "payload";
import slugify from "slugify";

export const ArticleTags: CollectionConfig = {
  slug: "article-tags",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      unique: true,
      hooks: {
        beforeValidate: [
          ({ data, originalDoc }) => {
            if (data?.name && data.name !== originalDoc?.name) {
              return slugify(data.name, { lower: true, strict: true });
            }
          },
        ],
      },
    },
  ],
};
