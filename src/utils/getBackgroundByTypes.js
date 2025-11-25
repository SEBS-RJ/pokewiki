import { getColorByType } from "./getColorByType";

export function getBackgroundByTypes(typeString) {
  const types = typeString.split("/");

  if (types.length === 1) {
    return getColorByType(types[0]); // color normal
  }

  // si hay 2 tipos → degradado
  const color1 = getColorByType(types[0]);
  const color2 = getColorByType(types[1]);

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}
