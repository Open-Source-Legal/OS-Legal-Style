export const activityFeedStyles = `
/* ============================================
   ActivityFeed Component
   ============================================ */

.oc-activity-feed {
  display: flex;
  flex-direction: column;
}

.oc-activity-feed__list {
  display: flex;
  flex-direction: column;
}

/* ActivityItem */
.oc-activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
}

.oc-activity-feed--dividers .oc-activity-item {
  border-bottom: 1px solid var(--oc-bg-subtle, #F1F5F9);
}

.oc-activity-feed--dividers .oc-activity-item:last-child {
  border-bottom: none;
}

/* Avatar */
.oc-activity-item__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--oc-fg-inverse, #FFFFFF);
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
}

/* Content */
.oc-activity-item__content {
  flex: 1;
  min-width: 0;
}

/* Text */
.oc-activity-item__text {
  font-size: var(--oc-font-size-sm, 14px);
  color: var(--oc-fg-secondary, #475569);
  margin: 0;
  line-height: 1.4;
}

/* Name */
.oc-activity-item__name {
  font-weight: 600;
  color: var(--oc-fg-primary, #1E293B);
}

/* Target */
.oc-activity-item__target {
  color: var(--oc-accent, #0F766E);
  text-decoration: none;
}

a.oc-activity-item__target:hover {
  text-decoration: underline;
}

/* Time */
.oc-activity-item__time {
  font-size: var(--oc-font-size-sm, 13px);
  color: var(--oc-fg-tertiary, #94A3B8);
  margin-top: 2px;
}

/* View All Link */
.oc-activity-feed__view-all {
  display: block;
  text-align: center;
  font-size: var(--oc-font-size-sm, 14px);
  font-weight: 500;
  color: var(--oc-fg-secondary, #64748B);
  text-decoration: none;
  padding: 12px;
  margin-top: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: color var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-activity-feed__view-all:hover {
  color: var(--oc-accent, #0F766E);
}

/* Responsive */
@media (max-width: 480px) {
  .oc-activity-item {
    gap: 10px;
    padding: 12px 0;
  }

  .oc-activity-item__avatar {
    width: 32px;
    height: 32px;
    font-size: 11px;
  }

  .oc-activity-item__text {
    font-size: 13px;
  }
}
`;
