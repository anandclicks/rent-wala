import { notFound } from "next/navigation";
import PropertyDetailView from "@/components/PropertyDetailView";
import {
  getPropertyBySlug,
  getNearbyProperties,
  getRawPropertyBySlug,
  SITE_CONFIG,
} from "@/data/properties";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} — ${property.locality}, ${property.city}`,
    description: `View details for ${property.title} in ${property.locality}, ${property.city}.`,
  };
}

export default async function PropertyPage({ params }) {
  const { slug } = await params;
  const raw = getRawPropertyBySlug(slug);
  if (!raw) notFound();

  const property = getPropertyBySlug(slug);
  const nearby = getNearbyProperties(raw);

  const data = {
    property,
    nearby,
    callNumber: SITE_CONFIG.callNumber,
    whatsappNumber: SITE_CONFIG.whatsappNumber,
  };

  return <PropertyDetailView data={data} />;
}
