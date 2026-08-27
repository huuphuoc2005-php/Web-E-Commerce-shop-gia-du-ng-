import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import EditProductForm from "../../components/EditProductForm";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id },
    }),
    db.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) {
    notFound();
  }
  return <EditProductForm product={product} categories={categories} />;
}
