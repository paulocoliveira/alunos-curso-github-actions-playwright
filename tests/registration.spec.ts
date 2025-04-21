import {test, expect} from '@playwright/test'
const { faker } = require('@faker-js/faker');

test.describe('teste básico', () => {
    test('registrar novo usuário', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
        
        const inputFirstName = page.locator('#input-firstname')
        await inputFirstName.fill('Laís')
    
        await page.fill('id=input-lastname', 'Oliveira')
        await page.fill('id=input-email', faker.internet.email())
        await page.fill('id=input-telephone', '888777666')
        await page.fill('id=input-password', '123456')
        await page.fill('id=input-confirm', '123456')
        await page.click('xpath=//label[@for="input-newsletter-yes"]')
        await page.click('xpath=//label[@for="input-agree"]')
        await page.click('xpath=//input[@value="Continue"]')
        await expect(page).toHaveTitle("Your Account Has Been Created!")
    
        await page.waitForTimeout(1000)
    })
})

test.describe('teste utilizando métodos built-in', () => {
    test('registrar novo usuário', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
    
        await page.getByLabel('First Name').fill('Laís')
        await page.getByLabel('Last Name').fill('Souza')
        await page.getByLabel('E-Mail').fill(faker.internet.email())
        await page.getByLabel('Telephone').fill('888777666')

        await page.fill('id=input-password', '123456')
        await page.fill('id=input-confirm', '123456')

        await page.check('xpath=//label[@for="input-newsletter-yes"]')
        await page.check('xpath=//label[@for="input-agree"]')

        await page.getByRole('button', { name: 'Continue'}).click()
        
        await expect(page).toHaveTitle("Your Account Has Been Created!")
    
        await page.waitForTimeout(1000)
    })
})

test.describe('teste utilizando faker', () => {
    test('registrar novo usuário', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
           
        await page.fill('id=input-firstname', faker.person.firstName())
        await page.fill('id=input-lastname', faker.person.lastName())
        await page.fill('id=input-email', faker.internet.email())
        await page.fill('id=input-telephone', faker.phone.number())

        const pwd =faker.internet.password()

        await page.fill('id=input-password', pwd)
        await page.fill('id=input-confirm', pwd)

        await page.click('xpath=//label[@for="input-newsletter-yes"]')
        await page.click('xpath=//label[@for="input-agree"]')

        await page.click('xpath=//input[@value="Continue"]')
        
        await expect(page).toHaveTitle("Your Account Has Been Created!")
    
        await page.waitForTimeout(1000)
    })
})

test.describe('teste com outras validações', () => {
    test('registrar novo usuário', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
    
        await page.fill('id=input-firstname', 'Laís')
        await page.fill('id=input-lastname', 'Souza')
        await page.fill('id=input-email', faker.internet.email())
        await page.fill('id=input-telephone', '888777666')
        await page.fill('id=input-password', '123456')
        await page.fill('id=input-confirm', '123456')
        await page.click('xpath=//label[@for="input-newsletter-yes"]')
        await page.click('xpath=//label[@for="input-agree"]')
        await page.click('xpath=//input[@value="Continue"]')

        await expect(page).toHaveTitle("Your Account Has Been Created!")
        await expect(page).toHaveURL("https://ecommerce-playground.lambdatest.io/index.php?route=account/success")

        await expect(page.locator('xpath=//div[@id="content"]/h1')).toHaveText(' Your Account Has Been Created!')
        
        const continue_button = page.locator('xpath=//a[text()="Continue"]')
        await expect(continue_button).toBeVisible()
        await expect(continue_button).toBeEnabled()
    
        await page.waitForTimeout(1000)
    })
})