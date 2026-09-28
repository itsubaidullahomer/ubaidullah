import type { Project } from "../types";

const J = "/images/tututor/journey";
const M = "/images/tututor/mobile";

export const tututor: Project = {
  slug: "tututor",
  title: "Tututor.ai",
  tagline:
    "An AI tool for teachers that I rebuilt three times and grew into a school platform: eight products, one backend, about 6,000 commits.",
  role: "Lead engineer, from first rebuild to today",
  company: "Tututor.ai / EduNova",
  companyUrl: "https://tututor.ai",
  externalUrl: "https://tututor.ai",
  period: "Nov 2023 – Present",
  status: "live",
  featured: true,
  flagship: true,
  cover: "/work/tututor-cover.svg",
  accent: "#C7F284",
  screenshot: { src: "/images/screens/tututor.jpg", width: 2160, height: 7800 },

  summary:
    "It came to me as someone else's Next.js app with one problem to fix. Two years later it's an AI toolkit for teachers plus a full school platform: web apps for teachers and school admins, parent, student and teacher apps in both stores, and the Express backend that runs all of it. I rebuilt the core three times on the way, and most of the code is mine.",

  problem:
    "The founder brought me a Next.js app with a bug he wanted fixed. The real problem was bigger. The code was hard to change, the AI calls ran in the browser with the API keys shipped to every visitor, and there was no backend of our own to grow into. Every new tool he wanted meant fighting the codebase. Schools later asked for much more than AI tools: grades, attendance, messages to families, billing, and imports from the regional systems they already used.",

  approach:
    "I told him we should rebuild rather than patch. First the frontend, in React and Redux on Firebase, because at that point I didn't know backend work. Then I learned it, and in October 2024 replaced Firebase with an Express and MongoDB backend I wrote myself, which moved every AI call and key off the client. That backend is the reason the rest was possible. When schools wanted management features, I added a school and class model to the same backend, and the teacher platform, the admin panel and three mobile apps all sit on it. One login and one data model, with a scoping layer that keeps each school's data apart.",

  outcome:
    "Around 17,000 students, teachers and families use it, across schools in Murcia. The AI toolkit has 40+ tools and a rich-text editor with AI actions built in. The school side covers everything from infant-school report cards to SEPA direct-debit billing, imports from Educamos and exports to Plumier XXI, the regional grades system. The three mobile apps are live on the App Store and Google Play. And the founder, who couldn't code when we started, now ships whole features himself.",

  metrics: [
    { value: "17,000+", label: "Students, teachers & families", detail: "schools across Murcia, Spain" },
    { value: "~6,000", label: "Commits across 9 repos", detail: "3,600+ of them mine" },
    { value: "~1,000", label: "API endpoints", detail: "on ~90 data models, one Express backend" },
    { value: "6", label: "Store listings", detail: "3 apps, each on iOS and Android" },
  ],

  ecosystem: [
    {
      name: "Tututor.AI",
      kind: "web",
      audience: "Teachers",
      summary:
        "The original product. 40+ AI tools for lesson prep (didactic units, rubrics, quizzes, mind maps, games) and a document editor with AI actions built in.",
      stack: ["React", "Redux / RTK Query", "Plate + TipTap", "Stripe"],
      stat: "1,552 commits · 138k lines · since Oct 2024",
    },
    {
      name: "Core API",
      kind: "backend",
      audience: "Every app",
      summary:
        "The Express backend all eight products talk to. Auth with 2FA and Google/Apple sign-in, school scoping, realtime chat, push, file storage, billing and the AI layer.",
      stack: ["Node.js", "Express", "MongoDB", "Socket.io + Redis"],
      stat: "2,164 commits · ~1,000 endpoints · ~90 models",
    },
    {
      name: "EduNova for teachers",
      kind: "web",
      audience: "Teachers",
      summary:
        "Where a teacher runs their day: grades (including infant-school report cards), attendance, homework with AI feedback, messages, meetings, curriculum planning.",
      stack: ["React 19", "RTK Query", "Socket.io", "jsPDF"],
      stat: "1,290 commits · 30 API services, 604 hooks",
    },
    {
      name: "EduNova school admin",
      kind: "web",
      audience: "School office",
      summary:
        "Enrolment, teacher assignments, and the finance module: receipts, SEPA direct-debit batches, tax forms. Also the Educamos import and Plumier XXI export.",
      stack: ["React", "RTK Query", "SEPA XML", "XLSX"],
      stat: "353 commits · 36 API services, 665 hooks",
    },
    {
      name: "Platform admin",
      kind: "web",
      audience: "Our team",
      summary:
        "The internal console: schools, users, curriculum master data by region, bulk imports, and product analytics.",
      stack: ["React 19", "Vite", "Tailwind 4", "Recharts"],
      stat: "76 commits · 165 endpoints wired",
    },
    {
      name: "Familias",
      kind: "mobile",
      audience: "Parents",
      summary:
        "Homework, attendance, grades, permission slips, messages and the school timetable, for every child in the family, with push notifications.",
      stack: ["React Native 0.77", "FCM / APNs", "Google + Apple sign-in"],
      stat: "182 commits · v1.39 Android · v1.24 iOS",
      shot: {
        src: `${M}/familias-asistencia.jpg`,
        width: 720,
        height: 1557,
        alt: "Familias app attendance screen for a child's school day",
      },
    },
    {
      name: "Alumnos",
      kind: "mobile",
      audience: "Students",
      summary:
        "The student's day: homework, grades, timetable, online tests, files and the class board.",
      stack: ["React Native 0.77", "FCM", "2FA"],
      stat: "82 commits · v1.10 Android · v1.5 iOS",
      shot: {
        src: `${M}/alumnos-home.jpg`,
        width: 720,
        height: 1557,
        alt: "Alumnos app home screen with modules and today's homework",
      },
    },
    {
      name: "Profesores",
      kind: "mobile",
      audience: "Teachers",
      summary:
        "Take the register from the classroom, set homework, grade, message families, and correct exams with AI. The largest of the apps.",
      stack: ["React Native 0.84", "TypeScript", "R8"],
      stat: "74 commits · 99k lines · v1.5 Android",
      shot: {
        src: `${M}/profesores-home.jpg`,
        width: 720,
        height: 1557,
        alt: "Profesores app home screen with the next class and a take-register button",
      },
    },
  ],

  journey: [
    {
      period: "Before Oct 2024",
      tag: "What I was handed",
      title: "A Next.js app and a bug to fix.",
      body: "The founder came to me with this app and one problem. Looking at the code, I told him the honest version: fixing this bug would take a day, and the next ten would too. I said we should rebuild it instead, and he agreed. My brother designed the new version.",
      shots: [
        {
          src: `${J}/01-inherited.png`,
          width: 1176,
          height: 568,
          alt: "The original Tututor app: a blue sidebar and a list of AI tool cards",
          caption: "The app as it came to me.",
        },
        {
          src: `${J}/02-redesign.png`,
          width: 1060,
          height: 683,
          alt: "My brother's redesign: a clean dashboard with illustrated tool cards",
          caption: "My brother's redesign, the plan for rebuild one.",
        },
      ],
    },
    {
      period: "2024",
      tag: "Rebuilds 1 & 2",
      title: "React and Redux, on Firebase.",
      body: "I rewrote it as a React app with Redux, then rebuilt the data layer on Firebase for auth and storage, because I didn't know backend work yet. By 12 October 2024 it was 229 files and 37,000 lines. It worked, but the AI calls to OpenAI, Anthropic and Gemini ran in the browser, API keys included. That was the thing I most needed to fix.",
      stack: ["React 18", "Vite", "Redux Toolkit", "Firebase"],
      shots: [
        {
          src: `${J}/03-react-rebuild.png`,
          width: 1912,
          height: 959,
          alt: "The rebuilt React app with illustrated tool cards in a grid",
          caption: "The React rebuild, with my brother's design.",
        },
      ],
    },
    {
      period: "Oct 2024",
      tag: "Rebuild 3",
      title: "I learned backend work, then wrote ours.",
      body: "By then I'd built a few backends on other projects and I was ready. I told the founder we needed our own, and built it: Express and MongoDB, first code on 16 October 2024. Three days later the frontend's auth moved off Firebase, and within a month every AI tool generated through the server. The keys left the browser, credits and Stripe billing got a proper home, and we finally had somewhere to put data we owned.",
      stack: ["Node.js", "Express", "MongoDB", "JWT", "Stripe"],
    },
    {
      period: "Nov 2024 – Mar 2025",
      tag: "Growth",
      title: "Forty tools and a real editor.",
      body: "The busiest stretch: 870 commits to the frontend in three months. The catalog grew to 40+ tools built on the curriculum data for each Spanish region, plus games, a quiz generator, mind maps and Google Classroom export. The first editor showed generated text in a read-only box with three buttons. I replaced it with a full document editor where you select a paragraph and ask the AI to improve, expand, shorten or turn it into a table.",
      stack: ["Plate", "TipTap", "OpenAI", "Claude", "Gemini", "Replicate"],
    },
    {
      period: "Mar – Dec 2025",
      tag: "The turn",
      title: "From a tool teachers use to a platform schools run on.",
      body: "Schools liked the tools and asked for everything else. I added a school model to the backend in March 2025, then attendance, students, grades and messaging over the next months, and started the teacher platform and the admin panel on top. A few developers joined to help carry the load, while I kept hold of the architecture and most of the backend. The parent app followed in September 2025.",
      stack: ["Socket.io", "FCM push", "2FA", "Redis"],
    },
    {
      period: "2026",
      tag: "Depth",
      title: "The unglamorous things schools actually need.",
      body: "Infant-school report cards graded by observation, not numbers. A finance module that builds SEPA direct-debit files by hand, so schools can collect fees from families' banks. Importing a school's whole roster from Educamos, and exporting grades to Plumier XXI, the regional system, in its exact format: golden-tested against real exports, 1,833 out of 1,833 matched. Then the scaling work: queries scoped by school, a Redis adapter so sockets work across instances, locks so scheduled jobs run once, file storage moved from Cloudinary to Cloudflare R2, and indexes and aggregations where the queries got slow.",
      stack: ["SEPA pain.008", "Educamos", "Plumier XXI", "Cloudflare R2"],
    },
    {
      period: "Sep 2026",
      tag: "Now",
      title: "Three apps in both stores, and a native rewrite.",
      body: "I shipped Familias, Alumnos and Profesores to the App Store and Google Play: moved them to newer React Native, fixed the Android 16 KB page-size requirement, turned on R8 obfuscation, added Google and Apple sign-in, and worked through store rejections. Then I started the next rebuild: a Kotlin Multiplatform core with SwiftUI and Jetpack Compose on top. 226 commits in its first five days.",
      stack: ["React Native", "Kotlin Multiplatform", "SwiftUI", "Jetpack Compose"],
      shots: [
        {
          src: `${J}/native-concepts.jpg`,
          width: 1400,
          height: 2033,
          alt: "Three home screen concepts for the native Familias app, with the Nova owl mascot",
          caption: "Home concepts for the native Familias app. The owl, Nova, won.",
        },
      ],
    },
  ],

  beforeAfter: {
    title: "The editor, then and now.",
    body: "The first version showed you the generated text and let you copy it. Today it's a full document editor. Select any passage and the AI rewrites it in place, and every image and document from the generation sits one click away.",
    before: {
      src: `${J}/editor-v1.png`,
      width: 1550,
      height: 800,
      alt: "The first editor: generated lesson plan text with Share, Save and Download buttons",
      caption: "First version: read, then copy, save or download.",
    },
    after: {
      src: `${J}/editor-today.png`,
      width: 1904,
      height: 892,
      alt: "Today's editor: a full toolbar and an AI menu with improve, expand, shorten and fix options",
      caption: "Today: a full editor, with AI actions on whatever you select.",
    },
  },

  mobile: {
    title: "Three apps, both stores.",
    body: "Parents, students and teachers each get their own app, all on the same backend as the web platform. These are the store screenshots, taken from our demo school.",
    shots: [
      {
        src: `${M}/profesores-home.jpg`,
        width: 720,
        height: 1557,
        app: "Profesores",
        alt: "Teacher app home: next class, take register, modules and timetable",
        caption: "Home: next class, one tap to take the register",
      },
      {
        src: `${M}/alumnos-home.jpg`,
        width: 720,
        height: 1557,
        app: "Alumnos",
        alt: "Student app home with modules, homework and attendance",
        caption: "Home",
      },
      {
        src: `${M}/familias-tareas.jpg`,
        width: 720,
        height: 1557,
        app: "Familias",
        alt: "Parent app homework list for a child",
        caption: "Homework",
      },
      {
        src: `${M}/profesores-horario.jpg`,
        width: 720,
        height: 1557,
        app: "Profesores",
        alt: "Teacher app weekly timetable",
        caption: "Timetable",
      },
      {
        src: `${M}/alumnos-notas.jpg`,
        width: 720,
        height: 1557,
        app: "Alumnos",
        alt: "Student app grades screen",
        caption: "Grades",
      },
      {
        src: `${M}/familias-asistencia.jpg`,
        width: 720,
        height: 1557,
        app: "Familias",
        alt: "Parent app attendance screen for the day",
        caption: "Attendance",
      },
      {
        src: `${M}/profesores-deberes.jpg`,
        width: 720,
        height: 1557,
        app: "Profesores",
        alt: "Teacher app homework screen",
        caption: "Homework",
      },
      {
        src: `${M}/familias-mensajes.jpg`,
        width: 720,
        height: 1557,
        app: "Familias",
        alt: "Parent app messages screen",
        caption: "Messages",
      },
    ],
  },

  stories: [
    {
      eyebrow: "The part I'm proudest of",
      title: "I taught my client to code. Now he ships features.",
      paragraphs: [
        "When we started, the founder couldn't read code. He'd send me lists of wording changes: this button should be in Spanish, this label is wrong. So I showed him how to do it himself. Find the string, change it, commit, push. His first commit in the backend changed three lines. His first in the frontend translated three strings.",
        "Then it kept going. He copied an existing tool to make a new one. He learned to edit prompts, then to add fields, then whole screens. Two years later he builds complete features across the backend, web and mobile apps: dining, absenteeism tracking, family invoices, tax forms. He works the way I do now, with an AI assistant and conventional commits. In July 2026 he made more backend commits than I did.",
        "At some level, that's a threat to my job. I'm fine with that, and I'd do it again. A client who understands his own product makes better decisions, gives better feedback and trusts the work, because he's seen how it's made. I think teaching the people you build for is part of the job, and it's the fair thing to do.",
      ],
      moments: [
        { date: "Nov 2024", text: "First commits: three strings translated to Spanish, and a three-line change to which AI models the tools use." },
        { date: "Nov 2024", text: "First new tool, built by copying an existing one: 7 files, 1,184 lines." },
        { date: "Feb 2025", text: "Adds new AI tools on the backend himself." },
        { date: "Feb 2026", text: "First full feature across backend and web: the school dining system." },
        { date: "May 2026", text: "Builds billing receipts and returned-payment handling for SEPA direct debits." },
        { date: "Sep 2026", text: "Ships an absenteeism system of about 10,000 lines. His median commit has grown from 16 lines to 487." },
      ],
    },
  ],

  responsibilities: [
    "Rebuilt the product three times: frontend to React, then off Firebase onto a backend I wrote, then the platform around it.",
    "Designed and wrote most of the Express backend: auth, school scoping, realtime messaging, push, storage, billing and the AI layer. About 1,000 endpoints on 90 models.",
    "Built the finance module (SEPA direct-debit batches, receipts, surcharges), the Educamos import and the Plumier XXI grades export.",
    "Did the scaling work: Redis socket adapter, cron locks, the R2 storage migration, index and aggregation rewrites, an authentication floor across the API.",
    "Shipped three React Native apps to both stores, and started the native Kotlin Multiplatform + SwiftUI rewrite.",
    "Worked alongside the developers who joined in 2025, and taught the founder to code.",
  ],

  stack: [
    "React",
    "Redux Toolkit / RTK Query",
    "Node.js",
    "Express",
    "MongoDB",
    "Socket.io + Redis",
    "React Native",
    "Kotlin Multiplatform",
    "SwiftUI",
    "OpenAI",
    "Claude",
    "Gemini",
    "Stripe",
    "Cloudflare R2",
    "Firebase Cloud Messaging",
  ],

  architecture: {
    intro:
      "Eight products, one backend. Hover a box to see what it does, or play a scenario to watch a request travel through it.",
    nodes: [
      {
        id: "web",
        label: "4 web apps",
        kind: "client",
        sub: "React · RTK Query",
        x: 7,
        y: 26,
        detail:
          "The AI tools, the teacher platform, the school admin and the platform admin. Each is its own repo and deploy.",
      },
      {
        id: "mobile",
        label: "3 mobile apps",
        kind: "client",
        sub: "React Native",
        x: 7,
        y: 74,
        detail: "Familias, Alumnos and Profesores, on iOS and Android. The native rewrite talks to the same API.",
      },
      {
        id: "api",
        label: "Express API",
        kind: "service",
        sub: "~1,000 endpoints",
        x: 28,
        y: 50,
        detail:
          "One codebase. Requests pass an authentication floor and a school-scoping layer, which keeps each school's data to itself.",
      },
      {
        id: "rt",
        label: "Realtime",
        kind: "service",
        sub: "Socket.io + Redis",
        x: 50,
        y: 14,
        detail: "Chat and live updates. The Redis adapter lets sockets work when the API runs on more than one instance.",
      },
      {
        id: "ai",
        label: "AI layer",
        kind: "ai",
        sub: "Prompts · model routing",
        x: 50,
        y: 50,
        detail:
          "Builds prompts from the region's curriculum data, picks a model per tool, and records every generation against the user's balance.",
      },
      {
        id: "jobs",
        label: "Scheduled jobs",
        kind: "service",
        sub: "node-cron + locks",
        x: 50,
        y: 86,
        detail: "Reminders, notifications and cleanups. A lock in Mongo makes sure each job runs once, however many instances are up.",
      },
      {
        id: "mongo",
        label: "MongoDB",
        kind: "data",
        sub: "~90 models",
        x: 70,
        y: 68,
        detail: "Schools, classes, sections, people, grades, generations, invoices. Indexed around the queries teachers actually run.",
      },
      {
        id: "r2",
        label: "Cloudflare R2",
        kind: "data",
        sub: "Files",
        x: 70,
        y: 92,
        detail: "Every upload and generated image. Migrated off Cloudinary in 2026.",
      },
      {
        id: "llm",
        label: "LLMs",
        kind: "external",
        sub: "OpenAI · Claude",
        x: 87,
        y: 38,
        detail: "OpenAI, Claude and Gemini. Different tools use different models, and swapping one is a config change, not a code change.",
      },
      {
        id: "push",
        label: "Push",
        kind: "external",
        sub: "FCM · APNs",
        x: 87,
        y: 10,
        detail: "Notifications to every device a parent, student or teacher is signed in on.",
      },
      {
        id: "schools",
        label: "School systems",
        kind: "external",
        sub: "Educamos · SEPA",
        x: 87,
        y: 68,
        detail: "Roster imports in from Educamos; grade exports to Plumier XXI and SEPA direct-debit files out.",
      },
    ],
    edges: [
      { from: "web", to: "api" },
      { from: "mobile", to: "api" },
      { from: "web", to: "rt", label: "socket" },
      { from: "mobile", to: "rt" },
      { from: "api", to: "ai" },
      { from: "api", to: "mongo" },
      { from: "api", to: "r2" },
      { from: "rt", to: "mongo" },
      { from: "ai", to: "llm" },
      { from: "jobs", to: "mongo" },
      { from: "jobs", to: "push" },
      { from: "api", to: "push" },
      { from: "api", to: "schools" },
    ],
    flows: [
      {
        id: "generate",
        label: "A teacher generates a didactic unit",
        description:
          "The AI path. The keys and prompts live on the server, which is the whole reason for rebuild three.",
        hops: [
          { from: "web", to: "api", label: "tool, course and topic" },
          { from: "api", to: "ai", label: "checks the word balance" },
          { from: "ai", to: "mongo", label: "loads the region's curriculum" },
          { from: "ai", to: "llm", label: "prompt sent to the tool's model" },
          { from: "llm", to: "ai", label: "the unit comes back" },
          { from: "ai", to: "mongo", label: "saved to history, balance charged" },
        ],
      },
      {
        id: "register",
        label: "A teacher takes the register",
        description:
          "An ordinary write, with no AI anywhere near it. Parents of absent students hear about it on their phones.",
        hops: [
          { from: "mobile", to: "api", label: "register submitted from class" },
          { from: "api", to: "mongo", label: "scoped to school and section" },
          { from: "api", to: "push", label: "absent students' families notified" },
          { from: "push", to: "mobile", label: "arrives on the parent's phone" },
        ],
      },
      {
        id: "billing",
        label: "The school collects monthly fees",
        description: "The finance module. The output is a bank file, so it has to be exactly right.",
        hops: [
          { from: "web", to: "api", label: "office generates the month's receipts" },
          { from: "api", to: "mongo", label: "mandates and IBANs checked" },
          { from: "api", to: "schools", label: "SEPA pain.008 file for the bank" },
        ],
      },
    ],
  },
};
