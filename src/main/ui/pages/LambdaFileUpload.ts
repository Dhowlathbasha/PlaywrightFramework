import { Page, TestInfo } from '@playwright/test'
import { PlaywrightActions } from '../../utils/PlaywrightActions'
import path from 'path'

export default class LamdaFileUpload {
  private readonly element = {
    fileupload: '#file',
  }

  async fileUpload() {
    await this.page.setInputFiles("locator here",["filePath"])
  }

  async fileUpload_fileChooser() {
    const fileChooserPromise = this.page.waitForEvent('filechooser')
    await this.page.locator(this.element.fileupload).click() //input[type="file"]
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join("../uploadfiles","peakpx.jpg"))
  }

  actions: PlaywrightActions

  constructor(public page: Page, public testInfo: TestInfo) {
    this.actions = new PlaywrightActions(page, testInfo)
  }
}
