const express = require('express');

const hljs = require('highlight.js');

const markdown = require('markdown-it')({
    html: false,
    linkify: true,
    typographer: true,

    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) {
                console.error(e);
            }
        }

        return '';
    }
});

const Router = express.Router();

Router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.NODE_OUTER_HOST);
    res.render('index', {
        serverURL: `${process.env.NODE_OUTER_HOST}`,
    });
});

Router.post('/markdown', (req, res) => {
    const result = markdown.render(req.body.markdown);
    res.send(result);
});

module.exports = Router;
