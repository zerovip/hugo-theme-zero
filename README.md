# hugo-theme-zero

My hugo theme made by myself. It was written for personal blog. I am the first and only user of it as far as I know (you can treat [my blog](https://zerovip.github.io/) as a demo website). I don't have time or interest to introduce my theme completely and tell everything about how to use it, so it will be VERY difficult if you want to try, you have to read the codes to understand what I am doing. You better find another theme if you are a complete beginner.

The philosophy of this theme is to be as simple and small as possible, with no advanced front-end technology: no Sass(Scss), no Node.js, no NPM, no jQuery, I wrote every line of code from the scratch. It only rely on pure CSS and pure JavaScript, and it's JavaScript code is less than 100 lines. So it is absolutely easy if you want to adjust or modify this theme.

I noticed that in most other themes, tags and categories are used to classify posts, which is a mess IMHO. Using menu entry, this theme only focuses sections, and it support 2 layers of sections. (Note that the [“Lazzy Blogger” mode](https://gohugo.io/templates/menu-templates/#section-menu-for-lazy-bloggers) support only one layer, i.e., top-level menu, and it doesn't support multilingual.) 

I don't use any taxonomies, so it doesn't support tags or categories. Instead I created a similar thing called “column” (see the front matter below), if one post has its “column” set, then all the posts that set with the same “column” parameter will be listed at the end of this post. One benifit of using sections instead of tags is that readers can subscrib what sections they really interested in via RSS feed.

With the power of [Hugo Data Templates](https://gohugo.io/templates/data-templates/), your site with this theme can help you to record your life, like what books you have read, what films you have watched, what music you have listened, what games you have played, etc. The example data structure is shown in `data/` folder.

It supports multilingual, and I think it has a really powerful multilingual system, because I built it with great effort. In any page you can jump directly to its corresponding another-language-page.

It supports secret posts, you can use password to protect a post, or, part of it (with the `list_hide` and `rss_hide` parameter in the front matter below). [The tool hugo_encryptor](https://github.com/Li4n0/hugo_encryptor) is used for this purpose.

The front matter I am using is like this:

```
---
#------------------------------------------------------------------------------
title: 
#------------------------------------------------------------------------------
# you can replace it with "slug" if you want.
url: 
#------------------------------------------------------------------------------
# you have to write which section this post belongs to, this is used for the triangle symbol in left part.
section: 
#------------------------------------------------------------------------------
# you can set the column here.
column: 
#------------------------------------------------------------------------------
date: 20xx-xx-xx
#------------------------------------------------------------------------------
summary: 
#------------------------------------------------------------------------------
weight: 
#------------------------------------------------------------------------------
# you can set "pandoc" here, then this post supports math format.
markup: 
#------------------------------------------------------------------------------
# Set "true" to `list_hide` and `rss_hide` if this post has a secret part.
#------------------------------------------------------------------------------
# don't show this post in any list.
list_hide: false
#------------------------------------------------------------------------------
# don't show this post in any RSS.
rss_hide: false
#------------------------------------------------------------------------------
# this is only for myself, to show PDF file at the end.
file_path: 
#------------------------------------------------------------------------------
# true / false
draft: true
#------------------------------------------------------------------------------
# true / false
no_toc: false
#------------------------------------------------------------------------------
# is it not allowed to be indexed by search engines? note that search engines
# will also NOT index it if `list_hide` or `rss_hide` is set to be "true".
no_index: false
#------------------------------------------------------------------------------
---
```

I wrote a `notes.txt` in Chinese, which should give a brief structure of this site. It also contains my standards for building and improving.
