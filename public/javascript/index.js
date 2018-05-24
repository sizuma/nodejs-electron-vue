const App = {
    data: {
        message: 'hi',
        input: '',
        chats: [],
    }
};

App.app = new Vue({
    el: '#main',
    data: App.data,

    methods: {
        submit: function () {
            const input = this.input;
            this.chats.push({
                text: input,
                createdAt: new Date(),
            });
            this.input = '';
        }
    }
});
