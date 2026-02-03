import bionicReading from '../src/index.js'

window.bionicReading = bionicReading

document.addEventListener('DOMContentLoaded', () => {
  const userDefinedOptions = window.bionicReadingOptions || {}

  bionicReading(userDefinedOptions)
})
