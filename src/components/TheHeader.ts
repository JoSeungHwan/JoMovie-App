import { Component } from '../core/jo';

interface State {
  [key: string]: unknown;
  menus: {
    name: string;
    href: string;
  }[];
}

export default class TheHeader extends Component {
  public state!: State;
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/',
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt4520988',
          },
          {
            name: 'About',
            href: '#/about',
          },
        ],
      },
    });
    window.addEventListener('popstate', () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <a
        href="#/"
        class="logo">
        <span>OMDbAPI</span>.COM
      </a>
      <nav>
        <ul>
          ${this.state.menus
            .map((menu) => {
              const href = menu.href.split('?')[0];
              const hash = location.hash.split('?')[0];
              const isActive = href === hash;
              return /* html */ `
              <li>
                <a
                  class="${isActive ? 'active' : ''}"
                  href="${menu.href}">
                  ${menu.name}
                </a>
              </li>`;
            })
            .join('')}
        </ul>
      </nav>
      <a href="#/about" class="user">
        <img src="https://avatars.githubusercontent.com/u/111415219?u=aff17905a0f1263d4f21cc37af3b3dece7e6c2ba&v=4" alt="User">
      </a>
    `;
  }
}

// export default class TheHeader extends Component {
//   constructor() {
//     super({
//       tagName: 'header',
//       state: {
//         menus: [
//           {
//             name: 'Search',
//             href: '#/',
//           },
//           {
//             name: 'Movie',
//             href: '#/movie?id=tt4520988',
//           },
//           {
//             name: 'About',
//             href: '#/about',
//           },
//         ],
//       },
//     });
//     window.addEventListener('popstate', () => {
//       this.render();
//     });
//   }
//   render() {
//     this.el.innerHTML = /* html */ `
//       <a
//         href="#/"
//         class="logo">
//         <span>OMDbAPI</span>.COM
//       </a>
//       <nav>
//         <ul>
//           ${this.state.menus
//             .map((menu) => {
//               const href = menu.href.split('?')[0];
//               const hash = location.hash.split('?')[0];
//               const isActive = href === hash;
//               return /* html */ `
//               <li>
//                 <a
//                   class="${isActive ? 'active' : ''}"
//                   href="${menu.href}">
//                   ${menu.name}
//                 </a>
//               </li>`;
//             })
//             .join('')}
//         </ul>
//       </nav>
//       <a href="#/about" class="user">
//         <img src="https://avatars.githubusercontent.com/u/111415219?u=aff17905a0f1263d4f21cc37af3b3dece7e6c2ba&v=4" alt="User">
//       </a>
//     `;
//   }
// }
