import type {
  DefaultNodeTypes,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import {
  LinkJSXConverter,
  RichText as PayloadRichText,
} from "@payloadcms/richtext-lexical/react";
import React from "react";

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new TypeError("Expected value to be an object");
  }
  const slug = value.slug;

  switch (relationTo) {
    case "articles":
      return `/blog/${slug}`;
    default:
      return `/${relationTo}/${slug}`;
  }
};

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => {
    const { value: media } = node;

    if (!media || typeof media !== "object") return null;

    const mediaTyped = media as any;

    return (
      <div className="my-3 w-full">
        <img
          src={mediaTyped.url}
          alt={mediaTyped.alt || "Article image"}
          className="w-full h-auto object-cover"
        />
        {mediaTyped.caption && (
          <p className="text-center text-sm text-zinc-400 mt-2 italic">
            {mediaTyped.caption}
          </p>
        )}
      </div>
    );
  },
});
export const RichText: React.FC<{
  lexicalData: SerializedEditorState;
}> = ({ lexicalData }) => {
  return (
    <div className="rich-text-content  mx-auto max-w-4xl py-3">
      <PayloadRichText converters={jsxConverters} data={lexicalData} />
    </div>
  );
};
