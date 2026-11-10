import type { DomainId } from "./framework";

export type PathwayId = "multilingual" | "planning" | "assessment";
export interface Landmark {
  example: string;
  next: string;
  prompt: string;
}
export interface Pathway {
  id: PathwayId;
  title: string;
  label: string;
  description: string;
  tags: string;
  context: string;
  landmarks: Landmark[];
  applications: Record<DomainId, string>;
  checklist: string[];
  reflection: string;
}

export const pathways: Pathway[] = [
  {
    id: "multilingual",
    title: "Supporting multilingual learners",
    label: "Multilingual learners",
    description:
      "Make learning more accessible while keeping the thinking rich.",
    tags: "Language scaffolds · Vocabulary · Differentiation",
    context:
      "a science lesson in which multilingual learners explain how water moves through the water cycle",
    landmarks: [
      {
        example:
          "With a colleague, use a provided prompt to draft a five-word water-cycle glossary. Check the meanings and pair each word with a familiar visual.",
        next: "Add your learners’ age group and ask for one usable sentence frame for explaining evaporation.",
        prompt:
          "For a fictional class of 10-year-old multilingual learners, draft a glossary of five water-cycle words with plain-language meanings and visual suggestions. The goal is to explain how water changes and moves.",
      },
      {
        example:
          "Ask for two sentence frames for explaining evaporation. Revise one so students explain a cause, rather than just fill in a vocabulary word.",
        next: "Create a short explanation task with a word bank, then check that the scaffold preserves the science objective.",
        prompt:
          "Draft two sentence frames for 10-year-old multilingual learners explaining why evaporation happens. Keep the causal thinking. Include one simpler language option without giving away the explanation.",
      },
      {
        example:
          "Independently draft a water-cycle explanation activity with a word bank and optional sentence frames. Check scientific accuracy and the intended language demand.",
        next: "Compare visual and sentence-frame scaffolds, choose for a specific language need, and check student explanations.",
        prompt:
          "Design a 10-minute water-cycle explanation task for a fictional mixed-language class aged 10. Students must explain evaporation and condensation. Include an optional word bank and sentence frames, plus a way to check independent understanding.",
      },
      {
        example:
          "Compare a labeled diagram and sentence frames for explaining condensation. Adapt support to observed language needs without simplifying the scientific reasoning.",
        next: "Connect a scaffold choice to a quick oral explanation check and plan when to fade the support.",
        prompt:
          "Compare a labeled diagram with sentence frames for helping 10-year-old multilingual learners explain condensation. Identify which language need each addresses, keep the same science goal, and suggest a check before fading the scaffold.",
      },
      {
        example:
          "Coordinate vocabulary preparation, optional scaffolds, an oral explanation check, and scaffold removal. Review each AI draft and use student explanations to adjust support.",
        next: "With a colleague, compare the scaffolded sequence with an existing approach using evidence of explanation quality and participation.",
        prompt:
          "Draft a teacher-reviewed sequence for explaining the water cycle: vocabulary preparation, two optional language scaffolds, an oral check, and criteria for fading support. Flag the decisions that require teacher observation.",
      },
      {
        example:
          "Collaborate on a small inquiry comparing AI-supported and teacher-designed language scaffolds. Review explanation quality, participation, and planning time, then revise or stop the approach.",
        next: "Repeat the inquiry in another topic with a colleague and document when the approach does not help.",
        prompt:
          "Help plan a small collaborative inquiry comparing two water-cycle language-scaffold approaches, one drafted with AI and one using existing materials. Suggest evidence of explanation quality, participation, workload, and criteria for stopping. Use no identifiable records.",
      },
    ],
    applications: {
      understanding:
        "Decide whether a draft glossary would help more than your existing visual word bank; AI cannot know your learners’ language resources.",
      communicating:
        "Specify the science objective, language demand, age group, and optional scaffold format without sharing learner identities.",
      evaluating:
        "Check that a language scaffold preserves causal reasoning and represents multilingual learners without deficit assumptions.",
      pedagogy:
        "Use optional language support, then listen for an independent explanation of evaporation or condensation.",
      responsibility:
        "Use fictional class descriptions, check cultural assumptions, and offer print and oral options without student AI accounts.",
    },
    checklist: [
      "The science objective and cognitive demand are preserved.",
      "Vocabulary and explanations match a trusted curriculum source.",
      "Scaffolds offer access without assuming all multilingual learners need the same support.",
      "The teacher reviews the draft; no student identifiers or AI accounts are needed.",
    ],
    reflection:
      "What would students say, draw, or write independently to show that language support improved their scientific understanding or participation?",
  },
  {
    id: "planning",
    title: "Planning effective lessons",
    label: "Lesson planning",
    description:
      "Turn a clear learning goal into a thoughtful classroom experience.",
    tags: "Learning objectives · Activities · Alignment",
    context:
      "a lesson in which students use evidence to explain why equivalent fractions have the same value",
    landmarks: [
      {
        example:
          "With a colleague, use a provided prompt to draft a fraction-strip warm-up. Check its examples against familiar teaching materials.",
        next: "Add an age group and a precise objective, then request a clearer instruction.",
        prompt:
          "Draft a five-minute warm-up using paper fraction strips for a fictional class of 9-year-olds. The goal is to explain why one half and two quarters have the same value. Include simple teacher instructions.",
      },
      {
        example:
          "Add the class age, available paper strips, and the goal of explaining equivalence. Ask AI to replace a rule-memorization activity with a visual explanation.",
        next: "Build a short lesson around the objective and independently check every task for alignment.",
        prompt:
          "Suggest a 15-minute paper fraction-strip activity for 9-year-olds explaining equivalent fractions. Avoid teaching only a multiplication rule. Revise the instructions so students must explain their reasoning.",
      },
      {
        example:
          "Independently draft a fraction-strip lesson with a clear objective, guided practice, and an exit question. Check that each part elicits reasoning.",
        next: "Compare two lesson approaches against a likely misconception and choose an appropriate representation.",
        prompt:
          "Draft a 25-minute lesson for 9-year-olds explaining equivalent fractions using paper strips. Include the objective, guided practice, independent explanation, and an exit question. List the purpose of each activity.",
      },
      {
        example:
          "Compare number-line and fraction-strip activities for learners who count pieces without considering the whole. Adapt one and check their explanations.",
        next: "Link the selected representation to a formative check and plan a response to the misconception.",
        prompt:
          "Compare a number line and paper fraction strips for addressing the misconception that more pieces always means a larger fraction. Preserve the goal of explaining equivalent fractions. Suggest a diagnostic question and a teaching adjustment.",
      },
      {
        example:
          "Coordinate a diagnostic question, a representation choice, practice, and an exit check. Use teacher-reviewed AI drafts to plan alternative responses to student reasoning.",
        next: "Trial the lesson sequence with a colleague and compare evidence of reasoning and workload with an existing lesson.",
        prompt:
          "Outline a lesson cycle on equivalent fractions with a diagnostic question, two representation options, guided practice, an exit check, and teacher decision points. Suggest different next steps for two likely misconceptions.",
      },
      {
        example:
          "Co-design and trial an AI-supported planning routine against an existing routine. Compare curriculum alignment, student reasoning, access, and planning effort before revising it.",
        next: "Test the routine in a second curriculum area and document the conditions in which existing resources are better.",
        prompt:
          "Help two teachers design a small inquiry comparing AI-supported and existing planning routines for equivalent fractions. Include learning evidence, accessibility, time spent, limitations, and criteria for retaining or stopping the routine.",
      },
    ],
    applications: {
      understanding:
        "Decide whether AI adds anything to an existing fraction lesson, recognizing that it cannot confirm your local curriculum requirements.",
      communicating:
        "State the reasoning objective, age group, time available, materials, and desired evidence of understanding.",
      evaluating:
        "Check every fraction example and whether the activity elicits an explanation rather than a memorized procedure.",
      pedagogy:
        "Connect a representation of equivalent fractions to a student explanation and a short exit check.",
      responsibility:
        "Check that materials are accessible and available to everyone; use teacher-created fictional examples rather than student records.",
    },
    checklist: [
      "Every activity serves the stated learning objective.",
      "Worked examples are mathematically accurate.",
      "Timing, materials, and accessible alternatives fit the classroom.",
      "The lesson reveals student thinking and leaves instructional decisions with the teacher.",
    ],
    reflection:
      "What evidence in students’ explanations would show that the lesson helped them understand equivalence, beyond completing the activity?",
  },
  {
    id: "assessment",
    title: "Assessment and feedback",
    label: "Assessment & feedback",
    description: "Understand student thinking and decide what comes next.",
    tags: "Formative checks · Feedback · Instructional decisions",
    context:
      "a lesson in which students support a claim about a character with evidence from a text",
    landmarks: [
      {
        example:
          "With a colleague, use a provided prompt to draft one exit question about using textual evidence. Check it against the lesson objective.",
        next: "Add the success criteria and ask for a clearer question that reveals the reasoning behind an answer.",
        prompt:
          "Draft one exit question for a fictional class of 11-year-olds learning to support a claim about a story character with textual evidence. Use a short fictional passage you create, and label it fictional.",
      },
      {
        example:
          "Give AI a teacher-written fictional answer and ask for feedback on its use of evidence. Revise a vague comment into one actionable suggestion.",
        next: "Independently draft a short formative check and review whether it distinguishes a claim from supporting evidence.",
        prompt:
          "Create a fictional short passage and a fictional student-style answer about a character. Draft one feedback comment tied to selecting relevant textual evidence, then make that comment specific and actionable. Do not assign a grade.",
      },
      {
        example:
          "Independently draft an exit check and feedback stems for claim, evidence, and explanation. Verify the passage and review the criteria before using them.",
        next: "Compare two feedback approaches for the same fictional misconception and plan a check of the student’s revision.",
        prompt:
          "Draft an exit check with a short fictional passage for 11-year-olds supporting a character claim with textual evidence. Include teacher-reviewed feedback stems for missing evidence and unexplained evidence. Do not grade students.",
      },
      {
        example:
          "Compare a question and a feedback stem for an answer that quotes a text without explaining it. Adapt the feedback and check the next explanation.",
        next: "Link feedback to a revision task and a teacher decision about reteaching.",
        prompt:
          "Using only a fictional passage and answer, compare question-based feedback with a short feedback stem for a learner who quotes evidence but does not explain it. Suggest a revision task and a check of understanding.",
      },
      {
        example:
          "Coordinate an exit check, teacher interpretation, targeted feedback, and a revision check. Review AI suggestions before deciding which concept to reteach.",
        next: "With a colleague, compare the feedback cycle with your existing approach using quality of revisions and time spent.",
        prompt:
          "Draft a teacher-led formative assessment cycle for supporting claims with textual evidence: exit check, teacher interpretation, targeted feedback, revision, and reteaching decisions. Use fictional examples only and include human review checkpoints.",
      },
      {
        example:
          "Collaboratively trial a feedback routine against an existing approach, using a school-approved review of revisions, student understanding, fairness, and teacher workload.",
        next: "Review whether the routine helps across different tasks and learner groups; change or stop it if the evidence is weak.",
        prompt:
          "Help plan a small inquiry comparing an AI-drafted feedback routine with existing teacher feedback for textual evidence. Use fictional planning examples. Suggest school-approved ways to review revision quality, fairness, and workload without uploading student work to AI.",
      },
    ],
    applications: {
      understanding:
        "Distinguish drafting an exit question from judging a learner; AI cannot infer understanding or responsibly assign grades from limited context.",
      communicating:
        "Supply the objective, success criteria, and a fictional answer to request one actionable feedback suggestion.",
      evaluating:
        "Check that feedback is supported by the fictional text and points to a meaningful revision rather than a generic compliment.",
      pedagogy:
        "Use a short check to distinguish missing evidence from unexplained evidence, then decide what to teach next.",
      responsibility:
        "Keep real student work and grades out of AI. Check fairness and retain teacher responsibility for feedback and assessment.",
    },
    checklist: [
      "The check reveals thinking related to the objective.",
      "Feedback refers to evidence and offers an actionable next step.",
      "No real student work, names, grades, or identifiable records are entered into AI.",
      "The teacher interprets responses and decides feedback, grades, and next instruction.",
    ],
    reflection:
      "What change in students’ next explanations or revisions would show that the feedback supported learning?",
  },
];
