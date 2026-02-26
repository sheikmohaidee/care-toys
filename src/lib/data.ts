export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'cars' | 'stands' | 'tracks' | 'limited' | 'packs' | 'exotic' | 'rc' | 'toys';
    image: string;
    isBestSeller?: boolean;
    description?: string;
    details?: string[];
    rating?: number;
    reviewsCount?: number;
    stock?: number;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Titanium Racer Edition',
        price: 49.99,
        category: 'limited',
        image: 'https://images.unsplash.com/photo-1594787318726-21f561ee610a?q=80&w=2070&auto=format&fit=crop',
        isBestSeller: true,
        description: 'Elite titanium-grade die-cast model with aerodynamically optimized chassis and precision-engineered wheels for ultimate racing performance.',
        details: [
            'Material: Grade 5 Titanium Alloy',
            'Scale: 1:64 Precision',
            'Wheels: Ultra-low friction bearings',
            'Special Edition: 1 of 500 units globally'
        ],
        rating: 4.9,
        reviewsCount: 128,
        stock: 5
    },
    {
        id: '2',
        name: 'Neon Drift Master',
        price: 19.99,
        category: 'cars',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop',
        description: 'High-energy drift car featuring neon accents and a weight-balanced body for spectacular cornering and high-speed maneuvers.',
        details: [
            'Material: High-Impact Polycarbonate',
            'Finish: UV-Reactive Neon Paint',
            'Specialty: Drift-optimized wheelbase',
            'Packaging: Collector window box'
        ],
        rating: 4.7,
        reviewsCount: 245,
        stock: 42
    },
    {
        id: '3',
        name: 'Pro Display Rack (50 Cars)',
        price: 34.99,
        category: 'stands',
        image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop',
        description: 'Professional-grade acrylic display rack designed to showcase up to 50 1:64 scale cars. Dust-proof and wall-mountable.',
        details: [
            'Material: UV-Resistant Polished Acrylic',
            'Capacity: 50 individual compartments',
            'Mounting: Integrated wall brackets',
            'Dimensions: 24" x 18" x 2"'
        ],
        rating: 4.8,
        reviewsCount: 89,
        stock: 15
    },
    {
        id: '4',
        name: 'Vertical Loop Track Set',
        price: 29.99,
        category: 'tracks',
        image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=2070&auto=format&fit=crop',
        description: 'Gravity-defying vertical loop track set with dual boosters and high-speed launchers for extreme racing action.',
        details: [
            'Launch Velocity: 200 MPH (scale speed)',
            'Loop Height: 18 inches',
            'Connectivity: Track-Link 2.0 compatible',
            'Batteries: 4x D (not included)'
        ],
        rating: 4.5,
        reviewsCount: 512,
        stock: 28
    },
    {
        id: '5',
        name: 'Bugatti Chiron Die-cast',
        price: 89.99,
        category: 'exotic',
        image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop',
        description: 'Masterpiece 1:43 scale recreation of the legendary Bugatti Chiron, featuring manual opening doors and a detailed interior.',
        details: [
            'Official Bugatti Licensed Product',
            'Scale: 1:43 Enthusiast Grade',
            'Interior: Full leather-look upholstery',
            'Engine: Visible W16 engine detail'
        ],
        rating: 5.0,
        reviewsCount: 67,
        stock: 3
    },
    {
        id: '6',
        name: 'RC Storm Chaser',
        price: 59.99,
        category: 'rc',
        image: '/images/rc-1.webp'
    },
    {
        id: '7',
        name: 'Lamborghini Aventador',
        price: 94.99,
        category: 'exotic',
        image: '/images/exotic-2.webp'
    },
    {
        id: '8',
        name: 'Monster Truck RC',
        price: 44.99,
        category: 'rc',
        image: '/images/rc-2.webp'
    },
    {
        id: '9',
        name: 'Classic Truck 1950',
        price: 15.99,
        category: 'toys',
        image: '/images/toy-1.webp'
    },
    {
        id: '10',
        name: 'Racer Pro-1',
        price: 24.99,
        category: 'cars',
        image: '/images/car-3.webp'
    },
    {
        id: '11',
        name: 'Racer Pro-2',
        price: 29.99,
        category: 'cars',
        image: '/images/car-4.webp'
    },
    {
        id: '12',
        name: 'Racer Pro-3',
        price: 34.99,
        category: 'exotic',
        image: '/images/car-5.webp'
    },
    {
        id: '13',
        name: 'Racer Pro-4',
        price: 39.99,
        category: 'rc',
        image: '/images/car-6.webp'
    },
    {
        id: '14',
        name: 'Racer Pro-5',
        price: 44.99,
        category: 'limited',
        image: '/images/car-7.webp'
    },
    {
        id: '15',
        name: 'Stealth Bomber RC',
        price: 129.99,
        category: 'rc',
        image: '/images/rc-3.webp'
    },
    {
        id: '16',
        name: 'Ferrari SF90 Stradale',
        price: 110.00,
        category: 'exotic',
        image: '/images/exotic-3.webp'
    },
    {
        id: '17',
        name: 'Vintage Speedster',
        price: 12.99,
        category: 'cars',
        image: '/images/car-8.webp'
    },
    {
        id: '18',
        name: 'Loop-de-Loop Track',
        price: 39.99,
        category: 'tracks',
        image: '/images/track-2.webp'
    },
    {
        id: '19',
        name: 'Action Figure Set',
        price: 19.99,
        category: 'toys',
        image: '/images/toy-2.webp'
    },
    {
        id: '20',
        name: 'Super Speed Crawler',
        price: 75.00,
        category: 'rc',
        image: '/images/rc-4.webp'
    },
    {
        id: '21',
        name: 'McLaren P1 GTR',
        price: 99.99,
        category: 'exotic',
        image: '/images/exotic-4.webp'
    },
    {
        id: '22',
        name: 'Track Booster Pack',
        price: 14.99,
        category: 'tracks',
        image: '/images/track-3.webp'
    },
    {
        id: '23',
        name: 'Display Cabinet XL',
        price: 64.99,
        category: 'stands',
        image: '/images/stand-2.webp'
    },
    {
        id: '24',
        name: 'Limited Gold Chassis',
        price: 199.99,
        category: 'limited',
        image: '/images/limited-2.webp'
    },
    {
        id: '25',
        name: 'Remote Control Yacht',
        price: 85.00,
        category: 'rc',
        image: '/images/rc-5.webp'
    }
];
