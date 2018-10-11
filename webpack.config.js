
/*var CompressionPlugin = require('compression-webpack-plugin');

new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })

        */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devtool: 'inline-source-map',
     devServer: {
       inline: true,
       contentBase: './',
       port : 8080
     },
    entry: {
      app: './src/index.js',
      // myfriends: './src/myFriendsIndex.js'
    },    //'./src/permissionIndex.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        // chunkFilename: '[name].bundle.js',
    },

    mode: "production",
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all'
    //   }
    // },

    // "resolve": {
    //   "alias": {
    //     "react": "preact-compat",
    //     "react-dom": "preact-compat"
    //   }
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['es2015', 'react'] }
                    }
                ]
            },
            {
                test: /(\.scss|\.css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
          title: 'Subscription',
          inject: true,
          filename: 'index.html',
          template:'./index.html',
          chunks:[]
        }),
        // new HtmlWebpackPlugin({
        //   title: 'My Friends',
        //   inject: true,
        //   filename: 'friends',
        //   template:'./myfriends.html',
        //   chunks:[]
        // }),

        new UglifyJsPlugin({
          uglifyOptions: {
            compress : {
              dead_code: true,
              // drop_console: true,
              unused: true
            }
          }
        }),
        new webpack.DefinePlugin({
          // FIREBASE_APIKEY : JSON.stringify('AIzaSyC7x3DyDMBX3MMYAhQe0qs7PLRGoBSjHFE'),
          // FIREBASE_AUTHDOMAIN : JSON.stringify('web-ng-test.firebaseapp.com'),
          // FIREBASE_DATABASE_URL : JSON.stringify('https://web-ng-test.firebaseio.com'),
          // FIREBASE_PROJECT_ID : JSON.stringify('web-ng-test'),
          // FIREBASE_MESSAGING_ID : JSON.stringify('846127550552'),
          // FIREBASE_STORAGE_BUCKET : JSON.stringify('web-ng-test.appspot.com'),
          FIREBASE_APIKEY : JSON.stringify('AIzaSyDpUZwIU_xX0igWcFGWwxh6ioGzuu635-c'),
          FIREBASE_AUTHDOMAIN : JSON.stringify('neargroup-lite.firebaseapp.com'),
          FIREBASE_DATABASE_URL : JSON.stringify('https://neargroup-lite.firebaseio.com'),
          FIREBASE_PROJECT_ID : JSON.stringify('neargroup-lite'),
          FIREBASE_MESSAGING_ID : JSON.stringify('485643019459'),
          FIREBASE_STORAGE_BUCKET : JSON.stringify('neargroup-lite.appspot.com'),
          API: JSON.stringify('https://da0a4c74.ngrok.io/NG/'),  //JSON.stringify('https://4d44c241.ngrok.io/NG/'),
          AVTAR: JSON.stringify('avtar.svg'),
          'process.env': {
              NODE_ENV: JSON.stringify('production')
          },
          PRIMARY_COLOR: '#fffde4'

          // BOT_API: JSON.stringify('https://pwatest.neargroup.me/ng/'), //JSON.stringify('https://245738fa.ngrok.io/NG/')
          // FACE_API: JSON.stringify('https://face.neargroup.me/fileUpload'),
          // GOOGLE_CLIENT_ID : JSON.stringify('590817841198-ud95n1iukoipp3jmg8ilg84j53527j8b.apps.googleusercontent.com'),
          // FB_APP_ID : JSON.stringify('132103753883015'),
          // LS_CHANNELID: JSON.stringify('NG_APP_PWA_CHANNELID'),
          // LS_AUTHID: JSON.stringify('NG_APP_PWA_AUTHID'),
          // LS_URL_CHANNELID: JSON.stringify('NG_APP_PWA_URL_CHANNELID'),
          // LS_URL_AUTHID: JSON.stringify('NG_APP_PWA_URL_AUTHID'),
          // LS_ISLOGGEDIN: JSON.stringify('NG_APP_PWA_LOGGEDIN'),
          // LS_URL_FRIENDS_AUTHID: JSON.stringify('NG_APP_PWA_FRIENDS_URL_AUTHID'),
          // LS_URL_PWA_ONLY_FRIENDS: JSON.stringify('NG_APP_PWA_ONLY_FRIENDS'),
          // LS_URL_PWA_ONLY_SETTINGS: JSON.stringify('NG_APP_PWA_ONLY_SETTINGS'),
          // LS_APP_PWA_FRIENDSLIST: JSON.stringify('NG_APP_SD_friendsListA'),
          // LS_APP_PWA_LASTMSG: JSON.stringify('NG_APP_SD_LAST_MSG'),
          // LS_APP_PWA_UNREADCHATS: JSON.stringify('NG_APP_SD_UNREAD_COUNTS'),
          // LS_APP_PWA_BOT_CHATS: JSON.stringify('NG_APP_SD_BOT_CHATS'),
          // LS_APP_PWA_FRIEND_LASTSEEN: JSON.stringify('NG_APP_SD_FRIEND_LAST_SEEN'),
          // LS_APP_PWA_OFFLINE_CHATS: JSON.stringify('NG_APP_SD_OFFLINE_CHATS'),
          // LS_APP_PWA_CHAT_: JSON.stringify('NG_APP_SD_CHAT_'),
          // LS_APP_PWA_USER_DETAILS: JSON.stringify('NG_APP_SD_USER_DETAILS'),
          // LS_APP_PWA_BOTDATA: JSON.stringify('NG_APP_SD_BOTDATA'),
          // LS_APP_PWA_NOTIFICATION: JSON.stringify('NG_APP_SD_NOTIFICATION'),
          // LS_APP_PWA_LOCATION: JSON.stringify('NG_APP_SD_LOCATION'),
          // LS_APP_PWA_LASTCHAT_TRIGGERSTAMP: JSON.stringify('CHAT_LAST_TRIGGERSTAMP_'),
          // LS_APP_PWA_LOGIN_SESSION: JSON.stringify('NG_APP_SD_LOGINSESSION'),
          // LS_APP_PWA_SHOW_START_CHAT: JSON.stringify('NG_APP_PWA_SHOW_STARTCHAT')
        })
      ]
};

/**
 "libphonenumber-js": "^1.2.15",
 "preact": "^8.2.9",
 "preact-compat": "^3.18.0",
 "react-geosuggest": "^2.8.0",
 "screenfull": "^3.3.2"

 devDependencies:

 "babel-jest": "^21.2.0",
 "compression-webpack-plugin": "^1.1.3",
 "compression-webpack-plugin": "^1.1.3",
 "enzyme": "^3.1.0",
 "enzyme-adapter-react-16": "^1.0.2",
 "eslint-config-airbnb": "^16.1.0",
 "eslint-plugin-import": "^2.8.0",
 "eslint-plugin-jsx-a11y": "^6.0.3",
 "eslint-plugin-react": "^7.5.1",
 "redux-mock-store": "^1.3.0",
 */
