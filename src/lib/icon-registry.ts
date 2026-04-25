// Explicit named imports — only the icons referenced in stacks/portfolio data.
// Do NOT replace with "import * as SiIcons" — that loads ~3,000 unused SVGs.
import React from "react";
import {
  SiPython, SiJavascript, SiTypescript, SiGo, SiPhp,
  SiRust, SiRuby, SiSwift, SiDart, SiScala, SiElixir, SiHaskell,
  SiReact, SiVuedotjs, SiNextdotjs, SiNuxt, SiAngular, SiSvelte, SiAstro,
  SiSolid, SiVite, SiTailwindcss, SiBootstrap, SiSass, SiRedux, SiThreedotjs,
  SiWebassembly, SiWebpack, SiFramer, SiGreensock, SiElectron, SiStorybook,
  SiNodedotjs, SiLaravel, SiNestjs, SiDjango, SiFastapi, SiFlask, SiSpring,
  SiExpress, SiRubyonrails, SiPostman, SiGraphql,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiFirebase, SiSupabase,
  SiMariadb, SiApachecassandra, SiSqlite, SiElasticsearch,
  SiFlutter, SiIonic, SiExpo, SiKotlin,
  SiDocker, SiKubernetes, SiTerraform, SiGooglecloud, SiNginx, SiApachekafka,
  SiGit, SiJenkins, SiAnsible, SiGithubactions, SiPrometheus, SiGrafana,
  SiLinux, SiVercel, SiNetlify, SiHeroku, SiCloudflare, SiStripe,
  SiUnity, SiUnrealengine, SiGodotengine, SiBlender, SiOpengl, SiVulkan, SiSteam,
  SiSketch, SiCanva,
} from "react-icons/si";
import { FaJava, FaAws, FaDatabase } from "react-icons/fa";

export type IconComp = React.FC<{ style?: React.CSSProperties; className?: string }>;

// Inline SVG components for icons not available in react-icons — sourced from devicon
const makeSvg = (body: string): IconComp =>
  ({ style, className }) =>
    React.createElement("svg", {
      viewBox: "0 0 128 128",
      width: "1em",
      height: "1em",
      style,
      className,
      dangerouslySetInnerHTML: { __html: body },
    });

const DeviconCsharp = makeSvg(
  '<path fill="#9b4f96" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7s-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7"/><path fill="#68217a" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7s2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8z"/><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20c-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8z"/>'
);

const DeviconIllustrator = makeSvg(
  '<path fill="#300" d="M22.7 1.6h82.7c12.5 0 22.7 10.1 22.7 22.7v79.5c0 12.5-10.1 22.7-22.7 22.7H22.7C10.1 126.4 0 116.3 0 103.7V24.3C0 11.7 10.1 1.6 22.7 1.6"/><path fill="#ff9a00" d="M61.9 76.3H42l-4 12.5c-.1.5-.5.8-1 .7H27c-.6 0-.7-.3-.6-1l17.2-49.4c.2-.5.3-1.1.5-1.8c.2-1.1.3-2.3.3-3.5c-.1-.3.2-.5.4-.6h13.8c.4 0 .6.2.7.4l19.5 54.9c.2.6 0 .9-.5.9H67.1c-.4.1-.7-.2-.9-.6zM45.1 65.4h13.5c-.3-1.1-.7-2.5-1.2-3.8c-.5-1.4-1-3-1.4-4.6c-.5-1.7-1-3.3-1.5-4.9c-.5-1.7-1-3.2-1.4-4.7q-.6-2.25-1.2-4.2h-.1q-.75 3.45-1.8 6.9c-.8 2.6-1.6 5.2-2.5 7.9c-.8 2.7-1.6 5.2-2.4 7.4m45.6-22.7c-1.8.1-3.5-.6-4.7-1.9s-1.9-3.1-1.8-4.9c-.1-1.8.6-3.5 1.9-4.7s3-1.9 4.7-1.9c2.1 0 3.7.6 4.9 1.9s1.8 3 1.8 4.7c.1 1.8-.6 3.6-1.9 4.9s-3.1 2-4.9 1.9m-6 46.3V47.9c0-.5.2-.7.7-.7H96c.5 0 .7.3.7.7V89c0 .6-.2.9-.7.9H85.5c-.5-.1-.8-.4-.8-.9"/>'
);

const DeviconC = makeSvg(
  '<path fill="#a9bacd" d="M125 50c-4-32-24-50-62-50C29 0 3 24 3 64c0 39 24 64 64 64c32 0 55-19 58-50H87c-2 11-8 20-20 20c-21 0-24-16-24-33c0-23 8-35 22-35c13 0 20 7 22 20z"/>'
);

const DeviconCplusplus = makeSvg(
  '<path fill="#00599c" d="M118.766 95.82c.89-1.543 1.441-3.28 1.441-4.843V36.78c0-1.558-.55-3.297-1.441-4.84l-55.32 31.94Zm0 0"/><path fill="#004482" d="m68.36 126.586l46.933-27.094c1.352-.781 2.582-2.129 3.473-3.672l-55.32-31.94L8.12 95.82c.89 1.543 2.121 2.89 3.473 3.672l46.933 27.094c2.703 1.562 7.13 1.562 9.832 0Zm0 0"/><path fill="#659ad2" d="M118.766 31.941c-.891-1.546-2.121-2.894-3.473-3.671L68.359 1.172c-2.703-1.563-7.129-1.563-9.832 0L11.594 28.27C8.89 29.828 6.68 33.66 6.68 36.78v54.196c0 1.562.55 3.3 1.441 4.843L63.445 63.88Zm0 0"/><path fill="#fff" d="M63.445 26.035c-20.867 0-37.843 16.977-37.843 37.844s16.976 37.844 37.843 37.844c13.465 0 26.024-7.247 32.77-18.91L79.84 73.335c-3.38 5.84-9.66 9.465-16.395 9.465c-10.433 0-18.922-8.488-18.922-18.922s8.49-18.922 18.922-18.922c6.73 0 13.017 3.629 16.39 9.465l16.38-9.477c-6.75-11.664-19.305-18.91-32.77-18.91zM92.88 57.57v4.207h-4.207v4.203h4.207v4.207h4.203V65.98h4.203v-4.203h-4.203V57.57zm15.766 0v4.207h-4.204v4.203h4.204v4.207h4.207V65.98h4.203v-4.203h-4.203V57.57z"/>'
);

const DeviconFigma = makeSvg(
  '<path fill="#0acf83" d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129m0 0"/><path fill="#a259ff" d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5m0 0"/><path fill="#f24e1e" d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5m0 0"/><path fill="#ff7262" d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0"/><path fill="#1abcfe" d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5S76.6 43 88.5 43S110 52.6 110 64.5m0 0"/>'
);

export const iconRegistry: Record<string, IconComp> = {
  // Languages
  SiPython, SiJavascript, SiTypescript, SiGo, SiPhp,
  SiRust, SiRuby, SiSwift, SiDart, SiScala, SiElixir, SiHaskell,
  FaJava, FaAws, FaDatabase,
  DeviconCsharp, DeviconC, DeviconCplusplus,
  // Frontend
  SiReact, SiVuedotjs, SiNextdotjs, SiNuxt, SiAngular, SiSvelte, SiAstro,
  SiSolid, SiVite, SiTailwindcss, SiBootstrap, SiSass, SiRedux, SiThreedotjs,
  SiWebassembly, SiWebpack, SiFramer, SiGreensock, SiElectron, SiStorybook,
  // Backend
  SiNodedotjs, SiLaravel, SiNestjs, SiDjango, SiFastapi, SiFlask, SiSpring,
  SiExpress, SiRubyonrails, SiPostman, SiGraphql,
  // Databases
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiFirebase, SiSupabase,
  SiMariadb, SiApachecassandra, SiSqlite, SiElasticsearch,
  // Mobile
  SiFlutter, SiIonic, SiExpo, SiKotlin,
  // DevOps
  SiDocker, SiKubernetes, SiTerraform, SiGooglecloud, SiNginx, SiApachekafka,
  SiGit, SiJenkins, SiAnsible, SiGithubactions, SiPrometheus, SiGrafana,
  SiLinux, SiVercel, SiNetlify, SiHeroku, SiCloudflare, SiStripe,
  // Game Dev
  SiUnity, SiUnrealengine, SiGodotengine, SiBlender, SiOpengl, SiVulkan, SiSteam,
  // Design
  DeviconFigma, DeviconIllustrator, SiSketch, SiCanva,
};
