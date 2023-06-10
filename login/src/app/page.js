"use client"; // This is a client component
import Login from "pages/login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <>
        <Login />
      </>
    </main>
  );
}
