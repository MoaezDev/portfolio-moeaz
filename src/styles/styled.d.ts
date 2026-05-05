/**
 * Augments styled-components' DefaultTheme with the project's theme shape
 * so every styled-component gets typed access to tokens via `theme`.
 */
import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}
