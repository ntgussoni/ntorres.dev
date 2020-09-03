import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rangeParser from "parse-numeric-range";

const colors = {
  green: "#8CC570",
  purple: "#D373E3",
  red: "#F16372",
  gray: "#A9B2C0",
  darkGray: "#5A6371",
  yellow: "#DB975C",
  brightYellow: "#ECBE70",
  blue: "#40B1F5",
  cyan: "#19B9C4",
  orange: "#DB975C",
};

const theme = {
  'code[class*="language-"]': {
    color: colors.gray,
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: colors.gray,
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    background: "#282c34",
  },
  ':not(pre) > code[class*="language-"]': {
    background: "#282c34",
    padding: ".1em",
    borderRadius: ".3em",
  },
  comment: {
    color: colors.darkGray,
    fontStyle: "italic",
  },
  prolog: {
    color: colors.darkGray,
  },
  doctype: {
    color: colors.darkGray,
  },
  cdata: {
    color: colors.darkGray,
  },
  punctuation: {
    color: colors.gray,
  },
  block: {
    display: "inline", // needed to ovverride tailwind's block class
  },
  ".namespace": {
    Opacity: ".7",
  },
  "property-access": {
    color: colors.blue,
  },
  property: {
    color: colors.red,
  },
  keyword: {
    color: colors.purple,
  },
  tag: {
    color: colors.red,
  },
  "maybe-class-name": {
    color: colors.red,
  },
  "class-name": {
    color: colors.brightYellow,
  },
  boolean: {
    color: colors.orange,
  },
  constant: {
    color: colors.orange,
  },
  symbol: {
    color: "#f92672",
  },
  deleted: {
    color: "#f92672",
  },
  number: {
    color: colors.yellow,
  },
  selector: {
    color: colors.green,
  },
  "attr-name": {
    color: colors.green,
  },
  string: {
    color: colors.green,
  },
  char: {
    color: colors.green,
  },
  builtin: {
    color: colors.green,
  },
  inserted: {
    color: colors.green,
  },
  variable: {
    color: colors.red,
  },
  operator: {
    color: colors.cyan,
  },
  entity: {
    color: colors.brightYellow,
    cursor: "help",
  },
  url: {
    color: colors.red,
  },
  ".language-css .token.string": {
    color: "#87C38A",
  },
  ".style .token.string": {
    color: "#87C38A",
  },
  atrule: {
    color: colors.brightYellow,
  },
  "attr-value": {
    color: colors.brightYellow,
  },
  function: {
    color: colors.blue,
  },
  regex: {
    color: "#E9C062",
  },
  important: {
    color: "#fd971f",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
};

export const CodeBlock = ({ language = "", value }) => {
  const parsedLang = language.match("(.*)({.*})");
  if (language && parsedLang) {
    language = parsedLang[1];
  }
  let highlightedLines = null;
  const parsedHighlight = parsedLang && parsedLang[2].match("{(.*)}");
  if (parsedHighlight) {
    highlightedLines = parsedHighlight[1];
  }

  const range = highlightedLines ? rangeParser(highlightedLines) : [];

  // Filter out any empty lines at end
  let reversedLines = value.split("\n").reverse();
  let firstNonEmptyIndex = reversedLines.findIndex((line) => line !== "");
  let lines = reversedLines
    .filter((line, index) => index >= firstNonEmptyIndex)
    .reverse();

  return (
    <SyntaxHighlighter
      style={theme}
      language={language}
      className={`language language-${language} subpixel-antialiased leading-relaxed md:text-sm px-6 py-4 mb-8 overflow-auto scrolling-touch`}
      wrapLines={true}
      showLineNumbers={true}
      showInlineLineNumbers={true}
      lineProps={(lineNumber) => {
        let props = {};
        if (range.includes(lineNumber)) {
          props.className = "block px-5 -mx-5 bg-green-500";
          props.style = {
            background: "#343b46",
          };
        }
        return props;
      }}
    >
      {lines.join("\n")}
    </SyntaxHighlighter>
  );
};
