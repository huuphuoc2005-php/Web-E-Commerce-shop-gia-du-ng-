import { getCurrentUser, getUserOrders } from "@/lib/actions";
import { redirect } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProfileManager from "@/app/components/ProfileManager";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await getUserOrders();

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <ProfileManager user={user} orders={orders} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
