# Smart Mirror

A smart mirror for a smarter you

## Installation

### Automatic installation

This installer will only work on Raspberri Pi devices.
1. Login to your device via SSH.
2. bash -c "$(curl -sL https://raw.githubusercontent.com/MrPAttema/VueSmartMirror/master/installmirror.sh)"

### Manual installation

1. Download and install the latest Node.js version.
2. Clone the repository and check out the master branch: git clone https://github.com/MrPAttema/VueSmartMirror.
3. Enter the repository: cd ~/VueSmartMirror/
4. Install and run the app with: npm install && npm run build.
5. For Server Only use: npm install && caddy & DISPLAY=:0 chromium-browser -start-maximized --kiosk https://localhost:2015.


For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Create Component

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
