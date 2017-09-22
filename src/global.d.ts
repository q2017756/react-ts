interface NodeRequire {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name: any) => void;
}
declare var require: NodeRequire;

interface Window {
  __INITIAL_STATE__: any
}

declare var window: Window;

declare function unescape(s: string): string;
declare module 'iscroll';
