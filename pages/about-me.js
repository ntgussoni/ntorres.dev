import clsx from 'clsx';
import Image from 'next/image';
import Layout from '../components/Layout';
import { ContributionGraph } from '../components/ContributionGraph';
import { getContributions, GITHUB_REVALIDATE_SECONDS } from '../components/github';
import profilePic from '../public/avatar.png';

const AboutMe = ({ githubData }) => (
  <Layout
    title="About"
    description={
      githubData?.bio ||
      'Fullstack engineer. AI, robotics, drones, and building software that makes an impact.'
    }
    path="/about-me"
    wide
  >
    <CV
      calendar={githubData?.contributionsCollection?.contributionCalendar}
    />
  </Layout>
);

function Heading({ children }) {
  return (
    <h2 className="mb-6 mt-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
      {children}
    </h2>
  );
}

function Heading2({ children }) {
  return (
    <h2 className="mb-6 mt-3 break-words text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
      {children}
    </h2>
  );
}

function TimelineEntry({ children }) {
  return (
    <div className="timeline-entry relative mb-6">
      <span className="dot" aria-hidden="true" />
      {children}
    </div>
  );
}

function Heading3({ children }) {
  return (
    <h3 className="mb-1 mt-3 text-base font-semibold text-neutral-900">
      {children}
    </h3>
  );
}

function EducationItem({ title, text }) {
  return (
    <div className={clsx(text ? 'mb-6' : 'mb-2')}>
      <div className={clsx(text && 'mb-1', 'text-sm font-medium text-neutral-900')}>
        {title}
      </div>
      {text && <div className="text-sm text-neutral-600">{text}</div>}
    </div>
  );
}

function RoleMeta({ title, dates, location, fullTime = true }) {
  return (
    <div className="mb-8 mt-2 text-sm font-normal text-neutral-600">
      <span>{title}</span>
      {fullTime && <span className="block text-neutral-500">Full-time</span>}
      <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
        <span className="text-neutral-400">{dates}</span>
        {location && <span className="text-neutral-400">{location}</span>}
      </div>
    </div>
  );
}

function ProjectMeta({ dates, location, fullTime = false }) {
  return (
    <div className="mb-3 flex flex-col gap-1 text-sm text-neutral-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
      {fullTime && <span>Full-time</span>}
      {dates && <span className="text-neutral-400">{dates}</span>}
      {location && <span className="text-neutral-400">{location}</span>}
    </div>
  );
}

function AIAssistant() {
  return (
    <div className="project-section">
      <Heading3>
        <b>AI Assistant</b> — Bridging users to over a million pages of
        documentation
      </Heading3>
      <p>
        Built the first iteration of an AI assistant bridging users to over a
        million pages of documentation, providing role- and project-specific
        answers.
      </p>
      <p>
        Developed Agents, MCP servers, and Retrieval-Augmented Generation (RAG)
        pipelines to make documentation intuitively searchable and actionable.
      </p>
      <p>
        Collaborated with technical writers and DevOps teams to transition the
        system from prototype to production, achieving adoption and usability at
        scale. Generated 10k+ user interactions in the first six months,
        demonstrating strong engagement and effectiveness.
      </p>
      <p>
        Tech stack: <b>Azure Search AI</b>, <b>LangChain/LangGraph</b>,{' '}
        <b>Langfuse</b>, <b>AI SDK</b>, <b>DeepEval</b>.
      </p>
    </div>
  );
}

function BackbaseIO() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Backbase.io — Developer Platform</b> — Serving internal developers
        and clients
      </Heading3>
      <p>
        Built a developer platform serving internal developers (1k+) and clients
        (~5k), consolidating technical documentation, APIs, and tools, to
        streamline onboarding and improve discoverability across 100k+ pages of
        content.
      </p>
      <p>
        Reduced documentation release times from 2 days to instant builds,
        enabling frequent updates across the entire documentation and supporting
        30+ technical writers and developers.
      </p>
      <p>
        Improved documentation findability, allowing users to get tailor-made
        answers instantly instead of browsing hundreds of nested pages, while
        enabling writers and developers to work efficiently using preview
        deployments, queues, custom multithreading tools, and caching.
      </p>
      <p>
        Led the initial creation, setup, and architecture planning,
        collaborating closely with multiple teams across technical writing,
        development, and DevOps.
      </p>
      <p>
        Tech stack: <b>Next.js</b>, <b>Angular</b>, <b>Node.js</b>,{' '}
        <b>Kubernetes</b>, <b>PostgreSQL</b>, <b>Prisma</b>, <b>Nginx</b>,{' '}
        <b>Docker</b>.
      </p>
    </div>
  );
}

function DocumentationBuilder() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Documentation Builder</b> — In-house documentation building tool
        (SFE, Tech Lead)
      </Heading3>
      <ProjectMeta dates="Oct 2022 — Mar 2023" fullTime />
      <p>
        Built an in-house documentation tool allowing 30+ technical writers to
        collaborate in real-time, preview, and build content consistently.
      </p>
      <p>
        Supported 60k+ builds over three years, ensuring efficiency and quality
        across the platform.
      </p>
      <p>
        Tech stack: <b>Node.js</b>, <b>Asciidoc</b>, <b>Multithreading</b>,{' '}
        <b>DevOps tools</b>.
      </p>
    </div>
  );
}

function DeveloperHub() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Developer Hub</b> — Powering the work of thousands of developers
        (SFE, Tech Lead)
      </Heading3>
      <ProjectMeta dates="Jan 2021 — Jan 2023" />
      <p>
        Launched the next-gen knowledge center, powering 6k+ developers (1k
        internal, ~5k clients).
      </p>
      <p>
        Improved documentation discoverability and search using Elasticsearch
        and a custom indexing system.
      </p>
      <p>
        Led a company-wide shift in how developers accessed and used technical
        information.
      </p>
      <p>
        Tech stack: <b>Next.js</b>, <b>Typescript</b>, <b>NX</b>, <b>Prisma</b>,{' '}
        <b>Express.js</b>, <b>Kubernetes</b>, <b>Nginx</b>.
      </p>
    </div>
  );
}

function SoftwareCatalog() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Software catalog</b> — Manage all your software, all in one place
        (Senior Full Stack Engineer)
      </Heading3>
      <ProjectMeta dates="Mar 2021 — Aug 2021" fullTime />
      <p>
        Built a centralized software catalog tracking deliverables, libraries,
        and team ownership, serving as the main source of truth for the
        company&apos;s ecosystem.
      </p>
      <p>
        Increased discoverability and accountability, eliminating software
        &quot;hidden&quot; in dark corners of the tech stack and enabling teams
        to see all services they own and related resources.
      </p>
      <p>
        Led the initial prototype, architecture setup, deployment, and ongoing
        enhancements, contributing to open-source improvements on Backstage.io.
      </p>
      <p>
        Tech stack: <b>React</b>, <b>Node.js</b>, <b>Docker</b>, <b>AWS</b>,{' '}
        <b>Kubernetes</b>, <b>GitHub Actions</b>, <b>Jenkins</b>.
      </p>
    </div>
  );
}

function Community() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Community and Documentation</b> — Legacy platform (Full Stack
        Engineer)
      </Heading3>
      <ProjectMeta dates="Jan 2020 — Jan 2021" fullTime />
      <p>
        Conducted impact analysis and migration planning for older documentation
        systems.
      </p>
      <p>
        Led company-wide initiatives that seeded the Developer Hub and API
        Portal, laying the foundation for modern developer workflows.
      </p>
      <p>
        Tech stack: <b>Discourse</b>, <b>Ember.js</b>, <b>Ruby on Rails</b>.
      </p>
    </div>
  );
}

function FertilityPro() {
  return (
    <div className="project-section">
      <Heading3>
        <b>FertilityPro</b> — Improving IVF Experiences (SFE)
      </Heading3>
      <ProjectMeta dates="Apr 2017 — Jan 2020" location="Montevideo" />
      <p>
        Assisted fertility is a key driver for the life of most intended
        parents, but the regulations turn the process into a cumbersome
        experience, generating anxiety for parents and a tough environment for
        nurses and doctors to navigate in.
      </p>
      <p>
        It&apos;s a platform that&apos;s designed to minimize patient stress and
        empower fertility doctors by providing them with the right information
        at the right time.
      </p>
      <p>
        It consists of a set of <b>HIPAA compliant</b> multi-tenant applications
        built with <b>Ruby on Rails</b> and <b>Ember.js</b> and which design
        leverages behavioral design techniques.
      </p>
    </div>
  );
}

function Trama() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Trama</b> — Connecting entrepreneurs and researchers with investors
        and talent (SFE)
      </Heading3>
      <ProjectMeta dates="Jan 2019 — Jan 2020" />
      <p>
        It is a digital platform that connects talents, entrepreneurs,
        researchers, businessmen, and investors to share their projects and
        experiences, promoting joint work to promote research and innovation in
        the country.
      </p>
      <p>
        PWA built with <b>Next.js (React)</b> and <b>GraphQL</b> with
        <b> Apollo</b>, <b>Ruby on Rails</b> as a backend.
      </p>
    </div>
  );
}

function Adidas() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Adidas</b> — Energy to Suárez
      </Heading3>
      <ProjectMeta dates="Apr 2017 — Jan 2020" />
      <p>
        A publicity campaign for the World Cup 2018, consisted of an interactive
        experience where participants could send their energy to the shoes that
        were later going to be used by Luis Suarez in the world cup.
      </p>
      <p>
        Developed the electronics and software needed for the solution; it
        consisted of lights, sensors, moving parts, and screens synced up to a
        visual experience.
      </p>
    </div>
  );
}

function SrvMonitor() {
  return (
    <div className="project-section">
      <Heading3>
        <b>SRVMonitor</b> — ERP Software
      </Heading3>
      <p>
        Building ERP software for Conaprole, one of the biggest companies in the
        country. The software enables the company to manage its thousands of
        resources and dependencies, it&apos;s used for daily planning and
        control of assets.
      </p>
      <p>
        Built with <b>PHP</b>, <b>Javascript</b> and <b>.NET</b>
      </p>
    </div>
  );
}

function FADU() {
  return (
    <div className="project-section">
      <Heading3>
        <b>FADU</b> — Institutional portal
      </Heading3>
      <p>
        Maintained the online infrastructure for the university&apos;s portals
        and took part in several internal projects.
      </p>
    </div>
  );
}

function Veterinaria() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Facultad de Veterinaria UdelaR</b> — Information Technology Network
        Manager
      </Heading3>
      <p>
        Managed the information technology network infrastructure for the
        university&apos;s veterinary faculty.
      </p>
    </div>
  );
}

function Forma() {
  return (
    <div className="project-section">
      <Heading3>
        <b>FORMA</b>
      </Heading3>
      <p>
        Developed FORMA; a platform that allows users to register to courses and
        evaluate the teachers&apos; performance. It enables the administrators
        to manage the submissions, schedule new course registrations, and handle
        the course payments.
      </p>
      <p>
        Software developed for Facultad de Arquitectura, Diseño y Urbanismo de
        la Universidad de la República at first but now being used in several
        other Universities.
      </p>
      <p>
        Built with <b>PHP</b> and <b>Javascript</b>
      </p>
    </div>
  );
}

const CV = ({ calendar }) => (
  <>
    <div className="mb-14 flex flex-col gap-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-8 md:flex-row md:items-start">
      <div className="flex shrink-0 items-center gap-4 md:block md:items-start">
        <Image
          src={profilePic}
          alt="Nicolás Torres"
          width={140}
          height={140}
          className="h-20 w-20 rounded-full sm:h-24 sm:w-24 md:h-[140px] md:w-[140px]"
        />
        <div className="min-w-0 space-y-1 text-sm text-neutral-600 md:mt-4">
          <p className="break-all">ntorres.dev@gmail.com</p>
          <p>Lelystad, Flevoland, The Netherlands</p>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
          Nicolás Torres Gussoni
        </h1>
        <p className="mt-1 text-sm font-medium uppercase tracking-wider text-neutral-500">
          AI / Senior Fullstack Engineer
        </p>
        <div className="me mt-6 space-y-4 text-sm leading-relaxed text-neutral-600 md:text-base">
          <p>
            I&apos;m an AI / Full Stack engineer in The Netherlands working on
            software that makes an impact.
          </p>
          <p>
            With over 18 years of experience, leading development and
            coordinating multiple teams, I&apos;m all about taking up challenges
            and complex projects; I&apos;m passionate about architecture, neat
            and well-tested code, trying bleeding-edge technologies, prototyping
            ideas, and giving something back through my open source
            contributions.
          </p>
          <p>
            I have experience building complex projects since inception and MVP
            phase, as well as well-established software and teams. My current
            focus is mainly on AI, assistants and automation together with
            documentation and developer-oriented tooling.
          </p>
          <p>
            And because not everything is code, I&apos;m also passionate about
            robotics, drones, and building stuff in general.
          </p>
        </div>
        <ContributionGraph calendar={calendar} className="mt-8 max-w-full" />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr,3fr]">
      <div>
        <Heading>Education</Heading>
        <EducationItem
          title="Facultad de Ingeniería"
          text="Studied Software Engineering and Robotics — did not complete"
        />
        <EducationItem
          title="Instituto Tecnológico Superior"
          text="Bachiller en Mantenimiento y Procesamiento Informático"
        />
        <Heading>Languages</Heading>
        <EducationItem title="English (Full Professional)" />
        <EducationItem title="Spanish (Native)" />
        <EducationItem title="Dutch (Basic)" />
      </div>
      <div>
          <Heading>Experience</Heading>
          <div className="timeline relative ml-[11px] border-l-2 border-neutral-200 pl-6 md:ml-[15px] md:pl-8">
            <TimelineEntry>
              <Heading2>
                <span className="font-semibold text-neutral-900">
                  BACKBASE — THE #1 DIGITAL BANKING PLATFORM
                </span>
                <RoleMeta
                  title="AI / Senior Fullstack Engineer"
                  dates="Jan 2025 — Present"
                  location="Netherlands · Hybrid"
                />
              </Heading2>
              <AIAssistant />
            </TimelineEntry>
            <TimelineEntry>
              <Heading2>
                <span className="font-semibold text-neutral-900">
                  BACKBASE — THE #1 DIGITAL BANKING PLATFORM
                </span>
                <RoleMeta
                  title="Senior Fullstack Engineer"
                  dates="Jan 2020 — Present"
                  location="Amsterdam"
                />
              </Heading2>
              <BackbaseIO />
              <DocumentationBuilder />
              <DeveloperHub />
              <SoftwareCatalog />
              <Community />
            </TimelineEntry>
            <TimelineEntry>
              <Heading2>
                <span className="font-semibold text-neutral-900">
                  INGENIOUS — FUELING THE NEXT HEALTHCARE INDUSTRY
                </span>
                <RoleMeta
                  title="Senior Fullstack Engineer"
                  dates="Apr 2017 — Jan 2020"
                  fullTime={false}
                />
              </Heading2>
              <FertilityPro />
              <Trama />
              <Adidas />
            </TimelineEntry>
            <TimelineEntry>
              <Heading2>
                <span className="font-semibold text-neutral-900">INFOKE</span>
                <div className="mb-8 mt-2 flex flex-col gap-1 text-sm font-normal text-neutral-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                  <span>Full Stack Engineer — Team Lead</span>
                  <span className="text-neutral-400">Mar 2015 — Apr 2017</span>
                </div>
              </Heading2>
              <SrvMonitor />
            </TimelineEntry>
            <TimelineEntry>
              <Heading2>
                <span className="font-semibold text-neutral-900">
                  FACULTAD DE ARQUITECTURA, DISEÑO Y URBANISMO
                </span>
                <div className="mb-8 mt-2 flex flex-col gap-1 text-sm font-normal text-neutral-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                  <span>Fullstack Engineer — Webmaster</span>
                  <span className="text-neutral-400">Jan 2013 — Jan 2017</span>
                </div>
              </Heading2>
              <FADU />
              <Forma />
            </TimelineEntry>
            <TimelineEntry>
              <Heading2>
                <span className="font-semibold text-neutral-900">
                  FACULTAD DE VETERINARIA UDELAR
                </span>
                <div className="mb-8 mt-2 flex flex-col gap-1 text-sm font-normal text-neutral-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                  <span>Information Technology Network Manager</span>
                  <span className="text-neutral-400">Mar 2010 — Mar 2012</span>
                </div>
              </Heading2>
              <Veterinaria />
            </TimelineEntry>
          </div>
        <div>
          <Heading>Voluntary work</Heading>
          <div className="mb-6">
            <Heading2>
              Scouts de Uruguay
              <div className="mb-8 mt-2 font-normal">
                <span className="text-sm text-neutral-400">Jan 2013 — Jan 2017</span>
                <p className="mt-2 text-sm text-neutral-600">
                  Group Leader working with kids and teenagers. Image area
                  coordinator at Scouts de Uruguay
                </p>
              </div>
            </Heading2>
          </div>
        </div>
      </div>
    </div>
  </>
);

export async function getStaticProps() {
  const githubData = await getContributions(process.env.GITHUB_KEY);

  return {
    props: { githubData },
    revalidate: GITHUB_REVALIDATE_SECONDS,
  };
}

export default AboutMe;
