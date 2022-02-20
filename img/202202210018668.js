//版本: V688 最后更新：2022年2月19日09:53

var 一级 = {
    A: function() {
        var d = [];
        var html = getResCode()
        var list = pdfa(html, 列表);
        for (var j in list) {
            d.push({
                title: pdfh(list[j], 标题),
                desc: pdfh(list[j], 描述),
                img: pd(list[j], 图片) + '@Referer=',
                url: "hiker://empty##" + pd(list[j], 链接).replace("window\.open\/\(\'","").replace("')","") + "#immersiveTheme#"
            });
        }
        setResult(d)
    },
    TLDT: function() {
        var d = d || []
        var getRangeColors = function() {       
            return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);     
        }
        var 分类颜色 = getRangeColors();
        var page = MY_PAGE;
        var true_url = getMyVar('header.url', MY_URL);
        let 链接处理工具 = requireCache('https://gitee.com/reborn0/HikerRules/raw/master/plugins/UrlProcessor.js')
        true_url = 链接处理工具
            .链接(true_url)
            .页码(page)
            .获取处理结果();

        var html = fetch(true_url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)'
            }
        }) //我统一使用PC UA

        // '0' 为默认不折叠，'1' 为默认折叠
        const 当前折叠状态 = getMyVar('header.fold', '1')

        // 引入动态分类依赖
        // 框架已经稳定，使用 requireCache 更佳
        let htmlCategories = requireCache('https://gitee.com/reborn0/HikerRules/raw/master/plugins/categories-header.js')
        htmlCategories.界面(d)
            .分类链接(true_url)
            .源码(html)
            .页码(page)
            .添加分类定位(定位列表)
            .开启内置折叠功能() // 必须
            .折叠按钮样式({
                title: 当前折叠状态 == "1" ? "‘‘️ALL⁺’’" : "‘‘ALL⁻’’"
            }) // 可选
            .折叠(当前折叠状态) // 必须
            .选中的分类颜色(分类颜色)
            .开始打造分类();
        var list = pdfa(html, 列表);
        for (var j in list) {
            d.push({
                title: pdfh(list[j], 标题),
                desc: pdfh(list[j], 描述),
                img: pd(list[j], 图片) + '@Referer=',
                url: "hiker://empty##" + pd(list[j], 链接).replace("window\.open\/\(\'","").replace("')","") + "#immersiveTheme#"
            });
        }
        setResult(d)
    }
}

var 章节 = {
    A: function() {
        if (MY_URL.indexOf('hiker://empty##') > -1) {
            var html = request(MY_URL.split('##')[1])
        } else {
            var html = getResCode()
        }
        var conts = parseDomForArray(html, 列表)[0]
        var list = parseDomForArray(conts, 列表名)
        var title = parseDomForHtml(list[list.length - 1], 'a&&Text')
        setResult("更新至: " + title);
    }
}

evalPrivateJS("OOncWri6HxAKf68mvdKqfBUb24h0PG0v3+T0m2zVwcvVeuhoFbEhtNcVjpjRXQLmPF4yThw24sy+bziUG9ZT3Q==");

var 二级 = {
    C: function() {
        var d = [];
        var html0 = null
        MY_URL = MY_URL.split("##")[MY_URL.split("##").length - 1]
        getResCode = () => {
            if (html0) {
                return html0;
            }
            let a = getMyVar("二级：" + MY_URL, "")
            if (a) {
                html0 = a
                return a
            } else {
                html0 = request(MY_URL);
                putMyVar("二级：" + MY_URL, html0);
                return html0
            }
        }
        var html = getResCode();
        var arts = pdfa(html, 线路列表);
        var tabs = [];
        for (var i in arts) {
            tabs.push(pdfh(arts[i], 线路标签).replace('-官方', '').replace('备用资源', '').replace('APP专享线路（网站不提供播放）', 'APP专享').replace('）', ')').replace('（', '(').replace('视频', '').replace('TV', '').replace('线路', '').replace('推荐', '').replace('-', '').replace(' ', '').replace(' ', '').replace('蓝光秒播', '789pan').replace('蓝光极速', '人人迷').replace('蓝光①线', '腾讯').replace('蓝光④线', '芒果').replace('蓝光②线', '奇艺').replace('蓝光③线', '优酷').replace('蓝光⑤线', '搜狐').replace('蓝光⑦线', 'PPTV').replace('臻品影视①', 'leduo').replace('臻品影视②', 'bjm3u8').replace('臻品影视③', 'dbm3u8').replace('臻品影视④', 'tkm3u8').replace('臻品影视⑤', '605m3u8').replace('光纤云一', '爱奇艺').replace('光纤云二', '腾讯').replace('光纤云三', '优酷').replace('光纤云四', '芒果').replace('极速云一', '乐多').replace('极速云二', '哔哩哔哩').replace('飞碟云一', 'fuckapp').replace('流星云一', 'wjm3u8').replace('流星云二', 'bdxm3u8').replace('飞碟云二', 'fuckapp1').replace(' (支持手机)', ''))
        }
        var conts = pdfa(html, 选集列表);
        var lists = [];
        for (var i in conts) {
            lists.push(pdfa(conts[i], 选集标签))
        }

        d.push({
            title: "分类：" + pdfh(html, 类型).replace(/\//g, ' ').replace('分类：', '').replace('地区：', '').replace('年代：', '').replace('类型：', '').replace('年份：', '').substring(0, 17) + '\n' + pdfh(html, 演员).replace(/\//g, ' ').substring(0, 21),
            desc: pdfh(html, 更新).replace(/\//g, ' ').substring(0, 23) + '\n' + pdfh(html, 导演).replace(/\//g, ' ').substring(0, 19),
            pic_url: pd(html, 图片) + '@Referer=',
            url: "hiker://empty@lazyRule=.js:putVar('style', getVar('style','1')=='1'?'0':'1');refreshPage(false);'hiker://empty'",
            col_type: 'movie_1_vertical_pic_blur',
            extra: {
                gradient: true
            }
        });
        var Color = "#f13b66a";
        var Color1 = "#098AC1";
        const Color2 = 自定义颜色 = '#17B76C';        function getHead(title) {
            return '‘‘’’<font color="' + Color2 + '">' + title + '</font>';
        }
        var desc = '简介 : ' + pdfh(html, 简介).replace('　　', '').replace('详情：', '').replace('剧情：', '').replace('　', '').replace('[收起部分]', '').replace('  展开全部', '').replace('收起全部', '').replace(' ', '').replace('展开 收起', '').replace('简介：', '').replace('...详情', '').replace(' 展开全部', '').substring(0, 60) + "…详情";
        d.push({
            title: '““””<small><font color=#871f78>' + desc + '</font></small>',
            url: 'hiker://empty#' + '\n\t\t\t\t\t\t\t' + pdfh(html, 简介) + `@rule=js:var res = {}; var d = [];d.push({title:'影片简介：'+MY_URL.split('hiker://empty#')[1],col_type: 'long_text'});res.data = d; setHomeResult(res);`,
            col_type: 'text_1'
        });
        d.push({
            col_type: 'line_blank'
        });
        d.push({
            col_type: 'big_blank_block'
        });
        d.push({
            col_type: 'big_blank_block'
        });
        d.push({
            col_type: 'big_blank_block'
        });
        d.push({
            title: getHead('☯'),
            url: 图片链接,
            col_type: 'scroll_button'
        });

        function setTabs(tabs, taburl) {
            for (var i in tabs) {
                var tabname = tabs[i];
                d.push({
                    title: tabname,
                    col_type: 'scroll_button',
                    url: $("#noLoading#").lazyRule((tabname, taburl, i) => {
                        putMyVar('当前线路名', tabname);
                        putMyVar(taburl, i)
                        refreshPage(false);
                        return 'hiker://empty'
                    }, tabname, taburl, i)
                })
            }
        }

        function setLists(lists, index) {
            var list = lists[index];
            try {
                if (pdfh(list[0], "a&&Text").match(/(\d+)/)[0] > pdfh(list.slice(-1)[0], "a&&Text").match(/(\d+)/)[0]) list.reverse()
            } catch (e) {}
            if (tabs.length > 1 || list.length > 20) {
                if (getMyVar('选集排序') == 1) {
                    var sx = '<font color = "' + Color2 + '"><b>↿</b></font>' + '<font color = "grey"><b>⇂</b></font>';
                } else {
                    var sx = '<font color = "grey"><b>↿</b></font>' + '<font color = "' + Color2 + '"><b>⇂</b></font>';
                }
                //技术支持:追剧君,图标支持:蓝莓
                //图标
                var obj = {
                    "腾讯": "https://lanmeiguojiang.com/tubiao/movie/131.svg",
                    "优酷": "https://lanmeiguojiang.com/tubiao/movie/128.svg",
                    "奇艺": "https://lanmeiguojiang.com/tubiao/movie/130.svg",
                    "爱奇艺": "https://lanmeiguojiang.com/tubiao/movie/130.svg",
                    "芒果": "https://lanmeiguojiang.com/tubiao/movie/32.svg",
                    "咪咕": "https://lanmeiguojiang.com/tubiao/movie/134.svg",
                    "西瓜": "https://lanmeiguojiang.com/tubiao/movie/135.svg",
                    "搜狐": "https://lanmeiguojiang.com/tubiao/movie/129.svg",
                    "乐视": "https://lanmeiguojiang.com/tubiao/movie/58.svg",
                    "风行": "https://lanmeiguojiang.com/tubiao/movie/136.svg",
                    "PPTV": "https://lanmeiguojiang.com/tubiao/movie/133.svg",
                    "1905": "https://lanmeiguojiang.com/tubiao/movie/132.svg",
                    "bilibili": "https://lanmeiguojiang.com/tubiao/movie/20.svg",
                    "专线": "https://lanmeiguojiang.com/tubiao/movie/141.svg",
                    "专线2": "https://lanmeiguojiang.com/tubiao/movie/142.svg",
                };
                d.push({
                    title: getMyVar('当前线路名', tabs[0]) + "<small><font color='grey'>" + '\t\t--> ' + list.length + ' 集' + "</font></small>" + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + sx + "正反序★",
                    url: `@lazyRule=.js:if(getMyVar('选集排序')==1){putMyVar('选集排序', 0);}else{putMyVar('选集排序', 1)};refreshPage(false);'hiker://empty'`,
                    img: obj[getMyVar('当前线路名', tabs[0])] || "https://lanmeiguojiang.com/tubiao/movie/105.svg",
                    col_type: 'avatar'
                })
            }
            for (let i = 0; i < 5; i++) {
                d.push({
                    col_type: "blank_block"
                })
            }

            function playLists() {
                var jm = pdfh(list[j], 'a&&Text').replace(/第|集|话|期|-/g, '').replace(/预告/g, '');
                if (list.length < 5) {
                    var col = 'text_2'
                } else {
                    var col = jm.length > 5 ? 'text_3' : 'text_4'
                }
                let url = pd(list[j], 'a&&href');
                d.push({
                    title: jm,
                    url: url + lazy,
                    col_type: col,
                    extra: {
                        id: url,
                        blockRules: ['.css', '.gif', '.jpg', '.jpeg', '.png', '.ico', '.svg', 'cnzz', 'google', 'xn--*:*', 'hm.baidu.com', '/ads/*.js', '.m3u8', '.mp4']
                    }
                });
            }
            addListener('onClose', $.toString((MY_URL) => {
                clearMyVar('当前线路名');
                clearMyVar('分集起');
                clearMyVar('分集终');
                clearMyVar("二级：" + MY_URL);
            }, MY_URL))
            //选集＞则启用选集分区
            if (list.length > 104) {
                //设置内页选集数目
                var page_number = 100;
                var star = getMyVar('分集起', '1');
                var end = getMyVar('分集终', JSON.stringify(page_number));
                var total = Math.ceil(list.length / page_number);
                var catalogue = []
                for (let i = 0; i < total; i++) {
                    catalogue += i * page_number + ',';
                    catalogue = catalogue.split(',');
                }
                for (let i = 0; i < 8; i++) {
                    d.push({
                        col_type: "blank_block"
                    })
                }
                for (var i = 0; i < catalogue.length - 1; i++) {
                    var total1 = parseInt(catalogue[i]) + 1;
                    var total2 = parseInt(catalogue[i + 1]);
                    if (i == (catalogue.length - 2)) var total2 = list.length;
                    d.push({
                        title: star == total1 ? '‘‘' + total1 + '-' + total2 + '’’' : total1 + '-' + total2,
                        url: $("#noLoading#").lazyRule((total1, total2) => {
                            putMyVar('分集起', total1);
                            putMyVar('分集终', total2);
                            refreshPage();
                            return 'hiker://empty'
                        }, total1, total2),
                        col_type: 'scroll_button'
                    });
                }
                if (getMyVar('选集排序') == 1) {
                    for (var j = end - 1; j >= star - 1; j--) {
                        playLists()
                    }
                } else {
                    for (var j = star - 1; j < end; j++) {
                        playLists()
                    }
                }
            } else {
                if (getMyVar('选集排序') == 1) {
                    for (var j = list.length - 1; j >= 0; j--) {
                        playLists()
                    }
                } else {
                    for (var j = 0; j < list.length; j++) {
                        playLists()
                    }
                }
            }
            d.push({
                col_type: 'rich_text'
            });
            d.push({
                col_type: 'rich_text'
            });
        }
        setTabs(tabs, MY_URL);
        setLists(lists, getMyVar(MY_URL, '0'));
        /*d.push({
            title: '““””<small><small><font color=#871f78>数据资源收集于网络，海阔不提供任何资源</font></small>',
            desc: '““””<small><small><font color=#f20c00>本规则仅限学习与交流，请导入后24小时内删除，请勿传播！</font></small>',
            url: MY_URL,
            col_type: 'text_center_1'
        });*/
        addLanJie(d);
    },
    B: function() {
        js: var d = [];
        var html0 = null
        MY_URL = MY_URL.split("##")[MY_URL.split("##").length - 1]
        getResCode = () => {
            if (html0) {
                return html0;
            }
            let a = getMyVar("二级：" + MY_URL, "")
            if (a) {
                html0 = a
                return a
            } else {
                html0 = request(MY_URL);
                putMyVar("二级：" + MY_URL, html0);
                return html0
            }
        }
        var html = getResCode();
        //自定义颜色
        const Color = '#17B76C';
        //影片信息
        d.push({
            title: "分类：" + pdfh(html, 类型).replace(/\//g, ' ').replace('分类：', '').replace('地区：', '').replace('年代：', '').replace('类型：', '').replace('年份：', '').substring(0, 17) + '\n' + pdfh(html, 演员).replace(/\//g, ' ').substring(0, 21),
            desc: pdfh(html, 更新).replace(/\//g, ' ').substring(0, 23) + '\n' + pdfh(html, 导演).replace(/\//g, ' ').substring(0, 19),
            pic_url: pd(html, 图片) + '@Referer=',
            url: "hiker://empty@lazyRule=.js:putVar('style', getVar('style','1')=='1'?'0':'1');refreshPage(false);'hiker://empty'",
            col_type: 'movie_1_vertical_pic_blur',
            extra: {
                gradient: true
            }
        });        
        var desc = '简介 : ' + pdfh(html, 简介).replace('　　', '').replace('详情：', '').replace('剧情：', '').replace('　', '').replace('[收起部分]', '').replace('  展开全部', '').replace('收起全部', '').replace(' ', '').replace('展开 收起', '').replace('简介：', '').replace('...详情', '').replace(' 展开全部', '').substring(0, 60) + "…详情";
        d.push({
            title: '““””<small><font color=#871f78>' + desc + '</font></small>',
            url: 'hiker://empty#' + '\n\t\t\t\t\t\t\t' + pdfh(html, 简介) + `@rule=js:var res = {}; var d = [];d.push({title:'影片简介：'+MY_URL.split('hiker://empty#')[1],col_type: 'long_text'});res.data = d; setHomeResult(res);`,
            col_type: 'text_1'
        });
        d.push({
            col_type: 'line_blank'
        });
        d.push({
            col_type: 'big_blank_block'
        });
        var tabs = parseDomForArray(html, 线路列表); //线路
        var conts = parseDomForArray(html, 选集列表); //选集
        if (getVar('shsort', '1') == '1') {
            var sx = '<small><font color="grey">正反序★</font></small>' + '<font color = "' + Color + '"><b>↿</b></font>' + '<font color = "grey"><b>⇂</b></font>';
        } else {
            var sx = '<small><font color="grey">正反序★</font></small>' + '<font color = "grey"><b>↿</b></font>' + '<font color = "' + Color + '"><b>⇂</b></font>';
        }
        for (var i = 0; i < conts.length; i++) {
            var icon_s =
                'http://82.156.222.77/weisyr/icon/';
            var avatar = '';
            if (getVar('shsort', '1') == '1') {
                var list = parseDomForArray(conts[i], 选集标签);
                avatar = icon_s + '反序.svg';
            } else {
                var list = parseDomForArray(conts[i], 选集标签).reverse();
                avatar = icon_s + '正序.svg';
            }
            //setError(conts[0]);
            //技术支持:追剧君,图标支持:蓝莓
            //图标
            var obj = {
                "腾讯": "https://lanmeiguojiang.com/tubiao/movie/131.svg",
                "优酷": "https://lanmeiguojiang.com/tubiao/movie/128.svg",
                "奇艺": "https://lanmeiguojiang.com/tubiao/movie/130.svg",
                "爱奇艺": "https://lanmeiguojiang.com/tubiao/movie/130.svg",
                "芒果": "https://lanmeiguojiang.com/tubiao/movie/32.svg",
                "咪咕": "https://lanmeiguojiang.com/tubiao/movie/134.svg",
                "西瓜": "https://lanmeiguojiang.com/tubiao/movie/135.svg",
                "搜狐": "https://lanmeiguojiang.com/tubiao/movie/129.svg",
                "乐视": "https://lanmeiguojiang.com/tubiao/movie/58.svg",
                "风行": "https://lanmeiguojiang.com/tubiao/movie/136.svg",
                "PPTV": "https://lanmeiguojiang.com/tubiao/movie/133.svg",
                "1905": "https://lanmeiguojiang.com/tubiao/movie/132.svg",
                "bilibili": "https://lanmeiguojiang.com/tubiao/movie/20.svg",
                "专线": "https://lanmeiguojiang.com/tubiao/movie/141.svg",
                "专线2": "https://lanmeiguojiang.com/tubiao/movie/142.svg",
            };
            var line = parseDomForHtml(tabs[i], 线路标签).replace('-官方', '').replace('备用资源', '').replace('APP专享线路（网站不提供播放）', 'APP专享').replace('）', ')').replace('（', '(').replace('视频', '').replace('TV', '').replace('线路', '').replace('推荐', '').replace('-', '').replace(' ', '').replace(' ', '').replace('蓝光秒播', '789pan').replace('蓝光极速', '人人迷').replace('蓝光①线', '腾讯').replace('蓝光④线', '芒果').replace('蓝光②线', '奇艺').replace('蓝光③线', '优酷').replace('蓝光⑤线', '搜狐').replace('蓝光⑦线', 'PPTV').replace('臻品影视①', 'leduo').replace('臻品影视②', 'bjm3u8').replace('臻品影视③', 'dbm3u8').replace('臻品影视④', 'tkm3u8').replace('臻品影视⑤', '605m3u8').replace('光纤云一', '爱奇艺').replace('光纤云二', '腾讯').replace('光纤云三', '优酷').replace('光纤云四', '芒果').replace('极速云一', '乐多').replace('极速云二', '哔哩哔哩').replace('飞碟云一', 'fuckapp').replace('流星云一', 'wjm3u8').replace('流星云二', 'bdxm3u8').replace('飞碟云二', 'fuckapp1').replace(' (支持手机)', '').replace('腾腾', '腾讯').replace('芒芒', '芒果').replace('AQY', '爱奇艺').replace('酷酷', '优酷');
            var num = '<small><small>' + (i + 1) + '/' + conts.length + '</small></small>';
            if (list != null) {
                d.push({
                    title: line + '\t\t' + num.sup().fontcolor(Color),
                    url: "hiker://empty@lazyRule=.js:putVar('shsort', getVar('shsort','1')=='1'?'0':'1');refreshPage();'hiker://empty'",
                    img: obj[line] || "https://lanmeiguojiang.com/tubiao/more/299.png",
                    col_type: 'avatar'
                });
                for (var j = 0; j < list.length; j++) {
                    var jm = parseDomForHtml(list[j], 'a&&Text').replace(/第|集|话|期/g, '').replace(/预告/g, '📢');
                    var url = parseDom(list[j], 'a&&href');
                    var col = '';
                    if (list.length <= 2) {
                        col = 'text_2'
                    } else {
                        col = jm.length > 5 ? 'text_2' : 'text_4'
                    }
                    d.push({
                        title: jm,
                        url: url + lazy,
                        col_type: col,
                        extra: {
                            id: url,
                            blockRules: ['.css', '.gif', '.jpg', '.jpeg', '.png', '.ico', '.svg', 'cnzz', 'google', 'xn--*:*', 'hm.baidu.com', '/ads/*.js', '.m3u8', '.mp4']
                        }
                    });
                }
            }
        }
        d.push({
            col_type: 'rich_text'
        });
        d.push({
            col_type: 'rich_text'
        });
        setHomeResult(d);
    },
    A: function() {
        if (getVar('style', '1') == '1') {
            var sty = 二级.C;
        } else {
            var sty = 二级.B;
        }
        sty()
    }
}

var 搜索 = {
    A: function() {
        var d = [];
        var res = {};
        var html = getResCode();
        var list = pdfa(html, 列表);
        for (var j in list) {
            d.push({
                title: pdfh(list[j], 标题),
                desc: pdfh(list[j], 描述),
                content: pdfh(list[j], 类型).substring(0, 19) + '\n' + pdfh(list[j], 简介),
                img: pd(list[j], 图片) + "@Referer=",
                url: "hiker://empty##" + pd(list[j], 链接).replace("window\.open\/\(\'","").replace("')","") + "#immersiveTheme#"
            });
        }
        res.data = d;
        setSearchResult(res);
    },
    B: function() {
        var json = {};
        eval('json=' + getResCode());
        var res = {};
        var d = [];
        for (var i = 0; i < json.list.length; i++) {
            var r = {};
            var j = json.list[i];
            r.title = j.name;
            r.img = j.pic.indexOf('http') != -1 ? j.pic : url + j.pic;
            r.url = urll + j.id + '/' + "#immersiveTheme#";
            r.content = j.name + '\n' + j.en;
            if (r.title !== null && r.title !== undefined && r.title !== '') d.push(r);
        }
        res.data = d;
        setSearchResult(res);
    },
    //搜索C技术源码有墙佬提供，yyds
    C: function() {
        var d = [];
        var html = getResCode();
        if (html.indexOf('检测中') != -1) {
            html = request(MY_URL + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {
                headers: {
                    'Cookie': getMyVar('cookie')
                }
            });
        }
        if (html.indexOf('系统安全验证') > -1) {
            var ssyz = 'TloGnnikThrfs/5fDNlk5CSsbaGtAH7W/uMZjuYoIupB6bCoo9CotLQHfPIdGgbkbynKqL2aUE2Xy558X2QxHYtTU09vD+4oaCDIuSZO7nxDbLfRGfWj7zql+yMbvF+aJoD/m6Psfw/PyYOAp/ZVGdrPzaCByfd0HL5DFVSw+YF2OC40V8SP9RxdFKKdrBuPxCWdxUCFrJ+1lRy/TU3LC84C4xxEBhgud7RtBp0zZArqBE06+Z3JtDP0eFCz/D5X0409qPHK3e1y/LuUgccuxpHnjYLE1GjlP8wYA2hQWe7yPngggQBHw33/gvb3tuCcxEKTWgmah/R32AH9ZF8jF7WemT26lUizVXe/spCdhDiwRmgTBTHWuSeJWgKHJRb9iVSn2X6OK90RfEqjkC/rIUeZMOlYpXh7zXix9HkNSurWsdOgtH46rV4Xi7EYo5Ksh0ZP9HUrZ5YHpH3pyeXMlZINa9KUhHeS6n79hjw9AlRL8ys+hzx2iDejWJBmihuJVQYjlWSgB7EAMas2+2yzBCS7H2+45+c8/PETISE+t0qXX621OW+KdysH4jBck/eV9seH/bTWaEoBMesyj/x/h6ScJQtQRavyAk+318qOcIJ+68hs502OnfsTjUgXtyXDjZ7TIcvBBIdP0ewBZpCdOxonBPMSC/QfoZBfJDV6YxXMTghGkKraKK2t+/3MUd+PwippGuO3P2jnH88FPyyx9f12Z/jKRNS+6l9fL9MbuGjr/wL73kz5E7sUEI4NTNOkZrShs/ni+qKrz4WBygFPymdAogdK4WNX2t9wb+t0+uk9ozEHo+kmifijiMQHrwsGNh++imQtlLD7hff6T7uHuY9f34N+NRhedZLNOS3aDJ6SQw96bLncC5rIk5XwLw/NejXlzWg2SDlRGyz31UArjafxA8EgsQ0weLWJn8C3+RqU8sO39MGS4yjQDG5gIa4bSUvBru7wJ6t0FTrBFRGYHeSGRAcyu7SB1CRmJ0rFgwBd59E2LLA56xPs9RUpedVUI/RoFKQlr8g0dUnP3BPtDSfkhSsIrOyyo+fD7u6wJmXzxckZYSvaJCyjvoTQR853a7y3wJ/AlB/nhdqW4QtdirczrhioAEdgZ/u0c+QtZx00QFJd+O6UWVqHQREOVdmiGdtJ+yuf05M6vr26SaegpFUR2hiEHZQYOR/+kTta2i0='
            evalPrivateJS(ssyz);
            let headers = {
                "User-Agent": PC_UA,
                "Cookie": getMyVar('cookie'),
                "Referer": MY_URL
            };
            let vcode = getVCode2(验证码, JSON.stringify(headers), 'num');
            fetch(验证码链接 + JSON.parse(vcode).ret, {
                headers: headers,
                method: 'POST'
            });
            html = fetch(getUrl(), {
                headers: headers
            });
        }

        log(html)
        pdfa(html, 列表).forEach(list => {
            d.push({
                title: pdfh(list, 标题),
                desc: pdfh(list, 描述),
                content: pdfh(list, 类型).substring(0, 19) + '\n' + pdfh(list, 简介),
                img: pd(list, 图片) + "@Referer=",
                url: "hiker://empty##" + pd(list, 链接).replace("window\.open\/\(\'","").replace("')","") + "#immersiveTheme#"
            });
        })
        setResult(d)
    }
}