import type { StrapiApp } from "@strapi/strapi/admin";

const STYLE_ID = "logo-script-inline-collapsed-style";
const FIELD_CLASS = "logo-script-inline-field";
const EXPANDED_CLASS = `${FIELD_CLASS}--expanded`;
const TOGGLE_CLASS = `${FIELD_CLASS}__toggle`;

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .${FIELD_CLASS} .monaco-editor,
    .${FIELD_CLASS} .monaco-editor .overflow-guard {
      height: 64px !important;
      min-height: 64px !important;
    }
    .${FIELD_CLASS}.${EXPANDED_CLASS} .monaco-editor,
    .${FIELD_CLASS}.${EXPANDED_CLASS} .monaco-editor .overflow-guard {
      height: 30vh !important;
      min-height: 30vh !important;
    }
    .${TOGGLE_CLASS} {
      margin-left: 8px;
      padding: 2px 8px;
      font-size: 12px;
      border-radius: 6px;
      border: 1px solid #3d3d4d;
      background: #1f1f2b;
      color: #d7d7e0;
      cursor: pointer;
    }
    .${TOGGLE_CLASS}:hover {
      background: #2a2a3a;
    }
    .${TOGGLE_CLASS}[aria-expanded="true"]::after {
      content: " Свернуть";
    }
    .${TOGGLE_CLASS}[aria-expanded="false"]::after {
      content: " Развернуть";
    }
  `;
  document.head.appendChild(style);
}

function findFieldRoot(label: HTMLLabelElement | null): HTMLElement | null {
  if (!label) return null;
  let el: HTMLElement | null = label.parentElement;
  while (el && !el.querySelector(".monaco-editor")) {
    el = el.parentElement;
  }
  return el;
}

function setupCollapsibleEditor() {
  const label = document.querySelector('label[for="logoScript"]') as HTMLLabelElement | null;
  const root = findFieldRoot(label);
  if (!root || root.classList.contains(FIELD_CLASS)) return;

  root.classList.add(FIELD_CLASS);
  if (label && !label.querySelector(`.${TOGGLE_CLASS}`)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = TOGGLE_CLASS;
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
      const isExpanded = root.classList.toggle(EXPANDED_CLASS);
      btn.setAttribute("aria-expanded", String(isExpanded));
    });
    label.appendChild(btn);
  }
}

export default {
  config: {
    locales: ["ru"],
  },
  bootstrap(app: StrapiApp) {
    void app;
    injectStyles();
    setupCollapsibleEditor();

    const observer = new MutationObserver(() => {
      setupCollapsibleEditor();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },
};
