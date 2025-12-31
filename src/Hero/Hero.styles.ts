export const heroStyles = `
/* ============ Hero Container ============ */
.oc-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(180deg, rgba(8, 145, 178, 0.03) 0%, transparent 100%);
}

.oc-hero__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Size variants */
.oc-hero--sm {
  padding: 48px 24px;
}

.oc-hero--md {
  padding: 80px 24px;
}

.oc-hero--lg {
  padding: 120px 24px;
}

/* Layout variants */
.oc-hero--centered {
  text-align: center;
}

.oc-hero--centered .oc-hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.oc-hero--split .oc-hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

/* ============ Hero Decorations ============ */
.oc-hero__decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.oc-hero:not(.oc-hero--with-decorations) .oc-hero__decorations {
  display: none;
}

.oc-hero__decoration {
  position: absolute;
  color: var(--oc-accent, #0891B2);
  opacity: 0.08;
}

.oc-hero__decoration--1 {
  top: 15%;
  left: 10%;
  animation: oc-hero-float 8s ease-in-out infinite;
}

.oc-hero__decoration--2 {
  top: 40%;
  left: 5%;
  opacity: 0.06;
  animation: oc-hero-float 10s ease-in-out infinite reverse;
}

.oc-hero__decoration--3 {
  top: 20%;
  right: 8%;
  opacity: 0.05;
  animation: oc-hero-float 9s ease-in-out infinite;
}

.oc-hero__decoration--4 {
  top: 50%;
  right: 12%;
  opacity: 0.07;
  animation: oc-hero-float 11s ease-in-out infinite reverse;
}

@keyframes oc-hero-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

/* ============ Hero Badge ============ */
.oc-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--oc-bg-canvas, #FFFFFF);
  border-radius: var(--oc-radius-full, 9999px);
  box-shadow: var(--oc-shadow-sm);
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
  margin-bottom: 24px;
}

.oc-hero-badge__icon {
  display: flex;
  align-items: center;
  color: var(--oc-accent, #0891B2);
}

.oc-hero-badge__text {
  white-space: nowrap;
}

/* ============ Hero Title ============ */
.oc-hero-title {
  margin: 0 0 16px;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--oc-fg-primary, #0F172A);
  letter-spacing: -0.02em;
}

.oc-hero-title--gradient {
  background: linear-gradient(135deg, var(--oc-fg-primary, #0F172A) 0%, var(--oc-accent, #0891B2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ============ Hero Subtitle ============ */
.oc-hero-subtitle {
  margin: 0 0 32px;
  max-width: 560px;
  font-size: 17px;
  line-height: 1.6;
  color: var(--oc-fg-secondary, #475569);
}

.oc-hero--centered .oc-hero-subtitle {
  margin-left: auto;
  margin-right: auto;
}

/* ============ Hero Search ============ */
.oc-hero-search {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  padding: 8px 8px 8px 20px;
  background: var(--oc-bg-canvas, #FFFFFF);
  border-radius: var(--oc-radius-full, 9999px);
  box-shadow: var(--oc-shadow-lg);
  margin-bottom: 24px;
}

.oc-hero-search__input {
  flex: 1;
  min-width: 0;
  padding: 8px 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 15px;
  color: var(--oc-fg-primary, #0F172A);
  outline: none;
}

.oc-hero-search__input::placeholder {
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-hero-search__button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 20px;
  background: var(--oc-accent, #0891B2);
  color: white;
  border: none;
  border-radius: var(--oc-radius-full, 9999px);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.oc-hero-search__button:hover:not(:disabled) {
  background: var(--oc-accent-hover, #0E7490);
  transform: translateY(-1px);
  box-shadow: var(--oc-shadow-accent);
}

.oc-hero-search__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.oc-hero-search__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: oc-spin 0.8s linear infinite;
}

.oc-hero-search--loading {
  opacity: 0.8;
}

/* ============ Hero Actions ============ */
.oc-hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.oc-hero--split .oc-hero-actions {
  justify-content: flex-start;
}

/* ============ Hero Action Button ============ */
.oc-hero-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--oc-bg-canvas, #FFFFFF);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-md, 6px);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-hero-action:hover {
  background: var(--oc-bg-surface, #F8FAFC);
  border-color: var(--oc-border-strong, #CBD5E1);
  color: var(--oc-fg-primary, #0F172A);
}

.oc-hero-action__icon {
  display: flex;
  align-items: center;
  color: currentColor;
}

/* ============ Hero Content (for split layout) ============ */
.oc-hero-content {
  display: flex;
  flex-direction: column;
}

.oc-hero-content--left {
  align-items: flex-start;
  text-align: left;
}

.oc-hero-content--center {
  align-items: center;
  text-align: center;
}

.oc-hero-content--right {
  align-items: flex-end;
  text-align: right;
}

/* ============ Hero Media ============ */
.oc-hero-media {
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-hero-media img,
.oc-hero-media svg {
  max-width: 100%;
  height: auto;
}

/* ============ Responsive ============ */
@media (max-width: 1024px) {
  .oc-hero--split .oc-hero__inner {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }

  .oc-hero--split .oc-hero-content {
    align-items: center;
  }

  .oc-hero--split .oc-hero-actions {
    justify-content: center;
  }

  .oc-hero-media {
    order: -1;
  }
}

@media (max-width: 768px) {
  .oc-hero--sm {
    padding: 32px 16px;
  }

  .oc-hero--md {
    padding: 48px 16px;
  }

  .oc-hero--lg {
    padding: 64px 16px;
  }

  .oc-hero-title {
    font-size: 32px;
  }

  .oc-hero-subtitle {
    font-size: 15px;
    margin-bottom: 24px;
  }

  .oc-hero-search {
    flex-direction: column;
    padding: 12px;
    border-radius: var(--oc-radius-lg, 8px);
    gap: 8px;
  }

  .oc-hero-search__input {
    width: 100%;
    text-align: center;
  }

  .oc-hero-search__button {
    width: 100%;
  }

  .oc-hero__decorations {
    display: none;
  }
}

@media (max-width: 480px) {
  .oc-hero-title {
    font-size: 26px;
  }

  .oc-hero-badge {
    font-size: 11px;
    padding: 6px 12px;
  }

  .oc-hero-action {
    width: 100%;
    justify-content: center;
  }

  .oc-hero-actions {
    flex-direction: column;
    width: 100%;
  }
}
`;
