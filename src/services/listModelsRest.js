const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY não está definido no ambiente.");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

(async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na requisição:", res.status, res.statusText, text);
      process.exit(1);
    }

    const data = await res.json();
    console.log("Resposta da API (raw):");
    console.log(JSON.stringify(data, null, 2));

    if (Array.isArray(data.models)) {
      console.log("\nModelos disponíveis:");
      data.models.forEach((m) => {
        console.log(`- ${m.name}`);
        if (m.supportedMethods)
          console.log(`  methods: ${m.supportedMethods.join(", ")}`);
      });
    }
  } catch (err) {
    console.error("Falha ao listar modelos via REST:", err.message || err);
    process.exit(1);
  }
})();
