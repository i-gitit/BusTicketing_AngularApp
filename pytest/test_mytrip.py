import pytest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from datetime import date
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

today=date.today()
@pytest.fixture
def browser():
    ''' Initial setup of browser driver '''
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)
    driver.get("http://localhost:4200/")
    yield driver
    driver.quit()

def test_open_mytrip():
    driver = webdriver.Chrome()
    driver.get("http://localhost:4200/")
    assert "MytripBusTicketing" == driver.title
    driver.quit()

def test_open_mytrip_usingFixture(browser):
    assert "MytripBusTicketing" == browser.title

@pytest.mark.parametrize("source,destination,date,expectedStatus", [
    ("Jaipur", "Udaipur", today.strftime("%m/%d/%Y"),"valid"),
    ("Jaipur", "Jaipur", today.strftime("%m/%d/%Y"),"invalid"), #duplicate source and destination so invalid
    ("Jaipur", "Udaipur", "05/10/2021","invalid")               #old  date so invalid
])
def test_plan_journey_form(browser,source,destination,date,expectedStatus):
    sourceCity = Select(browser.find_element_by_id("sourceLocation"))
    sourceCity.select_by_value(source)
    destinationCity = Select(browser.find_element_by_id("destination"))
    destinationCity.select_by_value(destination)
    journeyDate = browser.find_element_by_id('departureDate')
    journeyDate.send_keys(date)
    form = browser.find_element_by_tag_name('form')
    status = "invalid" if (form.get_attribute('class').find("ng-valid") == -1) else "valid"
    assert status == expectedStatus

def test_generate_ticket(browser):
    sourceCity = Select(browser.find_element_by_id("sourceLocation"))
    sourceCity.select_by_value("Jaipur")
    sourceCity = Select(browser.find_element_by_id("destination"))
    sourceCity.select_by_value("Udaipur")
    journeyDate = browser.find_element_by_id('departureDate')
    journeyDate.send_keys(today.strftime("%m/%d/%Y"))
    journeyDate.submit()
    
    viewSeat = browser.find_element_by_class_name("viewseats")
    viewSeat.click()

    seat = browser.find_element_by_class_name("seatCheckbox").click()
    browser.find_element_by_class_name("btn-primary").click()
    
    username = browser.find_element_by_id("username")
    username.send_keys("Himanshu")
    phone = browser.find_element_by_id("mobilenumber")
    phone.send_keys("9900990099")
    email = browser.find_element_by_id("email")
    email.send_keys("him@gamil.com")
    email.submit()

    browser.find_element_by_class_name("btn-info").click()

    ticket = {}
    ticket['endpoints'] = browser.find_element_by_class_name("endpoints").text
    ticket['passengername'] = browser.find_element_by_class_name("passengername").text
    print(ticket)
    assert (ticket['endpoints'] == "Jaipur Udaipur" and ticket['passengername'] == "Himanshu")

def test_booking_seat_twice(browser):
    browser.maximize_window()
    sourceCity = Select(browser.find_element_by_id("sourceLocation"))
    sourceCity.select_by_value("Jaipur")
    sourceCity = Select(browser.find_element_by_id("destination"))
    sourceCity.select_by_value("Udaipur")
    journeyDate = browser.find_element_by_id('departureDate')
    journeyDate.send_keys(today.strftime("%m/%d/%Y"))
    journeyDate.submit()
    
    viewSeat = browser.find_element_by_class_name("viewseats")
    viewSeat.click()

    seat = browser.find_element_by_xpath("//label[@id='1']").click()
    browser.find_element_by_class_name("btn-primary").click()
    
    username = browser.find_element_by_id("username")
    username.send_keys("Himanshu")
    phone = browser.find_element_by_id("mobilenumber")
    phone.send_keys("9900990099")
    email = browser.find_element_by_id("email")
    email.send_keys("him@gamil.com")
    email.submit()

    browser.find_element_by_class_name("btn-info").click()
    browser.find_element_by_class_name("btn-primary").click()

    sourceCity = Select(browser.find_element_by_id("sourceLocation"))
    sourceCity.select_by_value("Jaipur")
    sourceCity = Select(browser.find_element_by_id("destination"))
    sourceCity.select_by_value("Udaipur")
    journeyDate = browser.find_element_by_id('departureDate')
    journeyDate.send_keys(today.strftime("%m/%d/%Y"))
    journeyDate.submit()

    viewSeat = browser.find_element_by_class_name("viewseats")
    viewSeat.click()

    seat = browser.find_element_by_xpath("//input[@id='1']")
    assert seat.get_attribute('disabled') == "true"