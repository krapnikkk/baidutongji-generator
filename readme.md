## 工具说明
本工具用于辅助生成百度统计插件在file和chrome-extension等协议环境下【如：electron、chrome extension】能正常上报统计信息的本地插件文件。

## 在线地址
[点击打开](https://krapnikkk.github.io/baidutongji-generator/index.html)

## 开发日志
[点击打开](https://krapnikkk.github.io/2022/02/14/baidutongji-generator/)

## 使用说明
将下载到的hm.js文件通过script标签的形式引入插件即可使用
```
<script type="text/javascript" src="hm.js"></script>
```

在chrome-extension中需要在manifest.json中添加以下配置
```
"content_security_policy": "script-src 'self' 'unsafe-eval' https://hmcdn.baidu.com; object-src 'self'"
```