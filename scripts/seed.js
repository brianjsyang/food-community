const { db } = require('@vercel/postgres');
const {
  meals
} = require('@/app/lib/placeholder-data.js');

async function seedMeals(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "meals" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS meals (
        id SERIAL,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        summary TEXT NOT NULL,
        instructions TEXT NOT NULL,
        creator TEXT NOT NULL,
        creator_email TEXT NOT NULL
      );
    `;

    console.log(`Created "meals" table`);

    // Insert data into the "meals" table
    const insertedMeals = await Promise.all(
      meals.map(
        (meal) => client.sql`
        INSERT INTO meal (id, slug, title, image, summary, instructions, creator, creator_email)
        VALUES (${meal.id}, ${meal.slug}, ${meal.title}, ${meal.image}, ${meal.summary},  ${meal.instructions},  ${meal.creator},  ${meal.creator_email})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedMeals.length} customers`);

    return {
      createTable,
      meals: insertedMeals,
    };
  } catch (error) {
    console.error('Error seeding meals:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedMeals(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
