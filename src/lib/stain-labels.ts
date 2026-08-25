export const STAIN_IDS = [
  "woodBackground",
  "amerBlackWalnut",
  "amerWhiteAsh",
  "zebrano",
  "redOak",
  "americanCherry",
] as const;

export type StainId = (typeof STAIN_IDS)[number];

export const STAIN_LABELS: Record<StainId, string> = {
  woodBackground: "Natural wood",
  amerBlackWalnut: "American Black Walnut",
  amerWhiteAsh: "American White Ash",
  zebrano: "Zebrano",
  redOak: "Red Oak",
  americanCherry: "American Cherry",
};

export function getStainLabel(stain: string): string {
  return STAIN_LABELS[stain as StainId] ?? stain;
}
