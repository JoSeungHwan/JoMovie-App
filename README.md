# Movie App (TypeScript)

OMDb API를 활용해 VanillaJS 영화 검색 애플리케이션을 만들어봅니다.

[DEMO](https://movie-app-murex-zeta-28.vercel.app/#/)

![Screenshot](https://github.com/JoSeungHwan/notepad/blob/master/img/project/Movie-app.png?raw=true)

###

```bash
$ npm i -D vercel@latest
```

새롭게 추가할 OpenAI API Key 환경변수와 구분하기 위해, 기존의 `APIKEY` 환경변수의 이름을 `OMDB_API_KEY`로 변경했습니다.

```json
{
  "type": "module"
}
```

영화 검색 후 'View More..' 버튼이 보일 때, 다른 영화를 새롭게 검색해서 결과를 출력할 수 없는 경우에 'View More..' 버튼이 사라지지 않는 버그가 있습니다.  
이는 `pageMax` 상태를 초기화하지 않아서 발생하는 문제이기 때문에, 다음과 같이 `src/store/movie.ts` 파일의 `searchMovies` 함수 내용에서 해당 초기화 코드를 추가해야 합니다!

```ts
if (Response === 'True') {
  // 77번째 줄
  store.state.movies = [...store.state.movies, ...Search];
  store.state.pageMax = Math.ceil(Number(totalResults) / 10);
} else {
  store.state.message = Error;
  store.state.pageMax = 1; // 85번째 줄, 버그 수정을 위해 새롭게 추가된 코드!
}
```

### 프로젝트 시작하기

```bash
$ npm i
$ npm run vercel
```

### Reset.css

브라우저의 기본 스타일을 초기화합니다.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"
/>
```

### Google Fonts

[Oswald](https://fonts.google.com/specimen/Oswald?query=oswa), [Roboto](https://fonts.google.com/specimen/Roboto?query=robo) 폰트를 사용합니다.

```html
<link
  href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

### Headline.js HTML

```html
<h1>
  <span>OMDb API</span><br />
  THE OPEN<br />
  MOVIES DATABASE
</h1>
<p>
  The OMDb API is a RESTful web service to obtain movie information, all content
  and images on the site are contributed and maintained by our users.<br />
  If you find this service useful, please consider making a one-time donation or
  become a patron.
</p>
```

## Vercel Hosting

`node-fetch` 패키지는 꼭 2버전으로 설치해야 합니다!

```bash
$ npm i -D vercel dotenv
$ npm i node-fetch@2
```

**/vercel.json**

```json
{
  "devCommand": "npm run dev",
  "buildCommand": "npm run build"
}
```

**/package.json**

```json
{
  "scripts": {
    "vercel": "vercel dev"
  }
}
```

### Vercel 개발 서버 실행

Vercel 구성 이후에는 `npm run dev`가 아닌 `npm run vercel`로 개발 서버를 실행해야 합니다!

```bash
$ npm run vercel
```

## Vercel Serverless Functions

프로젝트 루트 경로에 `/api` 폴더를 생성하고,  
API Key 를 노출하지 않도록 서버리스 함수를 작성합니다.

**/api/movie.ts**

```ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const { OMDB_API_KEY } = process.env;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { title, page, id } = JSON.parse(request.body as string);
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json);
}
```

### 환경변수

로컬의 개발용 서버에서 사용할 환경변수를 `.env` 파일에 지정합니다.

**/.env**

```dotenv
OMDB_API_KEY=<MY_OMDb_API_KEY>
```

제품 서버(Vercel 서비스)에서 사용할 환경변수를 지정합니다.  
Vercel 서비스의 프로젝트 **'Settings / Environment Variables'** 옵션에서 다음과 같이 환경변수를 지정합니다.

![Screenshot](/screenshots/screenshot_vercel_environment.JPG)

## TypeScript

타입스크립트 코어 패키지를 설치하고 `tsconfig.json` 파일에 기본적인 구성을 추가합니다.

```bash
$ npm i -D typescript
```

**/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts", "api/**/*.ts"]
}
```
