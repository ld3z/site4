import type { MarkdownRenderer } from "vitepress";
import type { IconifyJSON } from "@iconify-json/octicon";

// Icons that need to be used should be imported here
import { icons as twemoji } from "@iconify-json/twemoji";
import { icons as octicon } from "@iconify-json/octicon";
import { icons as logos } from "@iconify-json/logos";
import { icons as ic } from "@iconify-json/ic";
import { icons as mingcute } from "@iconify-json/mingcute";
import { icons as mdi } from "@iconify-json/mdi";
import { icons as materials } from "@iconify-json/material-symbols";
import { icons as simple } from "@iconify-json/simple-icons";
import { icons as gg } from "@iconify-json/gg";
import { icons as catppuchin } from "@iconify-json/catppuccin";
import { icons as carbon } from "@iconify-json/carbon";
import { icons as ri } from "@iconify-json/ri";
import { icons as lucide } from "@iconify-json/lucide";

// 1. Install emoji pack with `pnpm add -g @iconify-json/<icon>`
// 2. Import them like I did above
// 3. Add it to this emojis array, like I did for octicon, and add a prefix
const emojis: { pack: IconifyJSON; prefix?: string }[] = [
  // Default emojis (twemoji)
  { pack: twemoji },
  // octicon emojis, prefixed with "octicon-"
  { pack: octicon, prefix: "octicon-" },
  { pack: logos, prefix: "logos-" },
  { pack: ic, prefix: "ic-" },
  { pack: mingcute, prefix: "mingcute-" },
  { pack: mdi, prefix: "mdi-" },
  { pack: materials, prefix: "material-symbols-" },
  { pack: simple, prefix: "simple-icons-" },
  { pack: gg, prefix: "gg-" },
  { pack: catppuchin, prefix: "cat-" },
  { pack: carbon, prefix: "carbon-" },
  { pack: ri, prefix: "ri-" },
  { pack: lucide, prefix: "lucide-" },
];

const aliases: Record<string, string> = {
  gstar: "twemoji-glowing-star",
  git: "mdi-github",
  yt: "mdi-youtube",
  clip: "twemoji-clipboard",
  spotify: "mdi-spotify",
  x: "mdi-twitter",
  discord: "ic-outline-discord",
  red: "mdi-reddit",
  wikigg: "simple-icons-wikidotgg",
  nexus: 'simple-icons-nexusmods',
  wiki: 'simple-icons-fandom',
  wrench: "mdi-wrench-outline"
};

const defs: Record<string, string> = {};

for (const elem of emojis) {
  for (const key in elem.pack.icons) {
    if (elem.prefix) defs[elem.prefix + key] = "";
    else defs[key] = "";
  }
}

for (const [alias, fullName] of Object.entries(aliases)) {
  defs[alias] = defs[fullName] !== undefined ? "" : "INVALID_ALIAS";
}

export { defs, aliases };

export function emojiRender(md: MarkdownRenderer) {
  md.renderer.rules.emoji = (tokens, idx) => {
    const markup = tokens[idx].markup;
    if (aliases[markup]) {
      return `<span class="i-${aliases[markup]}"></span>`;
    }

    for (const emoji of emojis) {
      if (markup.startsWith(emoji.prefix!)) {
        return `<span class="i-${markup}"></span>`;
      }
    }

    return `<span class="i-twemoji-${markup}"></span>`;
  };
}

export function movePlugin(
  plugins: { name: string }[],
  pluginAName: string,
  order: "before" | "after",
  pluginBName: string
) {
  const pluginBIndex = plugins.findIndex((p) => p.name === pluginBName);
  if (pluginBIndex === -1) return;

  const pluginAIndex = plugins.findIndex((p) => p.name === pluginAName);
  if (pluginAIndex === -1) return;

  if (order === "before" && pluginAIndex > pluginBIndex) {
    const pluginA = plugins.splice(pluginAIndex, 1)[0];
    plugins.splice(pluginBIndex, 0, pluginA);
  }

  if (order === "after" && pluginAIndex < pluginBIndex) {
    const pluginA = plugins.splice(pluginAIndex, 1)[0];
    plugins.splice(pluginBIndex, 0, pluginA);
  }
}
