export function formatJsonAsMarkdown(json: FormattedJson) {
	const entries = Object.entries(json)
		.map(([key, value]) => {
			return `| ${formatKey(key)} | ${formatValue(value)} |`;
		})
		.join("\n");

	return `| **Key** | **Value** |\n|---|---|\n${entries}`;
}

function formatKey(key: string) {
	return `**${key[0]?.toUpperCase()}${key.slice(1)}**`;
}

function formatValue(value: string | FormattedJsonValue) {
	if (typeof value === "string") {
		return value;
	}

	if (value.type === "link") {
		return `[${value.label}](${value.url})`;
	}

	return value.value;
}

type FormattedJson = {
	[key: string]: FormattedJsonValue;
};

type FormattedJsonValue =
	| string
	| {
			type: "string";
			value: string;
	  }
	| {
			type: "link";
			label: "string";
			url: "string";
	  };
