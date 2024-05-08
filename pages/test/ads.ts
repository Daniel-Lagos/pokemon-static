import { isEmpty } from "lodash";
import { ADS_NAME } from "./constants/ad";
;
type SlotAdsConfiguration = {
  adName: string;
  sizes?: googletag.GeneralSize;
  className?: string;
  gridClassName?: string;
  slotId: string;
  isFluid?: boolean;
};
type SlotAdsItem = Record<string, Record<number, SlotAdsConfiguration>>;
export const positionAlternateAds: SlotAdsItem = {
  mobile: {
    2: {
      adName: `${ADS_NAME}_Listing/Megabanner_Top`,
      sizes: [
        [1, 1],
        [300, 250],
        [300, 300],
      ],
      className: "ad-container",
      slotId: "megabanner-top-mob",
    },
    5: {
      adName: `${ADS_NAME}_Listing/Native_Top`,
      gridClassName: "ad-native-container",
      slotId: "native-top-mob",
      isFluid: true,
    },
    10: {
      adName: `${ADS_NAME}_Listing/Megabanner_Mid`,
      sizes: [
        [1, 1],
        [300, 250],
        [300, 300],
      ],
      className: "ad-container",
      slotId: "megabanner-mid-mob",
    },
    13: {
      adName: `${ADS_NAME}_Listing/Native_Mid`,
      isFluid: true,
      gridClassName: "ad-native-container",
      slotId: "native-mid-mob",
    },
    18: {
      adName: `${ADS_NAME}_Listing/Megabanner_Bottom`,
      sizes: [
        [300, 250],
        [300, 300],
      ],
      className: "ad-container",
      slotId: "megabanner-bottom-mob",
    },
    20: {
      adName: `${ADS_NAME}_Listing/spincube_ad`,
      sizes: [[300, 300]],
      gridClassName: "ad-container",
      slotId: "native-bottom-spincube",
    },
  },
  tablet: {
    4: {
      adName: `${ADS_NAME}_Listing/Megabanner_Top`,
      sizes: [
        [1, 1],
        [300, 250],
      ],
      className: "ad-container",
      slotId: "megabanner-top-tab",
    },
    5: {
      adName: `${ADS_NAME}_Listing/Native_Top`,
      isFluid: true,
      gridClassName: "ad-native-container",
      slotId: "native-top-tab",
    },
    13: {
      adName: `${ADS_NAME}_Listing/Megabanner_Mid`,
      sizes: [
        [1, 1],
        [300, 250],
      ],
      className: "ad-container",
      slotId: "megabanner-mid-tab",
    },
    14: {
      adName: `${ADS_NAME}_Listing/Native_Mid`,
      isFluid: true,
      gridClassName: "ad-native-container",
      slotId: "native-mid-tab",
    },
    20: {
      adName: `${ADS_NAME}_Listing/Megabanner_Bottom`,
      sizes: [[300, 250]],
      className: "ad-container",
      slotId: "megabanner-bottom-tab",
    },
    21: {
      adName: `${ADS_NAME}_Listing/Native_Bottom`,
      isFluid: true,
      gridClassName: "ad-native-container",
      slotId: "native-bottom-tab",
    },
  },
  desktop: {
    4: {
      adName: `${ADS_NAME}_Listing/Native_Top`,
      isFluid: true,
      gridClassName: "ad-native-container",
      slotId: "native-top-des",
    },
    6: {
      adName: `${ADS_NAME}_Listing/Megabanner_Top`,
      sizes: [
        [1, 1],
        [728, 90],
      ],
      className: "ad-container",
      slotId: "megabanner-top-des",
    },
    13: {
      adName: `${ADS_NAME}_Listing/Megabanner_Mid`,
      sizes: [
        [1, 1],
        [728, 90],
      ],
      className: "ad-container",
      slotId: "megabanner-middle-des",
    },
    14: {
      adName: `${ADS_NAME}_Listing/Native_Mid`,
      isFluid: true,
      gridClassName: "ad-native-container",
      slotId: "native-mid-des",
    },
    20: {
      adName: `${ADS_NAME}_Listing/Megabanner_Bottom`,
      sizes: [[728, 90]],
      className: "ad-container",
      slotId: "megabanner-bottom-des",
    },
    22: {
      adName: `${ADS_NAME}_Listing/Native_Bottom`,
      isFluid: true,
      gridClassName: "ad-native-container",
      slotId: "native-bottom-des",
    },
  },
};
type typeSlots = {
  xs?: number[];
  sm?: number[];
  md?: number[];
  lg?: number[];
  xl?: number[];
};
export function createSlotsForAds(
  listing: any[],
  slots: typeSlots,
  xs?: boolean,
  sm?: boolean,
  xl?: boolean
): any[] {
  if (isEmpty(listing)) return [];
  if (slots === null) return listing;
  const listingClone = [...listing];
  if (xs) {
    const slotXS = slots.xs?.filter((slot) => slot <= listing.length + 1);
    slotXS?.forEach((slot) => listingClone.splice(slot, 0, null));
  } else if (xl) {
    const slotXL = slots.xl?.filter((slot) => slot <= listing.length + 1);
    slotXL?.forEach((slot) => listingClone.splice(slot, 0, null));
  } else {
    const slotSM = slots.sm?.filter((slot) => slot <= listing.length + 1);
    slotSM?.forEach((slot) => listingClone.splice(slot, 0, null));
  }
  return listingClone;
}
