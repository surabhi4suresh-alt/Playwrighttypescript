import { Given, Then, When } from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "playwright/test";
import { setDefaultTimeout } from '@cucumber/cucumber';

let page: {
    [x: string]: any;
    locator: any; goto: (arg0: string) => any; getByLabel: (arg0: string) => string[]; getByRole: (arg0: string, arg1: { name: string; }) => {
        [x: string]: any; (): any; new(): any; click: { (): any; new(): any; };
    }; getByText: (arg0: string) => any;
}, browser: {
    contexts(): unknown; newContext: (arg0: { viewport: null; }) => any; close: () => any;
};

Given('i launch the browser', async function () {

    console.log("i launch the browser")

    browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"]
    })

    const context = await browser.newContext({ viewport: null })

    page = await context.newPage()
});


Then('i launch the url', async function () {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    // await page.locator("xpath/css").fill()

    // await page.locator("").inserttext()

    // await page.locator("").click()

    // await page.locator("").clear()
});

Then('i close the browser', async function () {

    await browser.close()
});

Then('i launch the test automation practice url', async function () {

    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator(".wikipedia-search-input").fill("PlayWright")
    await page.locator("#field2").scrollIntoViewIfNeeded();
    await page.locator("#field2").fill("Hello field2!!")
    await page.locator("#field1").fill("Hello field1!!")
    await page.locator(".form-control").first().fill("1st Testing")
    await page.locator(".form-control").nth(3).fill("last Testing")

    await page.locator("#draggable").dragTo(await page.locator("#droppable"))

    const dropdownColors = await page.locator("#colors")
    await dropdownColors.selectOption("Green")
    await dropdownColors.selectOption(["Yellow", "Red", "Green", "Blue"])
    const dropdownCountry = await page.locator("#country")
    await dropdownCountry.selectOption("India")

    await page.getByPlaceholder("Enter EMail").scrollIntoViewIfNeeded()
    await page.getByPlaceholder("Enter EMail").fill("suresh@email.com");
    await page.getByPlaceholder("Enter Phone").fill("9900118866");

    const CurrentDate = new Date()
    console.log("CurrentDate: ", CurrentDate)



    const convertCurrentDate = CurrentDate.toLocaleDateString()
    console.log("convertCurrentDate: ", convertCurrentDate)
    await page.locator("#datepicker").first().scrollIntoViewIfNeeded()
    await page.locator("#datepicker").first().fill(convertCurrentDate)

    const yesterdayDate = new Date(CurrentDate)
    yesterdayDate.setDate(CurrentDate.getDate() - 1)
    console.log("yesterdayDate : ", yesterdayDate)

    const tomorrowDate = new Date(CurrentDate)
    tomorrowDate.setDate(CurrentDate.getDate() + 1)
    console.log("tomorrowDate : ", tomorrowDate)
    await page.locator("#txtDate").first().scrollIntoViewIfNeeded()
    await page.locator("#txtDate").first.fill(tomorrowDate)

    // await page.screenshot({path:"screenshot upto screen length.png"})
    // await page.screenshot({path:"screenshot upto full screen length.png",fullPage:true})
    // await page.pause()

    // await page.locator("button[onclick='myFunction()']").scrollIntoViewIfNeeded()
    // await page.locator("button[onclick='myFunction()']").click()
    // await page.pause()
    // console.log("New Tab")
    // const currentUrl = page.url();
    // console.log('Current URL:', currentUrl);
    // await page.bringToFront();

    await page.waitForTimeout(10000);
    await browser.close()

});

Then('i launch the test automation practice applictaion', async function () {
    await page.goto("https://testautomationpractice.blogspot.com/")

    let webtable = await page.locator("//table[@name='BookTable']")
    if (await webtable.isVisible()) {
        await webtable.scrollIntoViewIfNeeded()

        var rowcount = await page.locator("//table[@name='BookTable']//tbody//tr").all()
        if (rowcount.length> 0) {

            for (let i = 2; i <= rowcount.length; i++) {
                let columncount = await page.locator("//table[@name='BookTable']//tbody//tr[" + i + "]/td").all()
                if (columncount.length> 0) {
                    for (let j = 1; j <= columncount.length; j++) {
                        var expectedtext = "Javascript"
                        var actualtext = await page.locator("//table[@name='BookTable']//tbody//tr["+i+"]//td["+j+"]").innerText()
                        if (actualtext = expectedtext) {
                            console.log(expectedtext, " is displayed in the webtable")
                        }
                        else {
                            console.log(expectedtext, " is not displayed in the webtable")
                        }

                    }
                }

            }
        }
        else {
            console.log("rows are not displayed in the webtable")
        }

    }

});
// Then('i verify the webtable data statically', async function () {

//     let webtable = await page.locator("//table[@name='BookTable']")
//     if(webtable.isVisible()){
//         await webtable.scrollIntoViewIfNeeded()
//         var expectedtext="Animesh"
//         var actualtext=await page.locator("//table[@name='BookTable']//tbody//tr[4]//td[2]").innerText()
//         if(expectedtext=actualtext){
//             console.log(expectedtext," is displayed in the webtable")
//         }
//         else{
//             console.log(expectedtext," is not displayed in the webtable")
//         }
//     }

// });
