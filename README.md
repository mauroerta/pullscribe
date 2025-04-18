# How to use it

## Report Markdown

```yaml
name: Report

on:
  pull_request:

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Run Report
        uses: mauroerta/pullscribe@v1.2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          report: |
            # Write here whatever you like
            > You can even use variables: {{ inputs.VARIABLES }} if you like
          description: "Feel free to include also a description"
```

## Report JSON

```yaml
name: Report

on:
  pull_request:

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Run Report
        uses: mauroerta/pullscribe@v1.2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          report: |
            {
              "simple-string": "the value",
              "formatted-string": {
                "type": "string",
                "value: "another value",
              },
              "formatted-link": {
                "type": "link",
                "label: "the label",
                "url": "https://example.com",
              },
            }
          description: "Feel free to include also a description"
```

### Result:

```md
| **key**          | **value**                        |
| ---------------- | -------------------------------- |
| simple-string    | the value                        |
| formatted-string | another value                    |
| formatted-link   | [the label](https://example.com) |
```
