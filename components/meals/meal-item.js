import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* Images to come from database, instead of local files.
            Use "fill" prop to tell NextJS to make image take up the entire space.
          */}
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>

      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        
        <div className={classes.actions}>
          {/* Link to detail page with dynamic URL method */}
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}