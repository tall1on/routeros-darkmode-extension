const THEME_STYLE_ID = 'routeros-dark-mode-stylesheet';

type RuntimeResolver = {
    runtime?: {
        getURL?: (path: string) => string;
    };
};

const resolveStylesheetUrl = (): string => {
    const chromeApi = (globalThis as typeof globalThis & { chrome?: RuntimeResolver }).chrome;
    const runtimeGetUrl = chromeApi?.runtime?.getURL;

    if (typeof runtimeGetUrl === 'function') {
        return runtimeGetUrl('content/css/routeros-dark.css');
    }

    // Fallback for local development or unsupported environments.
    return '/content/css/routeros-dark.css';
};

export const injectTheme = (): HTMLLinkElement | null => {
    if (!document.head) {
        return null;
    }

    const existing = document.getElementById(THEME_STYLE_ID) as HTMLLinkElement | null;
    if (existing) {
        return existing;
    }

    const link = document.createElement('link');
    link.id = THEME_STYLE_ID;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = resolveStylesheetUrl();

    console.log(resolveStylesheetUrl());

    document.head.appendChild(link);
    return link;
};