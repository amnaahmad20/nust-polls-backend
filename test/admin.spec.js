
import "chromedriver"
import { Builder,Browser, By, Key, until } from 'selenium-webdriver'
import assert from 'assert'


describe('Tests', function() {
  let driver
  let vars

  beforeEach(async function() {


    driver = await new Builder().forBrowser("chrome").build()
    driver.manage().setTimeouts( { implicit: 8000000 } );
``
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Valid Admin Login', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 815 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.css(".btn")).click()
  })


  it('Checking Presence of Toastify in Invalid Login', async function() {
    await driver.get("http://localhost:3000/")
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.css(".btn")).click()
    await driver.manage().window().setRect({ width: 1440, height: 815 })
    
    {
      const elements = await driver.findElements(By.css(".Toastify__toast-body"))
      assert(elements.length)
    }
    
      
    
  })


  it('Checking Presence of Toastify in Valid Login', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 815 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fzehra.bese19seecs")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("ahadrazamir")
    await driver.findElement(By.css(".img-fluid")).click()
    await driver.findElement(By.css(".btn")).click()
    {


      const elements = await driver.findElements(By.css(".Toastify__toast-body"))
      assert(elements.length)
    }
  })

  it('Testing presence of Dashboard', async function() {
    await driver.get("http://localhost:3000/")
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.css(".btn")).click()

    assert(await driver.findElement(By.css(".creation")).getText() == "Create a new Poll")
    assert(await driver.findElement(By.css(".no-fill")).getText() == "View Existing")
    await driver.close()
  })

  it('Viewing Admin Polls', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.css(".img-fluid")).click()
    await driver.findElement(By.css(".btn")).click()
    await driver.findElement(By.css(".no-fill")).click()
    {
      const elements = await driver.findElements(By.css(".base2:nth-child(2) img"))
      assert(elements.length)
    }
    {
      const elements = await driver.findElements(By.css(".base2:nth-child(8) img"))
      assert(elements.length)
    }
    {
      const elements = await driver.findElements(By.css(".base2:nth-child(5) img"))
      assert(elements.length)
    }
    await driver.close()
  })



  it('Renaming an Admin Poll', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    {
      const element = await driver.findElement(By.id("password"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.id("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".no-fill")).click()
    await driver.findElement(By.css(".base2:nth-child(3) .lucide")).click()
    await driver.findElement(By.linkText("Rename")).click()
    await driver.findElement(By.css("input")).click()
    await driver.findElement(By.css("input")).sendKeys("Cafe Building Poll")
    vars["new-name"] = await driver.findElement(By.css("input")).getAttribute("value")
    await driver.findElement(By.css(".popup-form > button")).click()
    await driver.sleep(1000)
    assert(await driver.findElement(By.css(".base2:nth-child(3) h6")).getText() === vars["new-name"])
    await driver.close()
  })

  it('Logging Out', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    {
      const element = await driver.findElement(By.id("password"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.id("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".no-fill")).click()
    await driver.findElement(By.css(".logout")).click()
    await driver.findElement(By.css("h2")).click()
    {
      const element = await driver.findElement(By.css("h2"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.css("h2")).click()
    assert(await driver.findElement(By.css("h2")).getText() == "Sign in")
    await driver.findElement(By.css("h2")).click()
    await driver.close()
  })




  it('Resetting Password', async function() {
    await driver.get("http://localhost:3000/resetpassword/b515743836cb352ba66bfee9895d1a84f53a3722")
    await driver.manage().window().setRect({ width: 1096, height: 818 })
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("merapass123")
    await driver.findElement(By.css(".img-fluid")).click()
    await driver.findElement(By.css(".btn")).click()
    await driver.close()
  })

  it('Deleting a Poll Draft', async function() {
    await driver.get("http://localhost:3000/")

    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.id("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".no-fill")).click()
    let elements = await driver.findElements(By.css(".base2"))
    let len = [...elements].length
     await driver.findElement(By.css(`.base2:nth-child(${len}) .lucide`)).click()
    await driver.findElement(By.linkText("Remove")).click()
    await driver.sleep(2000)
    let elements2 = await driver.findElements(By.css(".base2"))
    assert(len != elements2.length)
    await driver.findElement(By.css(".logout")).click()
    await driver.close()
  })







  it('Invalid Student Login', async function() {

    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fmujahid.bee21seecs")
    await driver.findElement(By.css("form")).click()
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("nkbck")
    await driver.findElement(By.css(".btn")).click()
    await driver.sleep(2000)
    assert(await driver.findElement(By.css(".Toastify__toast-body > div:nth-child(2)")).getText() == "Incorrect password")
    await driver.close()

  })


  it('Valid Student Login', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fmujahid.bee21seecs")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.css(".btn")).click()
    await driver.sleep(2000)
    assert(await driver.findElement(By.css(".Toastify__toast-body > div:nth-child(2)")).getText() == "Login successful")
    await driver.close()
  })




  it('Viewing Student Polls', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fmujahid.bee21seecs")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.id("password")).sendKeys(Key.ENTER)
    await driver.sleep(2000)
    {
      const elements = await driver.findElements(By.css(".base2:nth-child(2) "))
      assert(elements.length)
    }
    {
      const elements = await driver.findElements(By.css(".base2:nth-child(3) "))
      assert(elements.length)
    }
    {
      const elements = await driver.findElements(By.css(".base2:nth-child(6) "))
      assert(elements.length)
    }
    await driver.findElement(By.css(".logout")).click()
    await driver.close()
  })




  it('No Responses Exist', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    {
      const element = await driver.findElement(By.id("password"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.id("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".no-fill")).click()
    await driver.findElement(By.css(".base2:nth-child(14) h6")).click()
    await driver.executeScript("window.scrollTo(0,0)")
    await driver.findElement(By.id("mui-1-T-2")).click()
    await driver.findElement(By.css(".responses-total")).click()
    await driver.findElement(By.css(".responses-total")).click()
    await driver.findElement(By.css(".responses-total")).click()
    {
      const element = await driver.findElement(By.css(".responses-total"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.css(".responses-total")).click()
    assert(await driver.findElement(By.css(".responses-total")).getText() == "No responses yet")
    await driver.close()
  })



  it('Response Exists', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.id("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".no-fill")).click()
    await driver.findElement(By.css(".base2:nth-child(13) img")).click()
    {
      const element = await driver.findElement(By.id("mui-1-T-1"))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    await driver.findElement(By.id("mui-1-T-2")).click()
    {
      const elements = await driver.findElements(By.css(".question-body:nth-child(2) canvas"))
      assert(elements.length)
    }
    {
      const elements = await driver.findElements(By.css(".question-body:nth-child(3) canvas"))
      assert(elements.length)
    }
    await driver.findElement(By.id("mui-1-T-1")).click()
    {
      const element = await driver.findElement(By.id("mui-1-T-1"))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    {
      const element = await driver.findElement(By.css("body"))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    await driver.close()
  })

    it('Creating a New Poll Successfully', async function() {

    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    {
      const element = await driver.findElement(By.id("password"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.id("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".creation")).click()
    await driver.findElement(By.css(".\\_2_49w > .question-title")).click()
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()
    {
      const element = await driver.findElement(By.css(".question-heading .\\_1EEDX"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()
    {
      const element = await driver.findElement(By.css(".question-heading .\\_1EEDX"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).clear()
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()


    await driver.findElement(By.css(".question-heading .\\_1EEDX")).sendKeys("Is this a poll?")
    await driver.findElement(By.css(".poll-name")).click()
    await driver.findElement(By.css(".poll-name")).click()
    {
      const element = await driver.findElement(By.css(".poll-name"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.css(".poll-name")).click()
    await driver.findElement(By.css(".poll-name")).clear()
    await driver.findElement(By.css(".poll-name")).click()

    await driver.findElement(By.css(".poll-name")).sendKeys("SQE Poll Test")

    await driver.findElement(By.id("mui-1-T-3")).click()
    await driver.findElement(By.css(".startd")).click()

    {
      const element = await driver.findElement(By.css(".active"))
      await driver.actions({async: true}).move({x: 0, y: 0, origin: element}).click().perform()
    }
    
    {
      const element = await driver.findElement(By.css(".flatpickr-current-month"))
      await driver.actions({async: true}).move({x: 0, y: 0, origin: element}).perform()
    }
    await driver.findElement(By.css(".flatpickr-day:nth-child(28)")).click()
    await driver.findElement(By.css(".flatpickr-day:nth-child(30)")).click()
    await driver.sleep(3000)

    await driver.findElement(By.css(".reg-button")).click()
    await driver.sleep(3000)
    await driver.findElement(By.css(".reg-button")).click()


    
    await driver.close()
  })

  it('Failure in Creating Poll', async function() {

    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 818 })
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("fatima.mujahid")
    await driver.findElement(By.id("password")).click()
    {
      const element = await driver.findElement(By.id("password"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.id("password")).sendKeys("hello123#")
    await driver.findElement(By.id("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".creation")).click()
    await driver.findElement(By.css(".\\_2_49w > .question-title")).click()
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()
    {
      const element = await driver.findElement(By.css(".question-heading .\\_1EEDX"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()
    {
      const element = await driver.findElement(By.css(".question-heading .\\_1EEDX"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).clear()
    await driver.findElement(By.css(".question-heading .\\_1EEDX")).click()


    await driver.findElement(By.css(".question-heading .\\_1EEDX")).sendKeys("Is this a poll?")
    await driver.findElement(By.css(".poll-name")).click()
    await driver.findElement(By.css(".poll-name")).click()
    {
      const element = await driver.findElement(By.css(".poll-name"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.css(".poll-name")).click()
    await driver.findElement(By.css(".poll-name")).clear()
    await driver.findElement(By.css(".poll-name")).click()

    await driver.findElement(By.css(".poll-name")).sendKeys("SQE Poll Test")

    await driver.findElement(By.id("mui-1-T-3")).click()
    await driver.findElement(By.css(".startd")).click()

    {
      const element = await driver.findElement(By.css(".active"))
      await driver.actions({async: true}).move({x: 0, y: 0, origin: element}).click().perform()
    }
    
    {
      const element = await driver.findElement(By.css(".flatpickr-current-month"))
      await driver.actions({async: true}).move({x: 0, y: 0, origin: element}).perform()
    }
    await driver.findElement(By.css(".flatpickr-day:nth-child(23)")).click()
    await driver.findElement(By.css(".flatpickr-day:nth-child(30)")).click()
    await driver.sleep(3000)
    const elements = await driver.findElements(By.css(".Toastify__toast-body"))
    assert(elements.length)



    
    await driver.close()
  })


})
