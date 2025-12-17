import { getPayload } from "payload";
import config from "../../../app/payload.config";
import { isPayloadDuplicateUserError } from "../lib/is_payload_duplicate_user_error.";
import { env } from "@/lib/env";

export async function seedAdmin() {
  const payload = await getPayload({ config });

  try {
    const response = await payload.create({
      collection: "users",
      data: {
        email: env.CMS_SEED_ADMIN_EMAIL,
        password: env.CMS_SEED_ADMIN_PASSWORD,
      },
    });

    console.log("Admin user created:", response);
  } catch (error) {
    if (isPayloadDuplicateUserError(error, "email")) {
      console.log("Admin user already exists, skipping creation.");
    } else {
      console.error(
        "Error creating admin user:",
        JSON.stringify(error, null, 2)
      );
    }
  }
}
