var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;  //process 全局变量
var app = express();   //启动web服务器 

app.set('views','./views/pages');
app.set('view engine','jade');
//app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('nino started on port ' + port);

app.get('/', function(req, res){
    res.render('index',{
        title: 'nino 首页',
        movies:[{
            title: 'nino 1',
            _id: 1,
            poster: "/image/1.png"
        },{
            title: 'nino 2',
            _id: 2,
            poster: "/image/2.jpg"
        },{
            title: 'nino 3',
            _id: 3,
            poster: "/image/3.jpg"
        },{
            title: 'nino 4',
            _id: 4,
            poster: "/image/4.jpg"
        },{
            title: 'nino 5',
            _id: 5,
            poster: "/image/5.png"
        },{
            title: 'nino 6',
            _id: 6,
            poster: "/image/6.png"
        },{
            title: 'nino 7',
            _id: 7,
            poster: "/image/7.png"
        }]
    })
});

app.get('/movie/:id', function(req, res){
    res.render('detail',{
        title: 'nino 详情',
        movies: {
            title: 'nino 1',
            who: 'mum',
            where: 'home',
            when: '2018.8.8',
            what: 'nino最可爱',
        }
    })
});

app.get('/admin/movie', function(req, res){
    res.render('admin',{
        title: 'nino 后台',
        movies: {
            title: '',
            who: '',
            where: '',
            when: '',
            what: '',
        }
    })
});

app.get('/admin/list', function(req, res){
    res.render('list',{
        title: 'nino 列表',
        movies: {
            title: 'nino 1',
            _id: 1,
            who: 'mum',
            where: 'home',
            when: '2018.8.8',
            what: 'nino最可爱',
        },
    })
})