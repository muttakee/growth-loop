import { continueRender, delayRender } from "remotion";
import hind400 from "@fontsource/hind-siliguri/files/hind-siliguri-bengali-400-normal.woff2";
import hind600 from "@fontsource/hind-siliguri/files/hind-siliguri-bengali-600-normal.woff2";
import hind700 from "@fontsource/hind-siliguri/files/hind-siliguri-bengali-700-normal.woff2";
import hindL400 from "@fontsource/hind-siliguri/files/hind-siliguri-latin-400-normal.woff2";
import hindL700 from "@fontsource/hind-siliguri/files/hind-siliguri-latin-700-normal.woff2";
import pjs400 from "@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff2";
import pjs700 from "@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2";
import pjs800 from "@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2";

// Font files available to the renderer. A brand's theme.json picks families by name;
// to support a new family, install its @fontsource package and add it here.
const REGISTRY: Record<string, { weight: string; url: string }[]> = {
  "Hind Siliguri": [
    { weight: "400", url: hind400 },
    { weight: "600", url: hind600 },
    { weight: "700", url: hind700 },
    { weight: "400", url: hindL400 },
    { weight: "700", url: hindL700 },
  ],
  "Plus Jakarta Sans": [
    { weight: "400", url: pjs400 },
    { weight: "700", url: pjs700 },
    { weight: "800", url: pjs800 },
  ],
};

const loaded = new Set<string>();

export const loadFonts = (families: string[]) => {
  const todo = families.filter((f) => !loaded.has(f));
  if (todo.length === 0) return;
  const handle = delayRender("fonts");
  const faces = todo.flatMap((family) => {
    loaded.add(family);
    const files = REGISTRY[family];
    if (!files) throw new Error(`Font "${family}" is not in studio/src/fonts.ts`);
    return files.map((f) => new FontFace(family, `url(${f.url})`, { weight: f.weight }));
  });
  Promise.all(faces.map((f) => f.load()))
    .then((ok) => {
      ok.forEach((f) => document.fonts.add(f));
      continueRender(handle);
    })
    .catch((e) => {
      throw e;
    });
};

// Latin family first: it has no Bengali glyphs, so Bangla falls through to the main family.
export const fontStack = (latin: string, main: string) => `'${latin}', '${main}', sans-serif`;
