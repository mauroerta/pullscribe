import { formatJsonAsMarkdown } from "./json"

export function formatAsMarkdown({
	description,
	report,
}: { description?: string; report: string }) {
	let markdown = report
	try {
		const json = JSON.parse(report)
		markdown = formatJsonAsMarkdown(json)
	} catch {}

	if (description) {
		return `> ${description}\n\n${markdown}`
	}

	return markdown
}
