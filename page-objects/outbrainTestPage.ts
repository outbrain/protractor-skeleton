import { $, $$, browser, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

class OutbrainTestPage {
    private likeBTN: ElementFinder;
    private disLikeBTN: ElementFinder;
    private readMoreBTN: ElementFinder;
    private widgetEvent: ElementArrayFinder;
    private outbrainLogo: ElementFinder;
    private widget: ElementFinder;
    private aboutIframe: ElementFinder;
    private suggestionTitle: ElementArrayFinder;

    constructor() {
        this.likeBTN = $('.ob-stack-card-btn-like');
        this.disLikeBTN = $('.ob-stack-card-btn-dislike');
        this.readMoreBTN = $('.ob-stack-card-btn-readmore');
        this.widgetEvent = $$('.widgetEvent');
        this.outbrainLogo = $('.ob_logo');
        this.widget = $('.OUTBRAIN');
        this.aboutIframe = $('#ob_iframe_modal');
        this.suggestionTitle = $$('.ob-rec-text');
    }
    async navigate() {
        await browser.get('http://static-test.outbrain.com/qa/', 10000);
    }
    async clickOnLikeBTN() {
        await this.likeBTN.click();
    }
    async clickOnDisLikeBTN() {
        await this.disLikeBTN.click();
    }
    async clickOnReadMoreBTN() {
        await this.readMoreBTN.click();
    }
    async clickOnOutbrainLogo() {
        await this.outbrainLogo.click();
    }
    // Get the text of the last event from events panel
    async getTextOfLastEvent() {
        let max = 0;
        let temp = 0;
        let TextMaxElement = "";
        // Find the last event time in the widgetEvent array
        for (let i = 0; i < await this.widgetEvent.count(); i++) {
            temp = parseInt((await this.widgetEvent.get(i).getText()).split("=")[3]);
            if (temp > max) {
                max = temp;
                TextMaxElement = await this.widgetEvent.get(i).getText();
            }
        }
        return TextMaxElement;
    }
    // Get the event action time
    async getActionEventTime(event: string) {
        return parseInt(event.split("=")[3]);
    }
    // Get the event writing time
    async getWritingEventTime(event: string) {
        return parseInt(event.split(",")[0].split(" ")[4]);
    }
    // Get event data: action param
    async getActionEvent(event: string) {
        return event.split("action=")[1].split("&")[0];
    }
    // Get event data: idx param
    async getIdxEvent(event: string) {
        return parseInt(event.split("idx=")[1].split("&")[0]);
    }
    // Get current suggestion article title
    async getSuggestionTitle() {
        return this.suggestionTitle.last().getText();
    }
    // Wait for last event to be visible
    async waitForLastEventElement() {
        const until = protractor.ExpectedConditions;
        browser.wait(until.visibilityOf(this.widgetEvent.last()), 5000, 'WidgetEvent.last Element taking too long to appear in the DOM');
        browser.wait(until.presenceOf(this.widgetEvent.last()), 5000, 'WidgetEvent.last Element taking too long to appear in the DOM');
    }
    // Wait for first event to be visible
    async waitForFirstEventElement() {
        const until = protractor.ExpectedConditions;
        browser.wait(until.visibilityOf(this.widgetEvent.first()), 5000, 'WidgetEvent.first Element taking too long to appear in the DOM');
        browser.wait(until.presenceOf(this.widgetEvent.first()), 5000, 'WidgetEvent.first Element taking too long to appear in the DOM');
    }
    // Wait for interaction layer to be visible
    async waitForInteractionLayer() {
        const until = protractor.ExpectedConditions;
        browser.wait(until.visibilityOf(this.widget), 5000, 'Widget Element taking too long to appear in the DOM');
        browser.wait(until.visibilityOf(this.likeBTN), 5000, 'Like Element taking too long to appear in the DOM');
        browser.wait(until.visibilityOf(this.disLikeBTN), 5000, 'DisLike Element taking too long to appear in the DOM');
        browser.wait(until.visibilityOf(this.readMoreBTN), 5000, 'ReadMore Element taking too long to appear in the DOM');
    }
    // Verify the 'about' window was opened
    async waitAndVerifyAboutWindow() {
        const until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(this.aboutIframe), 5000, 'About iframe Element taking too long to appear in the DOM');
        expect(await this.aboutIframe.isDisplayed()).toBe(true);
    }
    // Perform an action and verify correct data in the event
    async verifyActionInTheEvent(action: string) {
        this.waitForLastEventElement();
        this.verifyEventData(await this.getTextOfLastEvent(), action, 0);
    }
    // Verify that event writing to the events panel is within 2 seconds
    async compareBetweenActionToWriting(event: string) {
        let timeDifferenceInMiliSec = await this.getWritingEventTime(event) - await this.getActionEventTime(event);
        expect(timeDifferenceInMiliSec).toBeLessThan(2000);
    }
    // Verify the event contains correct data
    async verifyEventData(event: string, action: string, idx: number) {
        expect(await this.getActionEvent(event)).toEqual(action);
        expect(await this.getIdxEvent(event)).toEqual(idx);
    }
    // Verify article open in new tab with page title
    async verifyNewTabWithTitleNotEmpty() {
        let windowHandle = browser.getAllWindowHandles();
        let parentHandle, childHandle;
        windowHandle.then(function (handles) {
            parentHandle = handles[0];
            childHandle = handles[1];
            browser.switchTo().window(childHandle).then(function () {
                browser.getTitle().then(function (text) {
                    expect(text.length).not.toEqual(0);
                });
                browser.switchTo().window(parentHandle);
            });
        });
    }
    // Verify the widget doesn't displayed in the page
    async verifyWidgetPresentFalse() {
        const until = protractor.ExpectedConditions;
        browser.wait(until.invisibilityOf(this.widget), 5000, 'Widget Element taking too long to appear in the DOM');
        expect(await this.widget.isDisplayed()).toBe(false);
    }
}

export const outbrainTestPage = new OutbrainTestPage();