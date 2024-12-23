import {
  shouldResolveFromCache,
  TTL,
  getFeatureWithFallback,
} from '../helpers/index.js';
import fetchAllFeatures from '../api/index.js';
import Logger from '../helpers/logger.js';

class FeatureFlagProvider {
  static map = {
    featureFlags: {},
    expiry: Date.now() + TTL,
  };
  static promise;
  constructor() {
    throw new Error(
      'Use getFeatureFlag static method instead of creating an instance',
    );
  }

  /**
   *
   * @param {string} featureName name of a feature
   * @param {boolean} defaultValue deafult value if the feature is not coming freom server
   * @returns {boolean} whether a feature is enabled or disabled
   * @throws {Error} if Api fails
   */

  static getFeatureState = async (featureName, defaultValue) => {
    if (shouldResolveFromCache(this.map)) {
      Logger.log('Cache hit!');
      return getFeatureWithFallback(this.map, featureName, defaultValue);
    }
    if (this.promise instanceof Promise) {
      return this.promise.then(() => {
        return getFeatureWithFallback(this.map, featureName, defaultValue);
      });
    }
    this.promise = fetchAllFeatures()
      .then((res) => {
        this.map = {
          featureFlags: { ...res },
          expiry: Date.now() + TTL,
        };
        return getFeatureWithFallback(this.map, featureName, defaultValue);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        this.promise = null;
      });
    return this.promise;
  };
}

export default FeatureFlagProvider;
