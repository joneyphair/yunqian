chrome.bookmarks.getTree(function callback(response){
	console.log('-----',response);

	var articleList = mapArticleList(response);

	console.log('--hah',articleList);

	var html = '<div class="container">';

	articleList.forEach(function(item,index){

		html+='<div class="item">';
		html+='<a class="title" href="'+item.url+'" target="_blank">'
		html+= item.title;
		html+='</a>'
		html+= '</div>';

	});

	html+='</div>';

	var mArticles = document.getElementById('mArticles');

	mArticles.innerHTML = html;


});



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

