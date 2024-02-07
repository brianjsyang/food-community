import Link from "next/link";

export default function Meals() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        List of Meals!
      </h1>

      <h1 style={{ color: 'white', textAlign: 'center' }}>
        <Link href="meals/share">Share the Meal!</Link>
      </h1>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        <Link href="meals/meal-type-1">Meal Type 1</Link>
      </h1>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        <Link href="meals/meal-type-2">Meal Type 2</Link>
      </h1>
    </main>
  )
}