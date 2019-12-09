// @flow
import type { VirtualElement, ClientRectObject } from '../types';
import getDocumentRect from './getDocumentRect';
import listScrollParents from './listScrollParents';
import getOffsetParent from './getOffsetParent';
import getDocumentElement from './getDocumentElement';
import getComputedStyle from './getComputedStyle';
import unwrapVirtualElement from './unwrapVirtualElement';
import { isElement, isHTMLElement } from './instanceOf';
import getBoundingClientRect from './getBoundingClientRect';
import rectToClientRect from '../utils/rectToClientRect';

// A "clipping parent" is a scrolling container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`
function getClippingParents(elementOrVirtualElement: Element | VirtualElement) {
  const element = unwrapVirtualElement(elementOrVirtualElement);
  const scrollParents = listScrollParents(element);
  const canEscapeClipping = ['absolute', 'fixed'].includes(
    getComputedStyle(element).position
  );
  const clippingParents = [];

  scrollParents.forEach(scrollParent => {
    const clipperElement =
      canEscapeClipping && isHTMLElement(element)
        ? getOffsetParent(element)
        : element;
    if (
      isElement(scrollParent) &&
      isElement(clipperElement) &&
      scrollParent.contains(clipperElement)
    ) {
      clippingParents.push(scrollParent);
    }
  });

  return clippingParents;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping parents
export default function getClippingRect(
  elementOrVirtualElement: Element | VirtualElement
): ClientRectObject {
  const element = unwrapVirtualElement(elementOrVirtualElement);
  const documentElement = getDocumentElement(element);
  const [firstClippingParent, ...restClippingParents] = getClippingParents(
    element
  );

  if (firstClippingParent === documentElement || !firstClippingParent) {
    return rectToClientRect(getDocumentRect(documentElement));
  }

  const clippingRect = restClippingParents.reduce((accRect, clippingParent) => {
    const rect = getBoundingClientRect(clippingParent);
    accRect.top = Math.max(rect.top, accRect.top);
    accRect.right = Math.min(rect.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left, accRect.left);
    return accRect;
  }, getBoundingClientRect(firstClippingParent));

  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;

  return clippingRect;
}
