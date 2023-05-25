const { registerBlockType } = wp.blocks;
const { Component, createElement: we, useState } = wp.element;
const { Button, TextControl } = wp.components;



const e = React.createElement;

let cSWPBlock1Att = {
  id: "cswp-block1", 
  style: {
    'display': 'flex',
    'align-items': 'center',
    'flex-direction': 'column',
    'justify-content': 'center',
    'width': '800px',
    'height': '500px',
    'position': 'relative'},
};

let cSWPBlock1Background1Att = {
  id: "cswp-block1-background1", 
  style: {
    'background-image': 'url("https://magdeleine.co/wp-content/uploads/2019/10/48920131698_f77fcb9b6e_o-1400x933.jpg")',
    'background-repeat': 'no-repeat',
    'background-attachment': 'fixed',
    'border-radius': '25px',
    'box-shadow': '5px 10px 5px 5px #888888',
    'object-fit': 'cover',
    'color': 'rgba(0,0,0,0.5)',
    'width': '600px',
    'height': '400px',
    'position': 'absolute',
  'z-index': '0'},
};

let cSWPBlock1Image1Att = {
  id: "cswp-block1-image1", 
  src: 'https://magdeleine.co/wp-content/uploads/2019/12/foodiesfeed.com_two-coffee-cappuccino-and-waffle-1400x933.jpg',
  style: {
    'border-radius': '25px',
    'box-shadow': '2px 2px 2px 2px #888888',
    'object-fit': 'cover',
    'width': '600px',
    'height': '400px',
  'position': 'absolute',
  'z-index': '1',
  'transform': 'rotate(20deg)',
'opacity': '0.8'},
};

let cSWPBlock1Text1Att = {
  id: "cswp-block1-text1", 
  style: {
    'color': 'rgba(255,255,255,0.5)',
  'position': 'absolute',
  'z-index': '2',
  'transform': 'rotate(20deg)',
'font-family': 'Georgia',
  'font-size': '24px',
'bottom': '10%',
  'right': '10%'},
};

registerBlockType('cswp-diary/block1', {
  title: 'CSWP block1',
  category: 'common',
  icon: 'dashicons-book-alt',
  description: 'write anything',
  keywords: ['example', 'test'],
  edit: () => { 
    return we(
      'div',
      cSWPBlock1Att,
      we('div', cSWPBlock1Background1Att, null),
      we('img', cSWPBlock1Image1Att, null),
      we('p', cSWPBlock1Text1Att, 'What you want to say...'),
    );
  },
  save: () => { 
    return we(
      'div',
      cSWPBlock1Att,
      we('div', cSWPBlock1Background1Att, null),
      we('img', cSWPBlock1Image1Att, null),
      we('p', cSWPBlock1Text1Att, 'What you want to say...'),
    );
  }
});


