import {Page,TestInfo} from '@playwright/test'
import {PlaywrightActions} from '../../utils/PlaywrightActions'

export default class AmazonHomePage{

    async navigate(){
        await this.page.goto(process.env.URL as string);
        await this.actions.click_byLoc(this.page.locator('[aria-label="Amazon"]'),"Click on Amazon Logo")
        await this.page.waitForTimeout(2_000)
    }

    actions : PlaywrightActions

    public constructor(public page : Page , public testInfo : TestInfo) {
        this.actions = new PlaywrightActions(page, testInfo);
    } 

}