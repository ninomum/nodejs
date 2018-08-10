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

var mongoose = require('mongoose'); // 加载mongoose模块
mongoose.connect('mongodb://localhost/nino'); // 连接mongodb本地数据库imovie
console.log('MongoDB connection success!');
var movie = require('./models/movie.js'); // 载入mongoose编译后的模型movie

var _underscore = require('underscore'); // _.extend用新对象里的字段替换老的字段

app.get('/', function(req, res){
    movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {  // 渲染index 首页
            title: 'i_movie 首页',
            movies: movies
        });
    });
    // res.render('index',{
    //     title: 'nino 首页',
    //     movies:[{
    //         title: 'nino 1',
    //         _id: 1,
    //         poster: "/image/1.png"
    //     },{
    //         title: 'nino 2',
    //         _id: 2,
    //         poster: "/image/2.jpg"
    //     },{
    //         title: 'nino 3',
    //         _id: 3,
    //         poster: "/image/3.jpg"
    //     },{
    //         title: 'nino 4',
    //         _id: 4,
    //         poster: "/image/4.jpg"
    //     },{
    //         title: 'nino 5',
    //         _id: 5,
    //         poster: "/image/5.png"
    //     },{
    //         title: 'nino 6',
    //         _id: 6,
    //         poster: "/image/6.png"
    //     },{
    //         title: 'nino 7',
    //         _id: 7,
    //         poster: "/image/7.png"
    //     }]
    // })
});

app.get('/movie/:id', function(req, res){
    var id = req.params.id;
    movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: 'i_movie' + movie.title,
            movie: movie
        });
    });
    // res.render('detail',{
    //     title: 'nino 详情',
    //     movie: {
    //         flash: "/image/1.swf",
    //         title: 'nino 1',
    //         who: 'mum',
    //         where: 'home',
    //         when: '2018.8.8',
    //         what: 'nino最可爱',
    //     }
    // })
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

// admin post movie 后台录入提交
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie = null;
    if (id !== 'undefined') { // 已经存在的电影数据
        movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _underscore.extend(movie, movieObj); // 用新对象里的字段替换老的字段
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {  // 新加的电影
        _movie = new movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
});

app.get('/admin/list', function(req, res){
    res.render('list',{
        title: 'nino 列表',
        movie: [{
            title: 'nino 1',
            _id: 1,
            who: 'mum',
            where: 'home',
            when: '2018.8.8',
            what: 'nino最可爱',
        },{
            title: 'nino 2',
            _id: 2,
            who: 'mum2',
            where: 'home2',
            when: '2018.8.9',
            what: 'nino最最最可爱',
        }]
    })
})