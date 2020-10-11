Display H5P content without using a webserver and send xAPI statement to a desired endpoint


## Using NPM
```
npm install h5p-xapi-sender
```

### Build from source
Clone this repo to your local machine, and run the following npm commands
- Production
```
npm run build
```

- Development
```
npm run build:dev
```

## Basic Usage

```html
<head>
  <meta charset="utf-8" />
  <script type="text/javascript" src="<path>/main.bundle.js"></script>
</head>

<body>
  <!-- data-workspace = optional (workspace directory by default is workspace)  -->
  <div id="h5p-container" data-workspace="workspace"></div>
</body>
```