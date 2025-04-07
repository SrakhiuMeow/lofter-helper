// ==UserScript==
// @name         Lofter 网页版查看合集
// @license      GPLv3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在 Lofter 网页版查看作者的合集内容
// @author       SrakhiuMeow
// @match        *://*.lofter.com/
// @exclude      *://www.lofter.com/
// @grant        GM.xmlHttpRequest
// @connect      api.lofter.com
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    function subscribe(authkey, collectionId, mode=true) {
        // 订阅合集
        // mode = true 订阅， mode = false 取消订阅
        const url = new URL("https://api.lofter.com/v2.0/subscribeCollection.api");
        const params = {
            'method': mode ? 'subscribe' : 'unSubscribe',
            // 'offset': offset,
            // 'limit': limit,
            // 'order': 1,
            // 'collectionid': collectionId,
            'collectionId': collectionId,
            'product': 'lofter-android-7.6.12'
        };

        Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key])
        );

        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                method: "GET",
                url: url.toString(),
                headers: {
                    'Accept-Encoding': "br,gzip",
                    'content-type': "application/x-www-form-urlencoded; charset=utf-8",
                    'lofter-phone-login-auth': authkey,
                },
                onload: function(response) {
                    try {
                        console.log(response);
                        const data = JSON.parse(response.responseText);
                        resolve(data.response);
                    } catch (e) {
                        reject(e);
                    }
                },
                onerror: function(error) {
                    reject(error);
                }
            });
        });
    }

    function getCollection(authkey, blogid, blogdomain, offset = 0, limit = 20) {
        const url = new URL("https://api.lofter.com/v1.1/postCollection.api");
        const params = {
            'method': 'getCollectionList',
            'needViewCount': 1,
            // 'blogid': blogid,
            'blogdomain': blogdomain,
            'product': 'lofter-android-8.1.25'
        };

        Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key])
        );

        console.log(authkey);
        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                method: "GET",
                url: url.toString(),
                headers: {
                    'Accept-Encoding': "br,gzip",
                    'content-type': "application/x-www-form-urlencoded; charset=utf-8",
                    'lofter-phone-login-auth': authkey,
                },
                onload: function(response) {
                    try {
                        console.log(response);
                        const data = JSON.parse(response.responseText);
                        resolve(data.response);
                    } catch (e) {
                        reject(e);
                    }
                },
                onerror: function(error) {
                    reject(error);
                }
            });
        });
    }

    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === name) {
                return decodeURIComponent(value); // 解码 Cookie 值
            }
        }
        return null; // 如果未找到 Cookie，返回 null
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        
        const pad = num => num.toString().padStart(2, '0');
        
        // return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ` +
        //        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        return `${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
    }

    const authkey = getCookie("LOFTER-PHONE-LOGIN-AUTH");
    const blogdomain = window.location.hostname;
    const publisher = blogdomain.split('.')[0];
    const offset = 0;
    const controlFrame = document.getElementById('control_frame');

    // subscribe(authkey, '')
    //     .then(response => {
    //         console.log("subscribe response:", response);
    //     })
    //     .catch(error => {
    //         console.error("Error subscribing:", error);
    //     });

    function displayCollection(collections) {
        const postwrapper = document.querySelector('div.postwrapper');
        // const page = document.querySelector('div.page');

        collections.forEach(collection => {
            const block = document.createElement('div');
            block.className = 'block article';
            
            const side = document.createElement('div');
            side.className = 'side';
            const main = document.createElement('div');
            main.className = 'main';
            block.appendChild(side);
            block.appendChild(main);

            const content = document.createElement('div');
            content.className = 'content';
            const tag = document.createElement('div');
            tag.className = 'tag';
            const link = document.createElement('div');
            link.className = 'link';
            main.appendChild(content);
            main.appendChild(tag);
            main.appendChild(link);

            const tags = collection.tags.split(',');
            tags.forEach(tagg => {
                const tagElement = document.createElement('a');
                tagElement.href = "https://www.lofter.com/tag/" + tagg;
                tagElement.innerHTML = `● ${tagg}`;
                tagElement.target = '_blank';
                tag.appendChild(tagElement);
            });
            

            const text = document.createElement('div');
            text.className = 'text';
            const img = document.createElement('div');
            img.className = 'img';
            content.appendChild(text);
            side.appendChild(img);

            const collectionDetail = `https://www.lofter.com/collection/${publisher}/?op=collectionDetail&collectionId=${collection.id}&sort=0`;
            const collectionUrl = `https://www.lofter.com/front/blog/collection/share?collectionId=${collection.id}`;
            
            img.innerHTML = `<img src="${collection.coverUrl}?imageView&thumbnail=70x70&quality=90&type=jpg">`;

            text.innerHTML = `
                <h2><a href="${collectionUrl}">${collection.name}</a></h2>
                <p>${collection.description}</p>
            `;

            
            link.innerHTML = `
                <a>ID:${collection.id}</a>
                <a>${collection.postCount}篇)/a>
                <a>${collection.viewCount}浏览</a>
                <a>${collection.postCollectionHot}热度</a>
                <a>${formatTimestamp(collection.updateTime)}更新</a>
                <a href="${collectionDetail}" target="_blank">查看详情</a>
            `;

            // const subscribeButton = link.querySelector('a:last-child');
            // if (collection.subscribed) {
            //     subscribeButton.innerHTML = '取消订阅';
            // } else {
            //     subscribeButton.innerHTML = '订阅合集';
            // }
            // subscribeButton.addEventListener('click', () => {
            //     if (subscribeButton.innerHTML === '订阅合集') {
            //         subscribe(authkey, collection.id, true)
            //         .then(response => {
            //             console.log("subscribe response:", response);
            //             subscribeButton.innerHTML = '取消订阅';
            //         })
            //         .catch(error => {
            //             console.error("Error subscribing:", error);
            //         });
            //     } else {
            //         subscribe(authkey, collection.id, true)
            //         .then(response => {
            //             console.log("unsubscribe response:", response);
            //             subscribeButton.innerHTML = '订阅合集';
            //         })
            //         .catch(error => {
            //             console.error("Error unsubscribing:", error);
            //         });
            //     }
            // });

            // postwrapper.insertBefore(block, page);
            postwrapper.appendChild(block);
        });
    }


    function change2collection() {
        this.innerHTML = '<a>返回</a>';
        this.addEventListener('click', () => {
            window.location.reload();
        });
        
        
        // 清除原有内容
        const postwrapper = document.querySelector('div.postwrapper');
        const postElements = postwrapper.querySelectorAll('div.block');
        postElements.forEach(element => element.remove());
        const page = document.querySelector('div.page');
        postwrapper.removeChild(page);
        

        getCollection(authkey, '', blogdomain, offset, 20)
            .then(response => displayCollection(response.collections))
            .catch(error => console.error(error));
    }

    function initialize() {
        // 添加合集按钮
        const sidelist = document.querySelector('ul.sidelist');
        const collectionButton = document.createElement('li');
        collectionButton.innerHTML = '<a>合集</a>';
        collectionButton.addEventListener('click', change2collection);
        collectionButton.style.cursor = 'pointer';
        sidelist.appendChild(collectionButton);
        
        
    }

    

    // 监听 DOM 变化，等待 ul.sidelist 加载完成
    function waitForElement(selector, callback) {
        const observer = new MutationObserver((mutations, obs) => {
          const element = document.querySelector(selector);
          if (element) {
            obs.disconnect(); // 停止观察
            callback(element);
          }
        });
      
        // 开始观察整个文档的变化
        observer.observe(document, {
          childList: true,
          subtree: true
        });
      }
      
    
      waitForElement('ul.sidelist', (element) => {
        console.log('组件已加载:', element);
        initialize();
      });

})();