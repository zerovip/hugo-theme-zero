# hugo-theme-zero
My hugo theme made by myself. It was written for blog. I am the first and only user of it as far as I know. I don't have time or interest to introduce my theme completely and tell everything about how to use it, so it will be VERY difficult if you want to try, you have to read the codes to understand what I am doing. You better find other themes if you are a complete beginner.

Using menu entry, this theme only focuses sections, and it support 2 layers of sections. (Note that the “Lazzy Blogger” mode support only one layer.)

I don't use any taxonomies, so it doesn't support tags or categories. Instead I created a similar thing called “column”, it can help me list the links of posts in same column at the end.

It supports multilingual, and I think it has a really powerful multilingual system.

It supports secret posts, you can use password to protect a post, or, part of it.

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
date: 20--
#------------------------------------------------------------------------------
summary: 
#------------------------------------------------------------------------------
weight: 
#------------------------------------------------------------------------------
# you can set "pandoc" here, then this post supports math format.
markup: 
#------------------------------------------------------------------------------
# Set "true" if this post has secret part.
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
---
```

I wrote a `notes.txt` in Chinese, which should give a brief structure of this site. It also contains my standards for building and improving.
