export const scrollAreaStyles = `
/* ScrollArea Component */
.oc-scroll-area {
  position: relative;
  overflow: hidden;
}

/* Scroll behavior */
.oc-scroll-area--vertical {
  overflow-y: auto;
}

.oc-scroll-area--horizontal {
  overflow-x: auto;
}

.oc-scroll-area--vertical.oc-scroll-area--horizontal {
  overflow: auto;
}

/* Type variants */
.oc-scroll-area--auto {
  overflow-y: auto;
}

.oc-scroll-area--always {
  overflow-y: scroll;
}

.oc-scroll-area--scroll {
  overflow-y: scroll;
}

.oc-scroll-area--hover {
  overflow-y: hidden;
}

.oc-scroll-area--hover:hover {
  overflow-y: auto;
}

/* Custom styled scrollbars */
.oc-scroll-area--styled {
  scrollbar-width: thin;
  scrollbar-color: var(--oc-border-strong, #CCCCCC) transparent;
}

.oc-scroll-area--styled::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.oc-scroll-area--styled::-webkit-scrollbar-track {
  background: transparent;
}

.oc-scroll-area--styled::-webkit-scrollbar-thumb {
  background: var(--oc-border-strong, #CCCCCC);
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.oc-scroll-area--styled::-webkit-scrollbar-thumb:hover {
  background: var(--oc-fg-tertiary, #9B9B9B);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.oc-scroll-area--styled::-webkit-scrollbar-corner {
  background: transparent;
}

/* Thin scrollbar variant */
.oc-scroll-area--thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Dark mode scrollbar */
.oc-scroll-area--dark {
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.oc-scroll-area--dark::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
}

.oc-scroll-area--dark::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
`;
