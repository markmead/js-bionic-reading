export default function () {
  const articleElement = document.querySelector('[data-bionic-reading]')

  if (!articleElement) {
    return
  }

  const articleElements = [
    ...articleElement.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, li, a, pre, code, span, em, i, strong, b'
    ),
  ]

  articleElements.forEach((contentElement) => {
    contentElement.style.fontWeight = 400

    const elementText = contentElement.innerText
    const elementTextArray = elementText.split(' ')

    const elementTextArrayWithBold = elementTextArray.map((textWord) => {
      const wordLength = textWord.length

      if (wordLength === 1) {
        return `<strong>${textWord}</strong>`
      }

      const wordLengthHalf = Math.floor(wordLength / 2)

      const wordArray = textWord.split('')
      const wordArrayWithBold = wordArray.map((wordLetter, letterIndex) => {
        return letterIndex < wordLengthHalf
          ? `<strong>${wordLetter}</strong>`
          : wordLetter
      })

      return wordArrayWithBold.join('')
    })

    contentElement.innerHTML = elementTextArrayWithBold.join(' ')
  })
}
