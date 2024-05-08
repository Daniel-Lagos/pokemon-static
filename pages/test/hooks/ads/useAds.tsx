import isEmpty from "lodash/isEmpty";
import throttle from "lodash/throttle";
import { useRef } from "react";
import { AdProps, TargetingArguments, UseAdProps } from "./definition";
import { ADS_PREFIX, DFP_NETWORK_ID } from "../../constants/ad";

const useAd = (): UseAdProps => {
  const slotRef = useRef<any>(null);
  const refresh = throttle(() => {
    googletag.cmd.push(function () {
      if (slotRef && !isEmpty(slotRef.current)) {
        googletag.pubads().refresh([slotRef.current]);
      }
    });
  }, 30 * 1000);
  const createSlot = (
    adUnitPath: string,
    sizes: googletag.GeneralSize,
    slotId: string,
    isSizeMapping = false
  ): googletag.Slot | null | undefined => {

    if (isSizeMapping) {
      return googletag?.defineSlot(adUnitPath, sizes, slotId);
    }
    return googletag
      ?.defineSlot(adUnitPath, sizes, slotId)
      ?.setCollapseEmptyDiv(true, true)
      ?.addService(googletag.pubads());
  };
  const defineSlot = ({
    sizes = [],
    sizeMapping,
    adUnit,
    slotId,
    isFluid = false,
  }: AdProps) => {
    console.log(`/${DFP_NETWORK_ID}/${ADS_PREFIX}${adUnit}`)
    if (window.googletag) {
      googletag.cmd.push(function () {
        let slot: googletag.Slot | null | undefined;
        if (isFluid) {
          slot = createSlot(
            `/${DFP_NETWORK_ID}/${ADS_PREFIX}${adUnit}`,
            ["fluid"],
            slotId
          );
        } else if (isEmpty(sizeMapping)) {
          slot = createSlot(
            `/${DFP_NETWORK_ID}/${ADS_PREFIX}${adUnit}`,
            sizes,
            slotId
          );
        } else {
          slot = createSlot(
            `/${DFP_NETWORK_ID}/${ADS_PREFIX}${adUnit}`,
            sizes,
            slotId,
            true
          );
          const builder = googletag.sizeMapping();
          sizeMapping?.forEach((sizeMap) => {
            builder.addSize(sizeMap[0], sizeMap[1]);
          });
          slot?.defineSizeMapping(builder.build());
          slot?.addService(googletag.pubads());
        }
        googletag.display(slotId);
        // let otherSlot = createSlot(
          //   `/${DFP_NETWORK_ID}/${ADS_PREFIX}${adUnit}`,
          //   sizes,
          //   'megabanner-top-des'
          // );
          // googletag.display(slotId);
          // googletag.display('megabanner-top-des"');
          slotRef.current = slot;
      });
    }
  };
  const setTargetingArguments = (args: TargetingArguments) => {
    if (window.googletag) {
      googletag.cmd.push(() => {
        for (const key in args) {
          googletag.pubads().setTargeting(key, args[key] as string);
        }
        refresh();
      });
    }
  };
  const destroySlot = () => {
    if (window.googletag) {
      googletag.cmd.push(() => {
        if (!isEmpty(slotRef.current)) {
          googletag.destroySlots([slotRef.current]);
        }
      });
    }
  };
  const defineOutOfPageSlot = (adUnit: string, slotId: string) => {
    if (window.googletag && googletag) {
      googletag.cmd.push(() => {
        const slot = googletag
          ?.defineOutOfPageSlot(
            `/${DFP_NETWORK_ID}/${ADS_PREFIX}${adUnit}`,
            slotId
          )
          ?.addService(googletag.pubads());
        googletag.display(slotId);
        //TODO: This block allows to show float ad.
        setTimeout(() => {
          googletag.pubads().refresh([slot as googletag.Slot]);
        }, 3000);
        slotRef.current = slot;
      });
    }
  };
  return {
    defineSlot,
    setTargetingArguments,
    destroySlot,
    slot: slotRef.current as googletag.Slot,
    defineOutOfPageSlot,
  };
};
export default useAd;
