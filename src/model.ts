import { domains, domainIds, levels } from "./data/framework";
import type { Answers, DomainId, Level } from "./data/framework";
import { pathways } from "./data/pathways";
import type { PathwayId } from "./data/pathways";

export const STORAGE_KEY = "ai-fluency-compass:v1";
export type Screen =
  | "welcome"
  | "pathway"
  | "check"
  | "scenarios"
  | "profile"
  | "next"
  | "continuum"
  | "about";
export interface ReflectionState {
  version: 1;
  screen: Screen;
  pathway: PathwayId;
  answers: Answers;
  question: number;
  scenario: number;
  scenarioChoices: (number | null)[];
  focus: DomainId;
  exploredLevel: Level;
}
export const initialState: ReflectionState = {
  version: 1,
  screen: "welcome",
  pathway: "multilingual",
  answers: {},
  question: 0,
  scenario: 0,
  scenarioChoices: [null, null],
  focus: "pedagogy",
  exploredLevel: 1,
};
export const isComplete = (answers: Answers) =>
  domainIds.every(
    (id) =>
      Number.isInteger(answers[id]) && answers[id]! >= 1 && answers[id]! <= 6,
  );
export const nextLevel = (level: Level): Level =>
  Math.min(6, level + 1) as Level;

// Future assessment evidence belongs in a separate versioned model. Scenario choices never set levels.
export function readState(raw: string | null): ReflectionState {
  try {
    if (!raw) return { ...initialState };
    const saved = JSON.parse(raw);
    if (saved?.version !== 1) return { ...initialState };
    const answers: Answers = {};
    for (const id of domainIds)
      if (
        Number.isInteger(saved.answers?.[id]) &&
        saved.answers[id] >= 1 &&
        saved.answers[id] <= 6
      )
        answers[id] = saved.answers[id];
    const screens: Screen[] = [
      "welcome",
      "pathway",
      "check",
      "scenarios",
      "profile",
      "next",
      "continuum",
      "about",
    ];
    let screen: Screen = screens.includes(saved.screen)
      ? saved.screen
      : "welcome";
    if (
      ["profile", "next", "scenarios"].includes(screen) &&
      !isComplete(answers)
    )
      screen = "check";
    const bounded = (n: unknown, max: number) =>
      typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= max
        ? n
        : 0;
    return {
      ...initialState,
      answers,
      screen,
      pathway: pathways.some((p) => p.id === saved.pathway)
        ? saved.pathway
        : initialState.pathway,
      question: bounded(saved.question, 4),
      scenario: bounded(saved.scenario, 1),
      scenarioChoices: [0, 1].map((i) =>
        [0, 1, 2].includes(saved.scenarioChoices?.[i])
          ? saved.scenarioChoices[i]
          : null,
      ),
      focus: domainIds.includes(saved.focus) ? saved.focus : initialState.focus,
      exploredLevel: (bounded(saved.exploredLevel, 6) || 1) as Level,
    };
  } catch {
    return { ...initialState };
  }
}

export function makePrompt(state: ReflectionState) {
  const path = pathways.find((p) => p.id === state.pathway)!;
  const domain = domains.find((d) => d.id === state.focus)!;
  const level = state.answers[state.focus] ?? 1;
  return `${path.landmarks[nextLevel(level) - 1].prompt}\n\nMy professional-learning focus: ${domain.name}. ${domain.promptInstruction}\n\nUse fictional examples only. Do not request student names, records, grades, or identifiable work. I will review the output before use.`;
}

export function makeSummary(state: ReflectionState) {
  const path = pathways.find((p) => p.id === state.pathway)!;
  const focus = domains.find((d) => d.id === state.focus)!;
  const current = state.answers[state.focus] ?? 1;
  const next = nextLevel(current);
  return [
    "AI FLUENCY COMPASS",
    "Provisional self-reflection profile",
    `Teaching pathway: ${path.title}`,
    "",
    ...domains.flatMap((d) => {
      const level = state.answers[d.id] ?? 1;
      return [
        `${d.name}: Level ${level} — ${levels[level - 1].name}`,
        d.descriptors[level - 1],
        `Classroom application: ${path.applications[d.id]} ${path.landmarks[level - 1].example}`,
        `${level === 6 ? "Deepen this landmark" : "Next landmark"}: Level ${nextLevel(level)} — ${levels[nextLevel(level) - 1].name}`,
        `Try: ${d.activities[level - 1]}`,
        "",
      ];
    }),
    `MY NEXT STEP: ${focus.name}`,
    `Current: Level ${current} — ${levels[current - 1].name}`,
    `${current === 6 ? "Deepen" : "Next"}: Level ${next} — ${levels[next - 1].name}`,
    `Classroom challenge: ${path.landmarks[current - 1].next}`,
    `Practice: ${focus.activities[current - 1]}`,
    "",
    "EXAMPLE PROMPT",
    makePrompt(state),
    "",
    "REVIEW CHECKLIST",
    ...path.checklist.map((x) => `- ${x}`),
    "",
    `Reflect: ${path.reflection}`,
    "",
    "Self-selected statements directly determine each domain level. Classroom scenarios are unscored. No overall score is calculated. This is not a validated proficiency test.",
    "Created by Federico Orozco · www.federicoorozco.co",
  ].join("\n");
}
