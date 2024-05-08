import getConfig from "next/config";
const config = getConfig().publicRuntimeConfig;
/**
 * DEV, QA and STAGING should always use development ads, in google ad manager
 * the development ads are identified by the DEV_ prefix.
 */
export const ADS_PREFIX = config?.adsPrefix === "STAGING" ? "" : "DEV_";
export const GTM_CONTAINER_ID = "GTM-NHSXKTF";
export const DFP_NETWORK_ID = "21801155815";
export const ADS_NAME = "Fincaraiz";
