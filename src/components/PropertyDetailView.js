"use client";

import { CalendarCheck, Phone } from "lucide-react";
import PropertyDetailHeader from "@/components/property-detail/PropertyDetailHeader";
import PropertyGallery from "@/components/property-detail/PropertyGallery";
import PropertyTitleSection from "@/components/property-detail/PropertyTitleSection";
import PropertyAbout from "@/components/property-detail/PropertyAbout";
import PropertyRoomDetails from "@/components/property-detail/PropertyRoomDetails";
import PropertyAmenities from "@/components/property-detail/PropertyAmenities";
import PropertyLocationSection from "@/components/property-detail/PropertyLocationSection";
import PropertyBookingSidebar, {
  ENQUIRE_HASH,
  WhatsAppGlyph,
} from "@/components/property-detail/PropertyBookingSidebar";
import PropertyDetailsTabs from "@/components/property-detail/PropertyDetailsTabs";

export default function PropertyDetailView({ data }) {
  const { property, nearby, callNumber, whatsappNumber } = data;
  const images = property.images?.length ? property.images : [property.image];
  const layout = property.layout;
  const roomOptions = Array.isArray(property.roomOptions) ? property.roomOptions : [];

  const waDigits = (whatsappNumber || callNumber || "").replace(/\D/g, "");
  const callHref = `tel:${callNumber || "+919876543210"}`;
  const waHref = `https://wa.me/${waDigits}?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} on Property Rent Wala.`)}`;

  return (
    <div className="bg-surface pb-2">
      <PropertyDetailHeader property={property} />

      <div className="space-y-5 py-4 sm:space-y-6 sm:py-5">
        <PropertyGallery images={images} title={property.title} property={property} />
        <PropertyTitleSection property={property} layout={layout} />

        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-6">
            <div className="space-y-5">
              <PropertyAbout property={property} />
              {layout.showRoomDetails && roomOptions.length > 0 && (
                <PropertyRoomDetails roomOptions={roomOptions} propertySlug={property.slug} />
              )}
              <PropertyAmenities amenities={property.amenities} />
              <PropertyLocationSection
                property={property}
                nearbyLocations={property.nearbyLocations}
              />
            </div>

            <PropertyBookingSidebar
              property={property}
              layout={layout}
              callHref={callHref}
              waHref={waHref}
              nearby={nearby}
            />
          </div>
        </div>

        <PropertyDetailsTabs property={property} layout={layout} nearby={nearby} />
      </div>

      {/* Mobile contact bar — takes the bottom-nav slot on detail pages (OLX ad-view pattern) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <div className="container-page flex h-16 items-center gap-2">
          <div className="mr-1 hidden min-w-0 flex-1 sm:block">
            <p className="truncate text-base font-extrabold text-ink">
              {property.price}
              {property.priceSuffix && <span className="text-xs font-medium text-muted"> {property.priceSuffix}</span>}
            </p>
            <p className="truncate text-xs text-muted">{property.title}</p>
          </div>
          <a href={callHref} aria-label="Call owner" className="btn btn-outline-brand h-11 w-11 px-0 sm:w-auto sm:px-4">
            <Phone className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp flex-1 sm:flex-none">
            <WhatsAppGlyph className="h-[18px] w-[18px]" />
            WhatsApp
          </a>
          <a href={ENQUIRE_HASH} className="btn btn-primary flex-1 sm:flex-none">
            <CalendarCheck className="h-[18px] w-[18px]" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
