import os

CODE_PATH = "./code"

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


def get_code(codeinclude, tag):
    output = []
    for lang in ["Python", "Java_Generic"]:
        ext = lang[:len(lang)//3].lower()
        path = "/".join((
            CODE_PATH, 
            lang, 
            codeinclude + "." + ext
        ))
        if not os.path.isfile(path):
            continue
        with open(path) as f:
            snippet = [f"```{ext}"]
            read = False
            for line in f.read().splitlines():
                if f"ODSATag: {tag}" in line:
                    read = True
                    continue
                if read:
                    if "ODSAendTag" in line:
                        break
                    snippet.append(line)
            snippet.append("```")
            output.append((lang.replace("Java_Generic", "Java"), "\n".join(snippet)))
    return output

def tabify(title, tabs):
    # create a tab thingy with a given title and a list of pairs
    output = ['{{< tabs "' + title + '" >}}']
    for tab, content in tabs:
        output.append('{{< tab "' + tab + '" >}}')
        output.append(content)
        output.append('{{< /tab >}}')
    output.append("{{< /tabs >}}")

    return "\n".join(output)

# the time complexity of this code is abysmal but
# "it's fine if it's temporary right"
# also the memory complexity is unimprovable so beat it
def convert(text=None, path=None):
    assert text or path, "Neither text nor a path was provided."

    if not text:
        with open(path) as f:
            text = f.read().strip()

    lines = text.splitlines()

    # strip rst metadata for now (may be required for JSAV/khan stuff later)
    while not lines[0].startswith(".. avmetadata::"): lines.pop(0)
    for _ in range(4): lines.pop(0)

    page_title = None

    # fix headings
    i = 0
    while i < len(lines):
        if set(lines[i]) == set("="):
            # assume the first main heading is the page title
            # also assume that it is the only page title
            page_title = lines[i - 1]
            lines[i - 1] = "# " + lines[i - 1]
            lines.pop(i)
        elif set(lines[i]) == set("-"):
            lines[i - 1] = "## " + lines[i - 1]
            lines.pop(i)
        i += 1

    i = 0
    while i < len(lines):
        if lines[i].startswith(".. codeinclude:: "):
            path = lines[i].split("codeinclude::")[1].strip()
            tag = lines[i + 1].split(":tag:")[1].strip()
            
            lines[i] = tabify(tag, get_code(path, tag))
            lines.pop(i + 1)
        i += 1

    body = "\n".join(lines[2:])

    body = replace_term(body, "term", "**")
    body = replace_term(body, "math", "{{< katex >}}", "{{< /katex >}}")
    body = body.replace("```", "CODEBLOCK").replace("``", "`").replace("CODEBLOCK", "```")

    output = "+++\n" + f'title = "{page_title}"\n' + "+++\n\n" + body

    return output


open("test.md", "w").write(convert(path="test.rst"))
