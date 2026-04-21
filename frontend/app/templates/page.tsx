import { TemplateList } from "@/components/templates/template-list";
import { getAllFileTemplates } from "@/lib/file-templates";

export default async function TemplatesPage() {
  const templates = await getAllFileTemplates();
  return <TemplateList templates={templates} />;
}
