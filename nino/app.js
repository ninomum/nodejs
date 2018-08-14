var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;  //process 全局变量
var app = express();   //启动web服务器 

app.set('views','./views/pages');
app.set('view engine','jade');

app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('nino started on port ' + port);

var mongoose = require('mongoose'); // 加载mongoose模块
var db = mongoose.connect("mongodb://localhost:27017/nino"); 



var bodyParser = require('body-parser');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
app.use(bodyParser.urlencoded({extended: true}));


var movie = require('./models/movie.js'); // 载入mongoose编译后的模型movie

var _underscore = require('underscore'); // _.extend用新对象里的字段替换老的字段

app.get('/', function(req, res){
    movie.fetch(function (err, movie) {
        if (err) {
            console.log(err);
        }
        res.render('index', {  // 渲染index 首页
            title: 'i_movie 首页',
            movie: movie
        });
    });
});

app.get('/movie/:id', function(req, res){
    var id = req.params._id;
    movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: 'i_movie' + movie.title,
            movie: movie
        });
    });
});

app.get('/admin/movie', function(req, res){
    res.render('admin',{
        title: 'nino 后台',
        movie: {
            title: '',
            who: '',
            where: '',
            when: '',
            what: '',
        }
    })
});

// admin update movie 后台更新页
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imovie 后台更新页',
                movie: movie
            });
        });
    }
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
            title: movieObj.title,
            who: movieObj.who,
            where: movieObj.where,
            when: movieObj.when,
            what: movieObj.what,
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
    movie.fetch(function (err, movie) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'i_movie 列表页',
            movie: movie
        });
    });
})