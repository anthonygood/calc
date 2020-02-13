import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import ComparisonTool from './components/ComparisonTool'

ReactDOM.render(<ComparisonTool />, document.getElementById('root'))

const callingCard = {
  text: 'color: grey; font-size: 24px; font-family: arial;',
  body: 'color: grey; font-size: 14px; font-family: arial;',
  iwoca: 'color: #fb534a; font-size: 24px; font-weight: bold;',
  link: 'color: blue;',
}

console.log(
  '%cHello %ciwoca%c!%c\nI hope you like my fugly but functional app.\nCheck out the repo at https://github.com/anthonygood/calc\nIf you want something prettier check out my minesweeper game: https://boring-lichterman-c60633.netlify.com\n\nYours,\nAnthony',
  callingCard.text,
  callingCard.iwoca,
  callingCard.text,
  callingCard.body
)
