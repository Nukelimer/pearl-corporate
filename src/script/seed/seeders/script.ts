import { seedAdmin } from "./admin.seeders";

async function main() {
        try {
                await seedAdmin();
                process.exit(0);

   }     catch (error) {
                console.error('Error during seeding:', JSON.stringify(error));
                process.exit(1);
        } 
}

void main()


