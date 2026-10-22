/**
 * Technology and issuer logos, looked up by the label used in site.ts.
 * Files live in /public/logos. `dark: true` means the logo is mostly black,
 * so a light variant (`<name>-dark.svg`) is shown on the night theme.
 *
 * Sources: Devicon (MIT) and Simple Icons (CC0). Logos are trademarks of their owners
 * and are used only to say which tools I worked with.
 * To add one: drop `<name>.svg` in /public/logos and add an alias below.
 */

type LogoFile = { file: string; dark?: boolean };

const files: Record<string, LogoFile> = {
  java: { file: "java" },
  typescript: { file: "typescript" },
  javascript: { file: "javascript" },
  go: { file: "go" },
  python: { file: "python" },
  bash: { file: "bash", dark: true },
  spring: { file: "spring" },
  nodejs: { file: "nodejs" },
  express: { file: "express", dark: true },
  graphql: { file: "graphql" },
  socketio: { file: "socketio", dark: true },
  react: { file: "react" },
  nextjs: { file: "nextjs" },
  tanstack: { file: "tanstack" },
  redux: { file: "redux" },
  tailwindcss: { file: "tailwindcss" },
  oracle: { file: "oracle" },
  postgresql: { file: "postgresql" },
  mongodb: { file: "mongodb" },
  redis: { file: "redis" },
  kafka: { file: "kafka", dark: true },
  flyway: { file: "flyway" },
  sequelize: { file: "sequelize" },
  junit: { file: "junit" },
  jest: { file: "jest" },
  testinglibrary: { file: "testinglibrary" },
  msw: { file: "msw" },
  sonarqube: { file: "sonarqube" },
  postman: { file: "postman" },
  docker: { file: "docker" },
  kubernetes: { file: "kubernetes" },
  helm: { file: "helm", dark: true },
  jenkins: { file: "jenkins" },
  prometheus: { file: "prometheus" },
  grafana: { file: "grafana" },
  aws: { file: "aws", dark: true },
  cloudflare: { file: "cloudflare" },
  linux: { file: "linux" },
  vercel: { file: "vercel", dark: true },
  leaflet: { file: "leaflet" },
  gemini: { file: "gemini" },
  google: { file: "google" },
  expo: { file: "expo", dark: true },
  github: { file: "github", dark: true },
  nginx: { file: "nginx" },
  hackerrank: { file: "hackerrank" },
  cisco: { file: "cisco" },
  credly: { file: "credly" },
  adinusa: { file: "adinusa", dark: true },
  dicoding: { file: "dicoding", dark: true },
  idnetwork: { file: "idnetwork", dark: true },
};

/** label (lower-cased, version numbers removed) → key in `files` */
const aliases: Record<string, string> = {
  "spring boot": "spring",
  "node.js": "nodejs",
  "express.js": "express",
  "socket.io": "socketio",
  "react native": "react",
  "next.js": "nextjs",
  "tanstack query": "tanstack",
  "redux toolkit": "redux",
  "tailwind css": "tailwindcss",
  "oracle ai": "oracle",
  "testing library": "testinglibrary",
  "cloudflare tunnel": "cloudflare",
  "gemini api": "gemini",
  "google oauth": "google",
  "amazon web services": "aws",
  "cisco networking academy": "cisco",
  "id-networkers": "idnetwork",
  "dicoding indonesia": "dicoding",
};

function normalise(label: string): string {
  return label
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/\b\d+(ai)?\b/g, (m) => (m.endsWith("ai") ? "ai" : ""))
    .replace(/\s+/g, " ")
    .trim();
}

export type LogoInfo = { src: string; darkSrc?: string };

export function logoFor(label: string): LogoInfo | null {
  const key = normalise(label);
  const entry = files[aliases[key] ?? key.replace(/\s/g, "")];
  if (!entry) return null;
  return {
    src: `/logos/${entry.file}.svg`,
    darkSrc: entry.dark ? `/logos/${entry.file}-dark.svg` : undefined,
  };
}
