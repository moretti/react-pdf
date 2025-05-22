import * as Yoga from 'yoga-layout/load';

import { SafeNode } from '../types';

const getComputedBorder = (
  yogaNode: Yoga.YogaNode | undefined,
  edge: Yoga.Edge,
) => (yogaNode ? yogaNode.getComputedBorder(edge) : null);

/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param node
 * @returns Border widths
 */
const getBorderWidth = (node: SafeNode) => {
  const { yogaNode, box, style } = node;

  return {
    borderTopWidth:
      getComputedBorder(yogaNode, Yoga.Edge.Top) ||
      box?.borderTopWidth ||
      style?.borderTopWidth ||
      0,
    borderRightWidth:
      getComputedBorder(yogaNode, Yoga.Edge.Right) ||
      box?.borderRightWidth ||
      style?.borderRightWidth ||
      0,
    borderBottomWidth:
      getComputedBorder(yogaNode, Yoga.Edge.Bottom) ||
      box?.borderBottomWidth ||
      style?.borderBottomWidth ||
      0,
    borderLeftWidth:
      getComputedBorder(yogaNode, Yoga.Edge.Left) ||
      box?.borderLeftWidth ||
      style?.borderLeftWidth ||
      0,
  };
};

export default getBorderWidth;
