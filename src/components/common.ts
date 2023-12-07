export function replaceLastThreeChars(inputString: string) {
  if (inputString.length < 3) return inputString;

  const lengthWithoutLastThreeChars = inputString.length - 3;
  const truncatedString = inputString.substring(0, lengthWithoutLastThreeChars);
  const result = truncatedString + "...";

  return result;
}


export type TUnknownFnc =  (props: unknown) => unknown;