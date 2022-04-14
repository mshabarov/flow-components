import * as Gestures from "@vaadin/component-base/src/gestures.js";

(function() {
  function tryCatchWrapper(callback) {
    return window.Vaadin.Flow.tryCatchWrapper(callback, 'Vaadin Context Menu Target');
  }

  window.Vaadin.Flow.contextMenuTargetConnector = {
    // NOTE: This is for the TARGET component, not for the <vaadin-context-menu> itself
    init: tryCatchWrapper((target) => {
      if (target.$contextMenuTargetConnector) {
        return;
      }

      target.$contextMenuTargetConnector = {
        openOnHandler: tryCatchWrapper(function(e) {
          e.preventDefault();
          e.stopPropagation();
          this.$contextMenuTargetConnector.openEvent = e;
          let detail = {};
          if (target.getContextMenuBeforeOpenDetail) {
            detail = target.getContextMenuBeforeOpenDetail(e);
          }
          target.dispatchEvent(
            new CustomEvent("vaadin-context-menu-before-open", {
              detail: detail
            })
          );
        }),

        updateOpenOn: tryCatchWrapper(function(eventType) {
          this.removeListener();
          this.openOnEventType = eventType;

          customElements.whenDefined("vaadin-context-menu").then(
            tryCatchWrapper(() => {
              if (Gestures.gestures[eventType]) {
                Gestures.addListener(target, eventType, this.openOnHandler);
              } else {
                target.addEventListener(eventType, this.openOnHandler);
              }
            })
          );
        }),

        removeListener: tryCatchWrapper(function() {
          if (this.openOnEventType) {
            if (Gestures.gestures[this.openOnEventType]) {
              Gestures.removeListener(
                target,
                this.openOnEventType,
                this.openOnHandler
              );
            } else {
              target.removeEventListener(
                this.openOnEventType,
                this.openOnHandler
              );
            }
          }
        }),

        openMenu: tryCatchWrapper(function(contextMenu) {
          contextMenu.open(this.openEvent);
        }),

        removeConnector: tryCatchWrapper(function() {
          this.removeListener();
          target.$contextMenuTargetConnector = undefined;
        })
      };
    })
  }
})();