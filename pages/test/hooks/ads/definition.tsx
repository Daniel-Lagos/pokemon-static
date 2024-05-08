export type TargetingArguments = Record<string, string | string[] | number>;
export type AdVisible = "idle" | "ready" | "visible";

export type AdProps = Readonly<{
  slotId: string;
  classes?: {
    root?: string;
    adSlot?: string;
  };
  adUnit?: string;
  sizes?: googletag.GeneralSize;
  sizeMapping?: googletag.SizeMapping[];
  targetingArguments?: TargetingArguments;
  isFluid?: boolean;
  isOutOfPageSlot?: boolean;
  parentIntersection?: string;
  maxHeightAd?: number;
}>;

export type UseAdProps = {
  defineSlot: (adSlot: AdProps) => void;
  setTargetingArguments: (args: TargetingArguments) => void;
  destroySlot: () => void;
  defineOutOfPageSlot: (adUnit: string, slotId: string) => void;
  slot: googletag.Slot;
};
