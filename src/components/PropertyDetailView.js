"use client";

import PropertyDetailHeader from "@/components/property-detail/PropertyDetailHeader";
import PropertyGallery from "@/components/property-detail/PropertyGallery";
import PropertyTitleSection from "@/components/property-detail/PropertyTitleSection";
import PropertyAbout from "@/components/property-detail/PropertyAbout";
import PropertyRoomDetails from "@/components/property-detail/PropertyRoomDetails";
import PropertyAmenities from "@/components/property-detail/PropertyAmenities";
import PropertyLocationSection from "@/components/property-detail/PropertyLocationSection";
import PropertyBookingSidebar from "@/components/property-detail/PropertyBookingSidebar";
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
    <div className="bg-[#f8faf9] pb-2">
      <PropertyDetailHeader property={property} />

      <div className="space-y-6 py-5">
        <PropertyGallery images={images} title={property.title} property={property} />
        <PropertyTitleSection property={property} layout={layout} />

        <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
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
    </div>
  );
}
