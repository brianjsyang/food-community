// QUERY DATABASE.
import { sql } from "@vercel/postgres";


export async function fetchMeal() {
  try {

    // simulate delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    //throw new Error('Loading Meal Failed!') // simulate error

    
    const data = await sql`SELECT * FROM meals`;

    return data.rows;
    
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch Meals data.');
  }
}