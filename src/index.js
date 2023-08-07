export default function () {
  const bionicTargets = [...document.querySelectorAll('[data-bionic-reading]')]

  if (!bionicTargets.length) {
    return
  }

  bionicTargets.forEach((bionicTarget) => {
    const articleElements = [
      ...bionicTarget.querySelectorAll(
        'h1, h2, h3, h4, h5, p, a, li, blockquote'
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

        const wordLengthHalf = Math.ceil(wordLength / 2)

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
  })
}
