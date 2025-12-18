import { getPayloadClient } from "@/src/lib/client";
import { seedAdmin } from "./admin.seeders";
import { seedArticleAuthor } from "./article-author.seeder";
import { seedArticles } from "./articles.seeders";

async function main() {
         const payload = await getPayloadClient();
        try {
                await seedAdmin(payload);
                await seedArticleAuthor(payload)
                await seedArticles(payload);
                process.exit(0);

   }     catch (error) {
                console.error('Error during seeding:', JSON.stringify(error));
                process.exit(1);
        } 
}

void main()


