import { defineConfig } from '@twind/core';
import presetAutoPrefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';
export default defineConfig({
  presets: [presetAutoPrefix(), presetTailwind()],
});
