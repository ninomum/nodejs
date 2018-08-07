const http = require('http')

const homePage = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <title> Nodejs 部署上线 </title>
        <style type="text/css">
            * {
                padding:0;
                margin:0;
            }
            body {
                padding:30px 0;
                text-align: center;
                font-size: 16px;
                background-color:#333;
            }
            h1,
            h2 {
                color:#fff;
            }
            nav {
                margin-top: 20px;
            }
            a {
                color:#ccc;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
    <h1>Nodejs</h1>
    <h2>上线示例</h2>
    <nav>
        <ul>
            <li>
                <a target="_blank" herf="/a"> nodejs 网站1 </a>
            </li>
            <li>
                <a target="_blank" herf="/b"> nodejs 网站2 </a>
            </li>
            <li>
                <a target="_blank" herf="/c"> nodejs 网站3 </a>
            </li>
            <li>                
                <a target="_blank" herf="/d"> nodejs 网站4 </a>
            </li>
        </ul>
    </nav>
    </body>
</html>
`

http.createServer((req, res) => {
    res.statesCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(homePage)
})  
.listen(3000, () => {
    console.log('Server Running At 3000')
})