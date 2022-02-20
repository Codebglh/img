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
                url: "hiker://empty##" + pd(list[j], 链接).replace("window.open/('","").replace("')","") + "#immersiveTheme#"
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
                url: "hiker://empty##" + pd(list[j], 链接).replace("window.open/('","").replace("')","") + "#immersiveTheme#"
            });
        }
        setResult(d)
    }
}