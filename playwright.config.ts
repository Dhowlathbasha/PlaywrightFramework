import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import os from 'os'

switch (process.env.NODE_ENV) {
  case 'local':
    dotenv.config({ path: './resource/environments/local.env' })
    break
  case 'dev':
    dotenv.config({ path: './resource/environments/dev.env' })
    break
  case 'qa':
    dotenv.config({ path: './resource/environments/qa.env' })
    break
  default:
    dotenv.config({ path: './resource/environments/qa.env' })
}

export default defineConfig({
  outputDir: './reports/test-results',
  testDir: './src/test/scriptLibrary/',
  fullyParallel: true,
  //globalSetup: `./src/configs/GlobalSetup`,
  //globalTeardown: './src/configs/GlobalTeardown',
  reporter: [
    [`line`],
    ['list'],
    ['json', { outputFile: './reports/json-report/results.json' }],
    ['junit', { outputFile: './reports/junit-report/results.xml' }],
    [`./src/main/utils/ReportHelper.ts`],
    [`allure-playwright`, { detail: true, outputFolder: './reports/allure-results', open: 'on-failure' }],
    [`html`, { outputFolder: './reports/html-report', open: 'never' }],
    ['blob', { outputDir: './reports/blob-report', fileName: `report-${os.platform()}.zip` }]
  ],
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60_000,
  use: {
    trace: 'on',
    video: process.env.CI ? 'retain-on-failure' : 'retain-on-failure',
    screenshot: 'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1980, height: 1080 },
        acceptDownloads: true,
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        headless: false,
        launchOptions: {
          slowMo: 0,
        },
        //baseURL: '/',
      },
    },
    // {
    //   name: `Device`,
    //   use: {
    //     ...devices[`Pixel 4a (5G)`],
    //     browserName: `chromium`,
    //     channel: `chrome`,
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },
  ],
})
