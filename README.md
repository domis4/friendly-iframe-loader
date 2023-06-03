# friendly-iframe-loader

creates a friendly iframe, that can interact with `window.parent` even though it was hosted on another origin.
usage:
```
yarn
```

launch react-app from `localhost:8080`
```
yarn start
```

launch cdn on `localhost:8081` which triggers origin protection. The iframe can resize itself though.
```
yarn start-cnd
```

open `localhost:8081` to see this example:

![GIF of example](/example.gif)
