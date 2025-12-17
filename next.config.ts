import { withPayload } from "@payloadcms/next/withPayload";

import withPlaiceholder from "@plaiceholder/next";

 
/**
 * @type {import('next').NextConfig}
 */
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};

export default withPlaiceholder(withPayload(nextConfig));
