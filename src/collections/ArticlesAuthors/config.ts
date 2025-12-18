import { CollectionConfig } from "payload";
import { ARTICLE_AUTHOR_ROLE_OPTIONS } from "./constants";

export const ArticlesAuthors: CollectionConfig = {
  slug: "article-authors",
  admin:{useAsTitle: "name"},
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
      options: Object.values(ARTICLE_AUTHOR_ROLE_OPTIONS),
      defaultValue: ARTICLE_AUTHOR_ROLE_OPTIONS.NYSC_INTERN ,
      required: true,
    },
  ],
};
