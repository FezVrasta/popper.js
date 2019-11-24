// @flow
import type { PaddingObject } from '../types';

export default (paddingObject: PaddingObject): PaddingObject => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  ...paddingObject,
});
