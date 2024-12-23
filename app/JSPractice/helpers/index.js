export const TTL = 5 * 1000;

export const shouldResolveFromCache = ({ featureFlags, expiry }) =>
  Object.keys(featureFlags).length > 0 && expiry > Date.now();

export const getFeatureWithFallback = (
  { featureFlags },
  featureName,
  fallback,
) =>
  featureFlags.hasOwnProperty(featureName)
    ? featureFlags[featureName]
    : fallback;
