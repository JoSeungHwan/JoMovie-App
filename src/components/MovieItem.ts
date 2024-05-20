import { Component } from '../core/jo';
import { SimpleMovie } from '../store/movie';

interface Props {
  [key: string]: unknown;
  movie: SimpleMovie;
}

export default class MovieItem extends Component {
  public props!: Props;
  constructor(props: Props) {
    super({
      props,
      tagName: 'a',
    });
  }
  render() {
    const { movie } = this.props;

    this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`);
    this.el.classList.add('movie');
    this.el.style.backgroundImage = `url(${movie.Poster})`;
    this.el.innerHTML = /* html */ `
      <div class="info">
        <div class="year">
          ${movie.Year}
        </div>
        <div class="title">
          ${movie.Title}
        </div>
      </div>
    `;
  }
}

// import { Component } from '../core/jo';

// export default class MovieItem extends Component {
//   constructor(props) {
//     super({
//       props,
//       tagName: 'a',
//     });
//   }
//   render() {
//     const { movie } = this.props;

//     this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`);
//     this.el.classList.add('movie');
//     this.el.style.backgroundImage = `url(${movie.Poster})`;
//     this.el.innerHTML = /* html */ `
//       <div class="info">
//         <div class="year">
//           ${movie.Year}
//         </div>
//         <div class="title">
//           ${movie.Title}
//         </div>
//       </div>
//     `;
//   }
// }
