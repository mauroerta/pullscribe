import * as core from "@actions/core";
import process from "node:process";
import { formatAsMarkdown } from "./formatters";
import { upsertComment } from "./utils";

run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    if (error instanceof Error) {
      core.error(error.message);
      core.setFailed(error.message);
    }
    process.exit(0);
  });

async function run() {
  const report = core.getInput("report");
  const description = core.getInput("description", { required: false });
  const token = core.getInput("github-token");

  core.info("Generating report...");

  const markdown = formatAsMarkdown({ description, report });

  core.info("✅ Report generated successfully");

  core.info("Posting report to GitHub...");

  await upsertComment({
    token,
    body: markdown,
  });

  core.notice("✅ Report posted successfully");

  core.summary.addRaw(markdown);

  core.notice("✅ Summary posted successfully");
}
