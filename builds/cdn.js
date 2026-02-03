import bionicReading from '../src/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const userDefinedOptions = window.bionicReadingOptions || {}

  bionicReading(userDefinedOptions)
})
