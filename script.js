let app = new Vue({
    el: '#app',
    data: {
        searchQuery: '',
        selectedCategory: 'search',
        selectedEngines: [],
        categories: [
            {label: '网站', value: 'web'},
            {label: '搜索', value: 'search'},
            {label: '视频', value: 'video'},
            {label: '图片', value: 'picture'},
            {label: '消费', value: 'shop'},
            {label: '编程', value: 'programming'},
            {label: '前端库', value: 'front'},
            {label: '工具', value: 'tools'},
            {label: '软件', value: 'software'},
            {label: '其它', value: 'other'}
        ],
        searchEngines: {
            "web": [
                {"name": "实时热点", "url": "http://119.91.248.18/project/04hot/"},
                {"name": "记忆", "url": "http://119.91.248.18/project/06learn/"},
                {"name": "短链", "url": "http://119.91.248.18:8080"},
                {"name": "音频修改", "url": "http://119.91.248.18/project/05meta/"},
                {"name": "单词学习", "url": "http://119.91.248.18/project/07myWord/"},
                {"name": "单词学习github", "url": "https://gitpz.github.io/Subtitle-Vocabulary-Learning-Tool-GPT4/"},
                {"name": "单词拼写", "url": "http://119.91.248.18/project/01word/"},
                {"name": "小雅_火线", "url": "http://119.91.248.18:5678/电视剧/欧美/美剧/火线/SE01"},
                {"name": "frp", "url": "http://119.91.248.18:7500/static/#/"},
                {"name": "claude3.5", "url": "http://119.91.248.18:9091/project/08claude-3.5/"}
            ],
            "search": [
                {name: "百度", url: "https://www.baidu.com/s?wd=%s"},
                {name: "必应", url: "https://www.bing.com/search?q=%s&PC=U316&FORM=CHROMN"},
                {name: "谷歌", url: "https://www.google.com/search?q=%s"},
                {name: "微信", url: "https://weixin.sogou.com/weixin?p=01030402&query=%s&type=2&ie=utf8"},
                {name: "皮卡搜", url: "https://www.pikaso.top/search/?pan=all&type=folder&q=%s"},
                {name: "小云搜", url: "https://www.yunso.net/index/user/s?wd=%s"},
                {name: "混合盘", url: "https://hunhepan.com/search?q=%s&type=ALY"}
            ],
            "video": [
                {name: "B站", url: "https://search.bilibili.com/all?keyword=%s"},
                {name: "抖音", url: "https://www.douyin.com/search/%s"},
                {name: "YouTube", url: "https://www.youtube.com/results?search_query=%s"}
            ],
            "picture": [
                {name: "Pexels", url: "https://www.pexels.com/search/%s/"},
                {name: "Wallhere", url: "https://wallhere.com/zh/wallpapers?q=%s"},
                {name: "Unsplash", url: "https://unsplash.com/s/photos/%s"}
            ],
            "shop": [
                {name: "京东", url: "https://search.jd.com/Search?keyword=%s"},
                {name: "淘宝", url: "https://s.taobao.com/search?q=%s"},
                {name: "大众点评", url: "https://www.dianping.com/search/keyword/4/0_%s"}
            ],
            "programming": [
                {name: "CSDN", url: "https://so.csdn.net/so/search?q=%s"},
                {name: "Stack Overflow", url: "https://stackoverflow.com/search?q=%s"},
                {name: "简书", url: "https://www.jianshu.com/search?q=%s&page=1&type=note"},
                {name: "GitHub", url: "https://github.com/search?q=%s"},
                {name: "力扣", url: "https://leetcode.cn/search/?q=%s"}
            ],
            "front": [
                {name: "npmjs", url: "https://www.npmjs.com/search?q=%s"},
                {name: "jsdelivr", url: "https://www.jsdelivr.com/?query=%s"},
                {name: "cdnjs", url: "https://cdnjs.com/libraries?q=%s"},
            ],
            "tools": [
                {name: "在线工具", url: "https://tool.lu/search/?q=%s"},
                {name: "菜鸟工具", url: "https://www.jyshare.com/index.php?s=%s"},
                {name: "百度指数", url: "https://index.baidu.com/v2/main/index.html#/trend/%s?words=%s"},
                {name: "谷歌指数", url: "https://trends.google.com/trends/explore?q=%s"},
                {name: "谷歌翻译", url: "https://translate.google.com/?sl=auto&tl=en&text=%s&op=translate"},
                {name: "秘塔搜索", url: "https://metaso.cn/?q=%s"},
            ],
            "software": [
                {name: "Scoop", url: "https://scoop.sh/#/apps?q=%s&o=false"},
                {name: "APKCombo", url: "https://apkcombo.com/zh/search/%s#gsc.tab=0&gsc.q=123&gsc.sort="},
                {name: "果核剥壳", url: "https://www.ghxi.com/?s=%s"},
                {name: "油猴", url: "https://greasyfork.org/zh-CN/scripts?q=%s"}
            ],
            "other": [
                {name: "书本-知搜", url: "https://zhiso.cc/search/?q=%s"},
                {name: "书本-z-lib", url: "https://z-lib.gs/s/%s"},
                {name: "EmoJiall", url: "https://www.emojiall.com/zh-hant/search_results?keywords=%s"},
                {name: "IconFont", url: "https://www.iconfont.cn/search/index?searchType=icon&q=%s"},
                {name: "问答库", url: "https://www.asklib.com/s/%s"}
            ]
        },
        suggestions: [],
        timer: null,
        submitText: "搜索"
    },
    watch: {
        selectedCategory() {
            // this.populateAllEngines();
        }
    },
    created() {
        // this.populateAllEngines();
    },
    methods: {
        populateAllEngines() {
            if (this.selectedCategory) {
                const engines = this.searchEngines[this.selectedCategory];
                this.selectedEngines = engines.map(engine => engine.url);
            }
        },
        selectCategory(category) {
            this.selectedEngines = [];
            this.selectedCategory = category;
            let searchBox = document.getElementById('searchQuery');
            if (category === "web"){
                this.searchQuery = '';
                searchBox.style.display = "none";
                this.submitText = "跳转"
            }else {
                searchBox.style.display = "block";
                this.submitText = "搜索"
            }
        },
        search() {
            const searchQuery = this.searchQuery;
            const selectedEngines = this.selectedEngines;
            selectedEngines.forEach(function (engine) {
                if (searchQuery.trim() === '') {
                    const regex = /^(https?:\/\/[^\/]+)\//;
                    const match = engine.match(regex);
                    console.log(engine)
                    if (!engine.includes("%s")){
                        window.open(engine, "_blank");
                    }else if (match) {
                        window.open(match[1], "_blank");
                    }
                } else {
                    window.open(engine.replaceAll("%s", encodeURIComponent(searchQuery)), "_blank");
                }
            });
        },
        getSuggestions() {
            const searchQuery = this.searchQuery;
            if (searchQuery.trim() !== '') {
                const apiUrl = `https://suggestion.baidu.com/su?wd=${encodeURIComponent(searchQuery)}&cb=window.baidu.sug`;
                const script = document.createElement('script');
                script.src = apiUrl;
                document.body.appendChild(script);
            } else {
                this.suggestions = [];
            }
            this.clearTimer();
            this.startTimer();
        },
        selectSuggestion(suggestion) {
            this.searchQuery = suggestion;
            this.suggestions = [];
        },
        startTimer() {
            this.timer = setTimeout(() => {
                this.hideDiv();
            }, 3000);
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
        hideDiv() {
            this.suggestions = [];
        }
    }
});

// Callback function for Baidu suggestion API
window.baidu = {
    sug: function (data) {
        if (data && data.s) {
            app.$data.suggestions = data.s;
        }
    }
};