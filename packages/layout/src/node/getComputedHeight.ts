import type { SafeNode } from '../types';
import getPadding from './getPadding';
import getBorderWidth from './getBorderWidth';

const getYogaComputedHeight = (node: SafeNode) => {
  const { yogaNode } = node;
  return yogaNode ? yogaNode.getComputedHeight() : null;
};

/**
 * Get computed height of a node.
 * Uses Yoga's computed height when available, falls back to manual calculation.
 * Note: Margins are not included as they are already accounted for in the box's position.
 */
const getComputedHeight = (node: SafeNode) => {
  const yogaHeight = getYogaComputedHeight(node);
  if (yogaHeight != null) return yogaHeight;

  const { style, box } = node;
  const padding = getPadding(node);

  // Only fallback: sum up box/style height, paddings, borders, etc.
  let baseHeight = 0;
  if (typeof box?.height === 'number') {
    baseHeight = box.height;
  } else if (typeof style?.height === 'number') {
    baseHeight = style.height;
  }

  // Add paddings if present
  baseHeight += Number(padding.paddingTop) + Number(padding.paddingBottom);

  // Add borders if present
  const border = getBorderWidth(node);
  baseHeight += border.borderTopWidth;
  baseHeight += border.borderBottomWidth;

  return baseHeight;
};

export default getComputedHeight;
