import { createContext, ReactNode, useContext } from "react";
import Head from "next/head";
import throttle from "lodash/throttle";
type AdvertiserProps = {
  refresh: () => void;
};
const AdvertiserContext = createContext<AdvertiserProps>(null);
const useAdvertiserContext = (): AdvertiserProps => {
  const context = useContext(AdvertiserContext);
  if (context === undefined) {
    throw new Error(
      "useAdvertiserContext must be used within a AdvertiserProvider"
    );
  }
  return context;
};
const AdvertiserProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  if (typeof window !== "undefined") {
    window.googletag = window.googletag || { cmd: [] };
  }

  const refresh = throttle(() => {
    googletag.cmd.push(function () {
      googletag.pubads().refresh();
    });
  }, 30 * 1000);
  return (
    <>
      <Head>
        <script
          defer
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
            window.googletag = window.googletag || {cmd: []};
            googletag.cmd.push(function() {
              googletag.pubads().disableInitialLoad()
              googletag.pubads().enableLazyLoad({
                  fetchMarginPercent: 0.001,
                  renderMarginPercent: 0.001,
                  mobileScaling: 2.0
                }
              )
              googletag.pubads().collapseEmptyDivs()
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            })
          `,
          }}
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
          window.googletag = window.googletag || {cmd: []};
          var adSlot1, adSlot2;
    
          googletag.cmd.push(function() {
            // Define ad slot 1.
            adSlot1 = googletag
            .defineSlot('/6355419/Travel/Europe/France',[728, 90], 'banner-ad-1')
            .addService(googletag.pubads());
        // Define and configure ad slot 2.
        adSlot2 = googletag
            .defineSlot('/6355419/Travel/Europe/France',[728, 90], 'banner-ad-2')
            .setTargeting('test', 'privacy')
            .addService(googletag.pubads());
            // Enable SRA and services.
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `,
          }}
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
            googletag.cmd.push(function() {
              // This call to display requests both ad slots with all
              // configured targeting.
              googletag.display(adSlot1);
            });
          `,
          }}
        />
      </Head>
      <AdvertiserContext.Provider
        value={{
          refresh,
        }}
      >
        {children}
      </AdvertiserContext.Provider>
    </>
  );
};
export { useAdvertiserContext };
export default AdvertiserProvider;
