import { getPlaiceholder } from 'plaiceholder';
import type { Buffer } from "node:buffer";


export function isEligibleForBlurDataURL(mime?: string | null) {
  if (!mime?.startsWith("image/")) return false;
  if (mime === "image/gif" || mime === "image/svg+xml") return false;
  return true;
}

export async function generateBlurDataURL(
  buffer?: Buffer<ArrayBufferLike>
): Promise<string | null> {
  if (!buffer) {
    console.warn("No buffer provided for blur data URL generation.");
    return null;
  }
  const { base64 } = await getPlaiceholder(buffer);

  return base64;
}
