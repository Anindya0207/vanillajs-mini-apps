import Logger from "../helpers/logger.js";

const SAMPLE_FEATURES = {
  feature_flag_1: true,
  feature_flag_2: true,
};

const fetchAllFeatures = () => {
  // mocking the fetch API call
  Logger.log('Making a BE call');
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_FEATURES), 100);
  });
};

export default fetchAllFeatures;
