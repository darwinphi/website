// Article metadata kept lightweight for list/detail chrome.
// Full article bodies are lazy-loaded from ./article-content/<id>.js.
export const articles = [
  {
    "id": "from-classroom-jokes-to-code-what-being-darwin-taught-me-about-software",
    "title": "From Classroom Jokes to Code: What Being \"Darwin\" Taught Me About Software",
    "date": "Apr 9, 2026",
    "tags": [
      "typescript",
      "programming",
      "backend",
      "softwareengineering"
    ],
    "preview": "Growing up with the name Darwin taught me a practical software lesson: strong engineers do not remove uncertainty, they learn to design safely around it.",
    "toc": [
      {
        "label": "From a Name to a Mindset",
        "id": "from-name-to-mindset"
      },
      {
        "label": "Software is Built on Unknowns",
        "id": "software-is-built-on-unknowns"
      },
      {
        "label": "What Senior Developers Actually Do",
        "id": "what-senior-developers-actually-do"
      },
      {
        "label": "5 Real-World Scenarios",
        "id": "real-world-scenarios",
        "isGroup": true
      },
      {
        "label": "1. Legacy Code You Didn't Write",
        "id": "legacy-code-you-didnt-write",
        "indent": true
      },
      {
        "label": "2. Debugging Distributed Systems",
        "id": "debugging-distributed-systems",
        "indent": true
      },
      {
        "label": "3. Third-Party API Uncertainty",
        "id": "third-party-api-uncertainty",
        "indent": true
      },
      {
        "label": "4. Rolling out risky features safely",
        "id": "rolling-out-risky-features-safely",
        "indent": true
      },
      {
        "label": "5. Idempotent Webhooks",
        "id": "idempotent-webhooks",
        "indent": true
      },
      {
        "label": "Final Thought",
        "id": "final-thought"
      }
    ],
    "readingTimeMinutes": 6
  },
  {
    "id": "stop-using-microservices-wrong-teams-not-code",
    "title": "Stop Using Microservices Wrong - It is About Teams, Not Code",
    "date": "Apr 8, 2026",
    "tags": [
      "webdev",
      "microservices",
      "architecture",
      "backend"
    ],
    "preview": "Microservices are not a code organization trick. They are a team-scaling tool, and using them too early usually makes systems worse.",
    "toc": [
      {
        "label": "Why Microservices Often Make Things Worse",
        "id": "why-worse",
        "indent": true
      },
      {
        "label": "The Hidden Cost of Microservices",
        "id": "hidden-cost",
        "indent": true
      },
      {
        "label": "Scenario 1: Solo Developer (Worst Case)",
        "id": "solo-developer",
        "indent": true
      },
      {
        "label": "Scenario 2: Small Team (Still Painful)",
        "id": "small-team",
        "indent": true
      },
      {
        "label": "The Realization: It's Not About Code",
        "id": "realization",
        "indent": true
      },
      {
        "label": "Single Team",
        "id": "single-team",
        "indent": true
      },
      {
        "label": "Multiple Teams",
        "id": "multiple-teams",
        "indent": true
      },
      {
        "label": "When Microservices Actually Make Sense",
        "id": "when-makes-sense",
        "indent": true
      },
      {
        "label": "What You Should Do Instead",
        "id": "what-instead",
        "indent": true
      },
      {
        "label": "TL;DR",
        "id": "tldr"
      }
    ],
    "readingTimeMinutes": 5
  },
  {
    "id": "biggest-misconceptions-about-microservices",
    "title": "The 8 Biggest Misconceptions About Microservices",
    "date": "Apr 8, 2026",
    "tags": [
      "microservices",
      "architecture",
      "backend"
    ],
    "preview": "Microservices are often chosen for the wrong reasons. Here are the eight most common misconceptions and the pattern that connects them.",
    "toc": [
      {
        "label": "#1 Microservices Will Make My App Scalable",
        "id": "my-app-scalable",
        "indent": true
      },
      {
        "label": "#2 Big Companies Use Microservices",
        "id": "big-companies",
        "indent": true
      },
      {
        "label": "#3 It Will Make My Code Modular",
        "id": "code-modular",
        "indent": true
      },
      {
        "label": "#4 Teams Will Be More Independent",
        "id": "team-independence",
        "indent": true
      },
      {
        "label": "#5 It's Easier to Maintain",
        "id": "easier-to-maintain",
        "indent": true
      },
      {
        "label": "#6 Failures Are Isolated",
        "id": "failures-isolated",
        "indent": true
      },
      {
        "label": "#7 We Can Use Any Tech Per Service",
        "id": "any-tech-per-service",
        "indent": true
      },
      {
        "label": "#8 We'll Need It Eventually Anyway",
        "id": "need-it-eventually",
        "indent": true
      },
      {
        "label": "The Pattern Behind All These Mistakes",
        "id": "pattern-behind-mistakes"
      }
    ],
    "readingTimeMinutes": 4
  },
  {
    "id": "database-connection-pool",
    "title": "What is Database Connection Pool?",
    "date": "Aug 24, 2025",
    "tags": [
      "database",
      "sql",
      "nosql",
      "backend"
    ],
    "preview": "A database connection pool is a cache of database connections kept ready for your app. Instead of creating new connections per request, borrow from the pool.",
    "toc": [
      {
        "label": "Introduction",
        "id": "intro2",
        "indent": true
      },
      {
        "label": "Why Creating New Connections is Slow?",
        "id": "why-slow",
        "indent": true
      },
      {
        "label": "How a Connection Pool Works",
        "id": "how-pool-works",
        "indent": true
      },
      {
        "label": "The Lifecycle of a Pooled Connection",
        "id": "lifecycle",
        "indent": true
      },
      {
        "label": "Common Pool Settings",
        "id": "common-settings",
        "indent": true
      },
      {
        "label": "Challenges and Solutions",
        "id": "challenges",
        "indent": true
      },
      {
        "label": "Traffic Spikes",
        "id": "traffic-spikes",
        "indent": true
      },
      {
        "label": "Oversized Pools",
        "id": "oversized",
        "indent": true
      },
      {
        "label": "Key Takeaways",
        "id": "key-takeaways",
        "indent": true
      },
      {
        "label": "Conclusion",
        "id": "conclusion-pool"
      }
    ],
    "readingTimeMinutes": 8
  },
  {
    "id": "tiny-llm-potato-computer",
    "title": "How to Run a Tiny LLM in a Potato Computer",
    "date": "June 11, 2025",
    "tags": [
      "llm",
      "tinyllama",
      "ai",
      "docker"
    ],
    "preview": "Running large language models locally can feel impossible on an 8 GB Mac M1. Fortunately, TinyLlama (1.1 B parameters) and llama.cpp Docker make it dead simple.",
    "toc": [
      {
        "label": "Step 1: Download the Model",
        "id": "step-1",
        "indent": true
      },
      {
        "label": "Step 2: Pull Docker Image",
        "id": "step-2",
        "indent": true
      },
      {
        "label": "Step 3: Run the Server",
        "id": "step-3",
        "indent": true
      },
      {
        "label": "Step 4: Query the Model",
        "id": "step-4",
        "indent": true
      },
      {
        "label": "Troubleshooting Tips",
        "id": "troubleshooting"
      },
      {
        "label": "Conclusion",
        "id": "conclusion"
      }
    ],
    "readingTimeMinutes": 2
  },
  {
    "id": "tdd-pros-and-cons",
    "title": "Test First or Regret Later: The Pros and Cons of TDD",
    "date": "May 4, 2025",
    "tags": [
      "tdd",
      "javascript",
      "node",
      "jest"
    ],
    "preview": "Let's be honest -- when I first heard about TDD, my reaction was: \"Wait, you want me to write tests before I even write the code? That's like writing a movie review before watching the film.\"",
    "toc": [
      {
        "label": "Pros",
        "id": "pros",
        "isGroup": true
      },
      {
        "label": "1. Better Functions Through DI",
        "id": "pro-1",
        "indent": true
      },
      {
        "label": "2. Refactoring Without Fear",
        "id": "pro-2",
        "indent": true
      },
      {
        "label": "3. Tests as Documentation",
        "id": "pro-3",
        "indent": true
      },
      {
        "label": "4. Maintainability",
        "id": "pro-4",
        "indent": true
      },
      {
        "label": "5. Catch Bugs Early",
        "id": "pro-5",
        "indent": true
      },
      {
        "label": "6. Code Coverage",
        "id": "pro-6",
        "indent": true
      },
      {
        "label": "TDD Isn't Perfect",
        "id": "cons",
        "isGroup": true
      },
      {
        "label": "1. Steep Learning Curve",
        "id": "con-1",
        "indent": true
      },
      {
        "label": "2. Slows You Down at First",
        "id": "con-2",
        "indent": true
      },
      {
        "label": "3. Hard to Test Everything",
        "id": "con-3",
        "indent": true
      },
      {
        "label": "4. Test Hell",
        "id": "con-4",
        "indent": true
      },
      {
        "label": "5. Doesn't Replace QA",
        "id": "con-5",
        "indent": true
      },
      {
        "label": "6. Overkill for Small Scripts",
        "id": "con-6",
        "indent": true
      },
      {
        "label": "7. Budget Clients",
        "id": "con-7",
        "indent": true
      },
      {
        "label": "Final Thoughts",
        "id": "final-thoughts"
      }
    ],
    "readingTimeMinutes": 10
  },
  {
    "id": "free-tools-visualize-color-palette-ui-components",
    "title": "5 Free Tools to Visualize Your Color Palette on Real UI Components (Updated)",
    "date": "May 1, 2025",
    "tags": [
      "design",
      "frontend",
      "ui",
      "ux"
    ],
    "preview": "Picking colors in a swatch is one thing. Seeing them on buttons, navbars, alerts, and full layouts is where better UI decisions happen.",
    "toc": [
      {
        "label": "Why Palette Visualization Matters",
        "id": "why-palette-visualization",
        "indent": true
      },
      {
        "label": "1. Realtime Colors",
        "id": "realtime-colors",
        "indent": true
      },
      {
        "label": "2. PaletteMaker",
        "id": "palettemaker",
        "indent": true
      },
      {
        "label": "3. Material Design Color Tool",
        "id": "material-design-color-tool",
        "indent": true
      },
      {
        "label": "4. Happy Hues",
        "id": "happy-hues",
        "indent": true
      },
      {
        "label": "5. Coolors' Palette Visualizer",
        "id": "coolors-palette-visualizer",
        "indent": true
      },
      {
        "label": "Bonus Tip",
        "id": "bonus-tip",
        "indent": true
      },
      {
        "label": "Wrap-up",
        "id": "wrap-up"
      }
    ],
    "readingTimeMinutes": 3
  },
  {
    "id": "elixir-features-not-in-js",
    "title": "10 Unique Elixir Language Features Not Present in JavaScript",
    "date": "Nov 5, 2024",
    "tags": [
      "functional",
      "programming",
      "javascript",
      "elixir"
    ],
    "preview": "JavaScript is versatile and widely used, but when it comes to functional programming, concurrency, and fault tolerance, Elixir introduces features that JavaScript simply doesn't natively offer.",
    "toc": [
      {
        "label": "1. Pipe Operator (|>)",
        "id": "pipe-operator",
        "indent": true
      },
      {
        "label": "2. Pattern Matching",
        "id": "pattern-matching",
        "indent": true
      },
      {
        "label": "3. Immutable Data by Default",
        "id": "immutable-data",
        "indent": true
      },
      {
        "label": "4. Function Clauses",
        "id": "function-clauses",
        "indent": true
      },
      {
        "label": "5. Guards in Function Clauses",
        "id": "guards",
        "indent": true
      },
      {
        "label": "6. with Expression",
        "id": "with-expression",
        "indent": true
      },
      {
        "label": "7. Tail Call Optimization",
        "id": "tco",
        "indent": true
      },
      {
        "label": "8. Processes & Actor Model",
        "id": "actor-model",
        "indent": true
      },
      {
        "label": "9. @doc & Doc Generation",
        "id": "doc-generation",
        "indent": true
      },
      {
        "label": "10. Declarative Macros",
        "id": "macros",
        "indent": true
      },
      {
        "label": "Conclusion",
        "id": "conclusion"
      }
    ],
    "readingTimeMinutes": 11
  }
];

const articleContentLoaders = import.meta.glob('./article-content/*.js');

export async function loadArticleContent(articleId) {
  const loader = articleContentLoaders[`./article-content/${articleId}.js`];

  if (!loader) {
    return null;
  }

  const module = await loader();
  return module.default ?? module;
}
