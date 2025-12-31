export const researchCardStyles = `
/* ============ Research Card Container ============ */
.oc-research-card {
  display: flex;
  flex-direction: column;
  background: var(--oc-bg-canvas, #FFFFFF);
  border-radius: var(--oc-radius-lg, 8px);
  box-shadow: var(--oc-shadow-lg);
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.oc-research-card__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
}

.oc-research-card__back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: var(--oc-radius-md, 6px);
  background: transparent;
  color: var(--oc-fg-secondary, #475569);
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.oc-research-card__back:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  color: var(--oc-fg-primary, #0F172A);
}

.oc-research-card__title {
  flex: 1;
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: var(--oc-fg-primary, #0F172A);
  line-height: 1.4;
}

.oc-research-card__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.oc-research-card__content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* ============ User Question ============ */
.oc-user-question {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.oc-user-question__avatar {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--oc-radius-md, 6px);
  background: var(--oc-bg-surface, #F8FAFC);
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-user-question__text {
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: var(--oc-fg-primary, #0F172A);
  padding-top: 4px;
}

/* ============ AI Response ============ */
.oc-ai-response {
  margin-bottom: 20px;
}

.oc-ai-response__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.oc-ai-response__avatar {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-ai-response__avatar-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--oc-radius-md, 6px);
  background: var(--oc-fg-primary, #0F172A);
  color: white;
  font-size: 14px;
  font-weight: 700;
}

.oc-ai-response__status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: none;
  border-radius: var(--oc-radius-md, 6px);
  background: transparent;
  color: var(--oc-fg-secondary, #475569);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: default;
  transition: all 0.15s ease;
}

.oc-ai-response--expandable .oc-ai-response__status {
  cursor: pointer;
}

.oc-ai-response--expandable .oc-ai-response__status:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
}

.oc-ai-response__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--oc-border-default, #E2E8F0);
  border-top-color: var(--oc-accent, #0891B2);
  border-radius: 50%;
  animation: oc-spin 0.8s linear infinite;
}

.oc-ai-response__status-text {
  color: var(--oc-fg-secondary, #475569);
}

.oc-ai-response--researching .oc-ai-response__status-text {
  color: var(--oc-accent, #0891B2);
}

.oc-ai-response--error .oc-ai-response__status-text {
  color: var(--oc-error, #DC2626);
}

.oc-ai-response__chevron {
  color: var(--oc-fg-tertiary, #94A3B8);
  transition: transform 0.2s ease;
}

.oc-ai-response--expanded .oc-ai-response__chevron {
  transform: rotate(180deg);
}

.oc-ai-response__sources {
  margin-bottom: 16px;
  margin-left: 42px;
}

.oc-ai-response__content {
  margin-left: 42px;
}

/* ============ Sources Badge ============ */
.oc-sources-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-full, 9999px);
  background: var(--oc-bg-canvas, #FFFFFF);
  color: var(--oc-fg-secondary, #475569);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-sources-badge:hover {
  border-color: var(--oc-border-strong, #CBD5E1);
  background: var(--oc-bg-surface, #F8FAFC);
}

.oc-sources-badge__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.oc-sources-badge__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.oc-sources-badge__text {
  color: var(--oc-fg-primary, #0F172A);
}

.oc-sources-badge__arrow {
  color: var(--oc-fg-tertiary, #94A3B8);
  transition: transform 0.15s ease;
}

.oc-sources-badge:hover .oc-sources-badge__arrow {
  transform: translateX(2px);
}

/* ============ Research Section ============ */
.oc-research-section {
  margin-bottom: 24px;
}

.oc-research-section:last-child {
  margin-bottom: 0;
}

.oc-research-section__heading {
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 600;
  color: var(--oc-fg-primary, #0F172A);
  line-height: 1.4;
}

.oc-research-section__body {
  font-size: 15px;
  line-height: 1.7;
  color: var(--oc-fg-secondary, #475569);
}

.oc-research-section__body p {
  margin: 0 0 12px;
}

.oc-research-section__body p:last-child {
  margin-bottom: 0;
}

/* ============ Steps List ============ */
.oc-steps-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: var(--oc-bg-surface, #F8FAFC);
  border-radius: var(--oc-radius-md, 6px);
  margin-bottom: 16px;
}

.oc-steps-list__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px;
  border-radius: var(--oc-radius-sm, 4px);
}

.oc-steps-list__indicator {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-steps-list__number {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--oc-border-default, #E2E8F0);
  color: var(--oc-fg-tertiary, #94A3B8);
  font-size: 11px;
  font-weight: 600;
}

.oc-steps-list__item--completed .oc-steps-list__indicator {
  color: var(--oc-success, #059669);
}

.oc-steps-list__item--running .oc-steps-list__indicator {
  color: var(--oc-accent, #0891B2);
}

.oc-steps-list__item--error .oc-steps-list__indicator {
  color: var(--oc-error, #DC2626);
}

.oc-steps-list__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--oc-border-default, #E2E8F0);
  border-top-color: var(--oc-accent, #0891B2);
  border-radius: 50%;
  animation: oc-spin 0.8s linear infinite;
}

.oc-steps-list__content {
  flex: 1;
  min-width: 0;
}

.oc-steps-list__label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-fg-primary, #0F172A);
  line-height: 1.4;
}

.oc-steps-list__item--pending .oc-steps-list__label {
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-steps-list__desc {
  display: block;
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
  margin-top: 2px;
}
`;
