import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend, createTransition } from 'dnd-multi-backend';

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,  // Correctly specify the backend property
      transition: createTransition('touchstart', (event) => {
        return (event.target as HTMLElement).tagName === 'CANVAS';
      }),
    },
    {
      backend: TouchBackend,  // Correctly specify the backend property
      options: { enableMouseEvents: true, delayTouchStart: 200 },
    },
  ],
};

export default HTML5toTouch;