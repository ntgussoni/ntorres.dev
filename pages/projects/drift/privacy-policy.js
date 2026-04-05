import Head from 'next/head';
import Layout from '../../../components/Layout';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold font-roboto mb-3 text-white">
      {title}
    </h2>
    {children}
  </div>
);

const P = ({ children }) => (
  <p className="text-sm font-body text-gray-300 mb-3 leading-relaxed">
    {children}
  </p>
);

const TableRow = ({ area, purpose }) => (
  <tr className="border-b border-gray-700">
    <td className="py-2 pr-4 text-sm font-medium text-white align-top whitespace-nowrap">
      {area}
    </td>
    <td className="py-2 text-sm text-gray-300 align-top">{purpose}</td>
  </tr>
);

const DriftPrivacyPolicy = () => (
  <Layout>
    <Head>
      <title>Privacy Policy — Drift</title>
    </Head>
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold font-roboto mb-2">
        Privacy Policy — Drift
      </h1>
      <p className="text-sm text-gray-400 mb-10">
        Last updated: April 6, 2026
      </p>

      <P>
        This policy describes how the mobile application <strong>Drift</strong>{' '}
        (&quot;the App,&quot; &quot;we,&quot; &quot;us&quot;) handles
        information when you use it. Drift is a sleep and relaxation aid that
        plays calm word-based audio from files included in the app.
      </P>

      <hr className="border-gray-700 my-8" />

      <Section title="Summary">
        <ul className="list-disc list-inside text-sm font-body text-gray-300 space-y-2 leading-relaxed">
          <li>
            The App is designed to work <strong>without sign-in</strong> and{' '}
            <strong>
              without sending your usage or personal content to our servers
            </strong>{' '}
            for core functionality.
          </li>
          <li>
            Word sequences are generated <strong>on your device</strong> with
            randomness; we do not receive lists of words you heard or session
            choices.
          </li>
          <li>
            <strong>
              Audio you hear is played from assets bundled inside the app
            </strong>
            , not streamed from our backend during normal use.
          </li>
          <li>
            If you choose to enter your <strong>name</strong>, it is used{' '}
            <strong>only for personalization</strong> (for example, a greeting
            in the app). It stays on your device; we{' '}
            <strong>do not upload it to our servers</strong> and we{' '}
            <strong>never share it</strong> with third parties as part of the
            App&apos;s design described here.
          </li>
          <li>
            We configure the App <strong>not to use the microphone</strong> for
            recording on iOS (no microphone permission prompt) and{' '}
            <strong>
              not to request Android{' '}
              <code className="text-xs bg-gray-700 px-1 rounded">
                RECORD_AUDIO
              </code>
            </strong>{' '}
            via the Expo Audio config plugin. If a store or device still lists a
            microphone-related permission, it may come from the operating system
            or a dependency; the App does not record your voice for features we
            ship.
          </li>
        </ul>
      </Section>

      <Section title="Who this applies to">
        <P>
          This policy applies to anyone who downloads and uses Drift on{' '}
          <strong>iOS</strong> or <strong>Android</strong> (and any other
          platform build we may offer).
        </P>
        <P>
          <strong>Publisher:</strong> Use your legal entity or trade name here
          (e.g. the name shown in the App Store / Google Play).
          <br />
          <strong>Contact:</strong> Add a contact email or web form URL here for
          privacy questions.
        </P>
      </Section>

      <Section title="Information the App processes on your device">
        <h3 className="text-base font-semibold text-white mb-2">
          Session experience (local only)
        </h3>
        <ul className="list-disc list-inside text-sm font-body text-gray-300 space-y-2 mb-4 leading-relaxed">
          <li>
            <strong>Timer choice</strong> (e.g. 15 / 30 / 45 minutes or
            unlimited): used only in memory to end or fade a session; not
            uploaded by our code.
          </li>
          <li>
            <strong>Shuffle / word order:</strong> computed locally from
            built-in word lists and random selection.
          </li>
          <li>
            <strong>Mute and playback state:</strong> handled locally by the
            audio engine.
          </li>
          <li>
            <strong>Optional display name:</strong> If you enter a name for
            personalization (e.g. nightly greetings), it is stored{' '}
            <strong>only on your device</strong> and used solely to customize
            your experience. We do <strong>not</strong> transmit this name to
            our servers, and we do <strong>not</strong> share it with
            advertisers, data brokers, or other third parties for marketing or
            analytics. Uninstalling the App or clearing app data removes it,
            subject to how your operating system handles local storage.
          </li>
        </ul>
        <P>
          We do <strong>not</strong> operate in-app analytics, advertising SDKs,
          or account systems in the current codebase, and we do{' '}
          <strong>not</strong> intentionally transmit the above to our servers.
        </P>

        <h3 className="text-base font-semibold text-white mb-2 mt-4">Audio</h3>
        <ul className="list-disc list-inside text-sm font-body text-gray-300 space-y-2 mb-4 leading-relaxed">
          <li>
            Playback uses <strong>pre-recorded files</strong> shipped with the
            App (e.g. spoken words and short hints).
          </li>
          <li>
            <strong>Text-to-speech or cloud audio:</strong> The App does not
            call ElevenLabs or similar APIs at runtime. Any third-party tools
            used <strong>only to create audio files before release</strong> are
            part of our content pipeline, not something the App uses while you
            sleep.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-white mb-2 mt-4">
          Diagnostics
        </h3>
        <P>
          Standard <strong>operating system and store</strong> mechanisms (e.g.
          crash reports if you opt in on the device, Play/App Store processing)
          may apply according to <strong>Google</strong> and{' '}
          <strong>Apple</strong> policies, not controlled by this file alone.
        </P>
      </Section>

      <Section title="Permissions and device capabilities">
        <P>
          Permissions and capabilities can vary slightly by OS version and
          build. The App is built with <strong>Expo</strong> and related
          modules. Relevant behaviors include:
        </P>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-left">
            <thead>
              <tr className="border-b border-gray-600 bg-gray-800">
                <th className="py-2 pr-4 text-sm font-semibold text-white">
                  Area
                </th>
                <th className="py-2 text-sm font-semibold text-white">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                area="Audio playback"
                purpose="Play bundled voice clips and optional background playback so audio can continue when the screen is off or the App is in the background (where the OS allows)."
              />
              <TableRow
                area="Audio session / routing"
                purpose="Adjust how audio behaves with silent mode and other apps (via the audio library's normal session setup)."
              />
              <TableRow
                area="Android foreground service"
                purpose="Lets playback continue reliably when enabled for background playback; may show a media-style notification as required by Android."
              />
              <TableRow
                area="Keep screen awake"
                purpose="Reduces the chance the display sleeps mid-session; does not read personal data."
              />
              <TableRow
                area="Haptics"
                purpose="Light vibration on supported devices when you interact with controls; no personal content."
              />
              <TableRow
                area="Microphone"
                purpose="Not used for recording in our configuration (microphonePermission disabled on iOS, recordAudioAndroid: false on Android in app config). We do not use the microphone to listen to you for App features."
              />
            </tbody>
          </table>
        </div>
        <P>
          If you see a permission in store listings that does not match the
          above, compare against your <strong>actual installed build</strong>{' '}
          and manifest; dependency or platform updates can change declared
          permissions. Ask us at the contact above if something looks wrong.
        </P>
      </Section>

      <Section title="Data sharing and third parties">
        <ul className="list-disc list-inside text-sm font-body text-gray-300 space-y-2 leading-relaxed">
          <li>
            <strong>We</strong> do not sell your personal information as part of
            the App&apos;s design described here.
          </li>
          <li>
            <strong>Apple</strong> and <strong>Google</strong> process data
            according to their roles as platform and store providers (billing if
            you ever pay via store, updates, fraud prevention, etc.).
          </li>
          <li>
            <strong>Expo / EAS</strong> (or similar) may be used to{' '}
            <strong>build</strong> the App; that is a development and
            distribution pipeline, not ongoing collection of your in-app
            behavior by default.
          </li>
        </ul>
        <P>
          If we add features that send data off-device (e.g. accounts, sync,
          analytics), we will update this policy and, where required, ask for
          consent or show in-app notices.
        </P>
      </Section>

      <Section title="Retention and security">
        <ul className="list-disc list-inside text-sm font-body text-gray-300 space-y-2 leading-relaxed">
          <li>
            Information that stays <strong>only on your device</strong> is
            removed when you uninstall the App or clear app data, subject to OS
            behavior.
          </li>
          <li>
            We use reasonable practices when building and distributing the App;
            no method of storage or transmission is 100% secure.
          </li>
        </ul>
      </Section>

      <Section title="Children">
        <P>
          The App is intended for general audiences, including people who want
          help relaxing or falling asleep. If you are a parent and believe we
          have inadvertently collected personal information from a child in a
          way that violates law, contact us using the address above and we will
          work to address it.
        </P>
      </Section>

      <Section title="Your rights">
        <P>
          Depending on where you live, you may have rights to access, correct,
          delete, or restrict certain processing of personal data, or to lodge a
          complaint with a supervisory authority. Because the App currently
          minimizes data sent to us, many requests may be limited to what stores
          or OS vendors hold. Contact us and we will respond as required by law.
        </P>
      </Section>

      <Section title="International users">
        <P>
          If you use the App outside the country where the publisher is based,
          your information may be processed in countries where we or our
          processors operate, including through app stores and cloud
          infrastructure they use.
        </P>
      </Section>

      <Section title="Changes to this policy">
        <P>
          We may update this policy when the App or legal requirements change.
          The <strong>&quot;Last updated&quot;</strong> date at the top will
          change when we do. For material changes, we may also use the store
          listing, in-app notice, or email where appropriate.
        </P>
      </Section>

      <Section title="Contact">
        <P>
          <strong>Email:</strong> hey@ntorres.dev
          <br />
          <strong>Website:</strong> https://ntorres.dev
        </P>
      </Section>
    </div>
  </Layout>
);

export default DriftPrivacyPolicy;
