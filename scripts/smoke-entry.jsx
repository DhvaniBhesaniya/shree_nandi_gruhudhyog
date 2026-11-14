// Loaded through Vite's SSR module runner by smoke-render.mjs, so React,
// react-dom/server and the app graph all resolve through one resolver and
// share a single React instance. Importing React from Node and the app from
// Vite gave two copies under Vite 8, and hooks threw on a null dispatcher.
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import App from '../src/App.jsx'

export function render() {
  return renderToStaticMarkup(createElement(App))
}
