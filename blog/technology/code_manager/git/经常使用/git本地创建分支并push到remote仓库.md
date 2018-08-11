# git本地创建分支并push到remote仓库

查看所有分支:

```
git branch -a
```

创建

```
git checkout -b feature-mytest-yxy
```

推送到remote  

add upstream reference for each branch that is up to date or pushed 

添加为每个分支，是最新的或上游参考推

```
 git push -u origin feature-mytest-yxy
```

删除remote分支

```
git push origin :feature-mytest-yxy
```

删除本地分支

```
git branch -D feature-mytest-yxy
```

