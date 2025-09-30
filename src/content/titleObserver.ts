export interface TitleObserverOptions {
  matchPattern: RegExp;
  onTitleMatch: () => void;
}

export interface TitleObserver {
  start: () => void;
  stop: () => void;
}

const matchesPattern = (title: string | null, pattern: RegExp): boolean => {
  if (!title) {
    return false;
  }

  return pattern.test(title);
};

export const createTitleObserver = ({ matchPattern, onTitleMatch }: TitleObserverOptions): TitleObserver => {
  let mutationObserver: MutationObserver | null = null;

  const evaluate = () => {
    if (matchesPattern(document.title, matchPattern)) {
      onTitleMatch();
    }
  };

  const start = () => {
    const titleElement = document.querySelector('title');
    if (!titleElement) {
      // RouterOS UI swaps the title element dynamically, retry on next frame.
      requestAnimationFrame(start);
      return;
    }

    mutationObserver = new MutationObserver(evaluate);
    mutationObserver.observe(titleElement, { childList: true, subtree: true });

    evaluate();
  };

  const stop = () => {
    mutationObserver?.disconnect();
    mutationObserver = null;
  };

  return {
    start,
    stop
  };
};