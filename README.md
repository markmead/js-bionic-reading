# Bionic Reading

Helps developers add support for [bionic reading](https://bionic-reading.com) to
their content 📚

## Install

### With a CDN

```html
<script
  defer
  src="https://unpkg.com/data-bionic-reading@latest/dist/reading.min.js"
></script>
```

### With a Package Manager

```shell
yarn add -D data-bionic-reading
npm install -D data-bionic-reading
```

```js
import bionicReading from 'data-bionic-reading'

document.addEventListener('DOMContentLoaded', bionicReading())
```

## Example

```html
<article data-bionic-reading>
  <h1>Welcome to my website, it is a great website!</h1>

  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis,
    dignissimos exercitationem! Ratione natus explicabo, maiores enim
    reprehenderit perspiciatis ipsum deserunt?
  </p>

  <p>
    Lorem ipsum dolor sit amet <a href="#">consectetur adipisicing</a> elit.
    Rerum, possimus.
  </p>

  <ul>
    <li>Lorem ipsum dolor sit amet.</li>

    <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
  </ul>
</article>
```

And that's it.

## Stats

![](https://img.shields.io/bundlephobia/min/data-bionic-reading)
![](https://img.shields.io/npm/v/data-bionic-reading)
![](https://img.shields.io/npm/dt/data-bionic-reading)
![](https://img.shields.io/github/license/markmead/data-bionic-reading)
