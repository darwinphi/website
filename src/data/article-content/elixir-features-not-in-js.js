export default {
  "sections": [
    {
      "id": "intro",
      "heading": null,
      "blocks": [
        {
          "type": "text",
          "value": "JavaScript is a versatile and widely-used language, especially in web development. However, when it comes to functional programming, concurrency, and fault tolerance, Elixir introduces several advanced features that JavaScript simply doesn't natively offer. Built on the Erlang VM, Elixir is designed for scalability, maintainability, and high availability -- making it a compelling choice for developers seeking robust and elegant solutions."
        },
        {
          "type": "text",
          "value": "In this article, we'll explore 10 powerful language features in Elixir that are either missing or poorly supported in JavaScript, along with their advantages and potential workarounds in the JavaScript ecosystem."
        }
      ]
    },
    {
      "id": "pipe-operator",
      "heading": "1. Pipe Operator (|>)",
      "blocks": [
        {
          "type": "text",
          "value": "The pipe operator allows chaining expressions where the output of one function becomes the input of the next. This creates a clear, readable flow of data transformations without deeply nested function calls."
        },
        {
          "type": "subheading",
          "value": "Why it's helpful"
        },
        {
          "type": "text",
          "value": "Improves readability and composability in functional pipelines, especially when dealing with multiple transformations."
        },
        {
          "type": "code",
          "value": "\"hello\"\n|> String.upcase()\n|> String.reverse()"
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative"
        },
        {
          "type": "text",
          "value": "No native pipe operator as of ES2024, but a proposal exists. Can be simulated using method chaining or libraries like Ramda."
        },
        {
          "type": "code",
          "value": "const result = reverse(upcase(\"hello\"));"
        }
      ]
    },
    {
      "id": "pattern-matching",
      "heading": "2. Pattern Matching",
      "blocks": [
        {
          "type": "text",
          "value": "Pattern matching is used not only to extract values from data structures but also to control the flow of logic by matching against specific data shapes."
        },
        {
          "type": "subheading",
          "value": "Why it's helpful"
        },
        {
          "type": "text",
          "value": "Eliminates the need for verbose conditionals. Makes the code declarative and self-documenting, especially for handling complex data."
        },
        {
          "type": "code",
          "value": "{a, b} = {1, 2}\n[a, b] = [1, 2]\n%{name: name} = %{name: \"Jane\"}"
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative"
        },
        {
          "type": "text",
          "value": "Limited to destructuring -- no true match failure or function-head matching."
        },
        {
          "type": "code",
          "value": "const [a, b] = [1, 2];\nconst { name } = { name: \"Jane\" };"
        }
      ]
    },
    {
      "id": "immutable-data",
      "heading": "3. Immutable Data by Default",
      "blocks": [
        {
          "type": "text",
          "value": "All data in Elixir is immutable. You don't modify data -- you create new data based on existing structures."
        },
        {
          "type": "subheading",
          "value": "Why it's helpful"
        },
        {
          "type": "text",
          "value": "Leads to safer code, avoids side effects, and makes programs easier to reason about and debug, especially in concurrent environments."
        },
        {
          "type": "code",
          "value": "x = 1\nx = 2 # allowed, but rebinds, not mutates\nuser = %{name: \"Juan\"}\nnew_user = %{user | name: \"Pedro\"}\n\nIO.inspect user     # %{name: \"Juan\"}\nIO.inspect new_user # %{name: \"Pedro\"}"
        },
        {
          "type": "text",
          "value": "You never modify the original user; instead, you return a new copy with the changes. All data structures in Elixir are persistent (structural sharing under the hood), making immutability efficient."
        },
        {
          "type": "subheading",
          "value": "In JavaScript"
        },
        {
          "type": "text",
          "value": "JavaScript objects and arrays are mutable by default:"
        },
        {
          "type": "code",
          "value": "const user = { name: \"Juan\" };\nuser.name = \"Pedro\"; // Mutation allowed\nconsole.log(user.name); // \"Pedro\""
        },
        {
          "type": "text",
          "value": "We can enforce immutability using Object.freeze() or libraries."
        },
        {
          "type": "code",
          "value": "const user = { name: \"Juan\", age: 30 };\n\nObject.freeze(user);\n\nuser.age = 31;           // silently fails in non-strict mode\nuser.email = \"juan@example.com\";\n\nconsole.log(user); // { name: 'Juan', age: 30 }"
        },
        {
          "type": "text",
          "value": "Disadvantage: Object.freeze() is shallow -- it does not freeze nested objects."
        },
        {
          "type": "code",
          "value": "const user = { name: \"Juan\", address: { city: \"Manila\" } };\n\nObject.freeze(user);\n\nuser.address.city = \"Cebu\"; // Still changes, because address is not frozen"
        },
        {
          "type": "subheading",
          "value": "Better Alternative: Deep Freeze"
        },
        {
          "type": "text",
          "value": "You can recursively freeze objects:"
        },
        {
          "type": "code",
          "value": "function deepFreeze(obj) {\n  Object.keys(obj).forEach(key => {\n    const value = obj[key];\n    if (typeof value === \"object\" && value !== null && !Object.isFrozen(value)) {\n      deepFreeze(value);\n    }\n  });\n  return Object.freeze(obj);\n}\n\nconst user = { name: \"Juan\", address: { city: \"Manila\" } };\ndeepFreeze(user);\n\nuser.address.city = \"Cebu\"; // Won't work\nconsole.log(user.address.city); // \"Manila\""
        },
        {
          "type": "text",
          "value": "Or use pure functions to return new objects instead of mutating:"
        },
        {
          "type": "code",
          "value": "const updateUser = (user, updates) => ({ ...user, ...updates });\n\nconst user = { name: \"Juan\" };\nconst newUser = updateUser(user, { name: \"Pedro\" });\n\nconsole.log(user);    // { name: \"Juan\" }\nconsole.log(newUser); // { name: \"Pedro\" }"
        }
      ]
    },
    {
      "id": "function-clauses",
      "heading": "4. Function Clauses / Pattern Matching in Function Heads",
      "blocks": [
        {
          "type": "subheading",
          "value": "Elixir"
        },
        {
          "type": "code",
          "value": "def greet(%{name: name}), do: \"Hello, #{name}\"\ndef greet(_), do: \"Hello, stranger\""
        },
        {
          "type": "text",
          "value": "Advantage: cleaner function logic via declarations."
        },
        {
          "type": "subheading",
          "value": "JavaScript"
        },
        {
          "type": "code",
          "value": "function greet(user) {\n  if (user?.name) return `Hello, ${user.name}`;\n  return \"Hello, stranger\";\n}"
        }
      ]
    },
    {
      "id": "guards",
      "heading": "5. Guards in Function Clauses",
      "blocks": [
        {
          "type": "text",
          "value": "You can define multiple versions of the same function, each tailored to specific patterns of input data."
        },
        {
          "type": "subheading",
          "value": "Why it's helpful"
        },
        {
          "type": "text",
          "value": "Keeps logic organized and expressive, especially for handling edge cases or branching logic without long if/else blocks."
        },
        {
          "type": "code",
          "value": "def foo(x) when is_integer(x) and x > 0, do: \"positive integer\"\ndef foo(_), do: \"something else\""
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: Early Returns"
        },
        {
          "type": "code",
          "value": "function foo(x) {\n  if (typeof x === 'number' && Number.isInteger(x) && x > 0) {\n    return \"positive integer\";\n  }\n  return \"something else\";\n}"
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: Functional Predicates"
        },
        {
          "type": "code",
          "value": "const isPositiveInteger = (x) => typeof x === 'number' && Number.isInteger(x) && x > 0;\nconst foo = (x) => isPositiveInteger(x) ? \"positive integer\" : \"something else\";"
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: ts-pattern"
        },
        {
          "type": "code",
          "value": "npm install ts-pattern"
        },
        {
          "type": "code",
          "value": "import { match, when } from 'ts-pattern';\n\nconst foo = (x) =>\n  match(x)\n    .with(when(x => typeof x === 'number' && Number.isInteger(x) && x > 0), () => \"positive integer\")\n    .otherwise(() => \"something else\");"
        }
      ]
    },
    {
      "id": "with-expression",
      "heading": "6. with Expression for Composable Error Handling",
      "blocks": [
        {
          "type": "text",
          "value": "In Elixir, the with expression is a powerful construct for composable error handling and pattern matching across multiple steps. It allows you to write linear-looking code while gracefully short-circuiting on failure -- very useful for chaining operations that may return {:ok, value} or {:error, reason} tuples."
        },
        {
          "type": "code",
          "value": "def get_user_email(user_id) do\n  with {:ok, user} <- fetch_user(user_id),\n       {:ok, profile} <- fetch_profile(user),\n       {:ok, email} <- extract_email(profile) do\n    {:ok, email}\n  else\n    {:error, reason} -> {:error, reason}\n  end\nend"
        },
        {
          "type": "text",
          "value": "Each step returns {:ok, value}. If any step returns {:error, reason}, the with block short-circuits to the else clause. Composable, readable error chains without deep nesting."
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: async/await with early returns"
        },
        {
          "type": "code",
          "value": "const fetchUser = async (id) => {\n  if (id === 1) return { id, name: \"Juan\" };\n  throw new Error(\"User not found\");\n};\n\nconst fetchProfile = async (user) => {\n  if (user.name === \"Juan\") return { email: \"juan@example.com\" };\n  throw new Error(\"Profile not found\");\n};\n\nconst extractEmail = async (profile) => {\n  if (profile.email) return profile.email;\n  throw new Error(\"Email not found\");\n};\n\nconst getUserEmail = async (id) => {\n  try {\n    const user = await fetchUser(id);\n    const profile = await fetchProfile(user);\n    const email = await extractEmail(profile);\n    return { status: \"ok\", data: email };\n  } catch (err) {\n    return { status: \"error\", error: err.message };\n  }\n};\n\ngetUserEmail(1).then(console.log); // { status: 'ok', data: 'juan@example.com' }\ngetUserEmail(2).then(console.log); // { status: 'error', error: 'User not found' }"
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: Result monads"
        },
        {
          "type": "code",
          "value": "const Ok = (value) => ({ type: \"ok\", value });\nconst Err = (error) => ({ type: \"error\", error });\nconst isOk = (res) => res.type === \"ok\";\n\nconst fetchUser = (id) => id > 0 ? Ok({ id, name: \"Juan\" }) : Err(\"User not found\");\nconst fetchProfile = (user) => user.id === 1 ? Ok({ email: \"juan@example.com\" }) : Err(\"Profile missing\");\nconst extractEmail = (profile) => profile.email ? Ok(profile.email) : Err(\"Email not found\");\n\nconst getUserEmail = (userId) => {\n  const result = fetchUser(userId);\n  if (!isOk(result)) return result;\n\n  const profileResult = fetchProfile(result.value);\n  if (!isOk(profileResult)) return profileResult;\n\n  const emailResult = extractEmail(profileResult.value);\n  if (!isOk(emailResult)) return emailResult;\n\n  return emailResult;\n};\n\nconsole.log(getUserEmail(1)); // { type: 'ok', value: 'juan@example.com' }\nconsole.log(getUserEmail(2)); // { type: 'error', error: 'Profile missing' }"
        }
      ]
    },
    {
      "id": "tco",
      "heading": "7. Tail Call Optimization (TCO)",
      "blocks": [
        {
          "type": "text",
          "value": "TCO is an optimization where the compiler or runtime can reuse the current function's stack frame for a recursive call if it's the last action (tail position) in a function."
        },
        {
          "type": "text",
          "value": "It prevents stack overflows in recursive functions and enables recursion as a safe and performant replacement for loops."
        },
        {
          "type": "text",
          "value": "In Elixir (via the BEAM VM), TCO is fully and reliably supported. You can safely write deeply recursive functions without blowing the stack -- as long as the call is in the tail position."
        },
        {
          "type": "code",
          "value": "defmodule Math do\n  def sum(list), do: sum(list, 0)\n\n  defp sum([], acc), do: acc\n  defp sum([head | tail], acc), do: sum(tail, acc + head)\nend\n\nIO.inspect Math.sum([1, 2, 3, 4, 5])  # 15"
        },
        {
          "type": "text",
          "value": "JavaScript does NOT reliably support TCO despite it being part of the ES6 spec. Most JS engines (e.g., V8 in Chrome, Node.js) do not implement it, so recursive functions can still cause a stack overflow for large inputs."
        },
        {
          "type": "code",
          "value": "function factorial(n, acc = 1) {\n  if (n <= 1) return acc;\n  return factorial(n - 1, acc * n); // Tail call -- but not optimized in V8\n}\n\nconsole.log(factorial(100000)); // RangeError: Maximum call stack size exceeded"
        },
        {
          "type": "subheading",
          "value": "Workaround: Manual Loop"
        },
        {
          "type": "code",
          "value": "function factorial(n) {\n  let acc = 1;\n  while (n > 1) {\n    acc *= n;\n    n--;\n  }\n  return acc;\n}"
        },
        {
          "type": "subheading",
          "value": "Workaround: Trampolining"
        },
        {
          "type": "code",
          "value": "const trampoline = (fn) => (...args) => {\n  let result = fn(...args);\n  while (typeof result === \"function\") {\n    result = result();\n  }\n  return result;\n};\n\nconst factorial = trampoline(function fact(n, acc = 1) {\n  if (n <= 1) return acc;\n  return () => fact(n - 1, acc * n); // Deferred call\n});\n\nconsole.log(factorial(100000)); // No stack overflow"
        }
      ]
    },
    {
      "id": "actor-model",
      "heading": "8. Processes and the Actor Model",
      "blocks": [
        {
          "type": "text",
          "value": "The Actor Model is a concurrent programming model where actors are independent processes that hold state, communicate only via messages, react to messages using receive blocks (like mailboxes), and can spawn new actors. No shared memory -- actors don't directly modify each other's state."
        },
        {
          "type": "text",
          "value": "Imagine each actor as a person in a chat room: each has their own brain (independent state), they don't share brains -- they talk by sending messages, and they handle one message at a time. In Elixir, each actor is a lightweight process running on the BEAM virtual machine."
        },
        {
          "type": "code",
          "value": "defmodule Greeter do\n  def start do\n    spawn(fn -> loop() end)\n  end\n\n  defp loop do\n    receive do\n      {:hello, sender} ->\n        send(sender, {:reply, \"Hello!\"})\n        loop() # tail-recursion to keep receiving\n    end\n  end\nend\n\npid = Greeter.start()\nsend(pid, {:hello, self()})\n\nreceive do\n  {:reply, msg} -> IO.puts(msg)  # Output: \"Hello!\"\nend"
        },
        {
          "type": "text",
          "value": "Best use cases: real-time messaging/chat systems, IoT device control, distributed job queues, game servers, and background task systems -- each unit runs as an independently failing and recoverable actor."
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: Web Workers"
        },
        {
          "type": "text",
          "value": "Web Workers are isolated and communicate via messages -- but not as lightweight as Elixir processes, with no true process supervision or lightweight spawning."
        },
        {
          "type": "code",
          "value": "// main.js\nconst worker = new Worker(\"worker.js\");\nworker.postMessage({ type: \"hello\" });\n\nworker.onmessage = (event) => {\n  console.log(event.data); // \"Hello!\"\n};\n\n// worker.js\nonmessage = (e) => {\n  if (e.data.type === \"hello\") {\n    postMessage(\"Hello!\");\n  }\n};"
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: Node.js worker_threads"
        },
        {
          "type": "text",
          "value": "Closer in spirit, but still lacks BEAM's built-in fault tolerance and the ability to spawn millions of lightweight processes."
        },
        {
          "type": "code",
          "value": "const { Worker } = require(\"worker_threads\");\n\nconst worker = new Worker(`\n  parentPort.on('message', (msg) => {\n    if (msg === 'hello') parentPort.postMessage('Hello!');\n  });\n`, { eval: true });\n\nworker.on('message', console.log);\nworker.postMessage('hello');"
        }
      ]
    },
    {
      "id": "doc-generation",
      "heading": "9. @doc and Built-in Doc Generation",
      "blocks": [
        {
          "type": "text",
          "value": "@doc adds inline documentation to a function or module, used by Elixir's ExDoc system to generate rich HTML docs. You can also use h Math.add in IEx to see inline docs interactively."
        },
        {
          "type": "code",
          "value": "defmodule Math do\n  @doc \"Adds two numbers\"\n  def add(a, b), do: a + b\nend"
        },
        {
          "type": "text",
          "value": "Run mix docs with ExDoc installed to generate HTML documentation. Use h Math.add in IEx to see inline docs."
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: JSDoc"
        },
        {
          "type": "text",
          "value": "JavaScript lacks built-in module/function documentation that integrates with the runtime, but JSDoc achieves similar results:"
        },
        {
          "type": "code",
          "value": "/**\n * Adds two numbers together.\n * @function\n * @param {number} a - First number\n * @param {number} b - Second number\n * @returns {number} Sum of a and b\n */\nexport function add(a, b) {\n  return a + b;\n}"
        },
        {
          "type": "text",
          "value": "Generate HTML docs using tools like JSDoc, TypeDoc, or ESDoc:"
        },
        {
          "type": "code",
          "value": "npx jsdoc math.js -d docs"
        }
      ]
    },
    {
      "id": "macros",
      "heading": "10. First-Class Support for Declarative Macros",
      "blocks": [
        {
          "type": "text",
          "value": "In Elixir, macros are a first-class metaprogramming tool that allow you to transform code at compile time, inject or generate code declaratively, and extend the language syntax itself. Metaprogramming is when a program can read, modify, or generate code -- at compile time or runtime."
        },
        {
          "type": "code",
          "value": "defmacro unless(expr, do: block) do\n  quote do\n    if !unquote(expr), do: unquote(block)\n  end\nend"
        },
        {
          "type": "text",
          "value": "This defines a new construct unless which at compile time transforms into:"
        },
        {
          "type": "code",
          "value": "# Usage\nunless some_condition do\n  # block\nend\n\n# Compiles to:\nif !some_condition do\n  # block\nend"
        },
        {
          "type": "text",
          "value": "Advantage: powerful metaprogramming. Disadvantage: not beginner-friendly."
        },
        {
          "type": "subheading",
          "value": "JavaScript Alternative: Babel macros"
        },
        {
          "type": "text",
          "value": "Limited and tool-dependent, but Babel macros can achieve similar compile-time transforms:"
        },
        {
          "type": "code",
          "value": "// input\nunless(condition, () => {\n  console.log(\"Ran\");\n});\n\n// transpiled\nif (!condition) {\n  console.log(\"Ran\");\n}"
        }
      ]
    },
    {
      "id": "conclusion",
      "heading": "Conclusion",
      "blocks": [
        {
          "type": "text",
          "value": "Elixir's feature set reflects its focus on clean functional paradigms, reliable concurrency, and developer ergonomics. While JavaScript remains indispensable in web development, it lacks many of Elixir's native capabilities such as pattern matching, lightweight processes, and built-in fault tolerance. Fortunately, with the right tools and patterns, some of these gaps can be bridged in JavaScript -- but often with added complexity."
        },
        {
          "type": "text",
          "value": "If you're a JavaScript developer looking to expand into systems that demand resilience, scalability, or functional purity, Elixir offers a refreshing and powerful alternative."
        },
        {
          "type": "subheading",
          "value": "Bonus Tip: Want to simulate some of these in JavaScript?"
        },
        {
          "type": "text",
          "value": "Try Ramda or Lodash/fp for FP utilities, use ts-pattern for pattern matching, and explore folktale for monads like Result and Maybe."
        }
      ]
    }
  ]
};
