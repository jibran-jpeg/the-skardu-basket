export const storeConfig = {
    name: "The Skardu Basket",
    description: "Pure Gold from the Mountains",
    currency: "PKR ",
    theme: {
        primaryColor: "#0B0C10", // Deep Midnight Blue
        secondaryColor: "#1F2833", // Metallic Blue
        backgroundColor: "#0B0C10",
        textColor: "#C5C6C7", // Silver/Light Grey
    },
    contact: {
        email: "hello@skarduorganics.com",
        phone: "+92 300 1234567"
    },
    heroImage: "/images/skardu_store_hero_1769581311780.png",
    categories: [
        {
            id: "seasonal-fruits",
            name: "Seasonal Fruits",
            image: "/images/category_seasonal_fruits_1769544699911.png",
            description: "Freshly picked seasonal delights."
        },
        {
            id: "dry-fruits",
            name: "Dry Fruits",
            image: "/images/category_dry_fruits_1769544683514.png",
            description: "Premium sun-dried fruits from the valleys."
        },
        {
            id: "shilajeet",
            name: "Shilajit",
            image: "/images/category_shilajeet_1769544740526.png",
            description: "The gold of the mountains."
        },
        {
            id: "organic-essentials",
            name: "Jams, Oils & Green Tea",
            image: "/images/category_organic_essentials_1769544725750.png",
            description: "Natural remedies and breakfast staples."
        }
    ],
    products: [
        // Shilajit (Flagship)
        {
            id: 1,
            name: "Gold Grade Shilajit Resin",
            categoryId: "shilajeet",
            price: 2500,
            image: "/images/products/shilajit_main.png",
            description: "Harvested from the highest altitudes of the Karakoram range, our Gold Grade Shilajit is purified using traditional sun-drying methods to preserve its potent mineral content. Known as the 'Conqueror of Mountains', it boosts energy, immunity, and vitality naturally.",
            rating: 4.9,
            reviews: 342,
            isNew: false,
            badge: "Best Seller",
            origin: "Skardu Valley (16,000ft)",
            highlights: [
                "100% Pure & Organic",
                "Rich in Fulvic Acid",
                "Natural Energy Booster",
                "Lab Tested for Purity"
            ],
            variants: [
                { weight: "15g", price: 2500, image: "/images/products/shilajit_15g.png" },
                { weight: "30g", price: 4500, image: "/images/products/shilajit_30g.png" },
                { weight: "50g", price: 7000, image: "/images/products/shilajit_50g.png" }
            ]
        },

        // Seasonal Fruits (The Big Three)
        {
            id: 2,
            name: "Golden Skardu Apricots",
            categoryId: "seasonal-fruits",
            price: 850,
            image: "/images/products/fresh_apricots_main.png",
            description: "Hand-picked at dawn, these sun-kissed apricots are bursting with sweet nectar. Grown in the pristine air of Skardu, they offer a unique floral aroma and juicy texture that you won't find anywhere else.",
            rating: 4.8,
            reviews: 156,
            seasonalStatus: "harvesting-now",
            harvestDate: "July 20, 2026",
            origin: "Shigar Valley Orchards",
            highlights: [
                "Picked & Shipped within 24hrs",
                "Pesticide-Free",
                "Extremely Juicy",
                "Rich in Vitamin A & C"
            ],
            variants: [
                { weight: "2kg Box", price: 1600, image: "/images/products/fresh_apricots_2kg.png" },
                { weight: "5kg Box", price: 3800, image: "/images/products/fresh_apricots_5kg.png" },
                { weight: "10kg Box", price: 7200, image: "/images/products/fresh_apricots_10kg.png" }
            ]
        },
        {
            id: 3,
            name: "Royal Black Cherries",
            categoryId: "seasonal-fruits",
            price: 1800,
            image: "/images/products/cherries_main.png",
            description: "Our premium Royal Black Cherries are famous for their deep color and intense sweetness. These heart-shaped jewels are currently ripening on the trees and will be ready for harvest very soon.",
            rating: 5.0,
            reviews: 89,
            seasonalStatus: "starting-soon",
            harvestDate: "August 5, 2026",
            origin: "Kachura Lake Farms",
            highlights: [
                "Premium Export Quality",
                "Intense Sweet Flavor",
                "Hand-Selected",
                "Antioxidant Powerhouse"
            ],
            variants: [
                { weight: "1kg Box", price: 1800, image: "/images/products/cherries_1kg.png" },
                { weight: "2kg Box", price: 3500, image: "/images/products/cherries_2kg.png" }
            ]
        },
        {
            id: 4,
            name: "Himalayan White Mulberries",
            categoryId: "seasonal-fruits",
            price: 650,
            image: "/images/dried_mulberries_1769544974588.png",
            description: "A rare treat from the Himalayas, these dried white mulberries are like nature's candy. The season is drawing to a close, so grab these sweet, chewy delights before they are gone for the year.",
            rating: 4.7,
            reviews: 45,
            seasonalStatus: "ending-soon",
            harvestDate: "June 15, 2026",
            origin: "Khaplu Village",
            highlights: [
                "Rare Variety",
                "Naturally Sweet",
                "Great Snack",
                "High in Iron"
            ],
            variants: [
                { weight: "500g Basket", price: 650, image: "/images/dried_mulberries_1769544974588.png" },
                { weight: "1kg Basket", price: 1200, image: "/images/dried_mulberries_1769544974588.png" }
            ]
        },

        // Dry Fruits (Single Premium Item)
        {
            id: 5,
            name: "Organic Sun-Dried Apricots",
            categoryId: "dry-fruits",
            price: 1200,
            image: "/images/dried_apricots_1769544779068.png",
            description: "Preserved naturally under the Skardu sun, these dried apricots retain their intense flavor and nutritional value. A staple of the Hunza longevity diet, they are perfect for snacking or baking.",
            rating: 4.8,
            reviews: 210,
            origin: "Hunza & Skardu",
            highlights: [
                "No Added Sugar",
                "No Preservatives",
                "High Fiber Content",
                "Traditional Drying Method"
            ],
            variants: [
                { weight: "500g Pack", price: 1200, image: "/images/apricots_500g.png" },
                { weight: "1kg Pack", price: 2300, image: "/images/apricots_1kg.png" }
            ]
        },

        // Organic Essentials (Single Premium Item)
        {
            id: 6,
            name: "Wild Cherry Jam",
            categoryId: "organic-essentials",
            price: 950,
            image: "/images/cherry_jam_1769544820975.png",
            description: "Made from wild-harvested cherries found in remote valleys, this jam is cooked in small batches using traditional copper pots. It contains whole fruit chunks and uses only natural apple pectin.",
            rating: 4.9,
            reviews: 128,
            isNew: true,
            origin: "Deosai Plains Border",
            highlights: [
                "Whole Fruit Chunks",
                "Low Sugar",
                "Small Batch Production",
                "No Artificial Colors"
            ],
            variants: [
                { weight: "350g Jar", price: 950, image: "/images/jam_300g.png" },
                { weight: "700g Jar", price: 1800, image: "/images/jam_600g.png" }
            ]
        }
    ]
};
