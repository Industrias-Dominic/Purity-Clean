const { test as base } = require('@playwright/test');

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },
});

module.exports = test;
module.exports.expect = require('@playwright/test').expect;