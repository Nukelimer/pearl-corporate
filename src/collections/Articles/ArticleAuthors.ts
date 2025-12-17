import { CollectionConfig } from "payload";

export const ArticlesAuthors: CollectionConfig = {
  slug: "article-authors",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },

    {
      name: "avatar",
      type: "upload",
      required: true,
      relationTo: "media",
    },

    {
      name: "role",
      type: "select",
      options: [
        "Managing Partner",
        "Associate",
        "Trainee",
        "NYSC Intern",
        "Guest Writer",
      ],
      defaultValue: "NYSC Intern",

      required: true,
    },
  ],
};
