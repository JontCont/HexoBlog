new Vue({
    el: '#app',
    data: {
        visible: false,
        message: 'Hello this Vue.js!'
    },
    methods: {
        show: function(){
            this.visible=this;
        }
    }
});


new Vue({
    el: '#add',
    data: {
        ShowForm: false,
    },
    methods: {
        sendClick: function(){
            this.ShowForm=this;
        }
    }
});


/*
全局配置
 https://www.iviewui.com/docs/guide/global
    Vue.use(ViewUI, {
        transfer: true,
        size: 'large',
        capture: false,
        select: {
            arrow: 'md-arrow-dropdown',
            arrowSize: 20
        }
    });
*/