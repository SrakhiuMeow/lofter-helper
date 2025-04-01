// ==UserScript==
// @name         Lofter查看历史记录
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  在 Lofter 网页版查看App端浏览记录
// @author       SrakhiuMeow
// @match        *://*.lofter.com/
// @grant        none
// @require      https://unpkg.com/ajax-hook@3.0/dist/ajaxhook.min.js
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    function buildArticleElement(blogUrl, avatarUrl, publisher, imageUrl, digest, tags, postUrl, title) {
        const avatar = document.createElement('div');
        avatar.className = 'mlistimg';
        avatar.innerHTML = `
            <div class="w-img" style="z-index:1;"> 
                <a href="${blogUrl}" target="_blank">
                    <img src="${avatarUrl}?imageView&amp;thumbnail=64x64&amp;type=jpg">
                </a>
            </div>
            <div class="w-img" style="height:0px; padding:0; z-index:10;"></div>
        `;

        const notDisplayImage = typeof imageUrl == "undefined" || imageUrl == null || imageUrl == "";
        const content = document.createElement('div');
        content.className = 'mlistcnt';
        content.innerHTML = `
            <div class="isay">
                <div class="isayt"> <a class="isayc" href="${postUrl}" title="查看全文" target="_blank">打开新页</a></div>
                <div class="isaym">
                    <div class="w-who"><a href="${blogUrl}" class="publishernick"
                            target="_blank">${publisher}</a> 
                    </div>
                    <div class="js">
                        <div class="m-icnt">
                            <h2 class="tit"> ${title}</h2>
                            <div class="cnt">
                                <div class="img" style="width: 164px; height: auto; display: ${notDisplayImage ? "none" : "block"}">
                                    <div class="imgc"> <a href="#" hidefocus="true"><img 
                                                style="width:164px;"
                                                src="${imageUrl}?imageView&amp;thumbnail=1000x0&amp;type=jpg"></a>
                                        <div class="sphotolabels" style="display:none"></div>
                                    </div>
                                    <a class="w-zoom">查看大图</a>
                                </div>
                            </div>
                            <div class="txt" style="display: block;">
                                ${digest}
                            </div>
                        </div>
                        
                    </div>
                    <div class="w-opt">
                        <div class="opta" style="width: 132px;">
                            ${tags}
                        </div>
                        <div class="optb"> <span class="opti" style="display: none;">
                            <span class="opti">
                                <a href="${postUrl}" target="_blank" hidefocus="true">查看全文</a>
                                <span class="opticrt"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="isayb"></div>
            </div>
        `;


        const article = document.createElement('div');
        article.className = 'm-mlist';
        article.appendChild(avatar);
        article.appendChild(content);
        
        return article;        
    }

    function insertArticle(article) {
        const main = document.getElementById('main');
        main.insertBefore(article, main.children[7]);
    }


    function getHistory() {
        console.log('hi');
    }

    const slideBar = document.getElementById('slide-bar').children[0].children[1];
    
    // 添加分割线
    const dividingLine = document.createElement('div');
    dividingLine.className = slideBar.children[3].children[0].className;
    slideBar.insertBefore(dividingLine, slideBar.children[0]);

    // 添加历史记录按钮
    // 不知道为什么直接用<a>会有报错（
    const history = document.createElement('div');
    history.id = 'getHistory';
    history.innerHTML = `
        <div>
            <h5 class="LRlf1c3Y3+bO-foPi4wNjQ==">
                <span>历史记录</span>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="mVWxtvI0CO9-BAyQYEFwKw=="><path d="M8 4.5l5.5 5.5L8 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </h5>
        </div>
    `;
    history.style.cursor = 'pointer';
    history.addEventListener('click', getHistory);
    slideBar.insertBefore(history, slideBar.children[0]);



})();