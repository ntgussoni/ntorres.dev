# Agent instructions

Read this before writing or editing any content in this repository.

## No em dashes

**Never use em dashes (`—`, Unicode U+2014).** Not in blog posts, UI copy, comments, commit messages, or docs.

The author does not want them. This is non-negotiable.

## Blog diagram images

When generating or replacing images in `posts/` (especially loop-engineering diagrams):

1. Use **Replicate** (`openai/gpt-image-2`) with extremely specific prompts: exact labels, layout, colors (orange `#f97316`, coral red `#ef4444`), and forbidden mistakes called out.
2. **Always review every generated image** before keeping it: read the file, check text accuracy, node count, and concept match to the surrounding MDX.
3. Regenerate if labels are wrong, placeholder text leaked, or the diagram misrepresents the post.
4. Prefer hyphens over em dashes in any text inside images.

### Before you finish

Search your changes for `—` and replace every occurrence.


### Use instead

| Instead of | Use |
|------------|-----|
| `word — word` (aside) | commas, parentheses, or a colon |
| `word — word` (range) | en dash with spaces (`–`) or `to` |
| `word — word` (break in thought) | period and a new sentence, or a semicolon |

### Examples

- Bad: `Failure modes — what nobody tells you`
- Good: `Failure modes: what nobody tells you`
- Good: `Failure modes (what nobody tells you)`

- Bad: `Souso-specific guardrails — token economics`
- Good: `Souso-specific guardrails, token economics`

### Before you finish

Search your changes for `—` and replace every occurrence.
