// CORRECTED: Separate imports for server functions and client components.

// Import server-side functions from the '/server' entry point.
import { auth, currentUser } from "@clerk/nextjs/server";
// Import client-side UI components from the main entry point.
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function DashboardPage() {
  // These server-side functions get the user's ID and full user object.
  // CORRECTED: Added 'await' to resolve the TypeScript error.
  // In some project configurations, the auth() helper is treated as a promise.
  const { userId } = await auth();
  const user = await currentUser();

  // If the user is not logged in, show a helpful message and a link to sign in.
  if (!userId || !user) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="mt-2 text-slate-600">You must be logged in to view this page.</p>
            <Link href="/sign-in" className="mt-4 inline-block text-blue-600 hover:underline">
                Sign In
            </Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-slate-800">Welcome to Your Dashboard</h1>
            <p className="mt-4 text-lg text-slate-600">
                Hello, {user.firstName || `User ${userId.substring(0, 8)}`}!
            </p>
            <div className="mt-8 bg-slate-100 p-6 rounded-lg">
                <p className="text-slate-600">This is your personal space. In the future, you'll be able to see your saved agents, manage subscriptions, and view your API usage here.</p>
            </div>
             <div className="mt-8 flex justify-center">
                {/* This component handles user profile management and sign-out. */}
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    </div>
  );
}

