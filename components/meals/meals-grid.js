import classes from '@/components/meals/meals-grid.module.css';
import MealItem from './meal-item';

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map(meal => (
        <li key={meal.id}>
          {/* use the spread operator to pull out ALL the properties off
              the meal object into the MealItem*/}
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  )
}