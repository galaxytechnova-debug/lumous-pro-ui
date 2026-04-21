import { TemplateDetailView } from "@/components/templates/template-detail-view";
import { getFileTemplateBySlug } from "@/lib/file-templates";
import { notFound } from "next/navigation";

type TemplateDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { id } = await params;
  const template = await getFileTemplateBySlug(id);
  if (!template) notFound();

  return <TemplateDetailView template={template} />;
}
