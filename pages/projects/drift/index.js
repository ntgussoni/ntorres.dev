/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import driftIcon from '../../../public/projects/drift/icon.png';

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-20 scroll-mt-24">
    {title ? (
      <h2 className="text-2xl md:text-3xl font-semibold font-roboto mb-6 text-neutral-900">
        {title}
      </h2>
    ) : null}
    {children}
  </section>
);

const P = ({ children, className = '' }) => (
  <p
    className={`text-base font-body text-neutral-600 mb-4 leading-relaxed max-w-2xl ${className}`}
  >
    {children}
  </p>
);

const Feature = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
    <div className="text-sm font-body text-neutral-600 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

export default function DriftLanding() {
  return (
    <Layout title="Drift">
      <Head>
        <title>Drift — Sleep with science</title>
        <meta
          name="description"
          content="Drift plays one word at a time. Serial Diverse Imagining, clinically tested at Simon Fraser University."
        />
      </Head>

      <div className="max-w-3xl mx-auto w-full">
        <header className="text-center mb-16 md:mb-24">
          <div className="flex justify-center mb-8">
            <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
              <Image
                src={driftIcon}
                alt="Drift app icon"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-roboto text-neutral-900 mb-6 leading-tight">
            Your mind won&apos;t stop. That&apos;s exactly what we work with.
          </h1>
          <P className="mx-auto text-lg text-neutral-700">
            Drift plays one word at a time. You picture it. Your brain lets go.
            Sleep follows.
          </P>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href="#app-stores"
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-roboto font-semibold text-sm transition-colors"
            >
              Download Drift — Free
            </a>
            <Link
              href="/projects/drift/science"
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg text-neutral-600 hover:text-neutral-900 font-roboto text-sm border border-neutral-300 hover:bg-neutral-50 transition-colors"
            >
              The science
            </Link>
          </div>
          <p className="text-xs text-neutral-500 mt-8 font-body max-w-md mx-auto">
            Clinically tested at Simon Fraser University · Based on
            peer-reviewed sleep research
          </p>
        </header>

        <Section title="You&apos;re not an insomniac. Your brain just doesn&apos;t know how to stop.">
          <P>
            That loop of thoughts at midnight — replaying conversations,
            running through tomorrow&apos;s list, worrying about nothing in
            particular — isn&apos;t a disorder. It&apos;s your brain doing
            exactly what it was built to do.
          </P>
          <P>It&apos;s still working.</P>
          <P>
            The problem isn&apos;t that your brain is broken. It&apos;s that
            nothing has told it to stop.
          </P>
        </Section>

        <Section title="One word. One image. Nothing connects. That&apos;s the point.">
          <P>
            Drift reads you a word. <em className="text-neutral-700">Lighthouse.</em>{' '}
            You picture it for a moment. Then another word arrives.{' '}
            <em className="text-neutral-700">Hammock.</em>
          </P>
          <P>
            You picture that. Then another. None of them are related. None of
            them lead anywhere. That&apos;s not a bug — it&apos;s the whole
            mechanism.
          </P>
          <P>
            Your brain can&apos;t build a worry spiral out of disconnected
            images. It can&apos;t make a to-do list out of lighthouse, hammock,
            pineapple. It just follows. And somewhere in the following, sleep
            arrives.
          </P>
          <P>
            This technique is called Serial Diverse Imagining. It was developed
            by researchers at Simon Fraser University to give the brain something
            gentle to do — gentle enough to occupy it, meaningless enough to let
            it drift.
          </P>
          <blockquote className="border-l-4 border-[#F2994A] pl-5 my-8 text-neutral-600 text-sm md:text-base leading-relaxed italic">
            &quot;A racing mind, worries, and uncontrollable thoughts are common
            bedtime complaints. The Serial Diverse Imagining task diverts
            attention away from sleep-interfering thoughts.&quot;
            <footer className="mt-3 not-italic text-neutral-500 text-sm">
              — Beaudoin, Digdon, O&apos;Neill &amp; Rachor · SLEEP 2016
              (American Academy of Sleep Medicine)
            </footer>
          </blockquote>
        </Section>

        <Section title="The research is real. The effect is real.">
          <Feature title="It was tested against standard sleep therapy.">
            <p>
              In a clinical study, Serial Diverse Imagining was as effective as
              Structured Problem-Solving — the gold-standard cognitive treatment
              for pre-sleep arousal. The difference: standard therapy has to be
              done 15 minutes before bed. Drift is done in bed, in the dark,
              while you&apos;re already trying to sleep.
            </p>
          </Feature>
          <Feature title="It works on the right problem.">
            <p>
              Pre-sleep cognitive arousal — the racing mind — is one of the most
              common reasons people can&apos;t fall asleep. Drift targets it
              directly by shifting attention away from goal-directed thought,
              which is the specific type of thinking that keeps you awake.
            </p>
          </Feature>
          <Feature title="The improvement is significant.">
            <p>
              Participants in sleep research showed large effect sizes across
              sleep quality, sleep effort, and pre-sleep arousal — even in
              conditions where other factors (like academic stress) were
              working against them.
            </p>
          </Feature>
        </Section>

        <Section title="Three steps. No effort.">
          <ol className="list-decimal list-inside space-y-4 text-neutral-600 font-body text-sm md:text-base leading-relaxed mb-8">
            <li>
              <strong className="text-neutral-900">Open Drift.</strong> Choose your
              session length and a background sound if you want one. Or
              don&apos;t — the words work on their own.
            </li>
            <li>
              <strong className="text-neutral-900">Close your eyes.</strong> A word
              appears. Picture it clearly for a moment. It doesn&apos;t matter if
              the image is vivid or blurry — just let your mind go to it.
            </li>
            <li>
              <strong className="text-neutral-900">Let the next word arrive.</strong>{' '}
              Another word. Another image. You&apos;re not trying to sleep.
              You&apos;re just following. Sleep will follow you.
            </li>
          </ol>
          <a
            href="#app-stores"
            className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-roboto font-semibold text-sm transition-colors"
          >
            Download Drift — Free
          </a>
        </Section>

        <Section title="Built for the moment you need it most.">
          <Feature title="Background sounds">
            <p>
              Rain. Forest. Waves. Fire. Wind. Birds. Layer them with the words,
              or use them alone. Designed to fill silence without demanding
              attention.
            </p>
          </Feature>
          <Feature title="Session length">
            <p>
              60 seconds to a full night. Set it and forget it — Drift stops
              when you tell it to.
            </p>
          </Feature>
          <Feature title="Personalized">
            <p>
              Tell us your name and we&apos;ll greet you each night. A small
              thing. It matters more than you&apos;d think.{' '}
              <Link
                href="/projects/drift/privacy-policy"
                className="text-[#F2994A] hover:underline"
              >
                How we use your name
              </Link>
            </p>
          </Feature>
          <Feature title="No ads. No notifications. No feed.">
            <p>
              Drift is not a platform. It&apos;s a tool you use and put down.
              That&apos;s by design.
            </p>
          </Feature>
        </Section>

        <Section title="The questions we get">
          <dl className="space-y-6">
            <div>
              <dt className="text-neutral-900 font-semibold mb-2">
                &quot;I&apos;ve tried meditation apps. They don&apos;t work for
                me.&quot;
              </dt>
              <dd className="text-neutral-600 text-sm leading-relaxed">
                Drift isn&apos;t meditation. You&apos;re not trying to clear your
                mind — you&apos;re filling it with something harmless.
                That&apos;s a meaningful difference for people who can&apos;t
                meditate their way to sleep.
              </dd>
            </div>
            <div>
              <dt className="text-neutral-900 font-semibold mb-2">
                &quot;What if I can&apos;t picture things vividly?&quot;
              </dt>
              <dd className="text-neutral-600 text-sm leading-relaxed">
                You don&apos;t need to. A vague impression of the word is
                enough. The point isn&apos;t visualization quality — it&apos;s
                redirecting attention away from structured thought.
              </dd>
            </div>
            <div>
              <dt className="text-neutral-900 font-semibold mb-2">
                &quot;What if I wake up in the night?&quot;
              </dt>
              <dd className="text-neutral-600 text-sm leading-relaxed">
                Start a new session. The technique works whenever your brain is
                in that restless, semi-active state. It&apos;s not only for the
                initial sleep onset.
              </dd>
            </div>
            <div>
              <dt className="text-neutral-900 font-semibold mb-2">
                &quot;Is this just a white noise app?&quot;
              </dt>
              <dd className="text-neutral-600 text-sm leading-relaxed">
                The ambient sounds are optional. The words are the core. White
                noise occupies your ears; Drift occupies the part of your brain
                that&apos;s keeping you awake.
              </dd>
            </div>
          </dl>
        </Section>

        <Section
          id="app-stores"
          title="Your brain needs a gentle off-switch. This is it."
        >
          <P>
            Free to download. No account required. No sleep journal to maintain,
            no breathing exercises to remember, no content library to browse.
            Just words, one at a time, until you&apos;re gone.
          </P>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-5 sm:gap-6 mt-8">
            <a
              href="https://apps.apple.com/nl/app/drift-fall-asleep-in-minutes/id6762871366"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded"
            >
              <Image
                src="/projects/drift/app-store-badge.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-10 w-auto sm:h-11"
                unoptimized
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.bedtimefable.drift"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded"
            >
              <Image
                src="/projects/drift/google-play-badge.svg"
                alt="Get it on Google Play"
                width={180}
                height={53}
                className="h-[44px] w-auto sm:h-[53px]"
                unoptimized
              />
            </a>
          </div>
          <p className="text-xs text-neutral-500 mt-10 font-body italic">
            Based on sleep science from Simon Fraser University and MacEwan
            University.
          </p>
        </Section>

        <footer className="border-t border-neutral-200 pt-10 mt-16 text-sm text-neutral-500 font-body space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/projects/drift/science" className="hover:text-neutral-600">
              Science
            </Link>
            <Link
              href="/projects/drift/privacy-policy"
              className="hover:text-neutral-600"
            >
              Privacy Policy
            </Link>
            <a href="mailto:hey@ntorres.dev" className="hover:text-neutral-600">
              Support
            </a>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
