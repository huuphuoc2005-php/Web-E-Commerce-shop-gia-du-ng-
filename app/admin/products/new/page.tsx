import { db } from "@/lib/db";
import NewProductForm from "../../components/NewProductForm";

export default async function NewProductPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  return <NewProductForm categories={categories} />;
}
