import { log } from "node:console";

function isWordChar(char: string): boolean {
  const regex = new RegExp("[a-z]", "i");
  return regex.test(char);
}

function generateUrlRegex(url: string): RegExp {
  const urlLength = url.length;

  let urlRegex = "";
  for (let i = 0; i < urlLength; i++) {
    const char = url[i];
    let namedRegex = "";
    if (char === ":") {
      let j = i + 1;
      while (isWordChar(url[j]) && j < urlLength) {
        namedRegex += url[j];
        j++;
      }
      urlRegex += `(?<${namedRegex}>\\w+)`;
      i = j - 1;
    } else {
      urlRegex += char;
    }
  }

  log(urlRegex);
  return new RegExp(urlRegex);
}

export function parseUrl(urlRegex: string, url: string): { [key: string]: string; } | undefined {
  const match = generateUrlRegex(urlRegex).exec(url);
  return match?.groups;
}