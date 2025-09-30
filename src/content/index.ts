import '../styles/routeros-dark.scss';
import {injectTheme} from './injectTheme';
import {createTitleObserver} from './titleObserver';

const ensureThemeInjected = () => {
    try {
        injectTheme();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[RouterOS Dark Mode] Failed to inject theme', err);
    }
};

const boot = () => {
    ensureThemeInjected();

    const observer = createTitleObserver({
        onTitleMatch: ensureThemeInjected,
        matchPattern: /(routeros|mikrotik)/i
    });

    observer.start();

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            ensureThemeInjected();
        }
    });
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    boot();
} else {
    document.addEventListener('DOMContentLoaded', boot, {once: true});
}