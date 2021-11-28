import clsx from 'clsx';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import profilePic from '../public/avatar.png';

const ContactMe = () => (
  <Layout>
    <Head>
      <title>About me - Nicolás Torres</title>
    </Head>
    <CV />
  </Layout>
);

function Heading({ children }) {
  return (
    <h2 className=" text-headers font-roboto text-2xl font-normal filter drop-shadow-md mb-6 mt-3">
      {children}
    </h2>
  );
}

function Heading2({ children }) {
  return (
    <h2 className="relative font-body text-[28px] font-normal filter drop-shadow-xl mb-6 mt-3">
      <span className="dot" />
      {children}
    </h2>
  );
}

function Heading3({ children }) {
  return (
    <h3 className="font-oxygen text-lg font-normal mb-1 mt-3 filter drop-shadow-xl ">
      {children}
    </h3>
  );
}

function EducationItem({ title, text }) {
  return (
    <div className={clsx('font-oxygen', text ? 'mb-6' : 'mb-2')}>
      <div className={clsx(text && 'mb-2', ' font-bold text-sm')}>{title}</div>
      {text && <div className="text-sm">{text}</div>}
    </div>
  );
}

function DeveloperHub() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Developer Hub</b> - Powering the work of thousands of developers
      </Heading3>
      <p className="text-base font-body">
        Building the next-gen Developer Hub, the knowledge center that powers
        the work of thousands of developers in Backbase and our clients.
        Responsible for creating a unified developer experience, bringing order
        and coherence to all the knowledge in our company regarding functional
        and technical documentation.
      </p>
      <p className="text-base font-body">
        Built with <b>Gatsby(React)</b> and monorepos using <b>Lerna </b>
        and Yarn workspaces. The tooling is built on
        <b> Node(Typescript)</b>.
      </p>
      <p className="text-base font-body">
        Our infrastructure consists of <b>AWS</b>, <b>Docker</b>,
        <b>Kubernetes</b>, <b>Github Actions</b>,<b>Jenkins</b>.
      </p>
    </div>
  );
}

function SoftwareCatalog() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Software catalog</b> - Manage all your software, all in one place
      </Heading3>
      <p className="text-base font-body">
        It&apos;s a centralized catalog that keeps track of our deliverables,
        libraries, and teams that own them. It&apos;s the main source of truth
        for our ecosystem and the go-to location for every team to see all
        services that they own and related resources.
      </p>

      <p className="text-base font-body">
        We provide discoverability and accountability to teams; no more software
        hiding in the dark corners of the tech stack.
      </p>

      <p className="text-base font-body">
        The backbase software catalog was built on top of Backstage.io using
        <b> React</b> and <b>Nodejs</b> and <b>Docker</b>
      </p>
    </div>
  );
}

function Community() {
  return (
    <div className="project-section">
      <Heading3>
        <b>Community and Documentation</b> - Legacy platform
      </Heading3>
      <p className="text-base font-body">
        Providing maintenance to our legacy systems and tools used by Technical
        Writers to generate documentation from <b>Asciidoc</b>.
      </p>

      <p className="text-base font-body">
        Built on top of Discourse forums with <b>Ember.js</b> and
        <b> Ruby on Rails</b> using Engines.
      </p>
    </div>
  );
}

function FertilityPro() {
  return (
    <div className="project-section">
      <Heading3>
        <b>FertilityPro</b> - Improving IVF Experiences
      </Heading3>
      <p className="text-base font-body">
        Assisted fertility is a key driver for the life of most intended
        parents, but the regulations turn the process into a cumbersome
        experience, generating anxiety for parents and a tough environment for
        nurses and doctors to navigate in.
      </p>

      <p className="text-base font-body">
        It&apos;s a platform that&apos;s designed to minimize patient stress and
        empower fertility doctors by providing them with the right information
        at the right time.
      </p>

      <p className="text-base font-body">
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
        <b>Trama</b> - Connecting entrepreneurs and researchers with investors
        and talent.
      </Heading3>
      <p className="text-base font-body">
        It is a digital platform that connects talents, entrepreneurs,
        researchers, businessmen, and investors to share their projects and
        experiences, promoting joint work to promote research and innovation in
        the country.
      </p>

      <p className="text-base font-body">
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
        <b>Adidas</b> - Energy to Suárez
      </Heading3>
      <p className="text-base font-body">
        A publicity campaign for the World Cup 2018, consisted of an interactive
        experience where participants could send their energy to the shoes that
        were later going to be used by Luis Suarez in the world cup.
      </p>

      <p className="text-base font-body">
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
        <b>SRVMonitor</b> - ERP Software
      </Heading3>
      <p className="text-base font-body">
        Building ERP software for Conaprole, one of the biggest companies in the
        country.
      </p>

      <p className="text-base font-body">
        The software enables the company to manage its thousands of resources
        and dependencies, it&apos;s used for daily planning and control of
        assets.
      </p>

      <p className="text-base font-body">
        Built with <b>PHP</b>, <b>Javascript</b> and <b>.NET</b>
      </p>
    </div>
  );
}

function FADU() {
  return (
    <div className="project-section">
      <Heading3>
        <b>FADU</b> - Institutional portal
      </Heading3>
      <p className="text-base font-body">
        Maintained the online infrastructure for the university&apos;s portals
        and took part in several internal projects.
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
      <p className="text-base font-body">
        Developed FORMA; a platform that allows users to register to courses and
        evaluate the teachers&apos; performance. It enables the administrators
        to manage the submissions, schedule new course registrations, and handle
        the course payments.
      </p>

      <p className="text-base font-body">
        Software developed for Facultad de Arquitectura, Diseño y Urbanismo de
        la Universidad de la República at first but now being used in several
        other Universities.
      </p>

      <p className="text-base font-body">
        Built with <b>PHP</b> and <b>Javascript</b>
      </p>
    </div>
  );
}
const CV = () => (
  <>
    <div className="flex flex-row min-w-[210px] w-full min-h-[273px] rounded-[16px] shadow-boxes bg-gradient-to-bl from-[#F2994A] to-[#EB5757] px-8 py-10 items-center mb-14">
      <div className="w-full flex-[25%] hidden lg:block">
        <div className="flex justify-center">
          <Image
            src={profilePic}
            alt="Nicolás Torres"
            width="140"
            height="140"
          />
        </div>
        <div className="ml-8 mt-4">
          <p className="text-xs font-light mb-2 self-start">
            ntorres.dev@gmail.com
          </p>
          <p className="text-xs font-light mb-2 self-start" />
          <p className="text-xs font-light self-start">
            Almere, Flevoland, The Netherlands
          </p>
        </div>
      </div>
      <div className="flex-[75%] lg:ml-10">
        <div className="font-roboto font-bold text-2xl md:text-2xl filter drop-shadow-md">
          NICOLÁS TORRES GUSSONI
        </div>
        <div className="hidden md:block font-body font-light text-lg mb-4">
          FULLSTACK ENGINEER
        </div>
        <div className="me hidden md:block font-body font-light text-sm filter drop-shadow-xl">
          <p>
            I’m a Fullstack engineer from Uruguay working on software that makes
            an impact.
          </p>

          <p>
            With over 12 years of experience, I&apos;m all about taking up
            challenges and complex projects; I&apos;m passionate about
            architecture, neat and well-tested code, trying bleeding-edge
            technologies, and giving something back through my open source
            contributions.
          </p>

          <p>
            And because not everything is code, I&apos;m also passionate about
            robotics, drones, and building stuff.
          </p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-[1fr,3fr] gap-16">
      <div>
        <Heading>EDUCATION</Heading>
        <EducationItem
          title="Facultad de Arquitectura"
          text="Software Engineering and Robotics"
        />
        <EducationItem
          title="Instituto tecnológico superior"
          text="Bachiller en Mantenimiento y Procesamiento Informático"
        />
        <Heading>LANGUAGES</Heading>
        <EducationItem title="English" />
        <EducationItem title="Spanish" />
      </div>
      <div>
        <div className="relative">
          <Heading>EXPERIENCE</Heading>
          <div className="timeline">
            <div className="mb-6">
              <Heading2>
                <span className="font-roboto text-[#F2C94C]">
                  <b>BACKBASE</b> - THE #1 DIGITAL BANKING PLATFORM
                </span>
                <div className="mb-8 text-sm">
                  <span>Senior Fullstack Engineer - Tech Lead</span>
                  <span className="font-light ml-8">Jan 2020 - Present</span>
                </div>
              </Heading2>
              <DeveloperHub />
              <SoftwareCatalog />
              <Community />
            </div>
            <div className="mb-6">
              <Heading2>
                <span className="font-roboto  text-[#F2C94C]">
                  <b>INGENIOUS</b> - FUELING THE NEXT HEALTHCARE INDUSTRY
                </span>
                <div className="mb-8 text-sm">
                  <span>Senior Fullstack Engineer - Team Lead</span>
                  <span className="font-light ml-8">Apr 2017 - Jan 2020</span>
                </div>
              </Heading2>
              <FertilityPro />
              <Trama />
              <Adidas />
            </div>
            <div className="mb-6">
              <Heading2>
                <span className="font-roboto  text-[#F2C94C]">
                  <b>INFOKE </b>
                </span>
                <div className="mb-8 text-sm">
                  <span>Senior Fullstack Engineer - Team Lead</span>
                  <span className="font-light ml-8">Mar 2015 - Apr 2017</span>
                </div>
              </Heading2>
              <SrvMonitor />
            </div>
            <div className="mb-6">
              <Heading2>
                <span className="font-roboto  text-[#F2C94C]">
                  <b>FACULTAD DE ARQUITECTURA, DISEÑO Y URBANISMO </b>
                </span>
                <div className="mb-8 text-sm">
                  <span>Fullstack Engineer - Webmaster</span>
                  <span className="font-light ml-8">Jan 2013 - Jan 2017</span>
                </div>
              </Heading2>
              <FADU />
              <Forma />
            </div>
          </div>
        </div>
        <div>
          <Heading>VOLUNTARY WORK</Heading>
          <div className="mb-6">
            <Heading2>
              <b>Scouts de Uruguay</b>
              <div className="mb-8">
                <span className="font-light text-base">
                  Jan 2013 - Jan 2017
                </span>
                <p className="text-sm">
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

export default ContactMe;
