/// <reference types="vite/client" />
declare type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  const content: SVGIcon;
  export default content;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Cypress?: { env: (key: string) => string };
  }
}
