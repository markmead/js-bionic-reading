# Bionic Reading

Effortless bionic reading support for web content—improves readability by
emphasizing approximately the first half of each word. Perfect for blogs,
articles, and long-form content.

![](https://img.shields.io/bundlephobia/min/data-bionic-reading)
![](https://img.shields.io/npm/v/data-bionic-reading)
![](https://img.shields.io/npm/dt/data-bionic-reading)
![](https://img.shields.io/github/license/markmead/data-bionic-reading)

![](https://github.com/markmead/js-bionic-reading/assets/50486078/ca1eddbd-759f-498e-b368-d5a8a580faad)

## Install

### With a CDN

```html
<script
  defer
  src="https://unpkg.com/data-bionic-reading@latest/dist/reading.min.js"
></script>
```

To customize options when using the CDN, set `window.bionicReadingOptions`
before the script loads:

```html
<script>
  window.bionicReadingOptions = {
    boldRatio: 0.6,
    minWordLength: 3,
  }
</script>

<script src="https://unpkg.com/data-bionic-reading@latest/dist/reading.min.js"></script>
```

(Note: The inline script executes immediately and sets the global options, then
the CDN script loads and reads those options during initialization.)

### With a Package Manager

```shell
yarn add -D data-bionic-reading
npm install -D data-bionic-reading
```

```js
import bionicReading from 'data-bionic-reading'

document.addEventListener('DOMContentLoaded', () => {
  bionicReading()
})
```

## Options

Out of the box, `bionicReading()` works with sensible defaults. You can
customize behavior by passing an options object:

```js
import bionicReading from 'data-bionic-reading'

document.addEventListener('DOMContentLoaded', () => {
  bionicReading({
    // targetSelector: '[data-bionic-reading]',
    // contentSelector: 'h1, h2, h3, h4, h5, h6, p, a, li, blockquote, figcaption, dt, dd',
    // excludeSelector: 'script, style, code, pre, kbd, samp, noscript',
    // minWordLength: 2,
    // boldRatio: 0.5,
    // baseFontWeight: 400,
    // processedAttribute: 'data-bionic-processed',
  })
})
```

(All shown above are defaults. Only pass options you wish to override.)

### Option Details

- `targetSelector`: Root elements to scan.
- `contentSelector`: Content elements inside each target that are eligible.
- `excludeSelector`: Elements that are never modified (useful for code blocks).
- `minWordLength`: Shorter words are left untouched.
- `boldRatio`: 0–1; how much of each word is bolded.
- `baseFontWeight`: Applied to content elements (use `null` to skip).
- `processedAttribute`: Attribute used to avoid double-processing.

### Opt Out Per Section

If a specific block should not be processed, set:

```html
<article data-bionic-reading="off"> ... </article>
```

## Performance Tips

- Limit scope by narrowing `targetSelector`.
- Keep `contentSelector` focused on readable content, not layout wrappers.
- If your app injects content dynamically, call `bionicReading()` only after the
  content is inserted, or pair it with a `MutationObserver` and
  `requestAnimationFrame` to batch updates per frame.
- **Warning**: Observing `document.body` with `subtree: true` can cause
  performance issues on dynamic sites. Instead, observe only the specific
  container where content is injected to minimize unnecessary processing.

## Accessibility

- The library uses `<strong>` elements to emphasize portions of words. While
  semantically meaningful, some screen readers may announce "strong" or change
  voice tone, which could be distracting. Consider opening an issue if this is a
  concern for your use case.

### MutationObserver Example

For dynamically injected content:

**With a Package Manager:**

```js
import bionicReading from 'data-bionic-reading'

const applyBionicReading = () => bionicReading()

const contentObserver = new MutationObserver(() => {
  window.requestAnimationFrame(applyBionicReading)
})

// Observe a specific container instead of entire document.body for better performance
const contentContainer = document.getElementById('contentEl')

if (contentContainer) {
  contentObserver.observe(contentContainer, {
    childList: true,
    subtree: true,
  })
}

applyBionicReading()
```

**With a CDN:**

```html
<script>
  const applyBionicReading = () => {
    if (window.bionicReading) {
      window.bionicReading(window.bionicReadingOptions)
    }
  }

  const contentObserver = new MutationObserver(() => {
    window.requestAnimationFrame(applyBionicReading)
  })

  // Observe a specific container instead of entire document.body for better performance
  const contentContainer = document.getElementById('contentEl')

  if (contentContainer) {
    contentObserver.observe(contentContainer, {
      childList: true,
      subtree: true,
    })
  }

  document.addEventListener('DOMContentLoaded', applyBionicReading)
</script>

<script src="https://unpkg.com/data-bionic-reading@latest/dist/reading.min.js"></script>
```

## Example

> Note: The following example content is AI-generated for demonstration
> purposes.

```html
<article data-bionic-reading>
  <h1>Why Bionic Reading Matters for Web Accessibility</h1>

  <p>
    Bionic reading is a technique that emphasizes the first half of each word,
    helping readers scan content faster and reduce cognitive load. By drawing
    attention to key letterforms, it creates a visual anchor that guides your
    eye through the text.
  </p>

  <p>
    This approach works especially well for people with dyslexia, ADHD, and
    other reading differences. Many modern websites now offer bionic reading as
    an <a href="#">accessibility feature</a> to improve user experience.
  </p>

  <h2>Benefits</h2>

  <ul>
    <li>Faster reading speed without sacrificing comprehension</li>
    <li>Reduced eye fatigue during extended reading sessions</li>
    <li>Better accessibility for neurodivergent users</li>
  </ul>
</article>
```
