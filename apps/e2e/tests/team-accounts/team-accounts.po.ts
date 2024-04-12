import { expect, Page } from '@playwright/test';
import { AuthPageObject } from '../authentication/auth.po';

export class TeamAccountsPageObject {
  private readonly page: Page;
  public auth: AuthPageObject;

  constructor(page: Page) {
    this.page = page;
    this.auth = new AuthPageObject(page);
  }

  async setup(params = this.createTeamName()) {
    await this.auth.signUpFlow('/home');
    await this.createTeam(params);
  }

  async getTeamFromSelector(teamSlug: string) {
    await this.openAccountsSelector();

    return this.page.locator(`[data-test="account-selector-team-${teamSlug}"]`);
  }

  async goToSettings() {
    await this.page.locator('a', {
      hasText: 'Settings',
    }).click();
  }

  async openAccountsSelector() {
    await this.page.click('[data-test="account-selector-trigger"]');
  }

  async createTeam({ teamName, slug } = this.createTeamName()) {
    await this.openAccountsSelector();

    await this.page.click('[data-test="create-team-account-trigger"]');
    await this.page.fill('[data-test="create-team-form"] input', teamName);
    await this.page.click('[data-test="create-team-form"] button:last-child');

    await this.page.waitForURL(`http://localhost:3000/home/${slug}`, {
      timeout: 5000,
    });
  }

  async updateName(name: string) {
    await this.page.fill('[data-test="update-team-account-name-form"] input', name);
    await this.page.click('[data-test="update-team-account-name-form"] button');
  }

  async deleteAccount(teamName: string) {
    await this.page.click('[data-test="delete-team-trigger"]');

    expect(await this.page.locator('[data-test="delete-team-form-confirm-input"]').isVisible()).toBeTruthy();

    await this.page.fill('[data-test="delete-team-form-confirm-input"]', teamName);
    await this.page.click('[data-test="delete-team-form-confirm-button"]');
  }

   createTeamName() {
    const random = (Math.random() * 10).toFixed(0);

    const teamName = `Team-Name-${random}`;
    const slug = `team-name-${random}`;

    return { teamName, slug };
  }
}