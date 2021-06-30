import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

import '../tailwind.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-N2M6MS6' });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
