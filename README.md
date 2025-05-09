# lofter-helper 增强Lofter网页版体验的油猴脚本

Lofter网页版的功能相比手机APP有所缺失，本仓库提供一些增强体验的脚本，在网页版上实现了一些移动端的功能。  
目前实现五个脚本：

- lofter-comment：Lofter 网页版显示划线评论
- lofter-history: Lofter 网页版显示移动端历史记录
- lofter-collection: Lofter 网页版显示用户合集
- lofter-subscription: Lofter网页版查看订阅合集
- lofter-discover: Lofter网页版查看发现内容（手机版的首页推荐）

## lofter-comment：Lofter 网页版显示划线评论
### 介绍
通过ajaxhook拦截评论信息，通过其中的pid标签将评论附在对应划线原文后边，仿照移动版客户端的代码生成折叠式的划线评论（有待美化

### 安装方法
使用本脚本前需要先安装TamperMonkey(篡改猴)插件

之后，再点击[本链接](https://greasyfork.org/zh-CN/scripts/530884)进入本脚本的安装页面，点击安装即可。

### 示例图
![](./example.jpg)

### 注意
本脚本不支持GreaseMonkey

目前需要进入文章详情页(全文)才能正常工作，在首页展开文章的话无法显示评论

## lofter-history: Lofter 网页版显示移动端历史记录

### 安装方法
使用本脚本前需要先安装TamperMonkey(篡改猴)插件

之后，再点击[本链接](https://greasyfork.org/zh-CN/scripts/531592)进入本脚本的安装页面，点击安装即可。

### 使用方法
安装脚本后打开[Lofter](https://www.lofter.com)，等待几秒后会发现右边侧栏多出一个历史记录按钮，点击即可查看移动端历史记录

### 注意
Lofter网页版不记录历史记录，本脚本通过移动端APP获取历史记录，无法获得网页端的浏览历史

## lofter-collection: Lofter 网页版显示用户合集
安装后，访问用户页(*username*.lofter.com)时会多出一个"合集"按钮，点击后即可查看该用户发布的合集信息

点击合集中的"查看详情"可以看到该合集的文章列表

### 安装方法
使用本脚本前需要先安装TamperMonkey(篡改猴)插件

之后，再点击[本链接](https://greasyfork.org/zh-CN/scripts/532099)进入本脚本的安装页面，点击安装即可。

### 使用方法
安装脚本后打开用户页(*username*.lofter.com)，点击"合集"按钮即可(可能需要等待1~2s该按钮才会出现)

### 存在问题
本脚本对非默认主题页面支持不好

## lofter-subscription: Lofter网页版查看订阅合集
使用方法基本与基本与lofter-history相同

安装地址：[点我](https://greasyfork.org/zh-CN/scripts/532266)

## lofter-discover: Lofter网页版查看发现内容（手机版的首页推荐）
使用方法基本与基本与lofter-history相同

安装地址：[点我](https://greasyfork.org/zh-CN/scripts/532972)