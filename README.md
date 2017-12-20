________________________________________________________
________________________________________________________
>**npm install** - installing environment
>
>**npm start** - launch project
>
>**npm run build** - build production version
________________________________________________________
________________________________________________________
# List of Projects
| folder | app |
| ------ | ------ |
| my-reads.app/ | **[MyReads.app](https://myreads.000webhostapp.com/)** |
| contacts.app/ | **[MyContacts.app](https://my-contacts-000.000webhostapp.com/)** |
| readable.app/ | **[Readable.app](https://readably.000webhostapp.com/)** |

## Switch between projects:
```js
//webpack.config.js
const
    develop = '*.app' //name project-folder
    production = 'dist'; // name production folder
```
________________________________________________________
________________________________________________________
## Each Project have:

- **api/ or local-storage/** - _Calls to a backend API_

- **components/** - _Presentational (aka Dumb) components go here_

- **scenes/** - _These are the stateful ones, and the ones that make the API calls_

- **theme.js** - _Project theme_

- **helpers.js** - _Helper Functions and Constants if needed_

- **favicon/** - _Favicon (Logo)_
________________________________________________________
________________________________________________________