export default function PropertyConfiguration({ property, layout }) {
  const items = [];

  if (layout.isCommercial) {
    if (property.area) items.push({ label: "Area", value: property.area });
    if (property.floor) items.push({ label: "Floor", value: `${property.floor} of ${property.totalFloors || "—"}` });
    if (property.furnishing) items.push({ label: "Furnishing", value: property.furnishing });
  } else if (layout.isLand) {
    if (property.area) items.push({ label: "Plot Size", value: property.area });
    if (property.facing) items.push({ label: "Facing", value: property.facing });
    if (property.propertyAge) items.push({ label: "Age", value: property.propertyAge });
  } else {
    if (property.beds != null) items.push({ label: "Bedrooms", value: `${property.beds} BHK` });
    if (property.baths != null) items.push({ label: "Bathrooms", value: property.baths });
    if (property.area) items.push({ label: "Super Area", value: property.area });
    if (property.floor) items.push({ label: "Floor", value: `${property.floor} of ${property.totalFloors || "—"}` });
    if (property.facing) items.push({ label: "Facing", value: property.facing });
    if (property.furnishing) items.push({ label: "Furnishing", value: property.furnishing });
    if (property.propertyAge) items.push({ label: "Property Age", value: property.propertyAge });
  }

  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="text-base font-bold text-ink">Property Configuration</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg bg-gray-50 px-3 py-2.5">
            <p className="text-[11px] font-medium text-muted">{item.label}</p>
            <p className="mt-0.5 text-sm font-semibold capitalize text-ink">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
