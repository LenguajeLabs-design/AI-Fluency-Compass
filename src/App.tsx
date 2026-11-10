import { forwardRef, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Globe2,
  BookOpen,
  MessageSquareText,
  ScanSearch,
  ShieldCheck,
  Lightbulb,
  Clock3,
  Copy,
  Printer,
  RotateCcw,
  ChevronRight,
  ExternalLink,
  X,
  Menu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { domains, levels } from "./data/framework";
import type { Level } from "./data/framework";
import { pathways } from "./data/pathways";
import type { PathwayId } from "./data/pathways";
import { scenarios } from "./data/scenarios";
import { methodology, references } from "./data/methodology";
import {
  initialState,
  isComplete,
  makePrompt,
  makeSummary,
  nextLevel,
  readState,
  STORAGE_KEY,
} from "./model";
import type { ReflectionState, Screen } from "./model";
import { CompassArtwork } from "./components/CompassArtwork";

const domainIcons: LucideIcon[] = [
  Lightbulb,
  MessageSquareText,
  ScanSearch,
  BookOpen,
  ShieldCheck,
];
const pathIcons: LucideIcon[] = [Globe2, BookOpen, MessageSquareText];
const screenTitles: Record<Screen, string> = {
  welcome: "Find your next step",
  pathway: "Your teaching challenge",
  check: "Your self-check",
  scenarios: "Classroom reflection",
  profile: "Your fluency profile",
  next: "Your next step",
  continuum: "The six levels",
  about: "About this framework",
};

const H1 = forwardRef<HTMLHeadingElement, { children: React.ReactNode }>(
  function PageHeading({ children }, ref) {
    return (
      <h1 ref={ref} tabIndex={-1}>
        {children}
      </h1>
    );
  },
);

function permittedScreen(screen: Screen, state: ReflectionState): Screen {
  return ["profile", "next", "scenarios"].includes(screen) &&
    !isComplete(state.answers)
    ? "check"
    : screen;
}

function load() {
  let saved: ReflectionState;
  try {
    saved = readState(localStorage.getItem(STORAGE_KEY));
  } catch {
    saved = { ...initialState };
  }
  const route = window.location.hash.slice(1);
  if (Object.keys(screenTitles).includes(route))
    saved.screen = permittedScreen(route as Screen, saved);
  return saved;
}

export default function App() {
  const [state, setState] = useState<ReflectionState>(load);
  const [notice, setNotice] = useState("");
  const [copyFallback, setCopyFallback] = useState<string | null>(null);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [menu, setMenu] = useState(false);
  const resetDialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const path = pathways.find((p) => p.id === state.pathway)!;
  const complete = isComplete(state.answers);
  const domain = domains[state.question];
  const focus = domains.find((d) => d.id === state.focus)!;
  const current = state.answers[state.focus] ?? 1;
  const next = nextLevel(current);
  const scene = scenarios[state.pathway][state.scenario];
  const sceneChoice = state.scenarioChoices[state.scenario];
  const patch = (update: Partial<ReflectionState>) =>
    setState((s) => ({ ...s, ...update }));

  useEffect(() => {
    function onHistoryChange() {
      const route = window.location.hash.slice(1) || "welcome";
      if (!Object.keys(screenTitles).includes(route)) return;
      setState((previous) => ({
        ...previous,
        screen: permittedScreen(route as Screen, previous),
      }));
      setMenu(false);
      setCopyFallback(null);
    }
    window.addEventListener("popstate", onHistoryChange);
    return () => window.removeEventListener("popstate", onHistoryChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, [state]);
  useEffect(() => {
    document.title = `${screenTitles[state.screen]} · AI Fluency Compass`;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [state.screen, state.question, state.scenario]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(timer);
  }, [notice]);

  function go(screen: Screen) {
    screen = permittedScreen(screen, state);
    if (state.screen !== screen)
      window.history.pushState(null, "", `#${screen}`);
    patch({ screen });
    setMenu(false);
    setCopyFallback(null);
  }
  function start() {
    go(Object.keys(state.answers).length ? "check" : "pathway");
  }
  function choosePath(id: PathwayId) {
    patch({ pathway: id, scenario: 0, scenarioChoices: [null, null] });
  }
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setNotice("Copied to clipboard.");
    } catch {
      setCopyFallback(text);
    }
  }
  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* In-memory reset still works. */
    }
    setState({ ...initialState, answers: {}, scenarioChoices: [null, null] });
    window.history.replaceState(null, "", "#welcome");
    resetDialog.current?.close();
    setCopyFallback(null);
    setMenu(false);
    setNotice("Your saved reflection has been reset.");
  }
  const pathwayPicker = (
    <label className="path-picker">
      Classroom pathway
      <select
        value={state.pathway}
        onChange={(e) => choosePath(e.target.value as PathwayId)}
      >
        {pathways.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="brand"
            onClick={() => go("welcome")}
            aria-label="AI Fluency Compass home"
          >
            <span className="brand-mark">
              <Compass size={23} strokeWidth={1.5} />
            </span>
            <span>
              AI Fluency <strong>Compass</strong>
            </span>
          </button>
          <button
            className="menu-toggle icon-button"
            aria-expanded={menu}
            aria-controls="site-nav"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <nav
            id="site-nav"
            className={menu ? "open" : ""}
            aria-label="Main navigation"
          >
            <button
              className={state.screen === "continuum" ? "nav-active" : ""}
              onClick={() => go("continuum")}
            >
              The six levels
            </button>
            <button
              className={state.screen === "about" ? "nav-active" : ""}
              onClick={() => go("about")}
            >
              About the framework
            </button>
            <button
              className="button small secondary"
              onClick={() => (complete ? go("profile") : start())}
            >
              {complete
                ? "My profile"
                : Object.keys(state.answers).length
                  ? "Resume reflection"
                  : "Get started"}
              <ArrowRight size={16} />
            </button>
          </nav>
        </div>
      </header>

      <main id="main">
        <div className="screen-content" key={state.screen}>
          {state.screen === "welcome" && (
            <>
              <section className="hero container">
                <div className="hero-copy">
                  <p className="eyebrow">
                    <span className="tiny-dot" /> SMALL STEPS. MEANINGFUL
                    POSSIBILITIES.
                  </p>
                  <H1 ref={heading}>
                    You already have
                    <br />a starting point.
                    <br />
                    <em>Find your next step.</em>
                  </H1>
                  <p className="hero-intro">
                    Discover what you can do with AI—and what you can learn to
                    do next.
                  </p>
                  <p className="hero-body">
                    A thoughtful self-reflection for teachers. Recognize your
                    strengths, explore classroom possibilities, and find one
                    achievable way to grow.
                  </p>
                  <div className="hero-actions">
                    <button className="button" onClick={start}>
                      {Object.keys(state.answers).length
                        ? "Continue My Reflection"
                        : "Discover My AI Fluency"}
                      <ArrowRight size={18} />
                    </button>
                    <button
                      className="text-button"
                      onClick={() => go("continuum")}
                    >
                      Explore the Six Levels
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <p className="reassurance">
                    <Clock3 size={15} /> About 5 minutes <span>·</span> Free{" "}
                    <span>·</span> No account needed
                  </p>
                </div>
                <CompassArtwork />
              </section>
              <section className="belief-band">
                <div className="container">
                  <span className="small-label">
                    BUILT AROUND YOUR TEACHING
                  </span>
                  <p>
                    You don’t need to be an AI expert.
                    <br className="mobile-break" />{" "}
                    <strong>You bring the teaching expertise.</strong>
                  </p>
                </div>
              </section>
              <section className="container section continuum-preview">
                <div className="section-intro">
                  <div>
                    <p className="eyebrow">A CONTINUUM, NOT A COMPETITION</p>
                    <h2>
                      Six landmarks.
                      <br />
                      <em>Your own path forward.</em>
                    </h2>
                  </div>
                  <p>
                    Fluency grows through practice, reflection, and support. You
                    may be at different landmarks in different areas—and that’s
                    a useful place to begin.
                  </p>
                </div>
                <div className="level-strip">
                  {levels.map((l, i) => (
                    <button
                      key={l.name}
                      className={`level-stop level-${i + 1}`}
                      onClick={() => {
                        patch({ exploredLevel: (i + 1) as Level });
                        go("continuum");
                      }}
                    >
                      <span className="level-circle">{i + 1}</span>
                      <span className="small-label">LEVEL {i + 1}</span>
                      <strong>{l.name}</strong>
                      <span className="level-hover">
                        Explore landmark <ArrowRight size={13} />
                      </span>
                    </button>
                  ))}
                </div>
              </section>
              <section className="domains-section">
                <div className="container section">
                  <div className="section-intro">
                    <div>
                      <p className="eyebrow">
                        MORE THAN KNOWING THE RIGHT PROMPT
                      </p>
                      <h2>Five ways to be fluent.</h2>
                    </div>
                    <p>
                      A fuller picture of how you work with AI, with student
                      learning at the center.
                    </p>
                  </div>
                  <div className="domain-grid">
                    {domains.map((d, i) => {
                      const Icon = domainIcons[i];
                      return (
                        <div className="domain-tile" key={d.id}>
                          <Icon size={23} strokeWidth={1.4} />
                          <h3>{d.name}</h3>
                          <p>{d.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
              <section className="container invitation">
                <span className="eyebrow">
                  A LITTLE REFLECTION CAN OPEN A NEW POSSIBILITY
                </span>
                <h2>
                  What could AI help you do
                  <br />
                  <em>for your learners?</em>
                </h2>
                <button className="button" onClick={start}>
                  Find my starting point
                  <ArrowRight size={18} />
                </button>
                <p>
                  A personal compass. A practical next step. Always your
                  judgment.
                </p>
              </section>
            </>
          )}

          {["pathway", "check", "scenarios", "profile", "next"].includes(
            state.screen,
          ) && (
            <div className="container journey">
              <ol aria-label="Reflection stages">
                {[
                  "Your classroom",
                  "Self-check",
                  "Classroom reflection",
                  "Your profile",
                ].map((label, i) => {
                  const active =
                    state.screen === "pathway"
                      ? 0
                      : state.screen === "check"
                        ? 1
                        : state.screen === "scenarios"
                          ? 2
                          : 3;
                  return (
                    <li
                      key={label}
                      className={
                        i === active ? "current" : i < active ? "done" : ""
                      }
                      aria-current={i === active ? "step" : undefined}
                    >
                      <span>{i < active ? <Check size={13} /> : i + 1}</span>
                      {label}
                    </li>
                  );
                })}
              </ol>
              <span className="journey-note">Your pace. Your perspective.</span>
            </div>
          )}

          {state.screen === "pathway" && (
            <section className="container focused-section">
              <p className="eyebrow">01 / YOUR CLASSROOM</p>
              <H1 ref={heading}>
                Start with something
                <br />
                <em>that matters to you.</em>
              </H1>
              <p className="page-lead">
                What would you like AI to help you do in your classroom?
              </p>
              <p className="muted">
                Choose a teaching challenge. We’ll tailor the examples and next
                steps to it.
              </p>
              <fieldset className="pathways">
                <legend className="sr-only">Choose a teaching challenge</legend>
                {pathways.map((p, i) => {
                  const Icon = pathIcons[i];
                  return (
                    <label
                      className={`path-card ${state.pathway === p.id ? "selected" : ""}`}
                      key={p.id}
                    >
                      <input
                        type="radio"
                        name="pathway"
                        value={p.id}
                        checked={state.pathway === p.id}
                        onChange={() => choosePath(p.id)}
                      />
                      <span className="path-icon">
                        <Icon size={25} strokeWidth={1.4} />
                      </span>
                      <span className="path-card-copy">
                        <strong>{p.title}</strong>
                        <span>{p.description}</span>
                        <small>{p.tags}</small>
                      </span>
                      <span className="radio-visual">
                        {state.pathway === p.id && <Check size={14} />}
                      </span>
                    </label>
                  );
                })}
              </fieldset>
              <div className="step-actions">
                <button className="text-button" onClick={() => go("welcome")}>
                  <ArrowLeft size={17} /> Back to welcome
                </button>
                <button className="button" onClick={() => go("check")}>
                  Begin my self-check
                  <ArrowRight size={18} />
                </button>
              </div>
              <p className="privacy-note">
                <ShieldCheck size={16} /> No student information needed. Your
                reflection stays in this browser.
              </p>
            </section>
          )}

          {state.screen === "check" && (
            <section className="container question-section">
              <div className="question-top">
                <span className="eyebrow">02 / YOUR SELF-CHECK</span>
                <span className="small-label">
                  QUESTION {state.question + 1} OF 5
                </span>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Self-check question progress"
                aria-valuenow={state.question + 1}
                aria-valuemin={0}
                aria-valuemax={5}
              >
                <span style={{ width: `${(state.question + 1) * 20}%` }} />
              </div>
              <p className="domain-kicker">{domain.name}</p>
              <H1 ref={heading}>{domain.question}</H1>
              <p className="page-instruction">
                Choose what you can <strong>currently do</strong>, rather than
                what you hope to do. If several fit, choose the most independent
                practice you can already sustain.
              </p>
              <fieldset className="choices">
                <legend className="sr-only">{domain.question}</legend>
                {domain.descriptors.map((text, i) => (
                  <label
                    className={`choice ${state.answers[domain.id] === i + 1 ? "selected" : ""}`}
                    key={`${domain.id}-${i}`}
                  >
                    <input
                      type="radio"
                      name={domain.id}
                      checked={state.answers[domain.id] === i + 1}
                      onChange={() =>
                        patch({
                          answers: {
                            ...state.answers,
                            [domain.id]: (i + 1) as Level,
                          },
                        })
                      }
                    />
                    <span className="radio-visual">
                      {state.answers[domain.id] === i + 1 && (
                        <Check size={13} />
                      )}
                    </span>
                    <span>{text}</span>
                  </label>
                ))}
              </fieldset>
              <div className="step-actions">
                <button
                  className="text-button"
                  onClick={() =>
                    state.question === 0
                      ? go("pathway")
                      : patch({ question: state.question - 1 })
                  }
                >
                  <ArrowLeft size={17} /> Back
                </button>
                <span className="save-note">
                  {storageAvailable
                    ? "Saved on this device"
                    : "Browser storage unavailable; keep this tab open"}
                </span>
                <button
                  className="button"
                  disabled={!state.answers[domain.id]}
                  onClick={() =>
                    state.question === 4
                      ? go("scenarios")
                      : patch({ question: state.question + 1 })
                  }
                >
                  {state.question === 4
                    ? "Reflect on scenarios"
                    : "Next question"}
                  <ArrowRight size={18} />
                </button>
              </div>
              {!state.answers[domain.id] && (
                <p className="selection-hint">
                  Select a statement to continue. You can revise it later.
                </p>
              )}
            </section>
          )}

          {state.screen === "scenarios" && (
            <section className="container question-section">
              <div className="question-top">
                <span className="eyebrow">03 / CLASSROOM REFLECTION</span>
                <span className="small-label">
                  SITUATION {state.scenario + 1} OF 2
                </span>
              </div>
              <p className="pill unscored">Formative & unscored</p>
              <H1 ref={heading}>{scene.title}</H1>
              <p className="page-instruction">
                There is more than one thoughtful way forward. These situations
                help you reflect; they do not change your levels.
              </p>
              <div className="scenario-box">
                <BookOpen size={24} strokeWidth={1.4} />
                <p>{scene.situation}</p>
              </div>
              <fieldset className="choices">
                <legend>What would you do?</legend>
                {scene.options.map((o, i) => (
                  <label
                    key={`${state.scenario}-${i}`}
                    className={`choice ${sceneChoice === i ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="scenario"
                      checked={sceneChoice === i}
                      onChange={() =>
                        patch({
                          scenarioChoices: state.scenarioChoices.map((v, j) =>
                            j === state.scenario ? i : v,
                          ),
                        })
                      }
                    />
                    <span className="radio-visual">
                      {sceneChoice === i && <Check size={13} />}
                    </span>
                    <span>{o.action}</span>
                  </label>
                ))}
              </fieldset>
              <div aria-live="polite">
                {sceneChoice !== null && (
                  <div className="feedback-box">
                    <span className="feedback-label">
                      <Lightbulb size={17} /> A reflection to take with you
                    </span>
                    <p>{scene.options[sceneChoice].feedback}</p>
                  </div>
                )}
              </div>
              <div className="step-actions">
                <button
                  className="text-button"
                  onClick={() =>
                    state.scenario === 0
                      ? (patch({ question: 4 }), go("check"))
                      : patch({ scenario: 0 })
                  }
                >
                  <ArrowLeft size={17} /> Back
                </button>
                <button
                  className="button"
                  disabled={sceneChoice === null}
                  onClick={() =>
                    state.scenario === 0
                      ? patch({ scenario: 1 })
                      : go("profile")
                  }
                >
                  {state.scenario === 0 ? "Next situation" : "See my profile"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </section>
          )}

          {state.screen === "profile" && (
            <section className="container profile-section">
              <div className="profile-heading">
                <div>
                  <p className="eyebrow">04 / YOUR PERSONAL COMPASS</p>
                  <H1 ref={heading}>
                    A picture of your practice.
                    <br />
                    <em>A possibility for growth.</em>
                  </H1>
                  <p className="page-lead">
                    You bring a unique combination of strengths to your
                    classroom.
                  </p>
                </div>
                <span className="profile-seal">
                  <Compass size={48} strokeWidth={1} />
                  <span>
                    YOUR PATH.
                    <br />
                    YOUR PACE.
                  </span>
                </span>
              </div>
              <div className="profile-meta">
                <span className="pill">
                  Provisional self-reflection profile
                </span>
                <span>{path.title}</span>
              </div>
              <div className="profile-overview">
                <div className="overview-copy">
                  <span className="eyebrow">
                    FIVE DOMAINS. NO OVERALL SCORE.
                  </span>
                  <h2>
                    Here’s where you <br />
                    <em>see yourself today.</em>
                  </h2>
                  <p>
                    Each landmark comes directly from the statement you
                    selected. Different starting points are expected.
                  </p>
                  <button
                    className="text-button"
                    onClick={() => {
                      patch({ question: 0 });
                      go("check");
                    }}
                  >
                    Review my answers
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="domain-bars">
                  {domains.map((d) => {
                    const level = state.answers[d.id]!;
                    return (
                      <div className="domain-bar" key={d.id}>
                        <div>
                          <strong>{d.name}</strong>
                          <span>
                            Level {level} · {levels[level - 1].name}
                          </span>
                        </div>
                        <div
                          className="segmented-bar"
                          role="meter"
                          aria-label={d.name}
                          aria-valuenow={level}
                          aria-valuemin={1}
                          aria-valuemax={6}
                          aria-valuetext={`Level ${level}, ${levels[level - 1].name}`}
                        >
                          {levels.map((_, i) => (
                            <span
                              key={i}
                              className={i < level ? "filled" : ""}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="section-intro profile-intro">
                <div>
                  <p className="eyebrow">STRENGTHS YOU CAN BUILD ON</p>
                  <h2>From reflection to classroom practice.</h2>
                </div>
                <p>
                  See something you’d like to try? Choose that domain for your
                  next step.
                </p>
              </div>
              <div className="profile-cards">
                {domains.map((d, i) => {
                  const level = state.answers[d.id]!;
                  const Icon = domainIcons[i];
                  return (
                    <article className="profile-card" key={d.id}>
                      <div className="card-heading">
                        <span className="domain-icon">
                          <Icon size={23} strokeWidth={1.5} />
                        </span>
                        <div>
                          <h3>{d.name}</h3>
                          <span className={`level-badge level-${level}`}>
                            Level {level} — {levels[level - 1].name}
                          </span>
                        </div>
                      </div>
                      <p className="can-do">{d.descriptors[level - 1]}</p>
                      <div className="application">
                        <span className="small-label">IN YOUR CLASSROOM</span>
                        <p>{path.applications[d.id]}</p>
                        <p>{path.landmarks[level - 1].example}</p>
                      </div>
                      <div className="card-next">
                        <span className="small-label">
                          {level === 6
                            ? "DEEPEN YOUR PRACTICE"
                            : `NEXT LANDMARK · ${levels[level].name.toUpperCase()}`}
                        </span>
                        <p>{d.activities[level - 1]}</p>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => {
                          patch({ focus: d.id });
                          go("next");
                        }}
                      >
                        Make this my next step
                        <ArrowRight size={16} />
                      </button>
                    </article>
                  );
                })}
              </div>
              <div className="next-step-band">
                <div>
                  <span className="eyebrow">ONE SMALL, MEANINGFUL STEP</span>
                  <h2>Where would you like to grow?</h2>
                  <p>
                    You choose the focus. Your teaching context matters more
                    than a number.
                  </p>
                </div>
                <div>
                  <label className="sr-only" htmlFor="focus-domain">
                    Choose your growth domain
                  </label>
                  <select
                    id="focus-domain"
                    value={state.focus}
                    onChange={(e) =>
                      patch({
                        focus: e.target.value as ReflectionState["focus"],
                      })
                    }
                  >
                    {domains.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <button className="button" onClick={() => go("next")}>
                    Build my next step
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
              <ExportActions onCopy={() => copy(makeSummary(state))} />
              <p className="profile-disclaimer">
                This profile reflects your own descriptions of your practice. It
                is not a validated proficiency test, certification, or judgment
                of your teaching. The scenarios do not affect your levels.
              </p>
            </section>
          )}

          {state.screen === "next" && (
            <section className="container next-section">
              <p className="eyebrow">05 / YOUR NEXT STEP</p>
              <H1 ref={heading}>
                Small enough to try.
                <br />
                <em>Meaningful enough to matter.</em>
              </H1>
              <p className="page-lead">Your focus: {focus.name}</p>
              <p className="muted">
                {path.title} · Choose one existing lesson and one small change.
              </p>
              <div className="landmark-pair">
                <div>
                  <span className="small-label">YOUR CURRENT LANDMARK</span>
                  <h2>
                    Level {current} — {levels[current - 1].name}
                  </h2>
                  <p>{focus.descriptors[current - 1]}</p>
                </div>
                <ArrowRight className="pair-arrow" />
                <div>
                  <span className="small-label">
                    {current === 6
                      ? "DEEPEN YOUR CURRENT LANDMARK"
                      : "YOUR NEXT LANDMARK"}
                  </span>
                  <h2>
                    Level {next} — {levels[next - 1].name}
                  </h2>
                  <p>
                    {current === 6
                      ? "Continue through collaborative inquiry, evidence, and sustainable improvement."
                      : focus.descriptors[next - 1]}
                  </p>
                </div>
              </div>
              <div className="challenge-card">
                <div className="number-label">01</div>
                <div>
                  <p className="eyebrow">YOUR CLASSROOM CHALLENGE</p>
                  <h2>Try this in one lesson.</h2>
                  <p>{path.landmarks[current - 1].next}</p>
                  <p>
                    <strong>Your domain focus:</strong>{" "}
                    {focus.activities[current - 1]}
                  </p>
                </div>
              </div>
              <div className="next-columns">
                <section className="prompt-card">
                  <div className="subsection-heading">
                    <span className="number-label">02</span>
                    <h2>A prompt to get you started.</h2>
                  </div>
                  <p className="muted">
                    Adapt the topic to your curriculum. Use an approved tool and
                    fictional context only.
                  </p>
                  <blockquote>{makePrompt(state)}</blockquote>
                  <button
                    className="button secondary"
                    onClick={() => copy(makePrompt(state))}
                  >
                    <Copy size={16} /> Copy example prompt
                  </button>
                </section>
                <section className="review-card">
                  <div className="subsection-heading">
                    <span className="number-label">03</span>
                    <h2>Before you use the output.</h2>
                  </div>
                  <p className="muted">AI drafts. You decide.</p>
                  <ul className="checklist">
                    {path.checklist.map((item) => (
                      <li key={item}>
                        <Check size={17} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="teacher-note">
                    <ShieldCheck size={20} />
                    <p>
                      Compare with an existing resource. If AI adds no learning
                      value, use the approach that serves your students best.
                    </p>
                  </div>
                </section>
              </div>
              <div className="reflection-card">
                <span className="eyebrow">04 / LOOK FOR LEARNING</span>
                <h2>{path.reflection}</h2>
                <p>
                  After the lesson, discuss one observation with a colleague.
                  Keep what helps; adjust what doesn’t.
                </p>
              </div>
              <ExportActions onCopy={() => copy(makeSummary(state))} />
              <div className="step-actions">
                <button className="text-button" onClick={() => go("profile")}>
                  <ArrowLeft size={16} /> Back to my profile
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    patch({ exploredLevel: next });
                    go("continuum");
                  }}
                >
                  Return to the proficiency continuum
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>
          )}

          {state.screen === "continuum" && (
            <section className="container continuum-section">
              <p className="eyebrow">THE DEVELOPMENTAL CONTINUUM</p>
              <H1 ref={heading}>
                Many ways to grow.
                <br />
                <em>Six landmarks to guide you.</em>
              </H1>
              <p className="page-lead">
                Explore what meaningful AI use can look like in your classroom.
              </p>
              <p className="muted">
                These describe practices, not personal identities. Select a
                landmark to explore.
              </p>
              <div className="continuum-controls">
                {pathwayPicker}
                {complete ? (
                  <button className="text-button" onClick={() => go("profile")}>
                    Back to my profile
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button className="text-button" onClick={start}>
                    Discover my starting point
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
              <div
                className="level-selector"
                role="group"
                aria-label="Developmental landmark"
              >
                {levels.map((l, i) => (
                  <button
                    key={l.name}
                    className={`level-${i + 1} ${state.exploredLevel === i + 1 ? "active" : ""}`}
                    aria-pressed={state.exploredLevel === i + 1}
                    onClick={() => patch({ exploredLevel: (i + 1) as Level })}
                  >
                    <span className="level-circle">{i + 1}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
              <div className="landmark-detail" aria-live="polite">
                <div className="landmark-description">
                  <span className="eyebrow">LEVEL {state.exploredLevel}</span>
                  <h2>{levels[state.exploredLevel - 1].name}</h2>
                  <p className="landmark-statement">
                    {levels[state.exploredLevel - 1].description}
                  </p>
                  <div className="support-note">
                    <span className="small-label">SUPPORT THAT MAY HELP</span>
                    <p>{levels[state.exploredLevel - 1].support}</p>
                  </div>
                </div>
                <div className="landmark-example">
                  <span className="small-label">
                    A CLASSROOM LANDMARK · {path.label.toUpperCase()}
                  </span>
                  <p>{path.landmarks[state.exploredLevel - 1].example}</p>
                  <div>
                    <span className="small-label">
                      {state.exploredLevel === 6
                        ? "KEEP EXPLORING"
                        : "A POSSIBLE NEXT ACTION"}
                    </span>
                    <p>{path.landmarks[state.exploredLevel - 1].next}</p>
                  </div>
                </div>
              </div>
              <div className="continuum-descriptors">
                <p className="eyebrow">
                  WHAT THIS CAN LOOK LIKE ACROSS THE FIVE DOMAINS
                </p>
                {domains.map((d, i) => {
                  const Icon = domainIcons[i];
                  return (
                    <div className="descriptor-row" key={d.id}>
                      <Icon size={21} strokeWidth={1.5} />
                      <h3>{d.name}</h3>
                      <p>{d.descriptors[state.exploredLevel - 1]}</p>
                    </div>
                  );
                })}
              </div>
              <div className="continuum-bottom">
                <p>
                  Thoughtful AI use includes knowing when to use another
                  approach.
                </p>
                <button className="button" onClick={start}>
                  Discover My AI Fluency
                  <ArrowRight size={18} />
                </button>
              </div>
            </section>
          )}

          {state.screen === "about" && (
            <section className="container about-section">
              <p className="eyebrow">ABOUT & METHODOLOGY</p>
              <H1 ref={heading}>
                A compass for reflection.
                <br />
                <em>Grounded in your practice.</em>
              </H1>
              <p className="page-lead">
                Created by Federico Orozco to help teachers recognize what they
                can do and imagine a useful next step.
              </p>
              <div className="methodology-list">
                {methodology.map((m, i) => (
                  <article key={m.title}>
                    <span className="number-label">0{i + 1}</span>
                    <div>
                      <h2>{m.title}</h2>
                      <p>{m.text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <section className="references">
                <h2>Further reading</h2>
                {references.map((r) => (
                  <a key={r.url} href={r.url} target="_blank" rel="noreferrer">
                    {r.title}
                    <ExternalLink size={15} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
                <p>
                  These sources provide context, not validation or endorsement
                  of this tool.
                </p>
              </section>
              <button className="button" onClick={start}>
                Find my starting point
                <ArrowRight size={18} />
              </button>
            </section>
          )}
        </div>
        {complete && <PrintProfile state={state} />}
        {copyFallback !== null && (
          <section
            className="copy-fallback container"
            aria-label="Copy text manually"
          >
            <div className="subsection-heading">
              <h2>Your text is ready</h2>
              <button
                className="icon-button"
                aria-label="Close copy text"
                onClick={() => setCopyFallback(null)}
              >
                <X />
              </button>
            </div>
            <p>
              Your browser could not access the clipboard. Select this text and
              use your device’s copy command.
            </p>
            <textarea
              aria-label="Text to copy"
              readOnly
              value={copyFallback}
              rows={12}
              onFocus={(e) => e.currentTarget.select()}
              autoFocus
            />
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <button className="brand" onClick={() => go("welcome")}>
              <Compass size={24} strokeWidth={1.4} />
              <span>
                AI Fluency <strong>Compass</strong>
              </span>
            </button>
            <p>A starting point for meaningful practice.</p>
          </div>
          <div className="footer-credit">
            Created by{" "}
            <a
              href="https://www.federicoorozco.co"
              target="_blank"
              rel="noreferrer"
            >
              Federico Orozco
              <ExternalLink size={12} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span>An original, independent self-reflection framework.</span>
          </div>
          <div className="footer-links">
            <button onClick={() => go("about")}>About & methodology</button>
            <button onClick={() => resetDialog.current?.showModal()}>
              <RotateCcw size={13} /> Reset saved reflection
            </button>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>For educators. For student learning. Always human-led.</span>
          <span>Free · Private · No account</span>
        </div>
      </footer>
      <div className={`toast ${notice ? "visible" : ""}`} role="status">
        {notice && (
          <>
            <Check size={17} />
            {notice}
          </>
        )}
      </div>
      <dialog
        ref={resetDialog}
        className="reset-dialog"
        aria-labelledby="reset-title"
      >
        <h2 id="reset-title">Start with a fresh compass?</h2>
        <p>
          This clears your answers, scenario choices, and pathway from this
          browser. You can copy or print your completed profile first.
        </p>
        <div className="dialog-actions">
          <button
            className="button secondary"
            autoFocus
            onClick={() => resetDialog.current?.close()}
          >
            Keep my reflection
          </button>
          <button className="button" onClick={reset}>
            Reset reflection
          </button>
        </div>
      </dialog>
    </>
  );
}

function ExportActions({ onCopy }: { onCopy: () => void }) {
  return (
    <div className="export-actions">
      <p>
        <strong>Take your reflection with you.</strong>
        <span>
          Keep it for yourself or start a conversation with a colleague.
        </span>
      </p>
      <div>
        <button className="button secondary" onClick={onCopy}>
          <Copy size={16} /> Copy text summary
        </button>
        <button className="button secondary" onClick={() => window.print()}>
          <Printer size={16} /> Print / Save PDF
        </button>
      </div>
    </div>
  );
}

function PrintProfile({ state }: { state: ReflectionState }) {
  const path = pathways.find((p) => p.id === state.pathway)!;
  const focus = domains.find((d) => d.id === state.focus)!;
  const current = state.answers[state.focus]!;
  return (
    <article className="print-only">
      <h1>AI Fluency Compass</h1>
      <p>Provisional self-reflection profile · {path.title}</p>
      <p>Created by Federico Orozco · www.federicoorozco.co</p>
      <hr />
      {domains.map((d) => {
        const level = state.answers[d.id]!;
        return (
          <section key={d.id}>
            <h2>
              {d.name} · Level {level} — {levels[level - 1].name}
            </h2>
            <p>{d.descriptors[level - 1]}</p>
            <p>
              <strong>Classroom application:</strong> {path.applications[d.id]}{" "}
              {path.landmarks[level - 1].example}
            </p>
            <p>
              <strong>
                {level === 6
                  ? "Deepen your practice"
                  : `Next landmark: Level ${level + 1} — ${levels[level].name}`}
                .
              </strong>{" "}
              {d.activities[level - 1]}
            </p>
          </section>
        );
      })}
      <section>
        <h2>My next step · {focus.name}</h2>
        <p>
          <strong>{path.landmarks[current - 1].next}</strong>
        </p>
        <p>{focus.activities[current - 1]}</p>
        <h3>Example prompt</h3>
        <p className="print-prompt">{makePrompt(state)}</p>
        <h3>Review checklist</h3>
        <ul>
          {path.checklist.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h3>Reflect on student learning</h3>
        <p>{path.reflection}</p>
      </section>
      <hr />
      <p>
        Statements directly determine each self-reported domain level. Scenarios
        are unscored; no overall score is calculated. This tool is unvalidated
        and independent of WIDA and other framework publishers.
      </p>
    </article>
  );
}
