export default {
  "sections": [
    {
      "id": "from-name-to-mindset",
      "heading": "From a Name to a Mindset",
      "blocks": [
        {
          "type": "text",
          "value": "As someone who grew up with the name Darwin, I didn't really have a choice - my name came with built-in jokes. Every time Charles Darwin was mentioned in class, I could already feel it coming. Heads would slowly turn, and my classmates would look straight at me like I had something to do with the theory of evolution."
        },
        {
          "type": "text",
          "value": "It became a running joke from elementary to high school. At some point, I just learned to own it."
        },
        {
          "type": "text",
          "value": "Ironically, one of his ideas stayed with me - not because of biology, but because of how closely it mirrors life as a developer:"
        },
        {
          "type": "blockquote",
          "value": "\"The mystery of beginning is insoluble by us; I for one must be content to remain agnostic.\""
        },
        {
          "type": "text",
          "value": "At first, it sounds philosophical. But in software engineering, it feels practical. Almost daily."
        }
      ]
    },
    {
      "id": "software-is-built-on-unknowns",
      "heading": "Software is Built on Unknowns",
      "blocks": [
        {
          "type": "text",
          "value": "In theory, systems are logical and deterministic. In reality, they are full of unknowns. We work with:"
        },
        {
          "type": "list-item",
          "value": "Code we didn't write."
        },
        {
          "type": "list-item",
          "value": "Decisions we don't fully understand."
        },
        {
          "type": "list-item",
          "value": "Systems that evolved over years."
        },
        {
          "type": "list-item",
          "value": "Behaviors that only show up in production."
        },
        {
          "type": "text",
          "value": "You don't always get a clean beginning. Sometimes, you just inherit the middle of the story."
        }
      ]
    },
    {
      "id": "what-senior-developers-actually-do",
      "heading": "What Senior Developers Actually Do",
      "blocks": [
        {
          "type": "text",
          "value": "There is a misconception that senior engineers \"know everything.\" They do not. What they actually do is:"
        },
        {
          "type": "list-item",
          "value": "Reduce uncertainty where possible."
        },
        {
          "type": "list-item",
          "value": "Design systems that tolerate unknowns."
        },
        {
          "type": "list-item",
          "value": "Validate assumptions through testing and observability."
        },
        {
          "type": "list-item",
          "value": "Avoid pretending they fully understand things they don't."
        },
        {
          "type": "list-item",
          "value": "Senior engineering is not about certainty."
        },
        {
          "type": "text",
          "value": "It's about operating safely without it."
        }
      ]
    },
    {
      "id": "real-world-scenarios",
      "heading": "5 Real-World Scenarios",
      "isGroupLabel": true,
      "blocks": [
        {
          "type": "text",
          "value": "Here are five real-world scenarios where uncertainty is part of the job, and good engineering makes the difference."
        }
      ]
    },
    {
      "id": "legacy-code-you-didnt-write",
      "heading": "1. Legacy Code You Didn't Write",
      "blocks": [
        {
          "type": "text",
          "value": "A common real-world case is inheriting pricing, billing, or payroll logic that nobody fully understands anymore."
        },
        {
          "type": "text",
          "value": "The safe move is not to rewrite immediately. The safe move is to preserve current behavior with tests, then improve around it."
        },
        {
          "type": "code",
          "value": "type CustomerType = 'regular' | 'vip';\n\ntype PricingInput = {\n  customerType: CustomerType;\n  subtotal: number;\n};\n\nexport const legacyCalculatePrice = ({\n  customerType,\n  subtotal,\n}: PricingInput): number => {\n  if (customerType === 'vip') return subtotal * 0.85;\n  return subtotal;\n};\n\nexport const calculateFinalPrice = ({\n  customerType,\n  subtotal,\n}: PricingInput): number => {\n  if (subtotal < 0) {\n    throw new Error('Subtotal cannot be negative');\n  }\n\n  return Number(legacyCalculatePrice({ customerType, subtotal }).toFixed(2));\n};"
        },
        {
          "type": "code",
          "value": "// pricing.test.ts\nimport { describe, expect, it } from 'vitest';\nimport { calculateFinalPrice } from './pricing';\n\ndescribe('calculateFinalPrice', () => {\n  it('keeps regular pricing unchanged', () => {\n    expect(\n      calculateFinalPrice({ customerType: 'regular', subtotal: 100 }),\n    ).toBe(100);\n  });\n\n  it('keeps vip discount behavior unchanged', () => {\n    expect(calculateFinalPrice({ customerType: 'vip', subtotal: 100 })).toBe(\n      85,\n    );\n  });\n});"
        },
        {
          "type": "text",
          "value": "Real-life application: e-commerce discounts, payroll rules, invoicing systems."
        }
      ]
    },
    {
      "id": "debugging-distributed-systems",
      "heading": "2. Debugging Distributed Systems",
      "blocks": [
        {
          "type": "text",
          "value": "In production, one user request might touch an API gateway, auth service, order service, payment service, and database."
        },
        {
          "type": "text",
          "value": "You often cannot know what happened by checking only one place. That is why observability matters."
        },
        {
          "type": "code",
          "value": "// request-context.ts\nimport { randomUUID } from 'crypto'\nimport type { NextFunction, Request, Response } from 'express'\n\nexport type RequestWithContext = Request & {\n  requestId?: string\n}\n\n/**\n * Adds a request ID to correlate logs across services.\n */\nexport const attachRequestContext = (\n  req: RequestWithContext,\n  res: Response,\n  next: NextFunction,\n) => {\n  const requestId = req.headers['x-request-id']?.toString() ?? randomUUID()\n\n  req.requestId = requestId\n  res.setHeader('x-request-id', requestId)\n\n  next()\n}"
        },
        {
          "type": "code",
          "value": "// logger.ts\ntype LogInput = {\n  level: 'info' | 'error'\n  message: string\n  requestId?: string\n  meta?: Record<string, unknown>\n}\n\nexport const log = ({ level, message, requestId, meta }: LogInput) => {\n  console.log(\n    JSON.stringify({\n      timestamp: new Date().toISOString(),\n      level,\n      message,\n      requestId,\n      ...meta,\n    }),\n  )\n}"
        },
        {
          "type": "code",
          "value": "// orders-route.ts\nimport express from 'express'\nimport { log } from './logger'\nimport type { RequestWithContext } from './request-context'\n\nconst router = express.Router()\n\nrouter.get('/orders/:id', async (req: RequestWithContext, res) => {\n  try {\n    const { id } = req.params\n\n    log({\n      level: 'info',\n      message: 'Fetching order',\n      requestId: req.requestId,\n      meta: { orderId: id },\n    })\n\n    const order = { id, total: 1499 }\n\n    res.json(order)\n  } catch (error) {\n    log({\n      level: 'error',\n      message: 'Failed to fetch order',\n      requestId: req.requestId,\n      meta: {\n        error: error instanceof Error ? error.message : 'Unknown error',\n      },\n    })\n\n    res.status(500).json({ message: 'Internal server error' })\n  }\n})\n\nexport default router"
        },
        {
          "type": "text",
          "value": "Real-life application: slow APIs, tracing request failures, debugging microservices."
        }
      ]
    },
    {
      "id": "third-party-api-uncertainty",
      "heading": "3. Third-Party API Uncertainty",
      "blocks": [
        {
          "type": "text",
          "value": "Shipping APIs, payment gateways, SMS providers, and exchange-rate services are outside your control."
        },
        {
          "type": "text",
          "value": "You do not fully know how they behave internally, so you code defensively."
        },
        {
          "type": "code",
          "value": "export const getShippingRate = async (zip: string) => {\n  const controller = new AbortController();\n  const timeout = setTimeout(() => controller.abort(), 3000);\n\n  try {\n    const res = await fetch(`https://api.example.com/shipping?zip=${zip}`, {\n      signal: controller.signal,\n    });\n\n    if (!res.ok) throw new Error('API failed');\n\n    const data = await res.json();\n\n    return {\n      provider: 'third-party',\n      amount: data?.rates?.[0]?.amount ?? 150,\n      currency: data?.rates?.[0]?.currency ?? 'PHP',\n    };\n  } catch {\n    return {\n      provider: 'fallback',\n      amount: 150,\n      currency: 'PHP',\n    };\n  } finally {\n    clearTimeout(timeout);\n  }\n};"
        },
        {
          "type": "text",
          "value": "Real-life application: logistics, payments, notifications, auth providers."
        }
      ]
    },
    {
      "id": "rolling-out-risky-features-safely",
      "heading": "4. Rolling out risky features safely",
      "blocks": [
        {
          "type": "text",
          "value": "Sometimes you are not fully certain how a new checkout flow, recommendation engine, or search logic will behave in production."
        },
        {
          "type": "text",
          "value": "Instead of betting everything on certainty, you use feature flags."
        },
        {
          "type": "code",
          "value": "// useFeatureFlag.tsx\nimport { useMemo } from 'react'\n\ntype FeatureFlags = {\n  newCheckout: boolean\n}\n\nconst flags: FeatureFlags = {\n  newCheckout: false,\n}\n\nexport const useFeatureFlag = (flagName: keyof FeatureFlags) => {\n  return useMemo(() => flags[flagName], [flagName])\n}"
        },
        {
          "type": "code",
          "value": "// CheckoutPage.tsx\nimport { useFeatureFlag } from './useFeatureFlag'\n\nconst OldCheckout = () => <div>Old checkout flow</div>\nconst NewCheckout = () => <div>New checkout flow</div>\n\nexport const CheckoutPage = () => {\n  const isNewCheckoutEnabled = useFeatureFlag('newCheckout')\n\n  return isNewCheckoutEnabled ? <NewCheckout /> : <OldCheckout />\n}"
        },
        {
          "type": "text",
          "value": "Real-life application: staged rollouts, A/B tests, redesign launches, risky backend migrations."
        }
      ]
    },
    {
      "id": "idempotent-webhooks",
      "heading": "5. Idempotent Webhooks",
      "blocks": [
        {
          "type": "text",
          "value": "In real systems, the same webhook may be delivered twice, or events may arrive out of order."
        },
        {
          "type": "text",
          "value": "If your system assumes ideal conditions, it will eventually break."
        },
        {
          "type": "text",
          "value": "Good systems accept that uncertainty and guard against it."
        },
        {
          "type": "code",
          "value": "// webhook-handler.ts\n\ntype PaymentEvent = {\n  id: string\n  type: 'payment.success'\n  orderId: string\n}\n\nconst processedEvents = new Set<string>()\n\n/**\n * Handles webhook events safely using idempotency.\n */\nexport const handlePaymentWebhook = async (event: PaymentEvent) => {\n  if (processedEvents.has(event.id)) {\n    return {\n      status: 'ignored',\n      reason: 'duplicate_event',\n    }\n  }\n\n  processedEvents.add(event.id)\n\n  if (event.type === 'payment.success') {\n    return {\n      status: 'processed',\n      orderId: event.orderId,\n    }\n  }\n\n  return {\n    status: 'ignored',\n    reason: 'unsupported_event_type',\n  }\n}"
        },
        {
          "type": "text",
          "value": "Real-life application: payment processing, subscriptions, order fulfillment, event-driven workflows."
        }
      ]
    },
    {
      "id": "final-thought",
      "heading": "Final Thought",
      "blocks": [
        {
          "type": "text",
          "value": "For someone who grew up being compared to Darwin, I never expected his ideas to resonate with my work as a developer. Yet here I am, working with systems I did not start, solving problems I cannot always fully explain, and still moving forward. What defines a strong developer is the ability to design with that in mind: to make systems observable, testable, and resilient. In that sense, Darwin's perspective still applies - progress comes not from complete understanding, but from disciplined iteration within the limits of what we know."
        }
      ]
    }
  ]
};
