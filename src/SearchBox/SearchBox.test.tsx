// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { SearchBox } from './SearchBox';
import { searchBoxStyles } from './SearchBox.styles';

afterEach(() => {
  cleanup();
});

describe('SearchBox', () => {
  it('renders the icon, input and button in document order', () => {
    const { container } = render(<SearchBox placeholder="Search..." />);

    const form = container.querySelector('.oc-search-box') as HTMLElement;
    const children = Array.from(form.children);

    expect(children[0].classList.contains('oc-search-box__icon')).toBe(true);
    expect(children[1].classList.contains('oc-search-box__input')).toBe(true);
    expect(children[2].classList.contains('oc-search-box__button')).toBe(true);
  });

  it('omits the button when hideButton is set', () => {
    const { container } = render(<SearchBox hideButton />);
    expect(container.querySelector('.oc-search-box__button')).toBeNull();
  });

  // ─── Mobile layout regression (issues #27, #33) ───────────────────────────
  // On screens ≤ 480px the leading search icon must stay on the first row
  // beside the input, with only the button wrapping to a full-width second
  // row. A non-zero flex-basis on the input (e.g. `1 1 100%` or `1 1 auto`)
  // lets the input's hypothetical size push it onto its own flex line and
  // strands the icon above it. jsdom can't perform flex layout, so we assert
  // on the CSS rule that governs the wrap.
  describe('mobile layout (≤480px)', () => {
    const mobileBlock = (() => {
      const match = searchBoxStyles.match(
        /@media\s*\(max-width:\s*480px\)\s*\{([\s\S]*)\}\s*$/
      );
      expect(match, 'expected a max-width: 480px media query').not.toBeNull();
      return match![1];
    })();

    const ruleFor = (selector: string) => {
      const re = new RegExp(
        `${selector.replace(/[.]/g, '\\.')}\\s*\\{([^}]*)\\}`
      );
      const m = mobileBlock.match(re);
      expect(m, `expected a rule for ${selector}`).not.toBeNull();
      return m![1];
    };

    it('lets the input share the first row with the icon (zero flex-basis)', () => {
      const inputRule = ruleFor('.oc-search-box__input');
      const flex = inputRule.match(/flex:\s*([^;]+);/)?.[1].trim();

      // Must grow/shrink with a zero basis so it never forces its own line.
      expect(flex).toBe('1 1 0');
      // Guard against the regressions reported in #27 / #33.
      expect(flex).not.toContain('100%');
      expect(flex).not.toContain('auto');
      expect(inputRule).toMatch(/min-width:\s*0/);
    });

    it('wraps the button onto a full-width second row', () => {
      const buttonRule = ruleFor('.oc-search-box__button');
      expect(buttonRule).toMatch(/width:\s*100%/);
      expect(buttonRule).toMatch(/order:\s*2/);
    });

    it('orders the icon before the input', () => {
      expect(ruleFor('.oc-search-box__icon')).toMatch(/order:\s*0/);
      expect(ruleFor('.oc-search-box__input')).toMatch(/order:\s*1/);
    });
  });
});
