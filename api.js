const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));


app.post('/data/signin', (req, res) => {
    fs.readFile(path.join(__dirname, '../example/public/data/signin.json'), 'utf8', function(error, content) {
        var json = JSON.parse(content);
        res.end(JSON.stringify(json));
    });
});


app.get('/getPaymentsPageText', (req, res) => {
    let json;
    // if(req.query.id == 1) {
        json = {
          "modes": [
            {
              "text": "Credit Card",
              "type": "stripe"
            },
            {
              "text": "Cellphone Load",
              "type": "mol"
            }
          ],
          "text": {
            "molPackages": [
              {
                "amount": "125",
                "description": "Get 1 month subscription",
                "currency": "peso",
                "text": "Pay"
              },
              {
                "amount": "250",
                "description": "Get 9 months subscription",
                "currency": "peso",
                "text": "Pay"
              },
              {
                "amount": "500",
                "description": "Get 9 months subscription",
                "currency": "peso",
                "text": "Pay"
              }
            ],
            "title": "Subscription",
            "stripePackages": [
              {
                "amount": "2.5",
                "description": "Get 1 month subscription",
                "currency": "usd",
                "text": "Pay"
              },
              {
                "amount": "5",
                "description": "Get 9 months subscription",
                "currency": "usd",
                "text": "Pay"
              },
              {
                "amount": "10",
                "description": "Get 9 months subscription",
                "currency": "usd",
                "text": "Pay"
              }
            ],
            "selectPlan": "Select a plan to proceed"
          }
        }
    // } else if(req.query.id == 2) {
    //     json = {
    //         "friends": [
    //             {
    //                 "name": "Dev",
    //                 "channelId": "app123464761549791",
    //                 "imageUrl": "app123464761549791",
    //                 "meetingId": "39917045"
    //             },
    //             {
    //                 "name": "Manas",
    //                 "channelId": "1633552226682996",
    //                 "imageUrl": "1633552226682996",
    //                 "meetingId": "39917041"
    //             }
    //         ],
    //         "me": {
    //             "name": "Rohit",
    //             "channelId": "1497165653730393",
    //             "imageUrl": "1497165653730393"
    //         }
    //     }
    // } else if(req.query.id == 3) {
    //     json = {
    //         "friends": [
    //             {
    //                 "name": "Rohit",
    //                 "channelId": "1497165653730393",
    //                 "imageUrl": "1497165653730393",
    //                 "meetingId": "39917045"
    //             },
    //             {
    //                 "name": "Manas",
    //                 "channelId": "1633552226682996",
    //                 "imageUrl": "1633552226682996",
    //                 "meetingId": "39917040"
    //             }
    //         ],
    //         "me": {
    //             "name": "Dev",
    //             "channelId": "app123464761549791",
    //             "imageUrl": "app123464761549791"
    //         }
    //     }
    // }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.end(JSON.stringify(json));
});

app.get('/getImages', (req, res) => {
  let json = [
          {
              "name": "Rohit",
              "channelId": "1497165653730393",
              "imageUrl": "https://s3.us-west-2.amazonaws.com/ng-image/ng/profile/profile_%252B2uqDe13zteVBgZFKjYbYw%253D%253D",
              // "meetingId": "39917041"
          },
          {
              "name": "Dev",
              "channelId": "app123464761549791",
              "imageUrl": "https://s3.us-west-2.amazonaws.com/ng-image/ng/profile/profile_%252B0ABIaw1qJtf8KAb0%252FMfeg%253D%253D",
              // "meetingId": "39917040"
          },
          {
              "name": "jamshed",
              "channelId": "1497165653730393",
              "imageUrl": "https://s3.us-west-2.amazonaws.com/ng-image/ng/profile/profile_%252B%252F9lu%252F%252BK6Na5TwXEWtjOsg%253D%253D",
              // "meetingId": "39917041"
          },
          {
              "name": "subham",
              "channelId": "app123464761549791",
              "imageUrl": "https://s3.us-west-2.amazonaws.com/ng-image/ng/profile/profile_%252BcTOv8SW%252BON%252FY79GSrDpIQ%253D%253D",
              // "meetingId": "39917040"
          },
          {
              "name": "jamshed",
              "channelId": "1497165653730393",
              "imageUrl": "https://s3.us-west-2.amazonaws.com/ng-image/ng/profile/profile_%2B71scdfi0tk4fo3zoym8aq%3D%3D_1530390690575",
              // "meetingId": "39917041"
          },
          {
              "name": "subham",
              "channelId": "app123464761549791",
              "imageUrl": "https://s3.us-west-2.amazonaws.com/ng-image/ng/profile/profile_%2B71scdfi0tk4fo3zoym8aq%3D%3D_1529749269759",
              // "meetingId": "39917040"
          }
      ]



  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.end(JSON.stringify(json));
})

app.get('/getdata', (req, res) => {
  let json = {
    questions: [
      {
        id:"myGender",
        options:[{female: "Female", male: "Male"}],
        question:"Gender",
        required:true,
        subtitle:"",
        type:"buttonSelect"
      }
    ]
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.end(JSON.stringify(json));
})

app.use(express.static(path.join(__dirname, '../example/public')));
app.use(express.static(path.join(__dirname, '../dist')));


app.listen(8081, '0.0.0.0', err => {
    if (err) {
        console.warn(err);
        return;
    }
    console.info('http://localhost:8081');
});
