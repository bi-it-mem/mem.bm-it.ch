/*!
 * Manual Reload Redirect
 * - Öffnet bei *manuellem* Reload immer ein neues Tab/Fenster.
 * - Die aktuelle Seite bleibt offen.
 */

(function () {
  "use strict";

  /*** === Konfiguration === ***/
  const TARGETS = [
    "index2_Home.html"
  ];

  const AUTO_RELOAD_FLAG = "autoReloadFlag";

  /*** === Hilfsfunktionen === ***/
  function pickTarget(targets) {
    if (!targets || targets.length === 0) return null;
    const here = new URL(location.href);
    const pool = targets
      .map((u) => new URL(u, location.origin).href)
      .filter((href) => href !== here.href);
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function openTarget(href) {
    if (!href) return;
    // immer neuer Tab, ohne Fallback
    setTimeout(() => window.open(href, "_blank"), 50);
  }

  function isReloadNavigation() {
    const navEntries = performance.getEntriesByType?.("navigation");
    const nav = navEntries && navEntries[0];
    if (nav && typeof nav.type === "string") {
      return nav.type === "reload";
    }
    // Fallback für sehr alte Browser
    return !!(performance.navigation && performance.navigation.type === 1);
  }

  /*** === Hauptlogik === ***/
  try {
    if (isReloadNavigation()) {
      const auto = sessionStorage.getItem(AUTO_RELOAD_FLAG);
      if (auto) {
        sessionStorage.removeItem(AUTO_RELOAD_FLAG);
      } else {
        const target = pickTarget(TARGETS);
        openTarget(target);
      }
    }
  } catch (err) {
    console.error("[manual-reload-redirect] Fehler:", err);
  }

  /*** === Helper-API === ***/
  window.triggerAutoReload = function triggerAutoReload() {
    try {
      sessionStorage.setItem(AUTO_RELOAD_FLAG, "1");
      location.reload();
    } catch (err) {
      console.error("[manual-reload-redirect] triggerAutoReload Fehler:", err);
      location.reload();
    }
  };
})();
