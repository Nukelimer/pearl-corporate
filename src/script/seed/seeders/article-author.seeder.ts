import { createMediaFromImageUrl } from "./../lib/create-media-from-image-url";
import { ARTICLE_AUTHOR_ROLE_OPTIONS } from "@/src/collections/ArticlesAuthors/constants";
import { faker } from "@faker-js/faker";
import { Payload } from "payload";

export async function seedArticleAuthor(payload: Payload) {
  try {
    const imageUrl = faker.image.personPortrait({
      size: 256,
    });
    const image = await createMediaFromImageUrl(payload, imageUrl);

    console.log(image);

    if (!image) {
      console.warn("Image creation failed, skipping article author seeding.");
      return;
    }

    const author =  await payload.create({
      collection: "article-authors",
      data: {
        name: faker.person.fullName(),
        role: ARTICLE_AUTHOR_ROLE_OPTIONS.NYSC_INTERN,
        avatar: image.id,
        id: 1
      },
    });

    
  } catch (error) {}
}
