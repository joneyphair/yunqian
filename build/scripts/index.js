

function init(){

	chrome.bookmarks.getTree(function callback(response){

		var articleList = mapArticleList(response);

		console.log('--hah',articleList);

		var html = '<div class="container">';

		articleList.sort(function createTimeSort(a,b){
			return parseInt(b.dateAdded) - parseInt(a.dateAdded);
		}).forEach(function(item,index){

			html+='<div class="item">\n';
			html+='<div class="header">\n';
			html+='<a class="title" href="' + item.url + '">\n';
			html+= item.title;
			html+='</a>\n';
			html+='<span class="del" data-id="'+item.id+'">删除</span>';
			html+= '</div>\n';
			html+= '</div>\n';

		});

		html+='</div>';

		var mArticles = document.getElementById('mArticles');

		mArticles.innerHTML = html;

		var delBtns = document.getElementsByClassName('del');

		Array.prototype.concat.apply([],delBtns).forEach(function(item,index){
			item.addEventListener('click',function(event){
				action.delArticle(this.getAttribute('data-id'));
				this.parentNode.parentNode.remove();
			});
		});
	});
}


function delArticle(id){
	chrome.bookmarks.remove(id,function success(){
		console.log('删除成功');
	});
}



function mapArticleList(article){

	var temp = [];

	if(Object.prototype.toString.call(article) === '[object Array]'){

		article.forEach(function(item,index){

			if(item.children && item.children.length){
				temp = temp.concat(mapArticleList(item.children));
			}else{
				temp.push(item);
			}

		});

	}else{
		temp.push(article);
	}

	return temp;

}




var action = {};

action.init = init;

action.delArticle = delArticle;

action.init();
