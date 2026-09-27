import type { Translator } from "../i18n/translations.js";
import type { NodeVisualState } from "../utils/entity.js";
import { addonLabel } from "./devices/addon-badges.js";
import type { ResolvedAddon } from "./devices/common.js";

/** Text for screen readers, e.g. `Heat pump: Heating, running; Defrost: Off`. */
export function nodeDescription(
  name: string,
  state: NodeVisualState,
  hasEntity: boolean,
  addons: ResolvedAddon[],
  t: Translator
): string {
  let main = name;
  if (hasEntity) {
    const details = [state.value, state.active ? t.t("a11y.active") : undefined].filter(Boolean);
    if (details.length) main += `: ${details.join(", ")}`;
  }
  const parts = addons
    .filter((a) => a.config.entity_id)
    .map((a) => `${addonLabel(a, t)}: ${a.state.value ?? "—"}`);
  return [main, ...parts].join("; ");
}
