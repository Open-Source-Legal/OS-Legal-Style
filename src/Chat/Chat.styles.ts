export const chatStyles = `
/* ============ Chat Container ============ */
.oc-chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--oc-bg-canvas, #FFFFFF);
}

.oc-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ============ Chat Message ============ */
.oc-chat-message {
  display: flex;
  gap: 12px;
  max-width: 100%;
  animation: oc-message-in 0.3s ease;
}

@keyframes oc-message-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.oc-chat-message__avatar {
  flex-shrink: 0;
  margin-top: 2px;
}

.oc-chat-message__container {
  flex: 1;
  min-width: 0;
  max-width: 720px;
}

/* User messages */
.oc-chat-message--user {
  flex-direction: row-reverse;
}

.oc-chat-message--user .oc-chat-message__container {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
}

/* Header */
.oc-chat-message__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.oc-chat-message--user .oc-chat-message__header {
  flex-direction: row-reverse;
}

.oc-chat-message__name {
  font-size: 13px;
  font-weight: 600;
  color: var(--oc-fg-primary, #1A1A1A);
}

.oc-chat-message__time {
  font-size: 12px;
  color: var(--oc-fg-tertiary, #9B9B9B);
}

/* Bubble */
.oc-chat-message__bubble {
  position: relative;
  padding: 14px 18px;
  border-radius: 18px;
  line-height: 1.6;
}

.oc-chat-message--assistant .oc-chat-message__bubble {
  background: var(--oc-bg-surface, #F8F8F8);
  border-top-left-radius: 4px;
  color: var(--oc-fg-primary, #1A1A1A);
}

.oc-chat-message--user .oc-chat-message__bubble {
  background: var(--oc-accent);
  border-top-right-radius: 4px;
  color: white;
  box-shadow: 0 2px 12px rgba(8, 145, 178, 0.25);
}

.oc-chat-message--system .oc-chat-message__bubble {
  background: transparent;
  padding: 8px 0;
  text-align: center;
  color: var(--oc-fg-tertiary, #9B9B9B);
  font-size: 13px;
}

.oc-chat-message__content {
  font-size: 15px;
}

.oc-chat-message__content p {
  margin: 0 0 12px;
}

.oc-chat-message__content p:last-child {
  margin-bottom: 0;
}

/* Streaming cursor */
.oc-chat-message__cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: var(--oc-accent);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: oc-cursor-blink 1s ease infinite;
}

@keyframes oc-cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Actions */
.oc-chat-message__actions {
  margin-top: 8px;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.oc-chat-message:hover .oc-chat-message__actions {
  opacity: 1;
}

/* Error state */
.oc-chat-message__error {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 13px;
  color: var(--oc-error, #EF4444);
}

/* ============ Typing Indicator ============ */
.oc-typing-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.oc-typing-indicator__dots {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: var(--oc-bg-surface, #F8F8F8);
  border-radius: 18px;
  border-top-left-radius: 4px;
}

.oc-typing-indicator__dot {
  width: 8px;
  height: 8px;
  background: var(--oc-fg-tertiary, #9B9B9B);
  border-radius: 50%;
  animation: oc-typing-bounce 1.4s ease infinite;
}

.oc-typing-indicator__dot:nth-child(2) {
  animation-delay: 0.2s;
}

.oc-typing-indicator__dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes oc-typing-bounce {
  0%, 60%, 100% {
    transform: translateY(0);
    background: var(--oc-fg-tertiary);
  }
  30% {
    transform: translateY(-8px);
    background: var(--oc-accent);
  }
}

.oc-typing-indicator__label {
  font-size: 13px;
  color: var(--oc-fg-secondary, #6B6B6B);
}

/* ============ Thinking Block ============ */
.oc-thinking-block {
  background: linear-gradient(135deg, rgba(8, 145, 178, 0.05) 0%, rgba(8, 145, 178, 0.02) 100%);
  border: 1px solid rgba(8, 145, 178, 0.15);
  border-radius: var(--oc-radius-lg);
  overflow: hidden;
  margin: 12px 0;
}

.oc-thinking-block__header {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
}

.oc-thinking-block__indicator {
  display: flex;
  gap: 3px;
}

.oc-thinking-block__dot {
  width: 6px;
  height: 6px;
  background: var(--oc-accent);
  border-radius: 50%;
  animation: oc-thinking-pulse 1.5s ease infinite;
}

.oc-thinking-block__dot:nth-child(2) { animation-delay: 0.3s; }
.oc-thinking-block__dot:nth-child(3) { animation-delay: 0.6s; }

@keyframes oc-thinking-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.oc-thinking-block--expanded .oc-thinking-block__dot {
  animation: none;
  opacity: 0.5;
}

.oc-thinking-block__title {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-accent);
}

.oc-thinking-block__chevron {
  color: var(--oc-fg-tertiary, #9B9B9B);
  transition: transform 0.2s ease;
}

.oc-thinking-block--expanded .oc-thinking-block__chevron {
  transform: rotate(180deg);
}

.oc-thinking-block__content {
  padding: 0 16px 16px;
  font-size: 13px;
  color: var(--oc-fg-secondary);
  line-height: 1.6;
  border-top: 1px solid rgba(8, 145, 178, 0.1);
  margin-top: 0;
  padding-top: 12px;
}

/* ============ Task Card ============ */
.oc-task-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  background: var(--oc-bg-surface);
  border-radius: var(--oc-radius-md);
  border-left: 3px solid var(--oc-border-default);
}

.oc-task-card--running {
  border-left-color: var(--oc-accent);
  background: linear-gradient(90deg, rgba(8, 145, 178, 0.05) 0%, var(--oc-bg-surface) 100%);
}

.oc-task-card--completed {
  border-left-color: var(--oc-success, #10B981);
}

.oc-task-card--error {
  border-left-color: var(--oc-error, #EF4444);
}

.oc-task-card__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-task-card--pending .oc-task-card__icon { color: var(--oc-fg-tertiary); }
.oc-task-card--running .oc-task-card__icon { color: var(--oc-accent); }
.oc-task-card--completed .oc-task-card__icon { color: var(--oc-success); }
.oc-task-card--error .oc-task-card__icon { color: var(--oc-error); }

.oc-task-card__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(8, 145, 178, 0.2);
  border-top-color: var(--oc-accent);
  border-radius: 50%;
  animation: oc-spin 0.8s linear infinite;
}

@keyframes oc-spin {
  to { transform: rotate(360deg); }
}

.oc-task-card__content {
  flex: 1;
  min-width: 0;
}

.oc-task-card__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--oc-fg-primary);
}

.oc-task-card__desc {
  font-size: 13px;
  color: var(--oc-fg-secondary);
  margin-top: 2px;
}

.oc-task-card__progress {
  margin-top: 8px;
  height: 4px;
  background: var(--oc-border-default);
  border-radius: 2px;
  overflow: hidden;
}

.oc-task-card__progress-bar {
  height: 100%;
  width: var(--progress, 0%);
  background: var(--oc-accent);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* ============ Message Actions ============ */
.oc-message-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.oc-action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: var(--oc-radius-md);
  background: transparent;
  color: var(--oc-fg-tertiary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-action-button:hover {
  background: var(--oc-bg-surface);
  color: var(--oc-fg-secondary);
}

.oc-action-button--active {
  color: var(--oc-accent);
}

.oc-action-button--active:hover {
  color: var(--oc-accent);
  background: rgba(8, 145, 178, 0.1);
}

/* ============ Chat Input ============ */
.oc-chat-input {
  flex-shrink: 0;
  padding: 16px 24px 24px;
  background: var(--oc-bg-canvas);
  border-top: 1px solid var(--oc-border-default);
}

.oc-chat-input__suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.oc-chat-input__container {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 12px 16px;
  background: var(--oc-bg-surface);
  border-radius: 24px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.oc-chat-input__container:focus-within {
  background: var(--oc-bg-canvas);
  border-color: var(--oc-accent);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
}

.oc-chat-input__left,
.oc-chat-input__right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.oc-chat-input__textarea {
  flex: 1;
  min-height: 24px;
  max-height: 200px;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.5;
  color: var(--oc-fg-primary);
  resize: none;
  outline: none;
}

.oc-chat-input__textarea::placeholder {
  color: var(--oc-fg-tertiary);
}

.oc-chat-input__send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--oc-accent);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(8, 145, 178, 0.3);
}

.oc-chat-input__send:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(8, 145, 178, 0.4);
}

.oc-chat-input__send:disabled {
  background: var(--oc-border-default);
  color: var(--oc-fg-tertiary);
  box-shadow: none;
  cursor: not-allowed;
}

.oc-chat-input__spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: oc-spin 0.8s linear infinite;
}

/* Loading state */
.oc-chat-input--loading .oc-chat-input__container {
  opacity: 0.7;
}
`;
