import { describe, expect, it } from "vitest";
import { domains, domainIds, levels } from "./data/framework";
import type { Answers, Level } from "./data/framework";
import { pathways } from "./data/pathways";
import { scenarios } from "./data/scenarios";
import {
  initialState,
  isComplete,
  makePrompt,
  makeSummary,
  nextLevel,
  readState,
} from "./model";

describe("editable teaching framework", () => {
  it("contains 30 unique descriptors across five domains and six levels", () => {
    expect(domains).toHaveLength(5);
    expect(levels.map((l) => l.name)).toEqual([
      "Exploring",
      "Experimenting",
      "Applying",
      "Adapting",
      "Orchestrating",
      "Innovating",
    ]);
    expect(new Set(domains.flatMap((d) => d.descriptors)).size).toBe(30);
    domains.forEach((d) => {
      expect(d.descriptors).toHaveLength(6);
      expect(d.activities).toHaveLength(6);
      d.descriptors.forEach((text) => expect(text).toMatch(/^I can /));
    });
  });
  for (const path of pathways)
    it(`provides complete classroom content for ${path.title}`, () => {
      expect(path.landmarks).toHaveLength(6);
      path.landmarks.forEach((l) =>
        Object.values(l).forEach((text) =>
          expect(text.length).toBeGreaterThan(60),
        ),
      );
      domainIds.forEach((id) =>
        expect(path.applications[id].length).toBeGreaterThan(40),
      );
      expect(scenarios[path.id]).toHaveLength(2);
      scenarios[path.id].forEach((s) => {
        expect(s.options).toHaveLength(3);
        s.options.forEach((o) => expect(o.feedback.length).toBeGreaterThan(70));
      });
    });
});

describe("transparent self-placement and safe restoration", () => {
  it("preserves each selected level in all 7,776 complete profiles without averaging", () => {
    for (let combination = 0; combination < 6 ** 5; combination++) {
      let n = combination;
      const answers: Answers = {};
      for (const id of domainIds) {
        answers[id] = ((n % 6) + 1) as Level;
        n = Math.floor(n / 6);
      }
      const restored = readState(
        JSON.stringify({ ...initialState, screen: "profile", answers }),
      );
      expect(restored.answers).toEqual(answers);
      expect(isComplete(restored.answers)).toBe(true);
      expect(restored.screen).toBe("profile");
    }
  });
  it("never lets scenario choices change domain placements", () => {
    const answers = {
      understanding: 1,
      communicating: 2,
      evaluating: 3,
      pedagogy: 4,
      responsibility: 5,
    } as const;
    for (const a of [0, 1, 2])
      for (const b of [0, 1, 2]) {
        const restored = readState(
          JSON.stringify({ ...initialState, answers, scenarioChoices: [a, b] }),
        );
        expect(restored.answers).toEqual(answers);
      }
  });
  it("recovers from corrupt, obsolete, or unavailable stored answers", () => {
    for (const raw of [null, "bad JSON", "null", "[]", '{"version":2}'])
      expect(readState(raw).answers).toEqual({});
    expect(
      readState(
        JSON.stringify({
          ...initialState,
          screen: "profile",
          answers: {
            understanding: 9,
            communicating: "6",
            evaluating: 2.5,
            pedagogy: 0,
            responsibility: 3,
          },
        }),
      ),
    ).toMatchObject({ screen: "check", answers: { responsibility: 3 } });
    expect(
      readState(
        JSON.stringify({
          ...initialState,
          pathway: "missing",
          focus: "bad",
          question: 50,
          scenario: -2,
          scenarioChoices: [7, "1"],
        }),
      ),
    ).toMatchObject({
      pathway: "multilingual",
      focus: "pedagogy",
      question: 0,
      scenario: 0,
      scenarioChoices: [null, null],
    });
  });
  it("treats incomplete profiles as unfinished and caps the next landmark at six", () => {
    expect(isComplete({ understanding: 1 })).toBe(false);
    expect(nextLevel(5)).toBe(6);
    expect(nextLevel(6)).toBe(6);
  });
});

describe("personalized exports", () => {
  for (const path of pathways)
    for (const level of [1, 6] as const)
      it(`exports ${path.id} at level ${level} with a practical, bounded next step`, () => {
        const answers = Object.fromEntries(
          domainIds.map((id) => [id, level]),
        ) as Answers;
        const state = { ...initialState, pathway: path.id, answers };
        const summary = makeSummary(state);
        expect(summary).toContain(path.title);
        domains.forEach((d) =>
          expect(summary).toContain(`${d.name}: Level ${level}`),
        );
        expect(summary).toContain("Provisional self-reflection profile");
        expect(summary).toContain(path.reflection);
        expect(makePrompt(state)).toContain(
          path.landmarks[nextLevel(level) - 1].prompt,
        );
        expect(makePrompt(state)).toContain("fictional examples only");
        expect(summary).not.toContain("Level 7");
      });
});
