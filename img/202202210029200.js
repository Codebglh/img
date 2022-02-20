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
}