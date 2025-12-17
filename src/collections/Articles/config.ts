import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import type { CollectionConfig } from "payload";
import { generateSlugHook } from "../hooks/generated_slug_hook";
import { generateContentSummaryHook } from "../hooks/generate_content_summary_hook";

export const Articles: CollectionConfig = {
  slug: "articles",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      hooks: { beforeValidate: [generateSlugHook] },
    },

    {
      name: "content",
      type: "richText",
      required: true,
    },

    {
      name: "contentSummary",
      type: "textarea",
      required: true,
      hooks: {
        beforeValidate: [generateContentSummaryHook],
      },
    },
    {
      name: "readTimeInMinutes ",
      type: "text",
      defaultValue: 0,
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.readTimeInMinutes;
          },
        ],

        afterRead: [
          ({ data }) => {
            const text = convertLexicalToPlaintext({
              data: data?.content || "",
            });
            const wordsPerMinute = 200;
            const words = text.trim().split(/\s+/).length;

            return Math.ceil(words / wordsPerMinute);
          },
        ],
      },
    },

    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "article-authors",
      required: true,
    },

    {
      name: "status",
      type: "select",
      options: ["Draft", "Published"],
      defaultValue: "Draft",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: {
        condition: (data) => data.status === "Published",
        
        date: {
          displayFormat: "DD/MM/YYYY",
          pickerAppearance: "dayAndTime",

        },
      },
    },
  ],
};
