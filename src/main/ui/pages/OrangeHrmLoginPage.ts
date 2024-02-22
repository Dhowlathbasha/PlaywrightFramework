import {Page,TestInfo} from '@playwright/test'
import {PlaywrightActions} from '../../utils/PlaywrightActions'

export default class OrangeHrmLoginPage{
    private element = {
        username: /Username/i,
        password: 'Password'
    }

    async enterUsername(username: string){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await this.page.getByPlaceholder(this.element.username).fill(username)
    }

    async enterPassword(password: string){
        await this.page.getByPlaceholder(this.element.password).fill(password)
        await this.actions.embedScreenshot("Enter Password")
    }

    actions : PlaywrightActions

    public constructor(public page : Page , public testInfo : TestInfo) {
        this.actions = new PlaywrightActions(page, testInfo);
    } 
}