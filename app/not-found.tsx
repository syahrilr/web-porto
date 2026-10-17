import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 px-6">
      <p className="font-mono text-sm text-leaf-ink">404</p>
      <h1 className="text-3xl font-bold text-ink">Page not found</h1>
      <Link href="/" className="font-medium text-ink hover:text-leaf-ink">
        ← Back to home
      </Link>
    </main>
  );
}
