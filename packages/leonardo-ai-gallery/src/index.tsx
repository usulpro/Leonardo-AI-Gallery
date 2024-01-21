import React from 'react';
import { renderToString } from 'react-dom/server';
import { install } from '@twind/core';
import inline from '@twind/with-react/inline';

import config from './twind.config';
import { Gallery } from './components';

// activate twind
// const tw = install(config);
window.tw = () => install(config);

// const html = inline(renderToString(<Gallery token='123'/>), tw);
// console.log("🚀 ~ html:", html)

export * from './model';
export * from './components';
