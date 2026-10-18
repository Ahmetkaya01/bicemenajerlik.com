import { writeFileSync } from "node:fs";
import { llmsTxtBody } from "../src/lib/llms-txt";

const body = llmsTxtBody();
writeFileSync("public/llms.txt", body);
writeFileSync("public/llm.txt", body);
