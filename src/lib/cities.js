import data from "@/data/data.json";

const CITY_ALIASES = {
  Noida: ["noida", "greater noida", "delhi ncr"],
};

export function normalizeCity(city = "") {
  const value = city.trim();
  if (!value) return "";

  const direct = data.cities.find((c) => c.toLowerCase() === value.toLowerCase());
  if (direct) return direct;

  const lower = value.toLowerCase();
  for (const [canonical, aliases] of Object.entries(CITY_ALIASES)) {
    if (aliases.some((a) => lower.includes(a)) || lower.includes(canonical.toLowerCase())) {
      return canonical;
    }
  }
  return value;
}
