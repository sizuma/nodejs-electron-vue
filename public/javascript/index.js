const App = {
    data: {
        markdown: '',
        html: ''
    }
};

App.app = new Vue({
    el: '#main',
    data: App.data,

    methods: {
        keyup: function () {
            superagent
                .post(`${serverURL}/markdown`)
                .send({
                    markdown: App.data.markdown,
                })
                .end( (error, res) => {
                    if (error) console.error(error);
                    else {
                        App.data.html = res.text;
                    }
                });
        }
    }
});
