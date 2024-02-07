import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>

      <h1 style={{ color: 'white', textAlign: 'center' }}>
        <Link href="/meals">Meals</Link>
      </h1>
    </main>
  );
}
