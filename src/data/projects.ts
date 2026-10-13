export const projects = [
  {
    number: "01",
    slug: "guptodhan",
    title: "Guptodhan",
    category: "Multivendor Marketplace",

    description:
      "A full-stack multivendor platform combining e-commerce, Buy & Sell, service marketplace, vendor stores, donations, authentication, and real-time communication.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "NextAuth",
      "Tailwind CSS",
    ],

    image: "/projects/guptodhan-home.png",

    gallery: [
      "/projects/admin-dashboard.png",
      "/projects/vendor-dashboard.png",
      "/projects/product-detailspage.png",
      "/projects/buyandsell-page.png",
      "/projects/vendor-shoppage.png",
      "/projects/donation-page.png",
    ],

    video:
      "https://www.loom.com/share/beeeee0eb09140599a5c4385d451ae03",

    liveUrl: "https://guptodhan.com",

    githubUrl: "",

    features: [
      "E-commerce marketplace",
      "Buy & Sell marketplace",
      "Service marketplace",
      "Vendor stores",
      "Vendor dashboard",
      "Real-time chat",
      "Authentication",
      "Order management",
      "Donation system",
    ],
  },

  {
    number: "02",
    slug: "chapaghor",
    title: "Chapaghor",
    category: "E-commerce & Printing Platform",

    description:
      "A modern e-commerce platform for discovering and ordering printing, stationery, signage, gifts, and other customized products.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],

    image: "/projects/chapaghor-home.png",

    gallery: [],

    video: "",

    liveUrl: "https://beta-chapaghor.vercel.app/",

    githubUrl: "",

    features: [
      "Product browsing",
      "Product discovery",
      "Product details",
      "Shopping cart",
      "Checkout workflow",
      "Order management",
      "Responsive interface",
    ],
  },

  {
    number: "03",
    slug: "gadgethive",
    title: "GadgetHive",
    category: "E-commerce Platform",

    description:
      "A premium audio and gadget e-commerce platform with a storefront for headphones, speakers, and soundbars, plus an admin dashboard for managing products, categories, orders, and customers.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],

    image: "/projects/gadgethive/home-image.png",

    gallery: [
      "/projects/gadgethive/landing-page.png",
      "/projects/gadgethive/product-details.png",
      "/projects/gadgethive/dashboard.png",
      "/projects/gadgethive/technology.png",
      "/projects/gadgethive/support.png",
    ],

    video:
      "https://www.loom.com/share/ab4674a2e9c3457ab995830c430b372b",

    liveUrl: "https://gadget-hive.vercel.app/",

    githubUrl: "https://github.com/Moinuddin-dotcom/pixel-perfect-palette-901",

    features: [
      "Product catalog",
      "Product details with image gallery",
      "Shopping cart",
      "Sale pricing and stock tracking",
      "Admin dashboard with revenue and traffic analytics",
      "Category, product, and order management",
      "Customer management",
      "Support page with FAQ and contact form",
      "Newsletter subscription",
    ],
  },
] as const;
