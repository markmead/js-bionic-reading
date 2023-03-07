# Bionic Reading

Helps developers add support for [bionic reading](https://bionic-reading.com) to their content 📚

## Install

### With a CDN

```html
<script
  defer
  src="https://unpkg.com/bionic-reading@latest/dist/reading.min.js"
></script>
```

### With a Package Manager

```shell
yarn add -D bionic-reading
npm install -D bionic-reading
```

```js
import bionicReading from "bionic-reading";

document.addEventListener("DOMContentLoaded", bionicReading());
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

![](https://img.shields.io/bundlephobia/min/bionic-reading)
![](https://img.shields.io/npm/v/bionic-reading)
![](https://img.shields.io/npm/dt/bionic-reading)
![](https://img.shields.io/github/license/markmead/js-masonry)
