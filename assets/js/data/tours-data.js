/**
 * WanderWave - Mock Datasets
 * Managed by: Member 3 & Member 2
 */

const TOURS_DATA = [
  {
    id: "tour-01",
    title: "Enchanting Bali & Nusa Penida Island Expedition",
    destination: "Bali",
    country: "Indonesia",
    category: "Beach",
    durationDays: 7,
    durationNights: 6,
    price: 899,
    originalPrice: 1099,
    rating: 4.9,
    reviewsCount: 128,
    badge: "Bestseller",
    maxGroupSize: 12,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    featured: true,
    overview: "Immerse yourself in Bali's rich cultural heritage, dramatic cliffside coastlines, sacred water temples, and pristine crystal-clear lagoons of Nusa Penida.",
    highlights: [
      "Speedboat adventure to Kelingking Secret Point & Broken Beach",
      "Traditional Balinese cooking class in Ubud royal village",
      "Sunrise trek over Mount Batur volcano with hot spring soak",
      "Sunset seafood banquet at Jimbaran Bay on the beach"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Denpasar & Ubud Cultural Transfer", description: "Airport pickup, check-in to jungle luxury resort in Ubud, welcome dinner and Balinese dance performance." },
      { day: 2, title: "Tegalalang Rice Terraces & Sacred Monkey Forest", description: "Morning hike through emerald terraces, swing over the valley, followed by spiritual blessing at Tirta Empul." },
      { day: 3, title: "Mount Batur Sunrise Trekking & Hot Springs", description: "Early morning guided trek to the caldera, breakfast at the summit, followed by natural volcanic thermal baths." },
      { day: 4, title: "Speedboat Crossing to Nusa Penida Island", description: "Explore iconic Kelingking 'T-Rex' cliff, snorkel with gentle manta rays at Crystal Bay." },
      { day: 5, title: "Diamond Beach & Tree House Viewpoint", description: "Visit the world-famous cliff stairs, Raja Lima panorama, and return by catamaran to Sanur." },
      { day: 6, title: "Uluwatu Sunset Temple & Kecak Fire Dance", description: "Leisure morning in Seminyak, afternoon cliff walk at Uluwatu and breathtaking open-air amphitheater fire dance." },
      { day: 7, title: "Souvenir Shopping & Airport Departure", description: "Artisan craft market visit, relaxing 90-minute Balinese massage, and transfer to Ngurah Rai Airport." }
    ],
    inclusions: [
      "6 Nights Luxury 4-Star Resort Accommodation",
      "Daily gourmet buffet breakfast & 4 curated dinners",
      "Private AC vehicle transfers and island speedboats",
      "Certified English-speaking local tour guide",
      "All national park & temple entry tickets"
    ],
    exclusions: [
      "International airfares",
      "Personal travel insurance",
      "Optional water sports activities"
    ]
  },
  {
    id: "tour-02",
    title: "Swiss Alps Majesty: Glacier Express & Jungfraujoch",
    destination: "Interlaken & Zermatt",
    country: "Switzerland",
    category: "Mountain",
    durationDays: 8,
    durationNights: 7,
    price: 1850,
    originalPrice: 2199,
    rating: 5.0,
    reviewsCount: 94,
    badge: "Luxury Choice",
    maxGroupSize: 10,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    featured: true,
    overview: "Traverse high alpine meadows, towering peaks of the Matterhorn, ride the world-renowned Glacier Express, and ascend Jungfraujoch — Top of Europe.",
    highlights: [
      "First-class panoramic ride aboard the legendary Glacier Express",
      "Cogwheel train ride up to 3,454m at Jungfraujoch Ice Palace",
      "Scenic Lake Brienz steam cruise and Giessbach Falls hike",
      "Fondue & raclette evening in historic alpine chalet"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Zurich & Scenic Train to Lucerne", description: "Meet tour director, stroll Chapel Bridge and old town, lakeside welcome reception." },
      { day: 2, title: "Mount Pilatus Golden Roundtrip", description: "Boat ride across Lake Lucerne, world's steepest cogwheel railway, and aerial dragon ride descent." },
      { day: 3, title: "Interlaken Gateway & Lauterbrunnen 72 Waterfalls", description: "Wander through the valley of waterfalls, Trümmelbach glacial chutes, and stay in Interlaken." },
      { day: 4, title: "Jungfraujoch - Top of Europe Expedition", description: "Ascent via the Eiger Express gondola, walk inside the Ice Palace, and view the Aletsch Glacier." },
      { day: 5, title: "Boarding the Glacier Express to Zermatt", description: "Full day journey through 91 tunnels and across 291 bridges with panoramic mountain vistas." },
      { day: 6, title: "Matterhorn Glacier Paradise", description: "Gornergrat railway viewing platform, reflecting alpine lakes, and optional glacier skiing." },
      { day: 7, title: "Zermatt Alpine Villages & Farewell Gala Dinner", description: "Explore car-free Zermatt, artisanal Swiss chocolate tasting, and private cheese fondue banquet." },
      { day: 8, title: "Scenic Transfer to Zurich & Farewell", description: "Return express rail to Zurich International Airport for return flights." }
    ],
    inclusions: [
      "7 Nights 4/5-star Alpine Boutique Hotels",
      "8-Day Swiss Travel Pass (Unlimited Trains, Buses & Boats)",
      "Glacier Express Seat Reservation & 3-Course Lunch on board",
      "Jungfraujoch & Gornergrat mountain excursions",
      "Daily Swiss artisan breakfast"
    ],
    exclusions: [
      "Long-haul flights to/from Zurich",
      "Personal ski equipment rentals",
      "Gratuities for mountain guides"
    ]
  },
  {
    id: "tour-03",
    title: "Golden Triangle & Rajasthan Royal Palaces",
    destination: "Delhi, Agra, Jaipur & Udaipur",
    country: "India",
    category: "Cultural",
    durationDays: 9,
    durationNights: 8,
    price: 749,
    originalPrice: 950,
    rating: 4.8,
    reviewsCount: 162,
    badge: "Cultural Wonder",
    maxGroupSize: 14,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    featured: true,
    overview: "Discover India's imperial history: the Taj Mahal at sunrise, pink sandstone fortresses of Jaipur, and fairy-tale lake palaces of Udaipur.",
    highlights: [
      "Sunrise VIP entry to the magnificent Taj Mahal with historian",
      "Private boat cruise across Lake Pichola overlooking Udaipur City Palace",
      "Elephant sanctuary or jeep safari up to Amber Fort in Jaipur",
      "Street food safari in Old Delhi Chandni Chowk rickshaws"
    ],
    itinerary: [
      { day: 1, title: "Arrival in New Delhi", description: "Traditional garland welcome, transfer to hotel, briefing dinner." },
      { day: 2, title: "Old & New Delhi Heritage Tour", description: "Rickshaw ride in Chandni Chowk, Jama Masjid, Qutub Minar, and India Gate drive." },
      { day: 3, title: "Express Highway to Agra & Agra Fort", description: "Drive to Agra, tour the massive red sandstone Agra Fort, sunset view of Taj Mahal from Mehtab Bagh." },
      { day: 4, title: "Taj Mahal Sunrise & Fatehpur Sikri to Jaipur", description: "Witness the marble monument glow at dawn, visit deserted Mughal city Fatehpur Sikri on route to the Pink City." },
      { day: 5, title: "Amber Fort & Royal City Palace of Jaipur", description: "Ascend Amber Fort, photograph Hawa Mahal (Palace of Winds), and royal astronomical observatory Jantar Mantar." },
      { day: 6, title: "Jaipur to the City of Lakes (Udaipur)", description: "Scenic transfer across the Aravalli hills, stopping at the white marble Ranakpur Jain Temples." },
      { day: 7, title: "Udaipur City Palace & Lake Pichola Cruise", description: "Explore Rajasthan's largest palace complex, private royal museum, and tranquil boat cruise to Jag Mandir." },
      { day: 8, title: "Saheliyon-ki-Bari & Rajasthani Folk Evening", description: "Gardens of the Royal Maidens, Bagore Ki Haveli folk dance show, and rooftop farewell feast." },
      { day: 9, title: "Departure from Udaipur or Delhi", description: "Morning breakfast and flight connection back to New Delhi for departure." }
    ],
    inclusions: [
      "8 Nights Heritage Haveli & 5-Star Hotel Stays",
      "Private chauffeur-driven luxury vehicle throughout",
      "Government-licensed heritage historians at all monuments",
      "All palace and monument entrance fees",
      "Sunset boat cruise on Lake Pichola"
    ],
    exclusions: [
      "International flights and visa fees",
      "Camera fees inside certain monuments",
      "Personal gratuities"
    ]
  },
  {
    id: "tour-04",
    title: "Greek Isles Romance: Athens, Mykonos & Santorini",
    destination: "Santorini & Mykonos",
    country: "Greece",
    category: "Honeymoon",
    durationDays: 7,
    durationNights: 6,
    price: 1420,
    originalPrice: 1690,
    rating: 4.95,
    reviewsCount: 210,
    badge: "Trending",
    maxGroupSize: 12,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    featured: true,
    overview: "White-washed cliffside villages, cobblestone alleys draped in bougainvillea, Aegean blue domes, and world-renowned sunsets over the Santorini caldera.",
    highlights: [
      "Private sunset catamaran cruise in Santorini with BBQ and volcanic hot springs",
      "Walking tour of Acropolis and Parthenon in Athens",
      "Sunset cocktails in Little Venice, Mykonos beside the historic windmills",
      "Wine tasting tour visiting 3 authentic cliffside volcanic vineyards"
    ],
    itinerary: [
      { day: 1, title: "Athens Gateway & Plaka Stroll", description: "Arrive in Athens, rooftop welcome drinks overlooking illuminated Acropolis." },
      { day: 2, title: "Acropolis & High-Speed Ferry to Mykonos", description: "Guided Acropolis exploration, board ferry across the Aegean Sea, evening in Mykonos town." },
      { day: 3, title: "Delos Island Ruins & Beach Club Afternoon", description: "Short ferry to sacred sanctuary of Apollo on Delos, afternoon relax at Super Paradise beach." },
      { day: 4, title: "Ferry to Santorini Caldera", description: "Spectacular arrival by sea into the volcanic caldera, check-in to cave suite in Oia." },
      { day: 5, title: "Oia to Fira Caldera Trail & Wine Tasting", description: "Scenic cliffside hike, visit family-owned Assyrtiko wineries with sommelier pairings." },
      { day: 6, title: "Luxury Catamaran Cruise & Red Beach", description: "Snorkel in warm volcanic waters, grilled Greek banquet on board, and sunset viewed from the water." },
      { day: 7, title: "Santorini Farewell", description: "Morning espresso overlooking the Aegean sea, transfer to Thira Airport for departure." }
    ],
    inclusions: [
      "6 Nights Boutique Cave & Sea-View Suites",
      "High-speed ferry tickets between Athens, Mykonos & Santorini",
      "Semi-private catamaran cruise with meals & open bar",
      "Daily Greek breakfast spreads with fresh local produce",
      "Private transfers between ports, hotels, and airports"
    ],
    exclusions: [
      "Air travel to Athens and from Santorini",
      "City stay hotel taxes (payable locally)",
      "Personal purchases"
    ]
  },
  {
    id: "tour-05",
    title: "Serengeti Great Migration & Ngorongoro Safari",
    destination: "Serengeti & Ngorongoro",
    country: "Tanzania",
    category: "Adventure",
    durationDays: 6,
    durationNights: 5,
    price: 1680,
    originalPrice: 1950,
    rating: 4.9,
    reviewsCount: 88,
    badge: "Wildlife Special",
    maxGroupSize: 6,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    featured: false,
    overview: "Witness earth's most spectacular wildlife spectacle. Roam endless Serengeti savannahs, search for the Big Five, and descend into the breathtaking Ngorongoro Crater.",
    highlights: [
      "Track lions, leopards, rhinos, elephants, and cape buffaloes with expert spotter",
      "Descend 600m into the UNESCO World Heritage Ngorongoro Crater",
      "Optional hot air balloon safari over the vast savannah at sunrise",
      "Authentic cultural interaction with Maasai warriors"
    ],
    itinerary: [
      { day: 1, title: "Kilimanjaro to Tarangire National Park", description: "Meet ranger, game drive along Tarangire river famous for vast elephant herds and baobab trees." },
      { day: 2, title: "Journey to the Endless Serengeti Plains", description: "Traverse the Great Rift Valley, enter Serengeti via Naabi Hill with afternoon predator tracking." },
      { day: 3, title: "Full Day Serengeti Game Drive", description: "Sunrise safari following the wildebeest herds, hippo pools, and kopjes where lions bask." },
      { day: 4, title: "Serengeti to Ngorongoro Conservation Area", description: "Morning safari, visit Olduvai Gorge 'Cradle of Humankind', arrive at rim lodge." },
      { day: 5, title: "Ngorongoro Crater Floor Safari", description: "Full day in the caldera basin with highest concentration of wild predators and black rhinos." },
      { day: 6, title: "Return to Arusha & Airport Departure", description: "Souvenir shopping at Arusha Cultural Heritage Center, transfer to JRO Airport." }
    ],
    inclusions: [
      "5 Nights Luxury Tented Safari Lodges",
      "Custom 4x4 Land Cruiser with pop-up roof and guaranteed window seat",
      "All national park conservation & crater service fees",
      "All meals (Breakfast, picnic safari lunches, 3-course dinners)",
      "Unlimited bottled mineral water on game drives"
    ],
    exclusions: [
      "International flights",
      "Tanzania tourist visa",
      "Balloon safari upgrade",
      "Tips for safari guide"
    ]
  },
  {
    id: "tour-06",
    title: "Kyoto & Tokyo: Cherry Blossoms & Ancient Shrines",
    destination: "Tokyo & Kyoto",
    country: "Japan",
    category: "Cultural",
    durationDays: 8,
    durationNights: 7,
    price: 1590,
    originalPrice: 1800,
    rating: 4.92,
    reviewsCount: 145,
    badge: "Popular",
    maxGroupSize: 12,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    featured: false,
    overview: "A mesmerizing harmony of ultra-futuristic neon metropolis and peaceful ancient Zen temples, bamboo forests, tea ceremonies, and Mount Fuji vistas.",
    highlights: [
      "Bullet train (Shinkansen) ride at 320 km/h past Mount Fuji",
      "Walk through thousands of vermilion Torii gates at Fushimi Inari Taisha",
      "Private tea ceremony in an authentic Kyoto Machiya townhouse",
      "Tokyo night culinary tour through Shibuya and Shinjuku alleyways"
    ],
    itinerary: [
      { day: 1, title: "Tokyo Arrival & Shinjuku Neon Walk", description: "Welcome to Tokyo, check-in, orientation walk through Shinjuku neon gardens." },
      { day: 2, title: "Ancient Asakusa & Futuristic Shibuya", description: "Senso-ji oldest temple, Tokyo Skytree panorama, and crossing Shibuya scramble." },
      { day: 3, title: "Mount Fuji & Lake Kawaguchi Day Trip", description: "Cable car up Mount Tenjo, serene lakeside walk, and seasonal flower gardens." },
      { day: 4, title: "Shinkansen Bullet Train to Imperial Kyoto", description: "High-speed rail journey, check-in, afternoon stroll through historic Gion geisha district." },
      { day: 5, title: "Kinkaku-ji Golden Pavilion & Arashiyama Bamboo Grove", description: "Marvel at the gold-leaf Zen temple, walk through towering bamboo stalks, visit monkey park." },
      { day: 6, title: "Fushimi Inari Shrine & Nara Deer Park", description: "Early morning hike through Torii gates, train to Nara to interact with friendly bowing deer." },
      { day: 7, title: "Kyoto Artisan Crafts & Traditional Kaiseki Banquet", description: "Sake brewery visit, traditional pottery workshop, farewell multi-course kaiseki dinner." },
      { day: 8, title: "Kansai or Tokyo Airport Departure", description: "Morning breakfast, souvenir shopping at Kyoto station, transfer to airport." }
    ],
    inclusions: [
      "7 Nights 4-Star Western & Traditional Ryokan Accommodations",
      "7-Day Japan Rail Pass (JR Shinkansen included)",
      "Daily breakfast & 3 specialty dinners (Kaiseki included)",
      "Experienced bilingual Japanese cultural guide",
      "All temple, garden, and museum entry permits"
    ],
    exclusions: [
      "Flights to/from Japan",
      "Personal pocket Wi-Fi rental",
      "Optional Kimono rental"
    ]
  }
];

const DESTINATIONS_DATA = [
  { id: "dest-1", name: "Bali & Islands", country: "Indonesia", tourCount: 12, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80", tag: "Tropical Island" },
  { id: "dest-2", name: "Swiss Alps", country: "Switzerland", tourCount: 8, image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=500&q=80", tag: "Alpine Wonderland" },
  { id: "dest-3", name: "Rajasthan & Delhi", country: "India", tourCount: 15, image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80", tag: "Imperial Heritage" },
  { id: "dest-4", name: "Greek Isles", country: "Greece", tourCount: 10, image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=80", tag: "Aegean Romance" },
  { id: "dest-5", name: "Serengeti & Rift", country: "Tanzania", tourCount: 6, image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=500&q=80", tag: "Wild Safari" },
  { id: "dest-6", name: "Tokyo & Kyoto", country: "Japan", tourCount: 9, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80", tag: "Zen & Neon" }
];

// Initial default user & bookings for simulation
const DEFAULT_USER = {
  name: "Ketan Verma",
  email: "ketan.verma@example.com",
  phone: "+91 98765 43210",
  memberSince: "January 2026",
  passportNumber: "Z9817263",
  nationality: "Indian",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  tier: "Elite Explorer"
};

const DEFAULT_BOOKINGS = [
  {
    bookingId: "WW-74921",
    tourId: "tour-01",
    tourTitle: "Enchanting Bali & Nusa Penida Island Expedition",
    destination: "Bali, Indonesia",
    bookingDate: "2026-08-15",
    travelDate: "2026-10-10",
    travelers: 2,
    totalAmount: 1798,
    status: "Confirmed",
    paymentStatus: "Paid",
    hotelCategory: "4-Star Luxury Resort"
  },
  {
    bookingId: "WW-61802",
    tourId: "tour-03",
    tourTitle: "Golden Triangle & Rajasthan Royal Palaces",
    destination: "Rajasthan, India",
    bookingDate: "2026-05-20",
    travelDate: "2026-07-04",
    travelers: 1,
    totalAmount: 749,
    status: "Completed",
    paymentStatus: "Paid",
    hotelCategory: "Heritage Haveli"
  }
];

// Initialize LocalStorage with mock data if not already present
(function initStorage() {
  if (!localStorage.getItem('wanderwave_tours')) {
    localStorage.setItem('wanderwave_tours', JSON.stringify(TOURS_DATA));
  }
  if (!localStorage.getItem('wanderwave_user')) {
    localStorage.setItem('wanderwave_user', JSON.stringify(DEFAULT_USER));
  }
  if (!localStorage.getItem('wanderwave_bookings')) {
    localStorage.setItem('wanderwave_bookings', JSON.stringify(DEFAULT_BOOKINGS));
  }
})();
