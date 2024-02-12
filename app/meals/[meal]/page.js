import Image from 'next/image'

import classes from '@/app/meals/[meal]/page.module.css'
import { getMeal } from '@/lib/data'
import { notFound } from 'next/navigation';

export default async function MealDetailsPage({ params }) {
  const meal = await getMeal(params.meal);

  if (!meal) {
    // slug did not match any meal on the database.
    // redirect to "closest" not-found or error page.
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />'); // format for the line breaks!

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} fill/>
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>

          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>

          <p className={classes.summary}>
            {meal.summary}
          </p>
        </div>
      </header>

      <main>
        <p 
          className={classes.instructions} dangerouslySetInnerHTML={{
            __html: meal.instructions
        }}></p>
      </main>
    </>
  )
}