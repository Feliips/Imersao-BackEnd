import generateDescriptionWithGemini from "./geminiService.js";

const onePixelPngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
const imgBuffer = Buffer.from(onePixelPngBase64, "base64");

(async () => {
  try {
    const description = await generateDescriptionWithGemini(imgBuffer);
    console.log("Generated description:\n", description);
  } catch (err) {
    console.error("Generation failed:", err.message || err);
    process.exit(1);
  }
})();
