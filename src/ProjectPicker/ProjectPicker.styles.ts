export const projectPickerStyles = `
/* ============ Project Picker Container ============ */
.oc-project-picker {
  display: flex;
  flex-direction: column;
  background: var(--oc-bg-canvas, #FFFFFF);
  border-radius: var(--oc-radius-lg, 8px);
  box-shadow: var(--oc-shadow-lg);
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.oc-project-picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-bottom: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.oc-project-picker--open .oc-project-picker__header {
  border-bottom-color: var(--oc-border-default, #E2E8F0);
}

.oc-project-picker__header:hover {
  background: var(--oc-bg-surface, #F8FAFC);
}

.oc-project-picker__header-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.oc-project-picker__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--oc-fg-primary, #0F172A);
}

.oc-project-picker__subtitle {
  font-size: 13px;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-project-picker__chevron {
  flex-shrink: 0;
  color: var(--oc-fg-tertiary, #94A3B8);
  transition: transform 0.2s ease;
}

.oc-project-picker--open .oc-project-picker__chevron {
  transform: rotate(180deg);
}

.oc-project-picker__list {
  display: flex;
  flex-direction: column;
  padding: 8px;
}

/* ============ Project Item ============ */
.oc-project-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--oc-radius-md, 6px);
  cursor: pointer;
  transition: all 0.15s ease;
  outline: none;
}

.oc-project-item:hover {
  background: var(--oc-bg-surface, #F8FAFC);
}

.oc-project-item:focus-visible {
  box-shadow: 0 0 0 2px var(--oc-accent, #0891B2);
}

.oc-project-item--selected {
  background: var(--oc-bg-surface, #F8FAFC);
  box-shadow: inset 0 0 0 1px var(--oc-border-default, #E2E8F0);
}

.oc-project-item--selected:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
}

.oc-project-item__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.oc-project-item__name {
  font-size: 15px;
  font-weight: 500;
  color: var(--oc-fg-primary, #0F172A);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-project-item__desc {
  font-size: 13px;
  color: var(--oc-fg-tertiary, #94A3B8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-project-item__icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--oc-fg-tertiary, #94A3B8);
  transition: color 0.15s ease;
}

.oc-project-item:hover .oc-project-item__icon {
  color: var(--oc-fg-secondary, #475569);
}

.oc-project-item--selected .oc-project-item__icon {
  color: var(--oc-accent, #0891B2);
}

/* ============ Project Search ============ */
.oc-project-search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  margin: 8px;
  background: var(--oc-bg-surface, #F8FAFC);
  border-radius: var(--oc-radius-md, 6px);
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.oc-project-search:focus-within {
  background: var(--oc-bg-canvas, #FFFFFF);
  border-color: var(--oc-accent, #0891B2);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
}

.oc-project-search__icon {
  flex-shrink: 0;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-project-search__input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: var(--oc-fg-primary, #0F172A);
  outline: none;
}

.oc-project-search__input::placeholder {
  color: var(--oc-fg-tertiary, #94A3B8);
}
`;
