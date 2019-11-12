---
# This front matter is auto generated by the examples.js script
title: Global Country Selection
id: country-selection
script: /examples/maps/country-selection.js
description: Type the names of countries, seperated by commas, to view them in the interactive.
tags: [maps]
weight: 1
draft: undefined
---

{{< highlight javascript >}}
/**
* @title Map Element
* @description This interactive demonstrates the interactive world map element.
* @tags [elements, maps]
*/

import {Interactive, getScriptName} from '../../index.js';
import * as data from '../../../maps/maps-json.js';

let interactive = new Interactive(getScriptName());
interactive.width = 600;
interactive.height = 300;
interactive.root.style.border = "1px solid grey";
let map = interactive.map(data.globalData);

let inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');
let input = document.createElement('input');
input.type = 'text';
input.value = '';
input.id = getScriptName() + '-text-input';
input.classList.add('input');
interactive.container.parentElement.insertBefore(inputContainer, interactive.container);
inputContainer.appendChild(input);

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        map.draw(input.value);
    }
  });