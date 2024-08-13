import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import throttle from "lodash/throttle";
import { initHomeAds } from "../constants/home-ads";
import Script from "next/script";

type AdvertiserProps = {
  refresh: () => void;
};

type AdsProviderProps = {
  children: ReactNode;
  page: string;
};
const AdvertisingContext = createContext<AdvertiserProps>({
  refresh: () => {},
});

const AdsProvider: FunctionComponent<AdsProviderProps> = ({
  children,
  page,
}): JSX.Element => {
  const segmentation = "test";
  if (typeof window !== "undefined") {
    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      const pagesAds: { [x: string]: googletag.Slot[] } = {
        ads: initHomeAds(window.googletag, segmentation),
        // more pages
      };
      // Define ad slots.
      const slots = pagesAds[page];

      // Disable initial load to precisely control when ads are requested.
      googletag.pubads().disableInitialLoad();

      // Enable SRA and services.
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();

      // Issue first SRA request (slots 1 and 2) immediately.
      // We can choose a specific set of slots to refresh.
      googletag.pubads().refresh(slots);

      // Issue second SRA request (slots 3, 4, and 5) after a delay.
      // that is mean that we can refresh the ads after a specific time.
      //   const interval = setInterval(() => {
      //     googletag.pubads().refresh(slots.slice(2));
      //     clearInterval(interval);
      //   }, 5000);
    });
  }

  const refresh = useCallback(
    () =>
      throttle(() => {
        googletag.cmd.push(function () {
          //   googletag.pubads().refresh();
        });
      }, 30 * 1000),
    []
  );

  return (
    <>
      <Script
        defer
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      />
      <AdvertisingContext.Provider
        value={{
          refresh,
        }}
      >
        {children}
      </AdvertisingContext.Provider>
    </>
  );
};

const useAdvertiserContext = (): AdvertiserProps => {
  const context = useContext(AdvertisingContext);
  if (context === undefined) {
    throw new Error(
      "useAdvertiserContext must be used within a AdvertiserProvider"
    );
  }
  return context;
};

export { useAdvertiserContext };

export default AdsProvider;
