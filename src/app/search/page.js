import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";

export const metadata = {
  title: "Search Properties — Property Rent Wala",
  description: "Find verified properties near your location.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-gray-50 text-sm text-muted">
          Loading search...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
