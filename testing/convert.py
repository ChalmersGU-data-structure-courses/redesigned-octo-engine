def replace_term(text, term, before, after=None):
    if term not in text:
        return text

    if after == None:
        after = before
    de_termed = text.split(f":{term}:`")[0]
    for section in text.split(f":{term}:`")[1:]:
        word, remain = section.split("`", maxsplit=1)
        de_termed += before + word + after + remain
    return de_termed


def convert(text=None, path=None):
    assert text or path, "Neither text nor a path was provided."

    if not text:
        with open(path) as f:
            text = f.read().strip()

    lines = text.splitlines()

    i = 0
    # deal with metadata first
    while not lines[i].startswith(".. index::"):
        # stuff
        i += 1
    lines = lines[i:]
    i = 0

    # fix headings and stuff
    while i < len(lines):
        if set(lines[i]) == set("="):
            lines[i - 1] = "# " + lines[i - 1]
            lines.pop(i)
        elif set(lines[i]) == set("-"):
            lines[i - 1] = "## " + lines[i - 1]
            lines.pop(i)
        i += 1

    body = "\n".join(lines[2:])

    body = replace_term(body, "term", "**")
    body = replace_term(body, "math", "{{< katex >}}", "{{< /katex >}}")
    body = body.replace("``", "`")

    return body

open("test.md", "w").write(convert(path="test.rst"))
