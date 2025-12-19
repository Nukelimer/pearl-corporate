import { cloudinaryStorage } from 'payload-cloudinary';
// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users/config";
import { Media } from "./collections/Media/config";
import { env } from "@/src/lib/env";
import { Articles } from "./collections/Articles/config";
import { ArticlesAuthors } from "./collections/ArticlesAuthors/config";
import { ArticleTags } from "./collections/ArticleTags/configs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: {
      email: env.CMS_SEED_ADMIN_EMAIL,
      password: env.CMS_SEED_ADMIN_PASSWORD,
    },
  },
  collections: [Users, Media, Articles, ArticleTags, ArticlesAuthors],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [...defaultFeatures, FixedToolbarFeature()];
    },
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "./payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder

    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
        api_key: process.env.CLOUDINARY_API_KEY || "",
        api_secret: process.env.CLOUDINARY_API_SECRET || "",
      },
      collections: {
        media: true, // This enables Cloudinary for your 'media' collection
      },
    }),
  ],
});
