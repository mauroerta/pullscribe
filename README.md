# How to use it

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
        uses: mauroerta/pullscribe@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          report: |
            # Write here whatever you like
            > You can even use variables: {{ inputs.VARIABLES }} if you like
          description: "Feel free to include also a description"
```
