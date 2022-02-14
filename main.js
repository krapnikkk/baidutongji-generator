const $ = selector => document.querySelector(selector);
const main = () => {
    $("#download").addEventListener("click", () => {
        let txt = $("#source").value;
        if (!txt) {
            alert("请输入弹窗加载的插件代码!");
        } else {
            let href = "window.location.href.split('/').slice(-1)[0]";
            var re = new RegExp(/dm:\[(.*?)\]/, "ig");
            re.exec(txt);
            if (!RegExp.$1) {
                alert("未能发现统计插件代码中的有效地址，请检查输入内容是否正确！");
            }
            let host = RegExp.$1.split(",")[0];
            if (!host) {
                alert("未能发现统计插件代码中的有效地址，请检查输入内容是否正确！");
            } else {
                console.log("匹配到host为：", host);
                txt = txt.replace(/document.location.hostname/g, `${host}`) // file和chrome-extension等协议不存在document.location.hostname,直接使用新增网站时的网站域名来替代
                    .replace(/window.location.host|document.location.host/g, `${host}`) // file和chrome-extension等协议不存在document.location.host,直接使用新增网站时的网站域名来替代
                    .replace(/window.location.href|document.location.href/g, `"https://${host.replace(/"/ig, "")}/" + ` + href) // file和chrome-extension等协议的访问路径过长，直接使用url中最后的一个字符"/"后面的路径替换
                    .replace("/https?:/.test(document.location.protocol)", `true`); // 不校验协议
                const blob = new Blob([txt], { type: "application/javascript" });
                const url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.style.display = 'none';
                a.href = url;
                a.download = 'hm.js';
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                a = null;
            }
        }
    })

    $("#load").addEventListener("click", () => {
        let url = $("#code").value;
        if (!url) {
            alert("请输入百度统计获取到的统计代码!");
        } else {
            let src = url.match(/\b(([\w-]+:\/\/?| www[.])[^\s()<>]+(?:[\w\d]+|([^[:punct:]\s]|\/)))/ig)[0];
            console.log("查询到插件地址：", src);
            if (src) {
                window.open(src, '_blank', 'width=600,height=600,menubar=no,toolbar=yes, status=no,scrollbars=yes');
                alert("获取插件成功!请手动复制弹窗页的内容！")
            }
        }
    })

}


