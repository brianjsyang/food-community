export default function EachMeal({ params }) {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Explain each meal! - {params.meal}
      </h1>
    </main>
  )
}