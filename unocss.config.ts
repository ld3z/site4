import { defineConfig, presetUno, presetAttributify, presetIcons } from "unocss";

export default defineConfig({
  content: {
    filesystem: [".vitepress/config.mts"],
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
      warn: true,
    }),
  ],
});
