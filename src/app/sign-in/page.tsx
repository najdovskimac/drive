import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <div className="flex h-[100dvh] w-full items-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-4 text-white">
        <main className="h-full w-full text-center">
          <SignInButton forceRedirectUrl={"/drive"} />
          <footer className="mt-16 text-sm text-neutral-500">
            © {new Date().getFullYear()} T3 Drive. All rights reserved.
          </footer>
        </main>
      </div>
    </>
  );
}
