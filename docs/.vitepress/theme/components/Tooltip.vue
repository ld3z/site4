<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import { tooltips, type TooltipEntry } from '../tooltips'; // Path relative to Tooltip.vue

const props = withDefaults(
  defineProps<{
    tooltipKey: string; // Key to find content in tooltips.ts
    title?: string;      // Optional: overrides title from tooltips.ts
    icon?: string;
  }>(),
  {
    icon: "i-ri-information-2-line",
  },
);

const md = new MarkdownIt();

// Computed property to get the tooltip data from tooltips.ts
const tooltipData = computed<TooltipEntry | undefined>(() => {
  return tooltips[props.tooltipKey];
});

// Computed property for the tooltip title
const tooltipTitle = computed<string>(() => {
  if (props.title) {
    return props.title; // User-provided title via prop takes precedence
  }
  if (tooltipData.value) {
    return 'Info'; // Default to 'Info' if key is valid and no prop.title is set
  }
  return 'Tooltip Error'; // Fallback title if key not found
});

// Computed property for the HTML content of the tooltip
const tooltipHtmlContent = computed<string>(() => {
  if (tooltipData.value) {
    return md.render(tooltipData.value.content); // Render Markdown content
  }
  // Fallback HTML if key not found
  return '<p>Tooltip content not found for key: <code>' + props.tooltipKey + '</code></p>';
});
</script>

<template>
  <VTooltip theme="info-tooltip">
    <button
      class="w-7 h-7 rounded-full bg-$vp-c-brand-soft hover:bg-$vp-c-brand-soft/40 text-primary border-$vp-c-brand-soft hover:border-primary select-none rounded border-2 border-solid font-bold transition-all duration-300">
      <div :class="icon" />
    </button>

    <template #popper>
      <div class="p-4 max-w-lg border-$vp-c-divider bg-$vp-c-bg-alt b-rd-4 border-2 border-solid">
        <h3 class="text-lg font-semibold text-$vp-c-text-1 mb-2" v-text="tooltipTitle" />
        <div v-if="tooltipHtmlContent" class="tooltip-markdown-content text-sm text-$vp-c-text-2 prose" v-html="tooltipHtmlContent"></div>
        <div v-else class="tooltip-markdown-content text-sm text-$vp-c-text-2 prose">
          <slot></slot>
        </div>
      </div>
    </template>
  </VTooltip>
</template>

<style>
.tooltip-markdown-content ul {
  list-style-type: disc !important;
  padding-left: 15px !important; /* Adjust this value as needed for desired indentation */
}

.tooltip-markdown-content ol {
  list-style-type: decimal !important;
  padding-left: 15px !important; /* Adjust this value as needed */
}

.tooltip-markdown-content li {
  display: list-item !important;
}

.v-popper__popper {
  --uno: z-10;
}

.tooltip-markdown-content a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.tooltip-markdown-content a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: none;
}

.v-popper {
  display: inline-flex !important;
}
</style>
