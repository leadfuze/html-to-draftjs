import { Entity } from 'draft-js';

const getEntityId = (node) => {
  let entityId = undefined;
  if (
    node instanceof HTMLAnchorElement
  ) {
    const entityConfig = {};
    if (node.dataset && node.dataset.mention !== undefined) {
      entityConfig.url = node.href;
      entityConfig.text = node.innerHTML;
      entityConfig.value = node.dataset.value;
      entityId = Entity.__create(
        'MENTION',
        'IMMUTABLE',
        entityConfig,
      );
    } else if(node.hasChildNodes() && node.lastChild instanceof HTMLImageElement) {
      const img = node.lastChild;
      entityConfig.href = node.getAttribute ? node.getAttribute('href') || node.href : node.href;
      entityConfig.targetOption = node.target;
      entityConfig.src = img.getAttribute ? img.getAttribute('src') || img.src : img.src;
      entityConfig.alt = img.getAttribute ? img.getAttribute('alt') || img.alt : img.alt;
      entityId = Entity.__create(
        'IMAGE',
        'MUTABLE',
        entityConfig,
      );
    } else {
      entityConfig.url = node.getAttribute ? node.getAttribute('href') || node.href : node.href;
      entityConfig.title = node.innerHTML;
      entityConfig.targetOption = node.target;
      entityId = Entity.__create(
        'LINK',
        'MUTABLE',
        entityConfig,
      );
    }
  }
  return entityId;
}

export default getEntityId;
