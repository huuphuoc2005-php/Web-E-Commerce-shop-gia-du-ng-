import { redirect } from "next/navigation";

type CartSuccessPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function CartSuccessPage({ searchParams }: CartSuccessPageProps) {
  const params = await searchParams;
  const orderId = params.orderId;

  if (orderId) {
    redirect(`/checkout/success?orderId=${orderId}`);
  }

  redirect("/checkout/success");
}
