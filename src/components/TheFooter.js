import { Component } from '../core/jo';
import aboutStore from '../store/about';

export default class TheFooter extends Component {
  constructor() {
    super({
      tagName: 'footer',
    });
  }
  render() {
    const { github, repository } = aboutStore.state;
    this.el.innerHTML = /* html */ `
      <div>
        <a href="https://github.com/JoSeungHwan/-vanillajs-movie-app">
          GitHub Repository.
        </a>
      </div>
      <div>
        <a href="https://github.com/JoSeungHwan">
          ${new Date().getFullYear()}
          Jo!
        </a> 
      </div> 
    `;
  }
}
