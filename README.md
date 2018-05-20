#基于vue+node的前后端分离的个人博客

### 项目介绍：
本项目是一个简单的前后端分离项目，用于个人练习及日后的博客使用。是对于全栈的一个简单尝试。
本项目主要分为：
前台展示（目前暂时只提供**文章展示**功能，暂不支持评论等功能。）
后台管理（用户管理，文章管理，栏目管理，评论管理）


###项目技术栈：
前端：

- **Vue** 
- **Vue-cli** vue的脚手架工具
- **Vuex** 状态管理
- **Vue-router** 前端路由处理 
- **Vue-resource** + **axios** 做前端路http请求转发
- **mavoneditor** 一款基于vue的markdown编辑器
- **element-ui** 一套基于vue的UI框架

后端：

 - **node** 基于express框架，做数据处理
 - **mysql**

工程化工具：

 - **webpack**

包管理工具：

- **npm**

服务器：

 - **nginx**  做本地静态资源服务器（图片等）


###启动方式：
本项目共分为三块内容：

- 第一步

    启动服务器端

进入到```vue-single\back```文件夹下
```
npm install // 第一步，下载包
npm run dev // 第二步 运行项目，启动http服务器

```
 - 第二步
选择 **前台展示** 或 **后台管理**

```
前台展示项目
```
进入到```vue-single\front\blog```文件夹下
```
npm install // 第一步，下载包
npm run dev // 第二步 运行项目

localhost:8080 // 查看项目
```

        后台管理项目

进入到```vue-single\front\admin```文件夹下
```
npm install // 第一步，下载包
npm run dev // 第二步 运行项目

localhost:8080 // 查看项目
```



 
 
