import { css, SerializedStyles } from '@emotion/react';

const breakpoints = {
  small: 600,
  medium: 768,
  large: 1024,
  xlarge: 1200,
};

const media = Object.keys(breakpoints).reduce(
  (acc, label) => {
    acc[label as keyof typeof breakpoints] = {
      up: (...args: [TemplateStringsArray, ...any[]]) => css`
        @media (min-width: ${breakpoints[
            label as keyof typeof breakpoints
          ]}px) {
          ${css(...args)}
        }
      `,
      down: (...args: [TemplateStringsArray, ...any[]]) => css`
        @media (max-width: ${breakpoints[label as keyof typeof breakpoints] -
          1}px) {
          ${css(...args)}
        }
      `,
    };
    return acc;
  },
  {} as Record<
    keyof typeof breakpoints,
    {
      /* eslint-disable no-unused-vars */
      up: (style: TemplateStringsArray, ...args: any[]) => SerializedStyles;
      down: (style: TemplateStringsArray, ...args: any[]) => SerializedStyles;
    }
  >,
);

export default media;
