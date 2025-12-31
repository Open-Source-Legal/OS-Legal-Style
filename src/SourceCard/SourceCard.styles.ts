export const sourceCardStyles = `
/* Source Card */
.oc-source-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  background: var(--oc-bg-surface, #F8F8F8);
  border-radius: var(--oc-radius-lg, 12px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.15s ease;
}

.oc-source-card--clickable {
  cursor: pointer;
}

.oc-source-card--clickable:hover {
  background: var(--oc-bg-surface-hover, #F0F0F0);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.oc-source-card--inline {
  padding: 8px 12px;
  display: inline-flex;
  gap: 8px;
}

/* Document icon */
.oc-source__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--oc-radius-md, 8px);
  background: linear-gradient(135deg, var(--icon-color, #6B6B6B) 0%, color-mix(in srgb, var(--icon-color, #6B6B6B), black 20%) 100%);
  color: white;
  position: relative;
}

.oc-source-card--inline .oc-source__icon {
  width: 32px;
  height: 32px;
}

.oc-source__icon svg {
  opacity: 0.3;
}

.oc-source__icon-label {
  position: absolute;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* Content */
.oc-source-card__content {
  flex: 1;
  min-width: 0;
}

.oc-source-card__header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.oc-source-card__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--oc-fg-primary, #1A1A1A);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-source-card__ref {
  font-size: 12px;
  color: var(--oc-fg-tertiary, #9B9B9B);
  white-space: nowrap;
}

.oc-source-card__excerpt {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--oc-fg-secondary, #6B6B6B);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Score */
.oc-source-card__score {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.oc-source-card__score-bar {
  width: 40px;
  height: 4px;
  background: var(--oc-border-default, #E5E5E5);
  border-radius: 2px;
  overflow: hidden;
}

.oc-source-card__score-bar::after {
  content: '';
  display: block;
  width: var(--score, 0%);
  height: 100%;
  background: var(--oc-accent);
  border-radius: 2px;
}

.oc-source-card__score-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--oc-fg-tertiary, #9B9B9B);
}

/* Arrow */
.oc-source-card__arrow {
  flex-shrink: 0;
  color: var(--oc-fg-tertiary, #9B9B9B);
  transition: transform 0.15s ease;
}

.oc-source-card--clickable:hover .oc-source-card__arrow {
  transform: translateX(2px);
  color: var(--oc-accent);
}

/* Source Pill */
.oc-source-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  background: var(--oc-bg-surface, #F8F8F8);
  border: 1px solid var(--oc-border-default, #E5E5E5);
  border-radius: var(--oc-radius-md, 8px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-source-pill:hover {
  background: var(--oc-bg-surface-hover, #F0F0F0);
  border-color: var(--pill-color, var(--oc-border-strong, #CCCCCC));
}

.oc-source-pill__icon {
  display: flex;
  color: var(--pill-color, var(--oc-fg-tertiary, #9B9B9B));
}

.oc-source-pill__name {
  font-weight: 500;
  color: var(--oc-fg-primary, #1A1A1A);
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-source-pill__ref {
  color: var(--oc-fg-tertiary, #9B9B9B);
  font-weight: 400;
}

/* Source List */
.oc-source-list {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.oc-source-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.oc-source-list__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--oc-fg-secondary, #6B6B6B);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.oc-source-list__count {
  font-size: 12px;
  color: var(--oc-fg-tertiary, #9B9B9B);
}

.oc-source-list__items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Citation marker */
.oc-citation {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  margin: 0 2px;
  background: var(--oc-accent);
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  vertical-align: middle;
  transition: all 0.15s ease;
  box-shadow: 0 1px 3px rgba(8, 145, 178, 0.3);
}

.oc-citation:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(8, 145, 178, 0.4);
}
`;
