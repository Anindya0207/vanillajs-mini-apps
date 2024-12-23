import FeatureFlagProvider from './services/getFeatureState.js';
import Logger from './helpers/logger.js';

const test = () => {
  try {
    const obj = new FeatureFlagProvider();
  } catch (err) {
    Logger.log(err);
  }

  FeatureFlagProvider.getFeatureState('feature_flag_1', false).then((flag) => {
    Logger.log(`feature_flag_1 is ${flag ? 'enabled' : 'disabled'}`);
  });

  setTimeout(() => {
    FeatureFlagProvider.getFeatureState('feature_flag_2', false).then(
      (flag) => {
        Logger.log(`feature_flag_2 is ${flag ? 'enabled' : 'disabled'}`);
      },
    );
  }, 100);

  setTimeout(() => {
    FeatureFlagProvider.getFeatureState('feature_flag_2', false).then(
      (flag) => {
        Logger.log(`feature_flag_2 is ${flag ? 'enabled' : 'disabled'}`);
      },
    );
  }, 7000);
};

test();
