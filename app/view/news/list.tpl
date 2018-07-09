<html>
<head>
	<title>aaa</title>
</head>
<body>
	<ul class="news-view view">
		{% for item in list %}
			<li class="item">
				<a href="{{item.url}}">{{item.title}}</a>
				<span>{{ helper.relativeTime(item.time) }}</span>
			</li>
		{% endfor %}
	</ul>
</body>
</html>