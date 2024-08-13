export const initHomeAds = (googletag: any, segmentation: any) => {
  console.log("segmentation", segmentation);

  if (googletag?.defineSlot) {
    return [
      googletag
        .defineSlot(
          "/21801155815/DEV_Fincaraiz_Detail/Robapagina_Top",
          [
            [1, 1],
            [300, 250],
            [300, 300],
          ],
          "megabanner-top"
        )!
        ?.setTargeting("pos", "top")
        ?.addService(googletag.pubads()),
      googletag
        .defineSlot(
          `/21801155815/DEV_Fincaraiz__Listing/Megabanner_Mid`,
          [
            [1, 1],
            [300, 250],
            [300, 300],
          ],
          "megabanner-middle-des"
        )!
        ?.setTargeting("pos", "mid")
        ?.addService(googletag.pubads()),
      googletag
        ?.defineSlot("/6355419/Travel/Europe", [300, 250], "slot-3")!
        ?.addService(googletag.pubads()),
      googletag
        ?.defineSlot("/6355419/Travel/Europe", [300, 250], "slot-4")!
        ?.addService(googletag.pubads()),
      googletag
        ?.defineSlot("/6355419/Travel/Europe", [300, 250], "slot-5")!
        ?.addService(googletag.pubads()),
    ];
  }
  return [];
};
