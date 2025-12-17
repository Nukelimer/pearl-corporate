import { Article } from "@/src/app/payload-types";
import { FieldHook } from "payload";
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
const MAX_SUMMARY_LENGTH = 260;
export const generateContentSummaryHook: FieldHook<Article, string> = ({ value, data }) => {
  if (value) return value.trim();
  if (!data?.content) {
    return "";
  }

  const plainText = convertLexicalToPlaintext({data: data?.content}).trim();
  
  if (!plainText) return "";
  return plainText.length > MAX_SUMMARY_LENGTH
    ? `${plainText.slice(0, MAX_SUMMARY_LENGTH - 3).trim()}...` 
    : plainText;

};