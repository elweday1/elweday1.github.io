export const SITE = {
  website: "mnasser.dev",
  author: "Mohammed Nasser",
  authorDescription: `
  Software Engineer at Google DeepMind. Passionate about Agentic workflows, System Design, and building high-performance digital tools.
  `,
  desc: "Personal portfolio of Mohammed Nasser, Software Engineer at Google DeepMind.",
  title: "M. Nasser | Software Engineer",
  ogImage: "assets/images/fallback.png",
  lightAndDarkMode: false,
  itemsPerPage: 20,
} as const;


export const HIGHLIGHTS = [
  { label: "Engineering", value: "prev. Google DeepMind Intern", trend: "Gemini Collaborator" },
  { label: "Focus", value: "Full Stack", trend: "Web Development" },
  { label: "Developing", value: "Agentic Workflows", trend: "Intelligent Systems" },
];
export const MESSAGE_OPTIONS = [
  {
    name: "Business Inquiry",
    icon: "ph:briefcase-bold",
    result: {
      title: "Partnership Opportunity",
      message: "I'll review your inquiry and get back to you shortly.",
    },
  },
  {
    name: "Technical Question",
    icon: "ph:code-bold",
    result: { title: "Dev Talk", message: "Always happy to discuss tech!" },
  },
  {
    name: "Feedback",
    icon: "ph:chat-circle-dots-bold",
    result: {
      title: "Thank you for yours feedback",
      message: "Perspective is always appreciated.",
    },
  },
] as const;

export const RESUME = {
  normal: `resume.${SITE.website}`,
};

export const PATHS = [
  { name: "Projects", path: "/projects", icon: "ic:baseline-code" },
  { name: "Blog", path: "/blog", icon: "ant-design:read-outlined" },
  { name: "About", path: "/about", icon: "mdi:about-circle-outline" },
  { name: "Search", path: "/search", icon: "ic:baseline-search" },
] as const;

export const LOCALE = ["en-EN"];

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/elweday1",
    linkTitle: ` ${SITE.author} on Github`,
    active: true,
    icon: "mdi:github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/elweday/",
    linkTitle: `${SITE.author} on LinkedIn`,
    active: true,
    icon: "mdi:linkedin",
  },
  {
    name: "Mail",
    href: "mailto:mohammednh2864@gmail.com",
    linkTitle: `Send an email to ${SITE.author}`,
    active: true,
    icon: "mdi:email",
  },
  {
    name: "Discord",
    href: "https://discord.com/users/nomadnasser",
    linkTitle: `${SITE.author} on Discord`,
    active: true,
    icon: "ic:baseline-discord",
  },
] as const;

export const MY_SHOWS = [
  "bojack_horseman",
  "the_big_bang_theory",
  "invincible",
  "brooklyn_nine_nine",
  "silicon_valley",
  "Severance",
  "love_death_robots",
  "daredevil",
  "the_boys",
  "rick_and_morty",
  "how_i_met_your_mother",
  "the_office",
  "peacemaker",
  "gen_v",
];

export const HOBBIES = [
  { name: "Agentic Workflows", icon: "ph:magic-wand-bold" },
  { name: "System Design", icon: "ph:tree-structure-bold" },
  { name: "Open Source", icon: "ph:git-branch-bold" },
  { name: "Real-time Systems", icon: "ph:lightning-bold" },
  { name: "3D Graphics", icon: "ph:cube-bold" },
] as const;

export const Technologies: Record<string, {
  name: string;
  icon: string;
  url: string;
  description: string;
  type: string;
  display: boolean;
}> = {
  javascript: {
    name: "Javascript",
    icon: "simple-icons:javascript",
    url: "https://www.javascript.com/",
    description: "A programming language commonly used for web development.",
    type: "Programming Language",
    display: true,
  },
  typescript: {
    name: "Typescript",
    icon: "simple-icons:typescript",
    url: "https://www.typescriptlang.org/",
    description: "A superset of JavaScript with static typing.",
    type: "Programming Language",
    display: true,
  },
  golang: {
    name: "Go",
    icon: "simple-icons:go",
    url: "https://go.dev/",
    description: "Efficient, reliable enterprise-grade language.",
    type: "Programming Language",
    display: true,
  },
  rust: {
    name: "Rust",
    icon: "simple-icons:rust",
    url: "https://www.rust-lang.org/",
    description: "Safe, concurrent, and fast systems programming.",
    type: "Programming Language",
    display: true,
  },
  kotlin: {
    name: "Kotlin",
    icon: "simple-icons:kotlin",
    url: "https://kotlinlang.org/",
    description: "Modern language for JVM and Multiplatform.",
    type: "Programming Language",
    display: true,
  },
  "c++": {
    name: "C++",
    icon: "simple-icons:cplusplus",
    url: "https://isocpp.org/",
    description: "Powerful general-purpose programming.",
    type: "Programming Language",
    display: true,
  },
  python: {
    name: "Python",
    icon: "simple-icons:python",
    url: "https://www.python.org/",
    description: "High-level versatility and ML focus.",
    type: "Programming Language",
    display: true,
  },
  c: {
    name: "C",
    icon: "simple-icons:c",
    url: "https://en.cppreference.com/w/c",
    description: "Foundation of modern systems.",
    type: "Programming Language",
    display: true,
  },
  react: {
    name: "React",
    icon: "simple-icons:react",
    url: "https://reactjs.org/",
    description: "Declarative UI component library.",
    type: "Frontend & Web",
    display: true,
  },
  angular: {
    name: "Angular",
    icon: "simple-icons:angular",
    url: "https://angular.io/",
    description: "Enterprise-grade web platform.",
    type: "Frontend & Web",
    display: true,
  },
  nextjs: {
    name: "Next.js",
    icon: "simple-icons:nextdotjs",
    url: "https://nextjs.org/",
    description: "Full-stack React framework.",
    type: "Frontend & Web",
    display: true,
  },
  astro: {
    name: "Astro",
    icon: "simple-icons:astro",
    url: "https://astro.build/",
    description: "The web framework for content-driven sites.",
    type: "Frontend & Web",
    display: true,
  },
  rxjs: {
    name: "RxJS",
    icon: "simple-icons:reactivex",
    url: "https://rxjs.dev/",
    description: "Reactive extensions for JavaScript.",
    type: "Frontend & Web",
    display: true,
  },
  yjs: {
    name: "YJS",
    icon: "ph:share-network-bold",
    url: "https://docs.yjs.dev/",
    description: "Shared data types for real-time collaboration.",
    type: "Frontend & Web",
    display: true,
  },
  nodejs: {
    name: "Node.js",
    icon: "simple-icons:nodedotjs",
    url: "https://nodejs.org/",
    description: "JavaScript runtime on the server.",
    type: "Backend & Systems",
    display: true,
  },
  fastapi: {
    name: "FastAPI",
    icon: "simple-icons:fastapi",
    url: "https://fastapi.tiangolo.com/",
    description: "Modern, high-performance Python API framework.",
    type: "Backend & Systems",
    display: true,
  },
  flask: {
    name: "Flask",
    icon: "simple-icons:flask",
    url: "https://flask.palletsprojects.com/",
    description: "Lightweight Python web framework.",
    type: "Backend & Systems",
    display: true,
  },
  grpc: {
    name: "gRPC",
    icon: "ph:arrows-left-right-bold",
    url: "https://grpc.io/",
    description: "High-performance RPC framework.",
    type: "Backend & Systems",
    display: true,
  },
  svelte: {
    name: "Svelte",
    display: true,
    icon: "cib:svelte",
    url: "https://svelte.dev/",
    description: "A JavaScript framework for building user interfaces.",
    type: "Frontend & Web",
},
  gcp: {
    name: "GCP",
    icon: "simple-icons:googlecloud",
    url: "https://cloud.google.com/",
    description: "Google's suite of cloud services.",
    type: "Tools & Platforms",
    display: true,
  },
  aws: {
    name: "AWS",
    icon: "simple-icons:amazonaws",
    url: "https://aws.amazon.com/",
    description: "Amazon's cloud computing platform.",
    type: "Tools & Platforms",
    display: true,
  },
  docker: {
    name: "Docker",
    icon: "simple-icons:docker",
    url: "https://www.docker.com/",
    description: "Containerization platform.",
    type: "Tools & Platforms",
    display: true,
  },
  githubactions: {
    name: "GH Actions",
    icon: "simple-icons:githubactions",
    url: "https://github.com/features/actions",
    description: "CI/CD directly from GitHub.",
    type: "Tools & Platforms",
    display: true,
  },
  linux: {
    name: "Linux",
    icon: "uil:linux",
    url: "https://www.linux.org/",
    description:
      "A family of open-source Unix-like operating systems based on the Linux kernel.",
    type: "Tools & Platforms",
    display: true,
  },
  
  git: {
    name: "Git",
    icon: "mdi:git",
    url: "https://git-scm.com/",
    description:
      "A distributed version control system for tracking changes in source code.",
    type: "Tools & Platforms",
    display: true,
  },
  tailwind: {
    name: "Tailwind",
    icon: "simple-icons:tailwindcss",
    url: "https://tailwindcss.com/",
    description: "Utility-first CSS framework.",
    type: "Frontend & Web",
    display: true,
  },
  trpc: {
    name: "tRPC",
    icon: "ph:arrows-left-right-bold",
    url: "https://trpc.io/",
    description: "End-to-end typesafe APIs.",
    type: "Backend & Systems",
    display: true,
  },
    latex: {
    name: "Latex",
    icon: "file-icons:latex",
    url: "https://www.latex-project.org/",
    description: "A LaTeX markup language and typesetting system.",
    type: "Tools & Platforms",
    display: false,
  },
  prisma: {
    name: "Prisma",
    icon: "simple-icons:prisma",
    url: "https://www.prisma.io/",
    description:
      "A modern database toolkit for working with databases in TypeScript and JavaScript.",
    type: "Technology",
    display: false,
  },
  postgres: {
    name: "PostgreSQL",
    icon: "simple-icons:postgresql",
    url: "https://www.postgresql.org/",
    description: "Advanced open source relational database.",
    type: "Backend & Systems",
    display: true,
  },
  chartjs: {
    name: "Chart.js",
    icon: "simple-icons:chartdotjs",
    url: "https://www.chartjs.org/",
    description: "Simple yet flexible JavaScript charting.",
    type: "Frontend & Web",
    display: true,
  },
  ffmpeg: {
    name: "FFmpeg",
    icon: "simple-icons:ffmpeg",
    url: "https://ffmpeg.org/",
    description: "Multimedia framework to process video and audio.",
    type: "Backend & Systems",
    display: true,
  },
  opengl: {
    name: "OpenGL",
    icon: "simple-icons:opengl",
    url: "https://www.opengl.org/",
    description: "Cross-language, cross-platform graphics API.",
    type: "Backend & Systems",
    display: true,
  },
};
