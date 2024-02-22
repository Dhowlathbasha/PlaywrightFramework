import { test as baseTest } from '@playwright/test'
import OrangeHrmLoginPage from '../../ui/pages/OrangeHrmLoginPage'
import LamdaChkBoxPage from '../../ui/pages/LambdaTestChkPage'
import LamdaFileUpload from '../../ui/pages/LambdaFileUpload'
import AmazonHomePage from '../../ui/pages/AmazonHomePage'
import SupportUtils from '../../utils/SupportUtils'
import { PlaywrightActions } from '../../utils/PlaywrightActions'

type pages = {
    orangeLoginPage : OrangeHrmLoginPage
    actions : PlaywrightActions
    lamdaChkBoxPage: LamdaChkBoxPage
    lamdaFileUpload : LamdaFileUpload
    amazonHomePage : AmazonHomePage
    supportUtils : SupportUtils
}

const testPages = baseTest.extend<pages>({

    actions : async({page},use) => {
        await use (new PlaywrightActions(page,test.info()))
    },

    orangeLoginPage: async({page},use) => {
        await use (new OrangeHrmLoginPage(page,test.info()))
    },

    lamdaChkBoxPage:  async({page},use) => {
        await use (new LamdaChkBoxPage(page,test.info()))
    },

    lamdaFileUpload: async({page}, use) => {
        await use (new LamdaFileUpload(page,test.info()))
    },

    amazonHomePage : async({page}, use) => {
        await use (new AmazonHomePage(page,test.info()))
    },

    supportUtils : async({page}, use) => {
        await use (new SupportUtils(page,test.info()))
    }

})

export const test = testPages;
export const expect = testPages.expect;