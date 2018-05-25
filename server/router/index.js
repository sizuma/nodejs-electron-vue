const express = require('express');
const Router = express.Router();

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

Router.get('/', (req, res) => {
    res.render('index');
});

Router.post('/markdown', (req, res) => {
    const result = markdown.render(req.body.markdown);
    res.send(result);
});

module.exports = Router;