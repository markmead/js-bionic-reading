const DEFAULT_OPTIONS = {
  targetSelector: '[data-bionic-reading]',
  contentSelector:
    'h1, h2, h3, h4, h5, h6, p, a, li, blockquote, figcaption, dt, dd',
  excludeSelector: 'script, style, code, pre, kbd, samp, noscript',
  minWordLength: 2,
  boldRatio: 0.5,
  baseFontWeight: 400,
  processedAttribute: 'data-bionic-processed',
}

/**
 * Apply bionic reading to matching content in the DOM.
 * @param {Object} [bionicOptions] - Configuration options
 * @param {string} [bionicOptions.targetSelector] - Root elements to scan
 * @param {string} [bionicOptions.contentSelector] - Content elements to process
 * @param {string} [bionicOptions.excludeSelector] - Elements to skip
 * @param {number} [bionicOptions.minWordLength] - Minimum word length to process
 * @param {number} [bionicOptions.boldRatio] - Ratio of word to bold (0-1)
 * @param {number|null} [bionicOptions.baseFontWeight] - Base font weight to apply
 * @param {string} [bionicOptions.processedAttribute] - Attribute to track processed elements
 */
export default function bionicReading(bionicOptions = {}) {
  const resolvedOptions = { ...DEFAULT_OPTIONS, ...bionicOptions }
  const bionicTargets = [
    ...document.querySelectorAll(resolvedOptions.targetSelector),
  ]

  if (!bionicTargets.length) {
    return
  }

  bionicTargets.forEach((bionicTarget) => {
    if (bionicTarget.getAttribute('data-bionic-reading') === 'off') {
      return
    }

    const articleElements = [
      ...bionicTarget.querySelectorAll(resolvedOptions.contentSelector),
    ].filter(
      (textElement) => !textElement.closest(resolvedOptions.excludeSelector),
    )

    articleElements.forEach((contentElement) => {
      if (
        contentElement.getAttribute(resolvedOptions.processedAttribute) ===
        'true'
      ) {
        return
      }

      if (contentElement.closest('[data-bionic-reading="off"]')) {
        return
      }

      if (
        resolvedOptions.baseFontWeight !== null &&
        resolvedOptions.baseFontWeight !== undefined
      ) {
        contentElement.style.fontWeight = String(resolvedOptions.baseFontWeight)
      }

      const textNodes = collectTextNodes(
        contentElement,
        resolvedOptions.excludeSelector,
      )

      textNodes.forEach((textNode) => {
        const documentFragment = createBionicFragment(
          textNode.nodeValue || '',
          resolvedOptions,
        )

        textNode.parentNode?.replaceChild(documentFragment, textNode)
      })

      contentElement.setAttribute(resolvedOptions.processedAttribute, 'true')
    })
  })
}

function collectTextNodes(rootElement, excludeSelector) {
  const textNodes = []
  const textWalker = document.createTreeWalker(
    rootElement,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(currentNode) {
        if (!currentNode.nodeValue || !currentNode.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT
        }

        const parentElement = currentNode.parentElement

        if (
          !parentElement ||
          parentElement.closest(excludeSelector) ||
          parentElement.closest('strong')
        ) {
          return NodeFilter.FILTER_REJECT
        }

        return NodeFilter.FILTER_ACCEPT
      },
    },
    false,
  )

  while (textWalker.nextNode()) {
    textNodes.push(textWalker.currentNode)
  }

  return textNodes
}

function createBionicFragment(textContent, resolvedOptions) {
  const documentFragment = document.createDocumentFragment()
  const tokenPattern = /(\s+|[^\s]+)/g
  const tokenList = textContent.match(tokenPattern) || []

  tokenList.forEach((tokenValue) => {
    if (/^\s+$/.test(tokenValue)) {
      documentFragment.appendChild(document.createTextNode(tokenValue))
      return
    }

    documentFragment.appendChild(processToken(tokenValue, resolvedOptions))
  })

  return documentFragment
}

function processToken(tokenValue, resolvedOptions) {
  const documentFragment = document.createDocumentFragment()
  const wordPattern = /[\p{L}\p{N}]+(?:'[\p{L}\p{N}]+)*/gu

  let lastIndex = 0
  let wordMatch = wordPattern.exec(tokenValue)

  if (!wordMatch) {
    documentFragment.appendChild(document.createTextNode(tokenValue))

    return documentFragment
  }

  const boldRatioValue = Math.min(Math.max(resolvedOptions.boldRatio, 0), 1)

  while (wordMatch) {
    const [wordValue] = wordMatch
    const matchStart = wordMatch.index

    if (matchStart > lastIndex) {
      documentFragment.appendChild(
        document.createTextNode(tokenValue.slice(lastIndex, matchStart)),
      )
    }

    if (
      wordValue.length < resolvedOptions.minWordLength ||
      boldRatioValue === 0
    ) {
      documentFragment.appendChild(document.createTextNode(wordValue))
    } else {
      const boldLength = Math.ceil(wordValue.length * boldRatioValue)
      const strongElement = document.createElement('strong')

      strongElement.textContent = wordValue.slice(0, boldLength)
      documentFragment.appendChild(strongElement)

      if (boldLength < wordValue.length) {
        documentFragment.appendChild(
          document.createTextNode(wordValue.slice(boldLength)),
        )
      }
    }

    lastIndex = matchStart + wordValue.length
    wordMatch = wordPattern.exec(tokenValue)
  }

  if (lastIndex < tokenValue.length) {
    documentFragment.appendChild(
      document.createTextNode(tokenValue.slice(lastIndex)),
    )
  }

  return documentFragment
}
