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
] as const;