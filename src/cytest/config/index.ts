export const CYPRESS_CONFIG = {
  browser: 'chrome',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: true,
  },
  video: true,
  videosFolder: 'cypress/reports/video',
  screenshotsFolder: 'cypress/reports/screenshots',
};
