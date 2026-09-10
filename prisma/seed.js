import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleProperties = [
  {
    slug: "modern-3bhk-sector-62-noida",
    title: "Modern 3 BHK Apartment",
    description:
      "Spacious 3 BHK apartment in prime Sector 62, Noida. Features modular kitchen, wide balcony, park-facing views, 24x7 security, and dedicated covered parking. Close to metro, schools, and corporate hubs.",
    category: "APARTMENT",
    listingType: "RENT",
    city: "Noida",
    locality: "Sector 62",
    address: "Tower B, Assotech Windsor Court, Sector 62, Noida, UP 201309",
    price: 32000,
    beds: 3,
    baths: 2,
    areaSqft: 1450,
    floor: "8",
    totalFloors: "18",
    furnishing: "Semi-Furnished",
    propertyAge: "1-3 years",
    facing: "East",
    badges: ["FEATURED", "VERIFIED", "READY TO MOVE"],
    amenities: ["Lift", "Power Backup", "Parking", "Security", "Gym", "Club House", "Wi-Fi"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    verified: true,
  },
  {
    slug: "zolo-nord-sector-43-noida",
    title: "Zolo Nord PG",
    description:
      "Premium co-living PG for working professionals and students. All meals included, high-speed Wi-Fi, daily housekeeping, gym, indoor games, and 24x7 CCTV security. Flexible rental plans available.",
    category: "PG",
    listingType: "RENT",
    city: "Noida",
    locality: "Sector 43",
    address: "Plot 12, Sector 43, Near Amity University, Noida, UP 201301",
    price: 12899,
    suitableFor: "Unisex",
    furnishing: "Fully Furnished",
    propertyAge: "0-1 year",
    badges: ["POPULAR", "CO-LIVING", "VERIFIED"],
    amenities: [
      "Wi-Fi",
      "Meals",
      "Housekeeping",
      "Gym",
      "24x7 Security",
      "Power Backup",
      "Laundry",
      "RO Water",
      "TV",
      "Indoor Games",
    ],
    availability: "Ready to Move",
    featureTags: ["All Meals Included", "High-Speed Wi-Fi", "Fully Furnished", "24x7 Security"],
    highlights: [
      "Close to Metro Station",
      "Flexible rental plans",
      "Managed co-living space",
      "No hidden charges",
    ],
    nearbyLocations: [
      { name: "Amrapali Sapphire", distance: "2.6 km" },
      { name: "Amity University", distance: "6.8 km" },
      { name: "Sector 43 Metro", distance: "1.2 km" },
    ],
    roomOptions: [
      {
        name: "Private Room",
        price: 12899,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80",
        furniture: ["Single bed", "Study table", "Wardrobe", "Chair"],
      },
      {
        name: "Two Sharing",
        price: 8999,
        image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=400&q=80",
        furniture: ["Single bed", "Wardrobe", "Study table"],
      },
      {
        name: "Three Sharing",
        price: 6999,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80",
        furniture: ["Single bed", "Wardrobe"],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    verified: true,
  },
  {
    slug: "luxury-villa-dlf-phase-3-gurugram",
    title: "Luxury 4 BHK Villa",
    description:
      "Independent 4 BHK villa in DLF Phase 3 with private garden, servant room, modular kitchen, and triple car parking. Gated community with club access and round-the-clock security.",
    category: "VILLA",
    listingType: "SELL",
    city: "Gurugram",
    locality: "DLF Phase 3",
    address: "Street 14, DLF Phase 3, Gurugram, Haryana 122002",
    price: 28500000,
    beds: 4,
    baths: 4,
    areaSqft: 3200,
    floor: "Ground + 1",
    totalFloors: "2",
    furnishing: "Semi-Furnished",
    propertyAge: "5-10 years",
    facing: "North-East",
    badges: ["FOR SALE", "VERIFIED", "FEATURED"],
    amenities: ["Parking", "Garden", "Power Backup", "Security", "Club House", "Swimming Pool"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    verified: true,
  },
  {
    slug: "2bhk-dwarka-delhi",
    title: "2 BHK Apartment in Dwarka",
    description:
      "Well-ventilated 2 BHK close to Dwarka metro station with park-facing balcony, wooden flooring in bedrooms, and reserved parking slot. Ideal for families.",
    category: "APARTMENT",
    listingType: "RENT",
    city: "Delhi",
    locality: "Dwarka",
    address: "Sector 10, Pocket 1, Dwarka, New Delhi 110075",
    price: 28000,
    beds: 2,
    baths: 2,
    areaSqft: 1050,
    floor: "5",
    totalFloors: "12",
    furnishing: "Fully Furnished",
    propertyAge: "3-5 years",
    facing: "South",
    badges: ["READY TO MOVE", "VERIFIED"],
    amenities: ["Lift", "Parking", "Power Backup", "Security", "Intercom"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    ],
    verified: true,
  },
  {
    slug: "koramangala-2bhk-bangalore",
    title: "2 BHK in Koramangala",
    description:
      "Modern 2 BHK near tech parks and cafes in Koramangala 5th Block. Fully furnished with AC in all rooms, modular kitchen, and high-speed internet ready setup.",
    category: "APARTMENT",
    listingType: "RENT",
    city: "Bangalore",
    locality: "Koramangala",
    address: "5th Block, Koramangala, Bangalore, Karnataka 560095",
    price: 25000,
    beds: 2,
    baths: 2,
    areaSqft: 1200,
    floor: "3",
    totalFloors: "5",
    furnishing: "Fully Furnished",
    propertyAge: "1-3 years",
    facing: "West",
    badges: ["FEATURED", "POPULAR"],
    amenities: ["Wi-Fi", "Gym", "Lift", "Parking", "Power Backup", "Security"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    verified: true,
  },
  {
    slug: "independent-house-vasundhara-ghaziabad",
    title: "Independent 3 BHK House",
    description:
      "Spacious independent house with terrace, front lawn, and separate servant quarter. Peaceful residential colony with easy access to NH-24 and metro.",
    category: "INDEPENDENT_HOUSE",
    listingType: "RENT",
    city: "Ghaziabad",
    locality: "Vasundhara",
    address: "Sector 2, Vasundhara, Ghaziabad, UP 201012",
    price: 35000,
    beds: 3,
    baths: 3,
    areaSqft: 1800,
    floor: "Ground + 1",
    totalFloors: "2",
    furnishing: "Semi-Furnished",
    propertyAge: "5-10 years",
    facing: "East",
    badges: ["VERIFIED", "READY TO MOVE"],
    amenities: ["Parking", "Garden", "Power Backup", "Security", "Water Supply"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    verified: true,
  },
  {
    slug: "builder-floor-sector-15-faridabad",
    title: "Builder Floor 3 BHK",
    description:
      "Premium builder floor with independent entry, marble flooring, modular kitchen, and rooftop access. Located in a well-maintained gated lane.",
    category: "BUILDER_FLOOR",
    listingType: "SELL",
    city: "Faridabad",
    locality: "Sector 15",
    address: "Huda Market Road, Sector 15, Faridabad, Haryana 121007",
    price: 12500000,
    beds: 3,
    baths: 3,
    areaSqft: 1650,
    floor: "2",
    totalFloors: "3",
    furnishing: "Unfurnished",
    propertyAge: "3-5 years",
    facing: "North",
    badges: ["FOR SALE", "NEW"],
    amenities: ["Parking", "Power Backup", "Security", "Lift"],
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe4c21fb2?auto=format&fit=crop&w=1200&q=80",
    ],
    verified: true,
  },
  {
    slug: "commercial-office-sector-135-noida",
    title: "Commercial Office Space",
    description:
      "Ready-to-move furnished office in Sector 135 with reception area, 4 cabins, open workstation zone, conference room, and pantry. Ideal for IT/startup teams.",
    category: "COMMERCIAL",
    listingType: "RENT",
    city: "Noida",
    locality: "Sector 135",
    address: "Advant Navis Business Park, Sector 135, Noida, UP 201301",
    price: 85000,
    areaSqft: 2200,
    floor: "6",
    totalFloors: "12",
    furnishing: "Fully Furnished",
    propertyAge: "1-3 years",
    facing: "East",
    badges: ["COMMERCIAL", "VERIFIED", "READY TO MOVE"],
    amenities: ["Parking", "Lift", "Power Backup", "Security", "Cafeteria", "Wi-Fi"],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    verified: true,
  },
  {
    slug: "studio-gomti-nagar-lucknow",
    title: "Studio Apartment",
    description:
      "Compact studio apartment perfect for singles or couples. Includes AC, wardrobe, kitchenette, and attached bathroom. Walking distance from Gomti Nagar metro.",
    category: "STUDIO",
    listingType: "RENT",
    city: "Lucknow",
    locality: "Gomti Nagar",
    address: "Vibhuti Khand, Gomti Nagar, Lucknow, UP 226010",
    price: 12000,
    beds: 1,
    baths: 1,
    areaSqft: 450,
    floor: "4",
    totalFloors: "8",
    furnishing: "Fully Furnished",
    propertyAge: "0-1 year",
    facing: "West",
    badges: ["NEW", "VERIFIED"],
    amenities: ["Lift", "Power Backup", "Security", "Parking", "Wi-Fi"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    verified: true,
  },
  {
    slug: "penthouse-south-delhi-gk1",
    title: "Luxury Penthouse 4 BHK",
    description:
      "Ultra-luxury penthouse with private terrace, jacuzzi, smart home automation, Italian marble flooring, and panoramic city views. Exclusive boutique building with concierge.",
    category: "PENTHOUSE",
    listingType: "SELL",
    city: "Delhi",
    locality: "Greater Kailash 1",
    address: "E Block, Greater Kailash 1, New Delhi 110048",
    price: 85000000,
    beds: 4,
    baths: 5,
    areaSqft: 4500,
    floor: "15",
    totalFloors: "15",
    furnishing: "Fully Furnished",
    propertyAge: "0-1 year",
    facing: "South-East",
    badges: ["FOR SALE", "FEATURED", "VERIFIED", "NEW"],
    amenities: [
      "Lift",
      "Parking",
      "Power Backup",
      "Security",
      "Gym",
      "Swimming Pool",
      "Club House",
      "Terrace",
      "Smart Home",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    verified: true,
  },
];

const propertyEnrichments = {
  "modern-3bhk-sector-62-noida": {
    availability: "Ready to Move",
    featureTags: ["Power Backup", "Parking", "Lift", "24x7 Security"],
    highlights: ["Prime Sector 62 location", "Metro connectivity", "Park facing", "No brokerage"],
    nearbyLocations: [
      { name: "Sector 62 Metro", distance: "0.8 km" },
      { name: "Fortis Hospital", distance: "2.1 km" },
      { name: "Wave Mall", distance: "3.5 km" },
    ],
  },
  "luxury-villa-dlf-phase-3-gurugram": {
    availability: "Ready to Move",
    featureTags: ["Private Garden", "Gated Community", "Club Access", "Parking"],
    highlights: ["DLF Phase 3 prime address", "Independent villa", "Triple car parking", "RERA registered"],
    nearbyLocations: [
      { name: "DLF Cyber City", distance: "4.2 km" },
      { name: "MG Road Metro", distance: "2.8 km" },
      { name: "Ambience Mall", distance: "3.1 km" },
    ],
  },
  "2bhk-dwarka-delhi": {
    availability: "Ready to Move",
    featureTags: ["Fully Furnished", "Metro Nearby", "Power Backup", "Parking"],
    highlights: ["Dwarka metro walkable", "Family friendly", "Reserved parking", "Park facing"],
    nearbyLocations: [
      { name: "Dwarka Sector 10 Metro", distance: "0.5 km" },
      { name: "DDA Sports Complex", distance: "1.2 km" },
      { name: "Vegas Mall", distance: "2.0 km" },
    ],
  },
  "koramangala-2bhk-bangalore": {
    availability: "Ready to Move",
    featureTags: ["High-Speed Wi-Fi", "Fully Furnished", "AC", "Gym"],
    highlights: ["Near tech parks", "Cafe culture hub", "Fully furnished", "Flexible lease"],
    nearbyLocations: [
      { name: "Forum Mall", distance: "1.5 km" },
      { name: "Koramangala Metro", distance: "2.2 km" },
      { name: "Embassy Tech Village", distance: "4.0 km" },
    ],
  },
  "independent-house-vasundhara-ghaziabad": {
    availability: "Ready to Move",
    featureTags: ["Garden", "Terrace", "Parking", "Power Backup"],
    highlights: ["Independent entry", "Servant quarter", "Peaceful colony", "NH-24 access"],
    nearbyLocations: [
      { name: "Vaishali Metro", distance: "2.5 km" },
      { name: "Mahagun Metro Mall", distance: "3.0 km" },
      { name: "Indirapuram Habitat", distance: "4.2 km" },
    ],
  },
  "builder-floor-sector-15-faridabad": {
    availability: "Ready to Move",
    featureTags: ["Independent Entry", "Marble Flooring", "Modular Kitchen", "Rooftop"],
    highlights: ["Premium builder floor", "Gated lane", "Marble finish", "Clear title"],
    nearbyLocations: [
      { name: "Sector 15 Market", distance: "0.3 km" },
      { name: "Escorts Hospital", distance: "2.8 km" },
      { name: "NH-44", distance: "1.5 km" },
    ],
  },
  "commercial-office-sector-135-noida": {
    availability: "Ready to Move",
    featureTags: ["Fully Furnished", "Conference Room", "Reception", "Pantry"],
    highlights: ["IT-ready office", "Business park location", "Furnished move-in", "Ample parking"],
    nearbyLocations: [
      { name: "Noida Expressway", distance: "0.5 km" },
      { name: "Sector 137 Metro", distance: "3.2 km" },
      { name: "Advant IT Park", distance: "0.2 km" },
    ],
  },
  "studio-gomti-nagar-lucknow": {
    availability: "Ready to Move",
    featureTags: ["Fully Furnished", "AC", "Wi-Fi", "Lift"],
    highlights: ["Metro walkable", "Ideal for singles", "Compact and modern", "Safe locality"],
    nearbyLocations: [
      { name: "Gomti Nagar Metro", distance: "0.4 km" },
      { name: "Indira Gandhi Pratishthan", distance: "1.8 km" },
      { name: "Phoenix Palassio", distance: "3.5 km" },
    ],
  },
  "penthouse-south-delhi-gk1": {
    availability: "Ready to Move",
    featureTags: ["Private Terrace", "Smart Home", "Jacuzzi", "Concierge"],
    highlights: ["Ultra-luxury penthouse", "Panoramic views", "Italian marble", "Exclusive building"],
    nearbyLocations: [
      { name: "Kailash Colony Metro", distance: "1.0 km" },
      { name: "Select Citywalk", distance: "2.5 km" },
      { name: "GK-1 M Block Market", distance: "0.6 km" },
    ],
  },
};

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      callNumber: process.env.ADMIN_MOBILE ? `+91${process.env.ADMIN_MOBILE}` : "+919876543210",
      whatsappNumber: process.env.ADMIN_MOBILE ? `+91${process.env.ADMIN_MOBILE}` : "+919876543210",
    },
  });

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@propertyrentwala.com").toLowerCase();
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existingAdmin) {
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: "ADMIN", name: process.env.ADMIN_NAME || "Admin" },
    });
  } else {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: process.env.ADMIN_NAME || "Admin",
        role: "ADMIN",
      },
    });
  }

  for (const p of sampleProperties) {
    const extra = propertyEnrichments[p.slug] || {};
    const data = {
      ...p,
      availability: p.availability || extra.availability || "Ready to Move",
      featureTags: p.featureTags || extra.featureTags || [],
      highlights: p.highlights || extra.highlights || [],
      nearbyLocations: p.nearbyLocations || extra.nearbyLocations || [],
    };
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: data,
      create: data,
    });
  }

  console.log(`Seed complete — ${sampleProperties.length} properties, admin: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
