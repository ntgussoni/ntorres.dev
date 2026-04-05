/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';

const Section = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-xl md:text-2xl font-semibold font-roboto mb-4 text-white">
      {title}
    </h2>
    {children}
  </section>
);

const H3 = ({ children }) => (
  <h3 className="text-lg font-semibold text-white mb-3 mt-6">{children}</h3>
);

const P = ({ children }) => (
  <p className="text-sm font-body text-gray-300 mb-3 leading-relaxed">
    {children}
  </p>
);

const Table = ({ children }) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full border-collapse border border-gray-700 text-left text-sm">
      {children}
    </table>
  </div>
);

const Th = ({ children, className = '' }) => (
  <th
    className={`py-2 px-3 border-b border-gray-600 bg-gray-800 font-semibold text-white ${className}`}
  >
    {children}
  </th>
);

const Td = ({ children, className = '' }) => (
  <td className={`py-2 px-3 border-b border-gray-700 text-gray-300 ${className}`}>
    {children}
  </td>
);

export default function DriftScience() {
  return (
    <Layout>
      <Head>
        <title>The science behind Drift</title>
        <meta
          name="description"
          content="Serial Diverse Imagining (SDIT): research, mechanism, and evidence from Simon Fraser University and SLEEP 2016."
        />
      </Head>

      <article className="max-w-3xl mx-auto w-full">
        <p className="text-sm text-gray-400 mb-2">
          <Link href="/projects/drift" passHref>
            <a className="hover:text-gray-200">← Drift</a>
          </Link>
        </p>
        <h1 className="text-3xl font-bold font-roboto mb-4 text-white">
          The science behind Drift
        </h1>
        <P>
          Drift is built on a specific, peer-reviewed sleep technique called{' '}
          <strong className="text-white">Serial Diverse Imagining (SDIT)</strong>{' '}
          — developed by cognitive scientist Luc P. Beaudoin at Simon Fraser
          University and tested in a randomized controlled trial at the American
          Academy of Sleep Medicine&apos;s annual conference.
        </P>
        <P>
          This page explains the research, the mechanism, and what the evidence
          actually shows.
        </P>

        <hr className="border-gray-700 my-10" />

        <Section title="The core problem: pre-sleep cognitive arousal">
          <P>
            Most sleep difficulties aren&apos;t caused by the body — they&apos;re
            caused by the mind.
          </P>
          <P>
            <strong className="text-white">Pre-sleep cognitive arousal</strong>{' '}
            is the technical term for a racing mind at bedtime: intrusive
            thoughts, mental replay of events, anticipatory worry, and the
            inability to disengage from goal-directed thinking. It&apos;s one of
            the most common reported causes of sleep onset difficulty and poor
            sleep quality across the general population.
          </P>
          <P>
            Existing treatments — cognitive behavioral therapy for insomnia
            (CBT-I), structured problem-solving, mindfulness-based approaches —
            are effective but have practical limitations. Most require daytime
            practice, trained clinicians, or sustained effort that a
            sleep-deprived person cannot reliably maintain.
          </P>
          <P>
            The question Beaudoin set out to answer: is there a technique that
            works <em>at</em> bedtime, requires no training, and directly
            targets cognitive arousal?
          </P>
        </Section>

        <Section title="The theoretical framework">
          <H3>Beaudoin (2013) — SFU Summit Repository</H3>
          <P>
            Beaudoin proposed a framework distinguishing three types of pre-sleep
            mental activity:
          </P>
          <Table>
            <thead>
              <tr>
                <Th>Type</Th>
                <Th>Definition</Th>
                <Th>Effect on sleep</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td className="font-medium text-white">Somnolent mentation</Td>
                <Td>Mental activity that facilitates sleep onset</Td>
                <Td>Positive</Td>
              </tr>
              <tr>
                <Td className="font-medium text-white">Asomnolent mentation</Td>
                <Td>Neutral mental activity</Td>
                <Td>Neutral</Td>
              </tr>
              <tr>
                <Td className="font-medium text-white">Insomnolent mentation</Td>
                <Td>Mental activity that interferes with sleep</Td>
                <Td>Negative</Td>
              </tr>
            </tbody>
          </Table>
          <P>
            Insomnolent mentation includes: rumination, worry, goal-directed
            planning, emotional processing, and structured narrative thought.
            These activities share a common feature — they&apos;re{' '}
            <em>coherent</em>. They build on themselves. One thought leads to
            another in a chain the brain can follow.
          </P>
          <P>
            Beaudoin proposed that the solution was not to empty the mind (which
            tends to produce more anxious thought) but to{' '}
            <em>occupy</em> it with something that is simultaneously: (1)
            engaging enough to displace structured thought, and (2) incoherent
            enough to prevent chain-building.
          </P>
          <P>
            He called this <strong className="text-white">super-somnolent mentation</strong>{' '}
            — mental activity that is simultaneously sleep-promoting{' '}
            <em>and</em> counter-insomnolent.
          </P>
          <P>
            Serial Diverse Imagining was proposed as one implementation of this
            principle: presenting concrete, unrelated words one at a time, with
            sufficient interval for the user to form a mental image of each,
            preventing any narrative thread from forming.
          </P>
          <blockquote className="border-l-4 border-gray-600 pl-4 my-6 text-gray-400 text-sm italic">
            Note: The 2013 paper is a theoretical framework. It does not present
            empirical trial data. The controlled trial of SDIT is documented
            separately (Beaudoin et al., 2016, below).
          </blockquote>
        </Section>

        <Section title="The randomized controlled trial">
          <H3>Beaudoin, Digdon, O&apos;Neill &amp; Rachor (2016)</H3>
          <P>
            <strong className="text-white">Full citation:</strong> Beaudoin, L.
            P., Digdon, N., O&apos;Neill, K. &amp; Rachor, G. (2016). Serial
            diverse imagining task: A new remedy for bedtime complaints of
            worrying and other sleep-disruptive mental activity. Poster presented
            at <em>SLEEP 2016</em> — Joint Annual Meeting of the American Academy
            of Sleep Medicine and the Sleep Research Society. Denver, CO.
          </P>

          <H3>Study design</H3>
          <Table>
            <tbody>
              <tr>
                <Td className="font-medium text-white whitespace-nowrap">
                  Design
                </Td>
                <Td>Randomized controlled trial</Td>
              </tr>
              <tr>
                <Td className="font-medium text-white">Sample</Td>
                <Td>n = 154 university students</Td>
              </tr>
              <tr>
                <Td className="font-medium text-white">
                  Inclusion criterion
                </Td>
                <Td>Excessive cognitive pre-sleep arousal (self-reported)</Td>
              </tr>
              <tr>
                <Td className="font-medium text-white">Conditions</Td>
                <Td>
                  SDIT only · Structured Problem-Solving (SP) only · SDIT + SP
                  combined
                </Td>
              </tr>
              <tr>
                <Td className="font-medium text-white">
                  Measurement points
                </Td>
                <Td>Baseline · 1 week · 1 month</Td>
              </tr>
              <tr>
                <Td className="font-medium text-white">Instruments</Td>
                <Td>
                  Pre-Sleep Arousal Scale (PSAS), Sleep Quality Scale, Glasgow
                  Sleep Effort Scale, Sleep Hygiene Index
                </Td>
              </tr>
            </tbody>
          </Table>

          <H3>The comparison treatment: Structured Problem-Solving</H3>
          <P>
            Structured Problem-Solving (SP) is an established clinical
            intervention for pre-sleep cognitive arousal. Patients are
            instructed to set aside 15–20 minutes <em>before</em> bed (not at
            bedtime) to systematically identify worries, list potential solutions,
            and defer the thinking to a scheduled time. It requires daytime
            practice and conscious effort.
          </P>
          <P>
            SDIT was tested head-to-head against SP as the gold-standard
            comparator.
          </P>

          <H3>Results</H3>
          <P>
            <strong className="text-white">
              Primary outcome — all measures improved significantly:
            </strong>
          </P>
          <Table>
            <thead>
              <tr>
                <Th>Measure</Th>
                <Th>Direction</Th>
                <Th>p-value</Th>
                <Th>Effect size (Partial η²)</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>Cognitive pre-sleep arousal</Td>
                <Td>Decreased</Td>
                <Td>&lt; .001</Td>
                <Td>.43 – .71</Td>
              </tr>
              <tr>
                <Td>Somatic pre-sleep arousal</Td>
                <Td>Decreased</Td>
                <Td>&lt; .001</Td>
                <Td>.43 – .71</Td>
              </tr>
              <tr>
                <Td>Sleep effort</Td>
                <Td>Decreased</Td>
                <Td>&lt; .001</Td>
                <Td>.43 – .71</Td>
              </tr>
              <tr>
                <Td>Sleep quality</Td>
                <Td>Improved</Td>
                <Td>&lt; .001</Td>
                <Td>.43 – .71</Td>
              </tr>
            </tbody>
          </Table>
          <P>
            <strong className="text-white">Effect size interpretation:</strong>{' '}
            Cohen&apos;s conventions classify partial η² &gt; .14 as a{' '}
            <em>large</em> effect. All measures fell in the .43–.71 range —
            well above this threshold. These are not marginal improvements.
          </P>
          <P>
            <strong className="text-white">Notable contextual finding:</strong>{' '}
            Sleep hygiene <em>worsened</em> across the study period (p &lt;
            .001, η² = .23), because the baseline measurement was taken at the
            start of the academic term, before stress increased. Despite
            worsening external conditions, sleep quality and arousal still
            improved — making the SDIT effect more conservative, not less.
          </P>

          <H3>Key conclusion</H3>
          <blockquote className="border-l-4 border-[#F2994A] pl-4 my-6 text-gray-300 text-sm leading-relaxed">
            &quot;Beaudoin&apos;s Serial Diverse Imagining Task was as effective
            as Structured Problem-Solving in reducing pre-sleep arousal, sleep
            effort, and poor sleep quality. One advantage of SDIT is that it can
            be done at bedtime, unlike SP.&quot;
            <footer className="mt-2 text-gray-500 not-italic">
              — Beaudoin et al. (2016)
            </footer>
          </blockquote>
          <P>
            This is clinically meaningful. The two treatments performed
            equivalently on all primary measures. The practical difference is
            significant: SP cannot be done in bed, in the dark, while already
            trying to sleep. SDIT can.
          </P>
        </Section>

        <Section title="Supporting mechanism evidence">
          <H3>Haimov &amp; Shatil (2013)</H3>
          <P>
            <strong className="text-white">Full citation:</strong> Haimov, I.
            &amp; Shatil, E. (2013). Cognitive training improves sleep quality
            and cognitive function among older adults with insomnia.{' '}
            <em>PLoS ONE</em>. PMC3618113.
          </P>
          <P>
            <strong className="text-white">Design:</strong> RCT, n=51 adults
            aged 65–85 with clinically diagnosed chronic insomnia. 8-week
            computerized cognitive training program vs. active control.
          </P>
          <P>
            <strong className="text-white">Key sleep findings:</strong>
          </P>
          <Table>
            <thead>
              <tr>
                <Th>Metric</Th>
                <Th>Baseline</Th>
                <Th>Post-intervention</Th>
                <Th>Change</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>Sleep onset latency</Td>
                <Td>38.4 min</Td>
                <Td>24.8 min</Td>
                <Td>−35%</Td>
              </tr>
              <tr>
                <Td>Sleep efficiency</Td>
                <Td>73.5%</Td>
                <Td>80.3%</Td>
                <Td>+6.8pp</Td>
              </tr>
            </tbody>
          </Table>
          <P>
            <strong className="text-white">Mechanism proposed:</strong> The
            authors propose that systematic cognitive engagement during waking
            hours may reduce habitual pre-sleep mental arousal patterns —
            consistent with Beaudoin&apos;s somnolent/insomnolent mentation
            framework.
          </P>
          <P>
            <strong className="text-white">Relevance to Drift:</strong> This
            study tested <em>cognitive training</em> broadly, not SDIT
            specifically. It is cited here as mechanistic support — it
            demonstrates that engaging the mind in controlled, structured
            cognitive activity has measurable downstream effects on sleep
            quality. The underlying pathway (cognitive engagement → reduced
            pre-sleep arousal → better sleep) is consistent across both bodies of
            research.
          </P>
        </Section>

        <Section title="What the research does and does not show">
          <H3>What it shows</H3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 mb-6 leading-relaxed">
            <li>SDIT is an empirically tested technique, not a wellness trend</li>
            <li>
              In a controlled trial, it performed as well as the gold-standard
              clinical treatment for pre-sleep cognitive arousal
            </li>
            <li>
              Effect sizes are large (η² = .43–.71) and statistically robust (p
              &lt; .001)
            </li>
            <li>
              It works at bedtime, without clinical supervision, without daytime
              preparation
            </li>
            <li>
              Cognitive engagement broadly reduces pre-sleep arousal (supported
              by independent research)
            </li>
          </ul>
          <H3>What it does not show</H3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 leading-relaxed">
            <li>
              SDIT has not been tested in multi-site trials or with clinically
              diagnosed insomnia populations (the 2016 trial used self-reported
              cognitive arousal in a university sample)
            </li>
            <li>
              Long-term efficacy beyond one month has not been formally measured
              in the published research
            </li>
            <li>
              Drift as an application has not been independently studied — it
              implements the SDIT mechanism, but no clinical trial has
              specifically measured the app&apos;s outcomes
            </li>
            <li>
              The 2016 study was a conference poster abstract, not a full
              peer-reviewed journal publication
            </li>
          </ul>
        </Section>

        <Section title="How Drift implements SDIT">
          <P>The 2016 abstract describes the mechanism directly:</P>
          <blockquote className="border-l-4 border-gray-600 pl-4 my-6 text-gray-300 text-sm leading-relaxed italic">
            &quot;An app randomly presents recordings of relatively concrete
            words one at a time with an 8-second interval between recordings
            during which the person creates and maintains a mental image of the
            word until the next recording prompts the next image.&quot;
          </blockquote>
          <P>Drift&apos;s core session loop is a faithful implementation:</P>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 leading-relaxed">
            <li>
              Words are selected randomly from a curated list of concrete,
              visualizable nouns
            </li>
            <li>
              Words are presented one at a time with audio and visual components
            </li>
            <li>
              Intervals allow time for image formation before the next word
              arrives
            </li>
            <li>
              No word follows logically from the previous — narrative threading
              is impossible by design
            </li>
          </ul>
        </Section>

        <Section title="Summary for clinicians and researchers">
          <P>
            Drift is a consumer mobile application implementing the Serial Diverse
            Imagining Task (SDIT) as described by Beaudoin et al. (2016). It is
            not a medical device and makes no diagnostic or treatment claims. It
            is intended as a sleep onset aid for adults experiencing difficulty
            falling asleep due to pre-sleep cognitive arousal.
          </P>
          <P>
            The technique it implements has been tested in a peer-reviewed
            randomized controlled trial (SLEEP 2016, AASM) against an
            established clinical intervention, with large effect sizes on all
            measured sleep outcomes.
          </P>
        </Section>

        <Section title="References">
          <ol className="list-decimal list-outside pl-5 text-sm text-gray-300 space-y-3 leading-relaxed">
            <li>
              <strong className="text-white">Beaudoin, L.P., Digdon, N.,
              O&apos;Neill, K. &amp; Rachor, G. (2016).</strong> Serial diverse
              imagining task: A new remedy for bedtime complaints of worrying and
              other sleep-disruptive mental activity. <em>SLEEP 2016</em> —
              Joint Annual Meeting of the American Academy of Sleep Medicine and
              the Sleep Research Society. Denver, CO.
            </li>
            <li>
              <strong className="text-white">Beaudoin, L.P. (2013, updated
              2015).</strong> Super-somnolent mentation, sleep-onset acceleration,
              and serial diverse imagining. Simon Fraser University Summit
              Repository. Item 12143.
            </li>
            <li>
              <strong className="text-white">Haimov, I. &amp; Shatil, E.
              (2013).</strong> Cognitive training improves sleep quality and
              cognitive function among older adults with insomnia.{' '}
              <em>PLoS ONE</em>. PMC3618113.
            </li>
            <li>
              <strong className="text-white">Harvey, A.G. (2000).</strong>{' '}
              Pre-sleep cognitive activity: A comparison of sleep-onset
              insomniacs and good sleepers. <em>British Journal of Clinical
              Psychology</em>, 39(3), 275–286. (Background on pre-sleep
              cognitive arousal as a construct.)
            </li>
          </ol>
        </Section>

        <p className="text-sm text-gray-500 mt-12 pt-8 border-t border-gray-700">
          <Link href="/projects/drift" passHref>
            <a className="hover:text-gray-300">← Back to Drift</a>
          </Link>
          {' · '}
          <Link href="/projects/drift/privacy-policy" passHref>
            <a className="hover:text-gray-300">Privacy Policy</a>
          </Link>
        </p>
      </article>
    </Layout>
  );
}
