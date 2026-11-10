export const levels = [
  {
    name: "Exploring",
    description:
      "I can begin using AI for simple, familiar purposes with guidance.",
    support: "A trusted colleague, a ready-to-use example, and one small task.",
  },
  {
    name: "Experimenting",
    description:
      "I can provide context, try different approaches, and improve basic outputs.",
    support:
      "A prompt template, time to compare versions, and feedback from a colleague.",
  },
  {
    name: "Applying",
    description:
      "I can independently use AI to support familiar teaching tasks and review what it produces.",
    support: "A clear learning objective and a repeatable review checklist.",
  },
  {
    name: "Adapting",
    description:
      "I can strategically evaluate and adapt AI approaches to different instructional needs.",
    support:
      "Work samples without identifiers, success criteria, and a teaching partner for reflection.",
  },
  {
    name: "Orchestrating",
    description:
      "I can coordinate AI-supported processes to accomplish complex instructional goals while maintaining human oversight.",
    support:
      "Agreed checkpoints, explicit responsibilities, and time to review evidence of learning.",
  },
  {
    name: "Innovating",
    description:
      "I can collaboratively develop, test, evaluate, and improve sustainable AI-supported educational practices.",
    support:
      "A collaborative inquiry group, equitable access, and a sustainable evaluation plan.",
  },
] as const;

export const domainIds = [
  "understanding",
  "communicating",
  "evaluating",
  "pedagogy",
  "responsibility",
] as const;
export type DomainId = (typeof domainIds)[number];
export type Level = 1 | 2 | 3 | 4 | 5 | 6;
export type Answers = Partial<Record<DomainId, Level>>;
export interface Domain {
  id: DomainId;
  name: string;
  short: string;
  description: string;
  question: string;
  descriptors: readonly string[];
  activities: readonly string[];
  promptInstruction: string;
}

export const domains: Domain[] = [
  {
    id: "understanding",
    name: "Understanding AI",
    short: "Understand",
    description: "Know its possibilities. Recognize its limits.",
    question:
      "How do you currently decide where AI could help with your teaching?",
    descriptors: [
      "I can identify a familiar task AI might help with, using a colleague’s example, and recognize that its answer may be wrong.",
      "I can try AI on a small teaching task and describe a useful output and a limitation I notice.",
      "I can independently choose familiar tasks for AI and explain why fluent responses may still contain invented information.",
      "I can compare AI and non-AI approaches against a learning goal and explain when AI’s limitations make it unsuitable.",
      "I can plan a multi-step teaching process, assigning suitable tasks to AI and identifying where human expertise must intervene.",
      "I can work with colleagues to test assumptions about an AI tool, document its limits across contexts, and revise or discontinue its use.",
    ],
    activities: [
      "With a colleague, try one example from your pathway. Name one useful suggestion and one thing a teacher must check.",
      "Try one request twice. Note a helpful pattern and a limitation before choosing what to keep.",
      "Compare completing one small planning task yourself with using AI. Record where AI helped and where it added work.",
      "List the steps in your classroom challenge. Mark which need teacher knowledge, which AI could draft, and which need no AI.",
      "Map a short planning-to-review process. Set a human decision point before any material reaches students.",
      "With a colleague, test one assumption about your AI-supported practice against a non-AI alternative. Agree what evidence would justify stopping.",
    ],
    promptInstruction:
      "List what you can help draft, what you cannot reliably know, and which decisions require a teacher. Suggest a non-AI alternative.",
  },
  {
    id: "communicating",
    name: "Communicating with AI",
    short: "Communicate",
    description: "Turn teaching intentions into purposeful requests.",
    question: "How do you currently communicate a teaching request to AI?",
    descriptors: [
      "I can use a provided prompt to ask AI for one simple classroom resource, with guidance.",
      "I can add the lesson topic, age group, and desired format, then ask for a change when the first response is not useful.",
      "I can independently describe the learning goal, relevant class context without identifiers, and constraints, then refine the response.",
      "I can adjust my requests after comparing outputs with instructional criteria and explain why a revision better fits my learners.",
      "I can structure a sequence of requests with review checkpoints, carrying forward only information I have checked.",
      "I can collaboratively test and improve reusable request patterns across teaching contexts, documenting where they work and where they fail.",
    ],
    activities: [
      "Use the example prompt with a colleague. Replace only the topic and read the response together.",
      "Add a learning goal and a format to your request. Ask for one specific revision and compare the versions.",
      "Write two versions of a request with different constraints. Choose the output that better serves the same learning goal.",
      "Break your request into a draft, a check against success criteria, and a teacher-approved revision.",
      "Have a colleague use your request sequence for a different topic. Record which instructions needed clarification.",
      "Co-design a small prompt collection with notes on context, limitations, and revision history. Test it with two colleagues before sharing.",
    ],
    promptInstruction:
      "Before drafting, ask me up to two questions about the learning objective or constraints. Then provide a short first draft that I can revise.",
  },
  {
    id: "evaluating",
    name: "Evaluating AI",
    short: "Evaluate",
    description: "Bring evidence and professional judgment.",
    question: "How do you currently review material that AI produces?",
    descriptors: [
      "I can spot an obvious error in an AI response when someone helps me check it against a trusted source.",
      "I can check a factual claim against a source I trust and ask AI to revise an unsuitable example.",
      "I can independently verify important claims and review an output for accuracy, bias, and alignment before using it.",
      "I can compare outputs using explicit criteria, recognize missing perspectives, and revise or reject material that weakens the learning goal.",
      "I can build review checkpoints into an AI-supported process and use classroom evidence to decide which materials to keep or change.",
      "I can co-develop and trial review criteria with colleagues, examine who benefits or is excluded, and improve the process using evidence.",
    ],
    activities: [
      "Check one claim in an AI draft against your curriculum or a trusted teaching resource with a colleague.",
      "Highlight one claim, one assumption about learners, and one instruction in a draft. Verify or revise each.",
      "Compare two drafts against accuracy, learning goal, and accessibility. Keep a brief reason for your choice.",
      "Choose one observable sign of student understanding. Use it to review whether a revised AI draft helped.",
      "Create a three-item review guide with a colleague. Independently review the same draft and discuss disagreements.",
      "Trial a shared review guide across two contexts. Examine missed errors and participation barriers, then revise the guide.",
    ],
    promptInstruction:
      "Identify assumptions, claims needing independent verification, and possible gaps in this draft. Do not invent citations. I will verify your suggestions against trusted sources.",
  },
  {
    id: "pedagogy",
    name: "Applying AI Pedagogically",
    short: "Apply",
    description: "Keep student learning at the center.",
    question: "How do you currently use AI to support student learning?",
    descriptors: [
      "I can adapt a colleague’s AI-generated example for one familiar activity, with help checking its learning purpose.",
      "I can ask AI for a lesson idea or scaffold and make a basic change so it better fits my class.",
      "I can independently use AI to draft resources for a familiar learning goal and review their suitability before teaching.",
      "I can compare and adapt AI-supported strategies to learner needs while preserving the learning goal, then check students’ responses.",
      "I can coordinate planning, scaffolding, formative checks, and instructional adjustments with AI support while retaining teaching decisions.",
      "I can collaborate on a small classroom inquiry, compare AI-supported and other approaches, and improve or stop a practice based on student learning.",
    ],
    activities: [
      "Choose one familiar activity with a colleague. Use AI to draft a small supporting resource and check it together.",
      "Try one scaffold from your pathway in an existing lesson. Note whether students needed more or less support.",
      "Compare two support strategies against the same objective. Adapt one for your class and plan a quick check of understanding.",
      "Connect a lesson resource to a formative check. Decide in advance how you will respond to two likely student answers.",
      "Invite a colleague to review a short AI-supported lesson cycle. Compare student explanations before and after the adjustment.",
      "Plan a modest collaborative inquiry with an AI and a non-AI approach. Track learning, participation, workload, and reasons to change course.",
    ],
    promptInstruction:
      "Preserve the learning objective and cognitive demand. Suggest a scaffold, a quick check of understanding, and an adjustment if that check shows a misconception.",
  },
  {
    id: "responsibility",
    name: "Responsible AI Use",
    short: "Act responsibly",
    description: "Protect people. Keep human accountability.",
    question: "How do you currently make responsible decisions about AI use?",
    descriptors: [
      "I can follow a provided privacy checklist and avoid entering student names or identifiable records into AI.",
      "I can use fictional examples, notice a stereotype or access barrier, and ask a colleague when I am unsure about appropriate use.",
      "I can independently follow school policy, protect personal information, check accessibility, and take responsibility for materials I use.",
      "I can assess privacy, fairness, accessibility, and authorship for a specific activity and choose a non-AI option when it better protects learners.",
      "I can build privacy and equity checks into a shared process, clarify human responsibilities, and provide an equivalent non-AI route.",
      "I can work with colleagues and relevant school stakeholders to review the effects of an AI practice, document concerns, and change or stop it when warranted.",
    ],
    activities: [
      "Check your school’s AI guidance with a colleague. Use only a fictional class context in your first request.",
      "Review a draft for stereotypes and access barriers. Replace one assumption with a more inclusive option.",
      "Check a planned activity for privacy, accessible formats, and an equivalent option without AI. Record your decision.",
      "Add a named teacher review step and a non-AI route to your activity plan before trying it.",
      "Ask a colleague to review your privacy and accessibility checkpoints. Decide how concerns will be reported and resolved.",
      "Review a shared practice with colleagues and appropriate school stakeholders. Use participation and access evidence to decide whether to revise or stop it.",
    ],
    promptInstruction:
      "Use fictional examples only. Flag possible stereotypes, accessibility barriers, and assumptions. Offer an equivalent activity without student access to AI.",
  },
];
