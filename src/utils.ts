import * as core from "@actions/core"
import * as github from "@actions/github"

const MARKER = "<-- CUSTOM___REPORTER__MARKER -->"

export async function upsertComment({
	token,
	body,
}: { token: string; body: string }) {
	const octokit = github.getOctokit(token, {
		log: console,
	})
	const context = github.context
	const issue_number = context.payload.pull_request?.number

	if (issue_number === undefined) {
		throw new Error("No pull request found in the context")
	}

	core.info(`Issue #${issue_number} found in the context`)

	const comments = await octokit.rest.issues.listComments({
		...context.repo,
		issue_number,
	})

	const existingComment = comments.data.find(
		(comment) => comment.user?.type === "Bot" && comment.body?.includes(MARKER),
	)

	const markdown = `${body}${MARKER}`

	if (existingComment) {
		core.info(`Updating existing comment with ID ${existingComment.id}...`)

		return octokit.rest.issues.updateComment({
			...context.repo,
			comment_id: existingComment.id,
			body: markdown,
		})
	}

	core.info("Creating a new comment")

	return octokit.rest.issues.createComment({
		...context.repo,
		issue_number,
		body: markdown,
	})
}
