---
layout: page
title: Life is short,
tagline: 
---
{% include JB/setup %}

<div class="blog-index">
  {% assign post = site.posts.first %}
  {% assign content = post.content %}
  {% include post_detail.html %}
</div>

---

## Other Posts

<ul class="posts">
  {% for post in site.posts offset:1 limit:10 %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

[more...](/archive.html)
