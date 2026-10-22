export type Link = { label: string; href: string };

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/* ───────────────────────────── Profile ───────────────────────────── */

export const profile = {
  name: "Farhan Taufik Rahman",
  shortName: "Farhan",
  role: "Software Engineer",
  location: "Jakarta, Indonesia",
  availability: "Open to junior software engineer roles in Jakarta or remote",
  headline: "I build full-stack systems, then keep them running.",
  intro:
    "Six months of full-time building apps since Hacktiv8, four years of telecom engineering before that. " +
    "My latest project, Llama Express, is a real-time courier platform I designed, shipped, deployed and monitored on my own.",
  email: "farhanarrahman27@gmail.com",
  photo: {
    src: "/aku.png",
    alt: "Portrait of Farhan Taufik Rahman",
    width: 727,
    height: 1400,
  } satisfies ImageAsset,
  cv: "/cv/Farhan_Taufik_Rahman_CV.pdf",
  links: {
    github: "https://github.com/farhantaufikrahman",
    linkedin: "https://www.linkedin.com/in/farhan-taufik-rahman/",
  },
  siteUrl: "https://portfolio.vzkyrielight.my.id",
};

/* ───────────────────────── Featured project ───────────────────────── */

export const llama = {
  name: "Llama Express",
  tagline:
    "A real-time courier platform, from the first commit to production-style operations.",
  summary:
    "Customers book a delivery on a map, nearby couriers are dispatched automatically, and everyone follows " +
    "the courier live until the package arrives. I built the Spring Boot backend, the React frontend and " +
    "everything around them: Kubernetes, CI/CD with automatic rollback, monitoring and public exposure.",
  period: "Sep–Oct 2026",
  role: "Solo project, full-stack and DevOps",
  links: {
    demo: "https://llama.vzkyrielight.my.id",
    repo: "https://github.com/farhantaufikrahman/Llama-Express",
    readme: "https://github.com/farhantaufikrahman/Llama-Express#readme",
  },
  demoNote:
    "The API runs on my own machine through a Cloudflare Tunnel, so the live demo works while it is online.",
  video: {
    src: "/projects/llama/llama-express.mp4",
    poster: "/projects/llama/llama-express-poster.webp",
    caption: "30-second tour: customer, courier, admin, monitoring and CI/CD.",
  },
  facts: [
    {
      value: 2,
      suffix: " pods",
      label: "backend replicas sharing real-time traffic through Kafka",
    },
    {
      value: 80,
      suffix: "+",
      label: "backend tests, including Testcontainers integration tests",
    },
    {
      value: 90,
      suffix: "",
      label: "frontend tests with Jest, Testing Library and MSW",
    },
    {
      value: 13,
      suffix: "",
      label: "Prometheus alert rules behind a custom Grafana dashboard",
    },
  ],
  stack: [
    "Java 25",
    "Spring Boot 4",
    "Oracle 23ai",
    "Kafka",
    "Redis",
    "WebSocket (STOMP)",
    "React 19",
    "TypeScript",
    "Leaflet",
    "Docker",
    "Kubernetes",
    "Helm",
    "Jenkins",
    "SonarQube",
    "Prometheus",
    "Grafana",
    "Cloudflare Tunnel",
    "Vercel",
    "Midtrans",
  ],
  decisions: [
    {
      problem: "An order is saved but its event never reaches Kafka",
      decision:
        "Transactional outbox: the order and its event are written in one database transaction, and a scheduled publisher forwards events to Kafka.",
    },
    {
      problem:
        "Two backend pods, but WebSocket subscribers live in one pod's memory",
      decision:
        "Each pod reads status and location events with its own Kafka consumer group and forwards them to its own browsers, so every customer gets every update.",
    },
    {
      problem: "Scheduled jobs would run twice after scaling out",
      decision:
        "ShedLock on the outbox publisher, dispatch sweeper and housekeeping, so only one pod runs each job.",
    },
    {
      problem: "Updates lost while a pod is replaced during a deploy",
      decision:
        "The client re-subscribes first, then refetches from REST. WebSocket is a notification channel; REST is the source of truth.",
    },
    {
      problem: "Anyone can POST a fake 'paid' notification to a public webhook",
      decision:
        "Midtrans signature (SHA-512) verification plus a status re-check against the Midtrans API before an order is marked paid.",
    },
    {
      problem: "A bad release reaches the cluster",
      decision:
        "Jenkins records the running images, rolls out the new SHA, runs a smoke test and restores the previous images if anything fails. I tested it with a deliberately broken image.",
    },
  ],
  gallery: [
    {
      src: "/projects/llama/customer-tracking.webp",
      alt: "Customer order page with a live map, courier details, handover code and order summary",
      width: 1600,
      height: 792,
      caption: "Customers follow the courier live and share a tracking link.",
    },
    {
      src: "/projects/llama/courier-job.webp",
      alt: "Courier job screen on a phone showing step 3 of 4, a route map and a proof-of-delivery upload",
      width: 720,
      height: 1600,
      caption: "Couriers step through each job and upload a proof photo.",
    },
    {
      src: "/projects/llama/public-tracking.webp",
      alt: "Public tracking page with the courier position and the package timeline",
      width: 1600,
      height: 787,
      caption: "Recipients track the package without an account.",
    },
    {
      src: "/projects/llama/admin-orders.webp",
      alt: "Admin order list with filters, payment state, status and CSV export",
      width: 1600,
      height: 860,
      caption: "Admins filter, inspect and export orders.",
    },
    {
      src: "/projects/llama/grafana.webp",
      alt: "Grafana dashboard with request rate, latency percentiles, JVM heap and database pool panels",
      width: 1600,
      height: 789,
      caption:
        "Prometheus and Grafana: traffic, latency, JVM, database and business metrics.",
    },
    {
      src: "/projects/llama/jenkins.webp",
      alt: "Jenkins stage view showing test, SonarQube, build, push, deploy and smoke test stages",
      width: 1600,
      height: 790,
      caption:
        "Every merge to main is tested, scanned, deployed and smoke-tested.",
    },
  ],
};

export type FlowNodeId =
  | "browser"
  | "courier"
  | "midtrans"
  | "github"
  | "cloudflare"
  | "jenkins"
  | "gateway"
  | "registry"
  | "backend"
  | "kafka"
  | "oracle"
  | "redis";

export const flowNodes: Record<
  FlowNodeId,
  { label: string; detail: string; x: number; y: number; logo?: string }
> = {
  browser: {
    label: "Customer",
    detail: "React on Vercel",
    x: 100,
    y: 90,
    logo: "React",
  },
  courier: { label: "Courier", detail: "Phone browser", x: 100, y: 240 },
  midtrans: { label: "Midtrans", detail: "Payments", x: 100, y: 390 },
  github: {
    label: "GitHub",
    detail: "Pull requests",
    x: 100,
    y: 540,
    logo: "GitHub",
  },
  cloudflare: {
    label: "Cloudflare",
    detail: "Tunnel, TLS",
    x: 330,
    y: 240,
    logo: "Cloudflare",
  },
  jenkins: {
    label: "Jenkins",
    detail: "Test, scan, build",
    x: 330,
    y: 540,
    logo: "Jenkins",
  },
  gateway: {
    label: "Gateway",
    detail: "NGINX Gateway",
    x: 520,
    y: 240,
    logo: "NGINX",
  },
  registry: {
    label: "Docker Hub",
    detail: "Images by SHA",
    x: 520,
    y: 540,
    logo: "Docker",
  },
  backend: {
    label: "Backend ×2",
    detail: "Spring Boot",
    x: 720,
    y: 240,
    logo: "Spring Boot",
  },
  kafka: { label: "Kafka", detail: "Events", x: 720, y: 420, logo: "Kafka" },
  oracle: {
    label: "Oracle",
    detail: "Orders, outbox",
    x: 910,
    y: 120,
    logo: "Oracle",
  },
  redis: {
    label: "Redis",
    detail: "Rate limits",
    x: 910,
    y: 300,
    logo: "Redis",
  },
};

export const flowScenarios: {
  id: string;
  label: string;
  path: [FlowNodeId, FlowNodeId][];
  steps: string[];
}[] = [
  {
    id: "order",
    label: "Placing an order",
    path: [
      ["browser", "cloudflare"],
      ["cloudflare", "gateway"],
      ["gateway", "backend"],
      ["backend", "oracle"],
      ["backend", "kafka"],
      ["kafka", "backend"],
      ["backend", "courier"],
    ],
    steps: [
      "The customer confirms a quote; the request enters through the Cloudflare Tunnel and the gateway.",
      "The backend saves the order and an outbox event in one Oracle transaction.",
      "The outbox publisher sends the event to Kafka.",
      "The dispatcher consumes it and offers the job to nearby online couriers over WebSocket.",
    ],
  },
  {
    id: "tracking",
    label: "Live tracking",
    path: [
      ["courier", "cloudflare"],
      ["cloudflare", "gateway"],
      ["gateway", "backend"],
      ["backend", "kafka"],
      ["kafka", "backend"],
      ["backend", "browser"],
    ],
    steps: [
      "The courier's phone reports its position every few seconds.",
      "The backend publishes it to the courier-location topic.",
      "Every backend pod consumes it with its own consumer group (fan-out).",
      "Each pod pushes it to the browsers connected to it, so the customer's map moves.",
    ],
  },
  {
    id: "payment",
    label: "Online payment",
    path: [
      ["browser", "midtrans"],
      ["midtrans", "cloudflare"],
      ["cloudflare", "gateway"],
      ["gateway", "backend"],
      ["backend", "oracle"],
      ["backend", "kafka"],
    ],
    steps: [
      "The customer pays in the Midtrans Snap popup.",
      "Midtrans calls the public webhook through the tunnel.",
      "The backend verifies the SHA-512 signature and re-checks the status with Midtrans.",
      "The payment is stored, and the order moves on to dispatch.",
    ],
  },
  {
    id: "deploy",
    label: "Shipping a change",
    path: [
      ["github", "jenkins"],
      ["jenkins", "registry"],
      ["registry", "backend"],
      ["backend", "cloudflare"],
    ],
    steps: [
      "A merge to main reaches Jenkins through an HMAC-verified GitHub webhook.",
      "Tests, the SonarQube quality gate and image builds run; images are pushed to Docker Hub by commit SHA.",
      "Jenkins rolls the new SHA out to Kubernetes one pod at a time.",
      "A smoke test runs through the public route; on failure the previous images are restored.",
    ],
  },
];

/* ───────────────────────── Other projects ─────────────────────────
 */

export const projects: {
  name: string;
  blurb: string;
  year: string;
  tags: string[];
  image: ImageAsset;
  demo?: string;
  repo?: string;
}[] = [
  {
    name: "CosFit",
    blurb:
      "AI virtual cosplay try-on with Fashn AI, a Gemini full-body photo check, Steam-style community chat and Midtrans payments.",
    year: "2026",
    tags: ["Next.js", "MongoDB", "Socket.IO", "Gemini API", "Docker"],
    image: {
      src: "/projects/cosfit-placeholder.webp",
      alt: "CosFit screenshot",
      width: 1600,
      height: 1000,
    }, // TODO
    demo: "https://final-project-six-lemon.vercel.app/", // TODO
    repo: "https://github.com/farhantaufikrahman/CosFit-FinPrjctHacktiv8", // TODO
  },
  {
    name: "Kyriegram",
    blurb:
      "Instagram-style mobile app for iOS and Android with a GraphQL API and Redis-cached feeds.",
    year: "2026",
    tags: ["React Native", "Expo", "GraphQL", "Redis", "MongoDB"],
    image: {
      src: "/projects/kyriegram-placeholder.webp",
      alt: "Kyriegram screenshot",
      width: 1600,
      height: 1000,
    }, // TODO
    demo: "https://github.com/farhantaufikrahman", // TODO
    repo: "https://github.com/farhantaufikrahman/Kyriegram-Mobile-InstaClone-", // TODO
  },
  {
    name: "TripSync",
    blurb:
      "Collaborative travel planner: I built the whole backend, Gemini itinerary suggestions and a chat room per plan.",
    year: "2026",
    tags: ["Express.js", "PostgreSQL", "Socket.IO", "Gemini API", "React"],
    image: {
      src: "/projects/tripsync-placeholder.webp",
      alt: "TripSync screenshot",
      width: 1600,
      height: 1000,
    }, // TODO
    demo: "https://group-project-f6682.web.app/", // TODO
    repo: "https://github.com/farhantaufikrahman/TripSync-Planner", // TODO
  },
  {
    name: "Waifu Battle",
    blurb:
      "Card game with character data from the MyAnimeList API, Gemini-assisted tactics and Google sign-in.",
    year: "2026",
    tags: ["Express.js", "React", "PostgreSQL", "Google OAuth"],
    image: {
      src: "/projects/waifu-battle-placeholder.webp",
      alt: "Waifu Battle screenshot",
      width: 1600,
      height: 1000,
    }, // TODO
    demo: "https://indiv-project-waifubattle.web.app/", // TODO
    repo: "https://github.com/farhantaufikrahman/Waifu-Battle", // TODO
  },
];

/* ───────────────────────── Experience & education (newest first) ───────────────────────── */

export const journey: {
  period: string;
  title: string;
  org: string;
  kind: "work" | "study";
  points: string[];
  image?: { src: string; alt: string; cover?: boolean; zoom?: number };
}[] = [
  {
    period: "Sep 2026 – now",
    title: "AWS re/Start Cloud Compute",
    org: "Orbit Future Academy × AWS",
    image: {
      src: "/journey/aws-restart.jpg",
      alt: "AWS re/Start",
      cover: true,
      zoom: 1.7,
    },
    kind: "study",
    points: ["Cloud fundamentals, Linux, networking and AWS services."],
  },
  {
    period: "Apr – Jul 2026",
    title: "AI-Enhanced Full-Stack JavaScript Immersive",
    org: "Hacktiv8, Jakarta",
    image: { src: "/journey/hacktiv8.jpg", alt: "Hacktiv8", cover: true },
    kind: "study",
    points: [
      "Full-time bootcamp; shipped several group and solo web and mobile projects.",
    ],
  },
  {
    period: "Dec 2024 – Mar 2026",
    title: "Network Monitoring Center, Operations & Maintenance",
    org: "Pasifik Satelit Nusantara, SATRIA-1",
    image: { src: "/journey/psn.png", alt: "Pasifik Satelit Nusantara" },
    kind: "work",
    points: [
      "Monitored the national SATRIA-1 satellite services (backhaul, hub, gateway, reference terminals), triaged alerts and escalated incidents.",
      "Troubleshot remote terminals over SSH and Remote Desktop; supported field technicians through the NMS.",
      "Owned incident ticketing for Komdigi across all services.",
    ],
  },
  {
    period: "Jun – Aug 2023",
    title: "IT Technical, On-the-Job Training",
    org: "Perum LPPNPI AirNav Indonesia",
    image: { src: "/journey/airnav.webp", alt: "AirNav Indonesia" },
    kind: "work",
    points: [
      "Tested an IoT temperature sensor system and built a UTC reference clock; repaired VHF air-to-ground radio modulation.",
    ],
  },
  {
    period: "Sep 2020 – Sep 2024",
    title: "B.Eng. Electrical Engineering (Telecommunication)",
    org: "Universitas Pendidikan Indonesia, Bandung",
    image: {
      src: "/journey/upi.webp",
      alt: "Universitas Pendidikan Indonesia",
    },
    kind: "study",
    points: ["GPA 3.51 / 4.00, cum laude."],
  },
];

/* ───────────────────────── Skills ───────────────────────── */

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Java", "TypeScript", "JavaScript", "Go", "Python", "Bash"],
  },
  {
    group: "Backend",
    items: [
      "Spring Boot",
      "Node.js",
      "Express.js",
      "REST",
      "GraphQL",
      "WebSocket (STOMP)",
      "Socket.IO",
    ],
  },
  {
    group: "Frontend & mobile",
    items: [
      "React",
      "Next.js",
      "TanStack Query",
      "Redux Toolkit",
      "Tailwind CSS",
      "React Native",
    ],
  },
  {
    group: "Data & messaging",
    items: [
      "Oracle",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "Flyway",
      "Sequelize",
    ],
  },
  {
    group: "Testing & quality",
    items: [
      "JUnit",
      "Testcontainers",
      "Jest",
      "Testing Library",
      "MSW",
      "SonarQube",
      "Postman",
    ],
  },
  {
    group: "Platform",
    items: [
      "Docker",
      "Kubernetes",
      "Helm",
      "Kustomize",
      "Jenkins",
      "Prometheus",
      "Grafana",
      "AWS",
      "Cloudflare",
      "Linux",
    ],
  },
];

/* ───────────────────────── Certifications ─────────────────────────
 */

export const certifications: {
  name: string;
  issuer: string;
  date: string;
  credential?: string;
  badge?: string;
}[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Sep 2026",
    credential:
      "https://www.credly.com/badges/69c08758-c4b9-4bf1-9ab9-d507a00b7952/linked_in_profile/",
  }, // TODO
  {
    name: "Automation with Ansible, Linux System Administration",
    issuer: "Adinusa",
    date: "Oct 2026",
    credential:
      "https://www.credly.com/badges/69c08758-c4b9-4bf1-9ab9-d507a00b7952/linked_in_profile/",
  }, // TODO
  {
    name: "DevOps, AWS Cloud Administrator",
    issuer: "ID-Networkers",
    date: "Aug 2026",
    credential: "https://my.idn.id/cert-verification/",
  }, // TODO
  {
    name: "Software Engineer Intern, React, JavaScript, Go, Java, Python",
    issuer: "HackerRank",
    date: "Jul 2026",
    credential: "https://www.hackerrank.com/certificates/iframe/13af14210ec6/",
  }, // TODO
  {
    name: "Basic Web Programming",
    issuer: "Dicoding Indonesia",
    date: "Nov 2025",
    credential: "https://www.dicoding.com/certificates/KEXL2V1NWZG2/",
  }, // TODO
  {
    name: "Network Technician, Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "Dec 2024",
    credential: "https://indiv-project-waifubattle.web.app/",
  },
];

export const navItems: Link[] = [
  { label: "Llama Express", href: "#llama-express" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
