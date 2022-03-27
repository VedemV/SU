# Создание workspace проекта и нескольких приложений с нуля

Последовательность команд для создания `workspace` проекта 
с несколькими `ExtJS` приложениями
с примером создания нативного приложения.

Актуально только для разработки с использованием `Sencha SDK`.
 
При использовании `npm` о размещении `framework` для 
нескольких приложений в одном месте остается только мечтать. 

Возможно  использование `pnpm` может решить проблему, но этот вариант не исследован.

_Все изложенное ниже носит рекомендательный характер_
  
Для примера создадим следующие приложения:

- __admin__: приложение администрирования системы с namespace `MyApp.admin`
- __main__: основное web приложение с namespace `MyApp.main`
- __mobile__: мобильное приложение с namespace `MyApp.mobile`
- __package__: общий пакет разработки для всех приложений с namespace `MyApp`
 
## Создание workspace

__Действия выполняем в папке проекта, там где будут расположены все 
ExtJS приложения и эта папка будет являться корнем web сервера__ 

#### Generate workspace

```sh
sencha generate workspace .
```
_не забывем про точку_

Чтобы не выполнять следующий шаг, можно использовать ключ `-sdk`:

```sh
sencha -sdk d:\Sencha\SDK\ext-6.5.2\ generate workspace .
```

#### Подключение framework ExtJS, единого для всех приложений

```sh
sencha framework upgrade ext d:\Sencha\SDK\ext-6.5.2\ ext
```

__Внимание!__ 
_Эту же команду нужно использовать при клонировании проекта для 
установки ExtJS на локальном или сборочном компе._

### Доработка файлов конфигурации

Начиная с 5 или 6 версии `Sencha Cmd` появилась неприятная запись 
в файле `workspaсe.json` в секции `packages`:

```json
    "packages": {
        "dir": "${workspace.dir}/packages/local,${workspace.dir}/packages",
        "extract": "${workspace.dir}/packages/remote"
    }
```
 меняем ее на 
 
 ```json
     "packages": {
         "dir": "${workspace.dir}/packages",
         "extract": "${workspace.dir}/packages/remote"
     }
 ```

Дополняем файл `.gitignore` строками

```
/ext
/packages/remote
version.properties
```

Файл `version.properties` потребуется при 
подготовке [общего версионирования](#общее-версионирование) проекта

Все готово!
 
В итоге имеем начальную структуру workspace:

![](data:image/png;base64,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)

__`.gitignore`__

```
/build
bootstrap.*
classic.json*
modern.json*
.sencha
/ext
/packages/remote
version.properties
``` 

__`workspace.json`__

```json
{
    "frameworks": {        
        "ext": {
            "path":"ext",
            "version":"6.5.2.463"
        }

    },

    "build": {
        "dir": "${workspace.dir}/build"
    },

    "packages": {
        "dir": "${workspace.dir}/packages",
        "extract": "${workspace.dir}/packages/remote"
    }
}
```
## Создание общего пакета разработки

Сразу генерируем общий пакет разработки.
Здесь храним общие модули для приложений (модели данных, сторы, компоненты)
и через этот пакет удобно получать [версию](#общее-версионирование) проекта.


```sh
sencha generate package -names MyApp -name myapp myapp
```

где 

- MyApp: namespace пакета;
- myapp: папка размещения (`./packages/myapp`) и имя пакета одновременно.

Дополнительных настроек в `package.json` не требуется.

Можно подправить параметры

- version: устанавливаем значение "1.0.0.0";
- compatVersion: оставляем в 3-х значном варианте (1.0.0);
- toolkit: если все приложения будут в modern;
- requires: заполнится при разработке;
- creator;
- summary;
- detailedDescription.

Последние 3 параметра для феншуя, оформляем по необходимости.

## Создание приложений

Создание приложения:

- используем framework в папке `ext`
- namespace приложения `MyApp.admin` / `MyApp.main` / `MyApp.mobile`
- папка приложения `admin` / `main` / `mobile`

```sh
$ sencha generate app -ext -modern MyApp.admin ./admin
$ sencha generate app -ext -modern MyApp.main ./main
$ sencha generate app -ext -modern MyApp.mobile ./mobile
```

__Дальнейшие действия выполняем в папке приложения__

### Общие настройки приложений

Для добавления пакета SU Packages  правим в файле `app.json`:

```json
"locale": "ru",

"requires": [
    "font-awesome",
    "material-icons",
    "su",
    "su-native",
    "su-locale"
]
```

- locale: включение локализации, если не используем динамическую
- requires: пакеты по необходимости, _пакет `su-native` только для нативных приложений_

Если не нравится названия css файлов типа `myapp-all.css`, дополняем раздел `output` файла `app.json`:

```json
"output": {
    "base": "${workspace.build.dir}/${app.name}/${build.environment}",
    "css": "${app.output.css.dir}/${app.name}.css",
    "appCache": {
        "enable": false
    }
}
```

или

```json
"output": {
    "base": "${workspace.build.dir}/${app.name}/${build.environment}",
    "css": "${app.output.css.dir}/style.css",
    "appCache": {
        "enable": false
    }
}
```

Для устранения проблемы потерянных классов убираем подключение `ext-all-debug.js`.

В секции `js` файла `add.json`

```json
"js": [
    // Комметарим или удаляем
    //{
    //    "path": "${framework.dir}/build/ext-modern-all-debug.js"
    //},
    {
        "path": "app.js",
        "bundle": true
    }
]
```
 
В файле `app.js` убираем строки

```js
requires: [
    // This will automatically load all classes in the App namespace
    // so that application classes do not need to require each other.
    'App.*'
],
```

и следим за секцией `requires` в js файлах, для подключения нужных зависимостей.

Добавляем файл конфигурации `config.js` и прописываем его подключение в `app.json`

- секция `js`

```json
"js": [
    {
        "path": "config.js",
        "remote": true 
    },
    {
        "path": "app.js",
        "bundle": true
    }
]
```

- секция `extras`

```json
"extras": [
    "config.js"
]
```

### Для мобильных приложений и приложения в Microsoft Store

Инициализируем `cordova`

```sh
$ sencha cordova init ru.skillunion.myapp MyApp
```

Правим секцию `builds` в файле `app.json` для настройки раздельных сборок
мобильных приложений:

```json
"builds": {
    "web": {
        "default": true
    },
    "android": {
        "packager": "cordova",
        "cordova": {
            "config": {
                "platforms": "android",
                "id": "ru.skillunion.myapp",
                "name": "MyApp"
            },
            "output": {
                "manifest": {
                    "path": "${app.name}.json"
                }
            }
        }
    },
    "ios": {
        "packager": "cordova",
        "cordova": {
            "config": {
                "platforms": "ios",
                "id": "ru.skillunion.myapp",
                "name": "MyApp"
            },
            "output": {
                "manifest": {
                    "path": "${app.name}.json"
                }
            }
        }
    },
    "windows": {
        "packager": "cordova",
        "cordova": {
            "config": {
                "platforms": "windows",
                "id": "ru.skillunion.myapp",
                "name": "MyApp"
            },
            "output": {
                "manifest": {
                    "path": "${app.name}.json"
                }
            }
        }
    }
}
```

#### Плагины для классов с поддержкой нативных функций

Для мобильных приложений подключаем плагины `cordova`. 
Подключение выполнять в папке cordova приложения

```sh
$ cordova plugin add [plugin name]
```

- [cordova-plugin-dialogs](https://www.npmjs.com/package/cordova-plugin-dialogs): {@link Ext.MessageBox} с нативными далогами;
- [cordova-plugin-x-toast](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin): {@link Ext.Toast} с нативными информерами;
- [cordova-plugin-network-information](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/): {@link SU.native.Network} определение состояния сети;
 
## Сборка приложений

Сборка debug версии приложения для android

```sh
$ sencha app build android
```

Сборка debug версии приложения для ios

```sh
$ sencha app build ios
```
Сборка debug версии приложения для windows

```sh
$ sencha app build windows
```
## Общее версионирование

В пакета `SU Packages` имеется доработка, обеспечивающая общее версионирование.

Эта доработка позволяет 
- автоматически повышать номер сборки в версии
всех приложений;
- собирать все приложения одновременно;
 
Это удобно для
- публикации мобильных приложений в магазинах; 
- отобажения версии на стартовых экранах и в форме "About".

Чтобы использовать доработку необходимо скопировать файлы `package.json` и `build.xml` 
из `./su` в корень проекта и выполнить настройку `package.json`:

```json
{
    "name": "MyApp",
    "namespace": "MyApp",
    "type": "code",
    "framework": "ext",
    "creator": "anonymous",
    "summary": "Short summary",
    "detailedDescription": "Long description of package",
    "version": "1.0.0.0",
    "compatVersion": "1.0.0",
    "format": "1",
    "slicer": {
        "js": [
            {
                "path": "${package.dir}/sass/example/custom.js",
                "isWidgetManifest": true
            }
        ]
    },
    "output": "${package.dir}/build",
    "local": true,
    "sass": {
        "namespace": "MyApp",
        "etc": [
            "${package.dir}/sass/etc/all.scss"
        ],
        "var": [
            "${package.dir}/sass/var",
            "${package.dir}/sass/var/all.scss"
        ],
        "src": [
            "${package.dir}/sass/src",
            "${package.dir}/sass/src/all.scss"
        ]
    },
    "classpath": [
        "${package.dir}/src"
    ],
    "overrides": [
        "${package.dir}/overrides"
    ],
    "example": {
        "path": [
            "${package.dir}"
        ],
        "apps": [
            "admin",
            "main",
            "mobile"
        ]
    },
    "requires": [],
    "properties": {
        "skip.sass": 1,
        "skip.slice": 1,
        "skip.js": 1,
        "skip.pkg": 1,
        "skip.pkgs": 1,
        "skip.examples": 0
    }
}
```
 
Запуск общей сборки

```shell
sencha package build
```

При первой сборке автоматически будет создан файл `version.properties`  со стартовой версией проекта `1.0.0.0`.
Следующие сборки будут инкрементировать build номер версии (1.0.0.1, 1.0.0.2 и т.д.).

Инкрементировать patch и обнулить build номера версии можно командой `ant bump` (1.0.1.0 и т.д.) 

```shell
sencha ant bump
```

Установить нужную стартовую версию проекта до сборки, например `3.2.0.0` или `3.2.1.53` можно следующими командами

```shell
sencha ant -p version=3.2 bump
```

или

```shell
sencha ant -p version=3.2.1.53 bump

```
