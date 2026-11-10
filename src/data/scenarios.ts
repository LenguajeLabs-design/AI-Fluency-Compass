import type { PathwayId } from "./pathways";
export interface Scenario {
  title: string;
  situation: string;
  options: { action: string; feedback: string }[];
}
export const scenarios: Record<PathwayId, Scenario[]> = {
  multilingual: [
    {
      title: "A scaffold that changes the learning",
      situation:
        "AI drafts a polished water-cycle reading activity for multilingual learners. The language is simpler, but the task now asks students only to label vocabulary instead of explaining how water changes. What would you do?",
      options: [
        {
          action:
            "Ask a colleague to review the task with me against the original objective.",
          feedback:
            "Seeking support is a useful professional choice. Together, check whether students still have to explain the process. A polished resource can make learning less demanding without making it more accessible.",
        },
        {
          action:
            "Restore the explanation task and add optional vocabulary and sentence frames.",
          feedback:
            "This preserves the thinking while offering language access. Check that the frames do not supply the explanation, and listen for what students can explain independently.",
        },
        {
          action:
            "Compare the adapted task with my existing scaffold and plan a brief explanation check.",
          feedback:
            "Comparison and evidence can make the choice more purposeful. Keep the approach that serves the objective and students’ language needs; your existing non-AI scaffold may be the better option.",
        },
      ],
    },
    {
      title: "Useful context, private information",
      situation:
        "To personalize a glossary, an AI tool asks you to upload students’ language profiles and support plans. What would you do?",
      options: [
        {
          action:
            "Pause and check my school’s guidance with an appropriate colleague.",
          feedback:
            "Pausing protects learners. Do not upload the records while checking. You can still plan with fictional examples and teacher judgment without entering personal information.",
        },
        {
          action:
            "Use a fictional class description and review the glossary myself.",
          feedback:
            "Fictional context reduces privacy risk. Removing names alone would not guarantee anonymity. Check vocabulary, assumptions, and access needs using your own classroom knowledge outside the tool.",
        },
        {
          action:
            "Use an existing glossary and discuss whether AI offers enough benefit to justify using it.",
          feedback:
            "Recognizing when AI adds little value is part of fluency. Check that the existing resource is accurate and accessible, and decide whether any small teacher-led adaptation is needed.",
        },
      ],
    },
  ],
  planning: [
    {
      title: "Engaging, but aligned?",
      situation:
        "AI proposes a lively fraction game. Your objective is for students to explain equivalent fractions, but the game rewards fast matching without explanations. What would you do?",
      options: [
        {
          action:
            "Review the activity with a colleague and identify where reasoning could be added.",
          feedback:
            "A colleague can help you make the learning goal visible. Check whether adding one question is enough, or whether the game’s speed incentives work against thoughtful explanation.",
        },
        {
          action:
            "Revise the game so students justify a match with strips or a number line.",
          feedback:
            "You are aligning the activity with the intended reasoning. Check the mathematics and give students time and accessible ways to explain, rather than assuming a correct match shows understanding.",
        },
        {
          action:
            "Compare it with my existing activity and choose using a short explanation check.",
          feedback:
            "This connects your choice to learning evidence. Plan how to interpret the explanations and be willing to use the existing activity if the AI draft offers no clear benefit.",
        },
      ],
    },
    {
      title: "A convincing worked example",
      situation:
        "An AI-generated lesson includes a confident worked example claiming that one third equals two fifths. The rest of the lesson looks useful. What would you do?",
      options: [
        {
          action:
            "Check the example using fraction strips with a colleague before using the lesson.",
          feedback:
            "Checking with a concrete representation and a colleague is a sound starting point. This error is a reason to review all examples, including the answer key, rather than fixing only the first mistake.",
        },
        {
          action:
            "Correct the example and independently verify every worked answer against a trusted source.",
          feedback:
            "Independent verification addresses the risk of confident errors. Also check that the instructions and representations support the intended concept, not just correct numerical answers.",
        },
        {
          action:
            "Use a verified existing resource for this lesson and review where AI drafting would be helpful later.",
          feedback:
            "Choosing a trusted resource can be the best decision for this lesson. You can revisit AI for a bounded task where checking takes less effort than starting from scratch.",
        },
      ],
    },
  ],
  assessment: [
    {
      title: "Feedback that sounds helpful",
      situation:
        "AI suggests “Add more detail” for a fictional answer about a character. The learner has quoted evidence but has not explained how it supports the claim. What would you do?",
      options: [
        {
          action:
            "Ask a colleague to help turn the comment into a specific suggestion.",
          feedback:
            "Collaborative review can make the feedback useful. Anchor it to the missing explanation, such as asking how the quotation supports the claim, rather than simply asking for a longer answer.",
        },
        {
          action:
            "Write a question asking the learner to connect the quotation to the claim.",
          feedback:
            "This targets the learning need. Check whether the learner understands the question and inspect the revision; a well-worded comment alone does not demonstrate that learning occurred.",
        },
        {
          action:
            "Compare two feedback approaches and plan what I will look for in the next revision.",
          feedback:
            "This makes the feedback cycle visible. Keep the comparison small and look for a clearer connection between evidence and claim, rather than treating added length as progress.",
        },
      ],
    },
    {
      title: "A shortcut to grades?",
      situation:
        "An AI tool offers to grade a set of student reading responses if you upload them. You want to save time and still understand your students’ thinking. What would you do?",
      options: [
        {
          action:
            "Pause and discuss the school’s assessment and privacy guidance with a colleague.",
          feedback:
            "This pause is protective. Keep real responses out of the tool. A policy check is a starting point; teachers still need to examine fairness, accuracy, and the meaning of the assessment.",
        },
        {
          action:
            "Keep the responses offline and use a fictional answer to draft a feedback stem instead.",
          feedback:
            "This separates bounded drafting from judgments about real learners. Check the stem against your criteria and use professional judgment when applying feedback.",
        },
        {
          action:
            "Use my existing rubric and review whether an AI-supported drafting task would actually improve the process.",
          feedback:
            "This keeps assessment decisions accountable. Compare time saved with review effort and the quality of feedback; deciding not to use AI can be the most appropriate response.",
        },
      ],
    },
  ],
};
