export interface FieldOption {
  value: string;
  label?: string;
}

const MAX_MATCHES = 50;

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/** Options containing every word of the query in their value or label, keeping the given order. */
export function filterOptions(options: FieldOption[], query: string, limit = MAX_MATCHES): FieldOption[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const matches = words.length
    ? options.filter((o) => {
        const text = normalize(`${o.value} ${o.label ?? ""}`);
        return words.every((w) => text.includes(w));
      })
    : options;
  return matches.slice(0, limit);
}
