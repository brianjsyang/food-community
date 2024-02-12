// QUERY DATABASE.
import { sql } from "@vercel/postgres";

/**
 * 
 * @returns All meals from the database
 */
export async function fetchMeals() {
  try {
    // simulate delay
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    //throw new Error('Loading Meal Failed!') // simulate error
    const data = await sql`SELECT * FROM meals`;

    return data.rows;
    
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch Meals data.');
  }
}


/**
 * 
 * @param {*} slug unique identifier of a meal
 * @returns Single meal matching the slug in the database
 */
export async function getMeal(slug) {
  try {

    const data = await sql`SELECT * 
    FROM meals 
    WHERE slug ILIKE ${`%${slug}%`}
    `;

    const meal = data.rows[0]; // only expecting one return.
    return meal;

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch Meals data.');
  }
}