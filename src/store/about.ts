import { Store } from '../core/jo';

interface State {
  photo: string;
  name: string;
  email: string;
  Notion: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo:
    '	https://avatars.githubusercontent.com/u/111415219?u=aff17905a0f1263d4f21cc37af3b3dece7e6c2ba&v=4',
  name: 'Jo / JoSeungHwan',
  email: 'swcc321@naver.com',
  Notion:
    'https://www.notion.so/IOS-Developer-e65fa672d22e45d3885e09503206a495?pvs=4',
  github: 'https://github.com/JoSeungHwan',
  repository: 'https://github.com/JoSeungHwan/-vanillajs-movie-app',
});
