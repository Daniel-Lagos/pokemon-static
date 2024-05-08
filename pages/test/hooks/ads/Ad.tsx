import { useEffect, useRef, useState } from "react";
import { AdProps, AdVisible } from "./definition";
import useAd from "./useAds";

const Ad = (props: AdProps): JSX.Element => {
	const adRef = useRef(null);
	const { defineSlot, destroySlot, setTargetingArguments } = useAd();
	const { targetingArguments, classes, slotId } = props;
	const [visible, setVisible] = useState<AdVisible>("idle");

	// const optionsObserver = parentIntersection
	// 	? {
	// 			rootMargin: "50px",
	// 			root: document?.getElementById(parentIntersection),
	// 	  }
	// 	: {
	// 			rootMargin: "50px",
	// 	  };
	// const [, entry] = useIntersectionObserver(optionsObserver, adRef);

  
	useEffect(() => {
		if (visible === "ready") {
			defineSlot(props);
			setVisible("visible");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);
	useEffect(() => {
		setVisible("ready");
		return () => {
			destroySlot();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (visible === "visible") {
			setTargetingArguments(targetingArguments);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible, targetingArguments]);
	return (
		<div
			className={classes?.root}
			itemScope
			itemType="https://schema.org/WPAdBlock"
			ref={adRef}>
			<div id={slotId} className={classes?.adSlot} style={{maxHeight: props.maxHeightAd}} />
		</div>
	);
};
Ad.displayName = "Ad";
export default Ad;