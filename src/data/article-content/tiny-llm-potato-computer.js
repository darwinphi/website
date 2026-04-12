export default {
  "sections": [
    {
      "id": "intro",
      "heading": null,
      "blocks": [
        {
          "type": "text",
          "value": "Running large language models locally can feel like trying to power a cathedral with a single AA battery -- especially on an 8 GB Mac M1. Fortunately, TinyLlama (1.1 B parameters, 4-bit quantized) and the llama.cpp Docker \"server\" make it dead simple."
        },
        {
          "type": "text",
          "value": "In this guide, you'll learn how to download the TinyLlama Q4_0 model, pull the ARM64 llama.cpp server image, mount & run TinyLlama inside Docker, and send your first prompt."
        }
      ]
    },
    {
      "id": "step-1",
      "heading": "Step 1: Download the Quantized Model",
      "blocks": [
        {
          "type": "text",
          "value": "First, grab the 0.6 GB quantized weights from Hugging Face and save them into ~/models:"
        },
        {
          "type": "code",
          "value": "huggingface-cli download \\\n  TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF \\\n  --include '*Q4_0.gguf' \\\n  --local-dir ~/models \\\n  --local-dir-use-symlinks False"
        },
        {
          "type": "text",
          "value": "If you don't have huggingface-cli installed:"
        },
        {
          "type": "code",
          "value": "# If you're using Python3's pip:\npip3 install --upgrade huggingface-hub"
        },
        {
          "type": "text",
          "value": "Once installed, verify with:"
        },
        {
          "type": "code",
          "value": "huggingface-cli --help"
        }
      ]
    },
    {
      "id": "step-2",
      "heading": "Step 2: Pull the Docker Image",
      "blocks": [
        {
          "type": "text",
          "value": "Fetch the ARM64-native llama.cpp server -- no emulation required:"
        },
        {
          "type": "code",
          "value": "docker pull ghcr.io/ggerganov/llama.cpp:server-b4646@sha256:645767ffdc357b440d688f61bd752808a339f08dd022cc19d552f53b2c612853"
        }
      ]
    },
    {
      "id": "step-3",
      "heading": "Step 3: Run the llama.cpp Server",
      "blocks": [
        {
          "type": "text",
          "value": "Assuming you've already placed the quantized TinyLlama model at ~/models/tinyllama-1.1b-chat-v1.0.Q4_0.gguf, launch the container in the foreground:"
        },
        {
          "type": "code",
          "value": "docker run --rm -it \\\n  --name tinyllama \\\n  --platform=linux/arm64/v8 \\\n  -v ~/models:/models \\\n  -p 8000:8000 \\\n  ghcr.io/ggerganov/llama.cpp:server-b4646@sha256:645767ffdc357b440d688f61bd752808a339f08dd022cc19d552f53b2c612853 \\\n    -m /models/tinyllama-1.1b-chat-v1.0.Q4_0.gguf \\\n    --host 0.0.0.0 \\\n    --port 8000 \\\n    -n 512"
        },
        {
          "type": "text",
          "value": "--rm -it keeps it clean and interactive. --platform=linux/arm64/v8 forces the native build on M1. -n 512 caps responses to 512 tokens."
        },
        {
          "type": "text",
          "value": "You should see:"
        },
        {
          "type": "code",
          "value": "server listening at http://0.0.0.0:8000"
        }
      ]
    },
    {
      "id": "step-4",
      "heading": "Step 4: Query the Model",
      "blocks": [
        {
          "type": "text",
          "value": "In a second terminal, send an instruction-style prompt to /v1/completions:"
        },
        {
          "type": "code",
          "value": "curl http://localhost:8000/v1/completions \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"model\": \"tinyllama-1.1b-chat-v1.0\",\n    \"prompt\": \"### Instruction:\\nExplain OOP programming simply.\\n\\n### Response:\",\n    \"max_tokens\": 128\n  }'"
        },
        {
          "type": "text",
          "value": "You'll receive a JSON payload with your answer under choices[0].text."
        }
      ]
    },
    {
      "id": "troubleshooting",
      "heading": "Troubleshooting Tips",
      "blocks": [
        {
          "type": "subheading",
          "value": "Blank or gibberish responses?"
        },
        {
          "type": "text",
          "value": "Wrap your prompt in the ### Instruction:...### Response: template."
        },
        {
          "type": "subheading",
          "value": "Out-of-memory?"
        },
        {
          "type": "text",
          "value": "TinyLlama Q4_0 uses ~0.6 GiB in-container. If you see OOMs on larger models, either bump Docker's memory in Preferences → Resources → Memory or stick to this tiny variant."
        }
      ]
    },
    {
      "id": "conclusion",
      "heading": "Conclusion",
      "blocks": [
        {
          "type": "text",
          "value": "You've just transformed your \"potato computer\" into a local LLM server! With a single Docker command and a quantized TinyLlama model, you're free to experiment with chatbots, integrations in Node.js/Next.js, or offline AI demos -- no cloud GPUs required. Happy hacking!"
        }
      ]
    }
  ]
};
