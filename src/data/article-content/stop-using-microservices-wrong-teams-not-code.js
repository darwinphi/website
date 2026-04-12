export default {
  "sections": [
    {
      "id": "why-worse",
      "heading": "Why Microservices Often Make Things Worse",
      "blocks": [
        {
          "type": "text",
          "value": "Microservices have become the default architecture for many developers, especially those influenced by large-scale systems at companies like Netflix or Amazon. The promise sounds compelling: better scalability, cleaner modularity, and systems that mirror real-world domains."
        },
        {
          "type": "text",
          "value": "But this is where many teams go wrong."
        },
        {
          "type": "text",
          "value": "Most developers adopt microservices far too early, before they actually need them. They treat microservices as a technical upgrade rather than an architectural trade-off. If you look closely, this usually comes from a set of common misunderstandings about microservices. See: [The Biggest Misconceptions About Microservices](article:biggest-misconceptions-about-microservices)."
        },
        {
          "type": "text",
          "value": "Instead of making systems better, microservices often make them slower, harder to debug, and significantly more fragile. What was once a straightforward application becomes a distributed system overnight."
        }
      ]
    },
    {
      "id": "hidden-cost",
      "heading": "The Hidden Cost of Microservices",
      "blocks": [
        {
          "type": "text",
          "value": "Microservices do not reduce complexity. They redistribute it."
        },
        {
          "type": "text",
          "value": "In a monolithic architecture, complexity is mostly contained within a single process. Communication between components is fast, predictable, and easy to reason about. You are dealing with function calls, shared memory, and a single deployment unit."
        },
        {
          "type": "text",
          "value": "But once you move to microservices, that same complexity does not disappear. It spreads across the network."
        },
        {
          "type": "text",
          "value": "Now every interaction between components becomes a network call, and networks are inherently unreliable."
        },
        {
          "type": "subheading",
          "value": "You now have to deal with:"
        },
        {
          "type": "text",
          "value": "Latency that can slow down user requests."
        },
        {
          "type": "text",
          "value": "Partial failures where one service works but another does not."
        },
        {
          "type": "text",
          "value": "Retry mechanisms that can introduce duplicate actions."
        },
        {
          "type": "text",
          "value": "Timeouts that must be tuned carefully."
        },
        {
          "type": "text",
          "value": "Distributed debugging across multiple logs and systems."
        },
        {
          "type": "text",
          "value": "Data consistency challenges across separate databases."
        },
        {
          "type": "text",
          "value": "What used to be a simple local operation is now a coordination problem between independent systems."
        },
        {
          "type": "subheading",
          "value": "In a monolith, most things stay simple and local:"
        },
        {
          "type": "code",
          "value": "+------------------------------+\n|         Application          |\n|------------------------------|\n| Auth | Billing | Users | API |\n| Orders | Notifications | UI  |\n+------------------------------+\n               |\n            Database"
        },
        {
          "type": "subheading",
          "value": "In microservices, that same system becomes distributed:"
        },
        {
          "type": "code",
          "value": "+---------+    +----------+    +----------+\n|  Auth   |    |  Users   |    |  Orders  |\n+---------+    +----------+    +----------+\n     |              |               |\n     v              v               v\n DB(Auth)      DB(Users)      DB(Orders)\n\n         \\        |        /\n          \\       |       /\n           +------------------+\n           |   API Gateway    |\n           +------------------+"
        }
      ]
    },
    {
      "id": "solo-developer",
      "heading": "Scenario 1: Solo Developer (Worst Case)",
      "blocks": [
        {
          "type": "text",
          "value": "If you are a solo developer, microservices are almost always a bad idea."
        },
        {
          "type": "text",
          "value": "In a monolith, your workflow is simple and efficient. You call a function, it executes, and you move on. Everything is local, predictable, and easy to debug."
        },
        {
          "type": "text",
          "value": "But in a microservices setup, that same function call becomes a network request. Suddenly, you are dealing with infrastructure concerns instead of just business logic."
        },
        {
          "type": "subheading",
          "value": "A simple createUser() call now involves:"
        },
        {
          "type": "text",
          "value": "Network latency, request failures, retry logic, timeout handling, and logging across services."
        },
        {
          "type": "text",
          "value": "Instead of focusing on building features, you are spending time managing distributed systems complexity. That is a massive overhead for a single developer."
        },
        {
          "type": "subheading",
          "value": "In a monolith:"
        },
        {
          "type": "code",
          "value": "[ App ] -> createUser()"
        },
        {
          "type": "subheading",
          "value": "In microservices:"
        },
        {
          "type": "code",
          "value": "[ Service A ] -> network -> [ Service B ]"
        },
        {
          "type": "text",
          "value": "A simple function call becomes a distributed systems problem."
        }
      ]
    },
    {
      "id": "small-team",
      "heading": "Scenario 2: Small Team (Still Painful)",
      "blocks": [
        {
          "type": "text",
          "value": "Even with a small team, microservices can still cause more harm than good."
        },
        {
          "type": "text",
          "value": "At this stage, team boundaries are usually not well-defined. Developers often work across multiple parts of the system, and responsibilities tend to overlap. Introducing microservices in this environment creates artificial boundaries that do not match how the team actually operates."
        },
        {
          "type": "text",
          "value": "Instead of reducing coordination, you increase it."
        },
        {
          "type": "subheading",
          "value": "Now developers need to:"
        },
        {
          "type": "text",
          "value": "Coordinate API contracts between services, manage versioning and backward compatibility, handle cross-service dependencies, and synchronize deployments across multiple services."
        },
        {
          "type": "text",
          "value": "What used to be an internal refactor becomes a cross-team negotiation, even if the teams are only two or three people."
        }
      ]
    },
    {
      "id": "realization",
      "heading": "The Realization: It's Not About Code",
      "blocks": [
        {
          "type": "text",
          "value": "This is the key insight most people miss."
        },
        {
          "type": "text",
          "value": "Microservices are not about organizing code. They are about organizing teams."
        },
        {
          "type": "text",
          "value": "The structure of your architecture should reflect the structure of your organization. This idea is closely related to Conway's Law: systems tend to mirror the communication patterns of the teams that build them."
        },
        {
          "type": "text",
          "value": "If you have a single team, a monolith is often the most efficient architecture. Everyone works in the same codebase, shares context, and moves quickly."
        },
        {
          "type": "text",
          "value": "But when you have multiple teams working independently, microservices start to make sense. Each team can own a service, deploy independently, and evolve its part of the system without blocking others."
        },
        {
          "type": "text",
          "value": "In other words, microservices are a scaling solution for organizations, not just applications."
        }
      ]
    },
    {
      "id": "single-team",
      "heading": "Single Team",
      "blocks": [
        {
          "type": "code",
          "value": "[ Team ]\n    |\n    v\n[ Monolith ]"
        }
      ]
    },
    {
      "id": "multiple-teams",
      "heading": "Multiple Teams",
      "blocks": [
        {
          "type": "code",
          "value": "[Team A]   [Team B]   [Team C]\n    |         |         |\n    v         v         v\n[Service A] [Service B] [Service C]"
        }
      ]
    },
    {
      "id": "when-makes-sense",
      "heading": "When Microservices Actually Make Sense",
      "blocks": [
        {
          "type": "code",
          "value": "        +-------------------+\n        |    API Gateway    |\n        +-------------------+\n          /       |       \\\n         v        v        v\n    [Users]   [Orders]  [Payments]\n       |          |          |\n    Team A     Team B     Team C"
        },
        {
          "type": "text",
          "value": "Microservices shine when you have clear team boundaries and enough organizational complexity to justify them."
        },
        {
          "type": "text",
          "value": "If you have multiple teams, each responsible for a distinct domain such as users, orders, or payments, microservices allow those teams to operate autonomously."
        },
        {
          "type": "text",
          "value": "They can deploy independently, scale services based on demand, choose technologies suited to their domain, and avoid stepping on each other's toes."
        },
        {
          "type": "text",
          "value": "At this stage, the overhead of distributed systems becomes a worthwhile trade-off because it enables team scalability. Without this context, microservices are just unnecessary complexity."
        }
      ]
    },
    {
      "id": "what-instead",
      "heading": "What You Should Do Instead",
      "blocks": [
        {
          "type": "code",
          "value": "/modules\n  /users\n  /billing\n  /auth\n  /orders"
        },
        {
          "type": "text",
          "value": "Start with a modular monolith."
        },
        {
          "type": "text",
          "value": "This approach gives you the best of both worlds: simplicity and structure."
        },
        {
          "type": "text",
          "value": "Organize your codebase into clear modules such as users, billing, auth, and orders, but keep everything within a single application. This lets you maintain fast local communication, avoid network-related complexity, and refactor as your understanding of the domain evolves."
        },
        {
          "type": "text",
          "value": "As your system and team grow, these modules can naturally evolve into separate services if needed. But you are not forced into that complexity prematurely."
        },
        {
          "type": "text",
          "value": "Think of it as microservices later, if necessary."
        }
      ]
    },
    {
      "id": "tldr",
      "heading": "TL;DR",
      "blocks": [
        {
          "type": "text",
          "value": "Microservices often make things worse early."
        },
        {
          "type": "text",
          "value": "They introduce distributed complexity."
        },
        {
          "type": "text",
          "value": "They only make sense for multiple teams."
        },
        {
          "type": "text",
          "value": "Start with a modular monolith."
        }
      ]
    }
  ]
};
