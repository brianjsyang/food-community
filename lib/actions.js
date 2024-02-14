'use server';
 // all functions defined here will be server,
import { sql } from "@vercel/postgres"; // SQL query to insert to DB.
import slugify from "slugify";
import xss from "xss"; // cross site validation
import fs from "node:fs"; // allow to write to file

export async function shareMeal(formData) {
  // All form input are collected under formData object
  const meal = {
    title:          formData.get('title'), // get data from input field, identified by name
    summary:        formData.get('summary'),
    instructions:   formData.get('instructions'),
    image:          formData.get('image'),
    creator:        formData.get('name'),
    creator_email:  formData.get('email')
  }

  /** Example output.
   * {
        title: 'Test Meal',
        summary: 'This is a test meal',
        instructions: '1) get rice\r\n2) cook the rice\r\n3) eat the rice',
        image: File {
          size: 99117,
          type: 'image/png',
          name: 'brianjsyang-logo.png',
          lastModified: 1707888924795
        },
        creator: 'Brian Yang',
        creator_email: 'brianjsyang@gmail.com'
      }
   */

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); // sanitize & clean instructions

  // image should be stored in the file system, under public folder.
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;  // ... text.png

  if (extension != 'undefined') {
    // only stream image if extention is valid. (it's an actual image)
    const stream = fs.createWriteStream(`public/images/${fileName}`); // note! file name itself must be included here too.
    const bufferedImage = await meal.image.arrayBuffer(); // prep the image for file upload
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error('Image could not be saved')
      }
    });
  }

  // prep to save image path to database.
  meal.image = `/images/${fileName}` // overwrite the image object with simply the path

  // actually upload to database!
  try {
    await sql `
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (${meal.title}, ${meal.summary}, ${meal.instructions}, ${meal.creator}, ${meal.creator_email}, ${meal.image}, ${meal.slug})
    `;
  } catch (error) {
      return {
          message: 'Database Error: Failed to Create Invoice.',
      }
  }
}

