function waitForElement(selector, all = false) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(all ? document.querySelectorAll(selector) : document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(all ? document.querySelectorAll(selector) : document.querySelector(selector));
      }
    });

    startObserving(observer);
  });
}

function waitForNoElement(selector) {
  return new Promise(resolve => {
    if (!document.querySelector(selector)) {
      return resolve();
    }

    const observer = new MutationObserver(mutations => {
      if (!document.querySelector(selector)) {
        observer.disconnect();
        resolve();
      }
    });

    startObserving(observer);
  });
}

function startObserving(observer) {
  // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
