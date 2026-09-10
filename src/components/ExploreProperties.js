import ExploreCarouselSection from "@/components/ExploreCarouselSection";
import { getAllProperties } from "@/data/properties";

export default function ExploreProperties({ items, title = "Explore Properties", viewAllHref = "/search?city=Noida" }) {
  const properties = items ?? getAllProperties().slice(0, 12);

  return (
    <ExploreCarouselSection
      title={title}
      subtitle="Handpicked verified listings across top cities"
      viewAllHref={viewAllHref}
      items={properties}
    />
  );
}
