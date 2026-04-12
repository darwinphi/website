export default {
  "sections": [
    {
      "id": "intro",
      "heading": null,
      "blocks": [
        {
          "type": "text",
          "value": "Many developers choose microservices with a strong sense of confidence. The reasoning often sounds solid on the surface, but it usually lacks depth."
        },
        {
          "type": "text",
          "value": "These decisions are rarely based on actual system needs or team constraints. Instead, they are driven by assumptions that do not hold up in practice."
        },
        {
          "type": "text",
          "value": "Let's examine the most common ones."
        }
      ]
    },
    {
      "id": "my-app-scalable",
      "heading": "#1 Microservices Will Make My App Scalable",
      "blocks": [
        {
          "type": "text",
          "value": "Many developers believe that adopting microservices will automatically make their system scalable. This assumption is misleading."
        },
        {
          "type": "text",
          "value": "Scalability is not a direct result of splitting an application into services. A well-structured monolith can scale effectively using horizontal scaling, caching, and database optimization."
        },
        {
          "type": "text",
          "value": "Microservices only become useful when you have identified specific parts of your system that require independent scaling. Without that clarity, introducing services adds complexity without solving any real problem."
        }
      ]
    },
    {
      "id": "big-companies",
      "heading": "#2 Big Companies Use Microservices",
      "blocks": [
        {
          "type": "text",
          "value": "Developers often look at companies like Netflix and Amazon and assume microservices are the reason behind their success."
        },
        {
          "type": "text",
          "value": "This interpretation is incorrect."
        },
        {
          "type": "text",
          "value": "These companies adopted microservices because they reached a scale where a monolith could no longer support their organizational structure. Their architecture evolved as a response to their constraints. Using the same architecture without having the same constraints leads to unnecessary complexity rather than better systems."
        }
      ]
    },
    {
      "id": "code-modular",
      "heading": "#3 It Will Make My Code Modular",
      "blocks": [
        {
          "type": "text",
          "value": "It is common to think that microservices improve modularity. However, microservices do not create good boundaries - they only enforce them."
        },
        {
          "type": "text",
          "value": "If your domain boundaries are unclear, splitting your system into services will expose and amplify those issues. Services will become tightly coupled through APIs, and communication overhead will increase."
        },
        {
          "type": "text",
          "value": "Modularity should first be achieved within a monolith through clear structure and separation of concerns. Only then does it make sense to consider extracting services."
        }
      ]
    },
    {
      "id": "team-independence",
      "heading": "#4 Teams Will Be More Independent",
      "blocks": [
        {
          "type": "text",
          "value": "Many assume that microservices immediately enable team independence. In practice, this is rarely true for small teams."
        },
        {
          "type": "text",
          "value": "Instead of reducing dependencies, microservices introduce new forms of coordination. Developers must align on API contracts, manage versioning, and coordinate deployments across services."
        },
        {
          "type": "text",
          "value": "Independence comes from clear ownership and well-defined boundaries. Without those, microservices increase friction rather than reduce it."
        }
      ]
    },
    {
      "id": "easier-to-maintain",
      "heading": "#5 It's Easier to Maintain",
      "blocks": [
        {
          "type": "text",
          "value": "It is often argued that microservices are easier to maintain because each service is smaller. While this is true at the service level, it ignores the complexity of the system as a whole."
        },
        {
          "type": "text",
          "value": "Maintaining a microservices architecture involves handling distributed systems concerns such as monitoring, logging, service communication, and deployment pipelines."
        },
        {
          "type": "text",
          "value": "The complexity does not disappear - it shifts from code into infrastructure and operations."
        }
      ]
    },
    {
      "id": "failures-isolated",
      "heading": "#6 Failures Are Isolated",
      "blocks": [
        {
          "type": "text",
          "value": "There is a belief that microservices naturally isolate failures. This is only true when the system is designed with resilience in mind."
        },
        {
          "type": "text",
          "value": "Without proper safeguards, failures can cascade across services. A delay or failure in one service can affect others that depend on it, leading to system-wide issues."
        },
        {
          "type": "text",
          "value": "Failure isolation requires deliberate design, not just architectural separation."
        }
      ]
    },
    {
      "id": "any-tech-per-service",
      "heading": "#7 We Can Use Any Tech Per Service",
      "blocks": [
        {
          "type": "text",
          "value": "Microservices allow teams to choose different technologies for each service. While this provides flexibility, it also introduces significant overhead."
        },
        {
          "type": "text",
          "value": "Multiple technologies increase cognitive load, complicate onboarding, and create inconsistencies across the system."
        },
        {
          "type": "text",
          "value": "For most teams, especially smaller ones, maintaining consistency is far more valuable than having flexibility."
        }
      ]
    },
    {
      "id": "need-it-eventually",
      "heading": "#8 We'll Need It Eventually Anyway",
      "blocks": [
        {
          "type": "text",
          "value": "Some teams adopt microservices early because they assume they will need them in the future. This assumption often leads to premature complexity."
        },
        {
          "type": "text",
          "value": "Early architectural decisions can become difficult to reverse. Poor service boundaries and unnecessary distribution make future changes more expensive and time-consuming."
        },
        {
          "type": "text",
          "value": "Starting simple allows systems to evolve naturally based on real needs rather than assumptions."
        }
      ]
    },
    {
      "id": "pattern-behind-mistakes",
      "heading": "The Pattern Behind All These Mistakes",
      "blocks": [
        {
          "type": "text",
          "value": "These misconceptions stem from a common misunderstanding. Developers often treat microservices as a way to improve code organization."
        },
        {
          "type": "text",
          "value": "In reality, microservices are primarily an organizational tool. They are designed to support team structure, ownership, and scaling at the organizational level."
        },
        {
          "type": "text",
          "value": "When those conditions are not present, microservices introduce more problems than they solve."
        },
        {
          "type": "text",
          "value": "If you want a deeper breakdown of this idea, read: [Stop Using Microservices Wrong - It is About Teams, Not Code](article:stop-using-microservices-wrong-teams-not-code)."
        }
      ]
    }
  ]
};
