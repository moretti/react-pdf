import { SafeNode } from '../types';
import getWrap from './getWrap';
import getComputedHeight from './getComputedHeight';

const getBreak = (node: SafeNode) =>
  'break' in node.props ? node.props.break : false;

const getMinPresenceAhead = (node: SafeNode) =>
  'minPresenceAhead' in node.props ? node.props.minPresenceAhead : 0;

const getFurthestEnd = (elements: SafeNode[]) =>
  Math.max(
    ...elements.map((node) => {
      return node.box.top + getComputedHeight(node);
    }),
  );

const getEndOfMinPresenceAhead = (child: SafeNode) => {
  return (
    child.box.top +
    getComputedHeight(child) +
    child.box.marginBottom +
    getMinPresenceAhead(child)
  );
};

const getEndOfPresence = (child: SafeNode, futureElements: SafeNode[]) => {
  const afterMinPresenceAhead = getEndOfMinPresenceAhead(child);
  const endOfFurthestFutureElement = getFurthestEnd(
    futureElements.filter((node) => !('fixed' in node.props)),
  );
  return Math.min(afterMinPresenceAhead, endOfFurthestFutureElement);
};

const shouldBreak = (
  child: SafeNode,
  futureElements: SafeNode[],
  height: number,
) => {
  if ('fixed' in child.props) return false;

  const computedHeight = getComputedHeight(child);

  const shouldSplit = height < child.box.top + computedHeight;
  const canWrap = getWrap(child);

  // Calculate the y coordinate where the desired presence of the child ends
  const endOfPresence = getEndOfPresence(child, futureElements);

  // If the child is already at the top of the page, breaking won't improve its presence
  // (as long as react-pdf does not support breaking into differently sized containers)
  const breakingImprovesPresence = child.box.top > child.box.marginTop;

  // For unwrappable nodes that don't fit entirely, we should break even if they start on the current page
  const nodeDoesntFitCompletely =
    child.box.top < height && child.box.top + computedHeight > height;
  const shouldBreakUnwrappable = !canWrap && nodeDoesntFitCompletely;

  return (
    getBreak(child) ||
    (shouldSplit && !canWrap) ||
    shouldBreakUnwrappable ||
    (!shouldSplit && endOfPresence > height && breakingImprovesPresence)
  );
};

export default shouldBreak;
