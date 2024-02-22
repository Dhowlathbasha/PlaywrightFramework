import {Page,TestInfo} from '@playwright/test'
import {PlaywrightActions} from '../../utils/PlaywrightActions'

export default class LamdaCheckBoxSite {

    private element = {
        checkbox: '#isAgeSelected',
    }

    async verifyAgeCheckbox_notSelected(){
        await this.actions.verifyChkboxNotChkd_byLoc(this.page.locator(this.element.checkbox),"Age Checkbox")
    }

    async clickCheckbox(){
        await this.page.locator(this.element.checkbox).check()
    }

    actions : PlaywrightActions

    constructor(public page: Page, public testInfo: TestInfo){
        this.actions = new PlaywrightActions(page, testInfo)
    }
}