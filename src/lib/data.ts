export const categories = [
    {
        name: "Hot Wheels",
        slug: "hot-wheels",
        description: "The definitive archive of high-performance die-cast machinery and engineering.",
        image: "/assets/categories/hot-wheels-banner.jpg",
        subcategories: [
            { name: "Mainline Cars", slug: "mainline", description: "The essential foundation for any serious collector's garage." },
            { name: "Premium Cars", slug: "premium", description: "Elite-tier editions featuring superior detailing and archival quality." },
            { name: "Car Packs", slug: "packs", description: "Curated sets designed for immediate collection expansion." },
            { name: "Monster Trucks", slug: "monster-trucks", description: "Heavy-duty engineering built for extreme high-impact performance." },
            { name: "Track Sets", slug: "track-sets", description: "Professional-grade racing systems and kinetic sculpture playsets." },
            { name: "Movie & Character Cars", slug: "character-cars", description: "The intersection of cinematic history and die-cast excellence." }
        ]
    },
    {
        name: "Display Stands",
        slug: "stands",
        description: "Architectural solutions for the professional presentation of your automotive collection.",
        image: "/assets/categories/stands.jpg",
        subcategories: [
            { name: "Honeycomb", slug: "honeycomb", description: "Modular hexagonal display systems for geometric precision." },
            { name: "Single Stand", slug: "single-stand", description: "Minimalist solo presentation for high-priority acquisitions." },
            { name: "Dual Rack Stand", slug: "dual-rack", description: "Optimized dual-car setups for rival pairs and twin sets." },
            { name: "5 Rack Stand", slug: "five-rack", description: "High-density archival racks for efficient collection management." },
            { name: "Display Case", slug: "display-case", description: "Museum-grade protection for your most valuable assets." }
        ]
    }
];

export const products = [
    // Hot Wheels - Mainline
    {
        id: "hw-m1",
        name: "'71 Datsun 510 Mainline",
        price: 399,
        category: "hot-wheels",
        subcategory: "mainline",
        slug: "71-datsun-510-mainline",
        stock: 50,
        isNew: true,
        image: "/assets/products/datsun-mainline.jpg",
    },
    {
        id: "hw-m2",
        name: "Nissan Skyline GT-R (R34)",
        price: 499,
        category: "hot-wheels",
        subcategory: "mainline",
        slug: "skyline-r34-mainline",
        stock: 25,
        isNew: false,
        image: "/assets/products/skyline-mainline.jpg",
    },
    {
        id: "hw-m3",
        name: "Toyota Supra (A80)",
        price: 499,
        category: "hot-wheels",
        subcategory: "mainline",
        slug: "toyota-supra-mainline",
        stock: 30,
        isNew: true,
        image: "/assets/products/download-11.jpg",
    },
    // Hot Wheels - Premium
    {
        id: "hw-p1",
        name: "Car Culture: Porsche 911 GT3 RS",
        price: 1299,
        category: "hot-wheels",
        subcategory: "premium",
        slug: "porsche-911-premium",
        stock: 10,
        isNew: true,
        image: "/assets/products/porsche-premium.jpg",
    },
    {
        id: "hw-p2",
        name: "Boulevard: LB-ER34 Super Silhouette",
        price: 1499,
        category: "hot-wheels",
        subcategory: "premium",
        slug: "skyline-silhouette-premium",
        stock: 5,
        isNew: true,
        image: "/assets/products/hot-wheels-lincoln.jpg",
    },
    // Hot Wheels - Packs
    {
        id: "hw-pk1",
        name: "Exotics 5-Pack",
        price: 1599,
        category: "hot-wheels",
        subcategory: "packs",
        slug: "exotics-5-pack",
        stock: 20,
        isNew: true,
        image: "/assets/products/5-pack.jpg",
    },
    // Hot Wheels - Monster Trucks
    {
        id: "hw-mt1",
        name: "Bigfoot Monster Truck",
        price: 899,
        category: "hot-wheels",
        subcategory: "monster-trucks",
        slug: "bigfoot-monster-truck",
        stock: 15,
        isNew: true,
        image: "/assets/products/monster-truck.jpg",
    },
    // Hot Wheels - Track Sets
    {
        id: "hw-ts1",
        name: "Ultimate Garage Playset",
        price: 12999,
        category: "hot-wheels",
        subcategory: "track-sets",
        slug: "ultimate-garage-track",
        stock: 5,
        isNew: true,
        image: "/assets/products/track-set.jpg",
    },
    // Hot Wheels - Character Cars
    {
        id: "hw-cc1",
        name: "Batman: Batmobile (1989)",
        price: 699,
        category: "hot-wheels",
        subcategory: "character-cars",
        slug: "batmobile-1989",
        stock: 12,
        isNew: false,
        image: "/assets/products/batmobile.jpg",
    },
    // Stands
    {
        id: "st-1",
        name: "Honeycomb Hex Display",
        price: 3499,
        category: "stands",
        subcategory: "honeycomb",
        slug: "honeycomb-hex",
        stock: 15,
        isNew: true,
        image: "/assets/products/honeycomb-stand.jpg",
    },
    {
        id: "st-2",
        name: "Eco-Acrylic Single Stand",
        price: 999,
        category: "stands",
        subcategory: "single-stand",
        slug: "single-stand-acrylic",
        stock: 100,
        isNew: false,
        image: "/assets/products/single-stand.jpg",
    },
    {
        id: "st-5",
        name: "Masterpiece Display Case",
        price: 8999,
        category: "stands",
        subcategory: "display-case",
        slug: "masterpiece-case",
        stock: 5,
        isNew: true,
        image: "/assets/products/display-case.jpg",
    }
];
