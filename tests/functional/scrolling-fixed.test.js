/**
 * @jest-environment jest-playwright-preset
 * @flow
 */
import { scroll, screenshot } from '../utils/playwright.js';

it('should update the position when window is resized', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/scroll.html`);

  await scroll(page, '#scroll', 300);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should handle basic nested scrollable parents', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/nested.html`);

  await scroll(page, '.scroll2', 300);
  await scroll(page, '.scroll1', 300);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should handle basic nested scrollable parents when pop/ref are on same div', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/nested-same.html`);

  await scroll(page, '.scroll2', 300);
  await scroll(page, '.scroll1', 300);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should handle case where popper is one level deeper than reference', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/nested-alt.html`);

  await scroll(page, '.scroll2', 300);
  await scroll(page, '.scroll1', 300);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should handle basic offset parent', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/offset-basic.html`);

  await scroll(page, 'html', 200);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should handle case where root scrolling parent is also offset parent', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/offset-parent.html`);

  await scroll(page, '.scroll3', 200);
  await scroll(page, '.scroll2', 200);
  await scroll(page, '.scroll1', 200);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should handle multiple nested offsetParents', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/offset-parent-multiple.html`);

  await scroll(page, '.scroll3', 200);
  await scroll(page, '.scroll2', 200);
  await scroll(page, '.scroll1', 200);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should handle same offset parent', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/scroll-same-offset-parent.html`);

  await scroll(page, '#scroll', 200);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should handle alt offset parent', async () => {
  await page.goto(`${TEST_URL}/scrolling-fixed/scroll-alt-offset-parent.html`);

  await scroll(page, '#scroll', 200);

  expect(await screenshot(page)).toMatchImageSnapshot();
});
