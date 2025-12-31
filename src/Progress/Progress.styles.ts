export const progressStyles = `
/* Progress bar */
.oc-progress {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  width: 100%;
}

.oc-progress__track {
  flex: 1;
  background: var(--oc-bg-surface);
  border-radius: var(--oc-radius-full);
  overflow: hidden;
}

.oc-progress--sm .oc-progress__track {
  height: 4px;
}

.oc-progress--md .oc-progress__track {
  height: 6px;
}

.oc-progress--lg .oc-progress__track {
  height: 8px;
}

.oc-progress__bar {
  height: 100%;
  border-radius: var(--oc-radius-full);
  transition: width var(--oc-duration-slow) var(--oc-easing-default);
}

.oc-progress--accent .oc-progress__bar {
  background: var(--oc-accent);
}

.oc-progress--success .oc-progress__bar {
  background: var(--oc-success);
}

.oc-progress--warning .oc-progress__bar {
  background: var(--oc-warning);
}

.oc-progress--error .oc-progress__bar {
  background: var(--oc-error);
}

/* Indeterminate animation */
.oc-progress--indeterminate .oc-progress__bar {
  width: 30%;
  animation: oc-progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes oc-progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(200%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.oc-progress__label {
  font-size: var(--oc-font-size-xs);
  font-weight: 500;
  color: var(--oc-fg-secondary);
  min-width: 3ch;
  text-align: right;
}

/* Progress circle */
.oc-progress-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.oc-progress-circle__track {
  stroke: var(--oc-bg-surface);
}

.oc-progress-circle__bar {
  transition: stroke-dashoffset var(--oc-duration-slow) var(--oc-easing-default);
}

.oc-progress-circle--accent .oc-progress-circle__bar {
  stroke: var(--oc-accent);
}

.oc-progress-circle--success .oc-progress-circle__bar {
  stroke: var(--oc-success);
}

.oc-progress-circle--warning .oc-progress-circle__bar {
  stroke: var(--oc-warning);
}

.oc-progress-circle--error .oc-progress-circle__bar {
  stroke: var(--oc-error);
}

.oc-progress-circle__label {
  position: absolute;
  font-size: var(--oc-font-size-xs);
  font-weight: 600;
  color: var(--oc-fg-primary);
}

/* Spinner */
.oc-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--oc-accent);
  animation: oc-spin var(--oc-duration-spin) linear infinite;
}
`;
