testing the git
Microsoft Windows [Version 10.0.26100.4946]
(c) Microsoft Corporation. All rights reserved.

C:\Users\User>cd ..

C:\Users>cd..

C:\>cd Projects_clogenai

C:\Projects_clogenai>git --version
git version 2.51.0.windows.1

C:\Projects_clogenai>git clone https://github.com/Megovation/psg-frontend.git
Cloning into 'psg-frontend'...
remote: Repository not found.
fatal: repository 'https://github.com/Megovation/psg-frontend.git/' not found

C:\Projects_clogenai> git config user.name
Mahesh Moka

C:\Projects_clogenai> git config user.email
mokamahesh77@gmail.com

C:\Projects_clogenai>git config --global --unset user.name

C:\Projects_clogenai>git config --global --unset user.email

C:\Projects_clogenai>git config user.name

C:\Projects_clogenai>git clone https://github.com/Megovation/psg-frontend.git
Cloning into 'psg-frontend'...
remote: Repository not found.
fatal: repository 'https://github.com/Megovation/psg-frontend.git/' not found

C:\Projects_clogenai>git config user.name "Mahesh Moka"
fatal: not in a git directory

C:\Projects_clogenai>git config --list
diff.astextplain.textconv=astextplain
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
http.sslbackend=schannel
core.autocrlf=true
core.fscache=true
core.symlinks=false
pull.rebase=false
credential.helper=manager
credential.https://dev.azure.com.usehttppath=true
init.defaultbranch=main
core.editor="C:\Users\User\AppData\Local\Programs\Microsoft VS Code\bin\code" --wait

C:\Projects_clogenai>git config --global user.name "Mahesh Moka"

C:\Projects_clogenai>git config --global user.email "mahesh@clogenai.com"

C:\Projects_clogenai>git config user.name
Mahesh Moka

C:\Projects_clogenai>git config user.email
mahesh@clogenai.com

C:\Projects_clogenai>git clone https://github.com/Megovation/psg-frontend.git
Cloning into 'psg-frontend'...
remote: Repository not found.
fatal: repository 'https://github.com/Megovation/psg-frontend.git/' not found

C:\Projects_clogenai>git clone "https://github.com/Megovation/psg-frontend.git"
Cloning into 'psg-frontend'...
remote: Repository not found.
fatal: repository 'https://github.com/Megovation/psg-frontend.git/' not found

C:\Projects_clogenai>git clone https://github.com/Megovation/psg-frontend.git
Cloning into 'psg-frontend'...
info: please complete authentication in your browser...
remote: Enumerating objects: 46819, done.
remote: Counting objects: 100% (286/286), done.
remote: Compressing objects: 100% (233/233), done.
remote: Total 46819 (delta 154), reused 76 (delta 53), pack-reused 46533 (from 3)
Receiving objects: 100% (46819/46819), 24.58 MiB | 3.18 MiB/s, done.
Resolving deltas: 100% (37290/37290), done.
Updating files: 100% (1203/1203), done.

C:\Projects_clogenai>
C:\Projects_clogenai>
C:\Projects_clogenai>
C:\Projects_clogenai>git config user.email
mahesh@clogenai.com

C:\Projects_clogenai>git config --global user.email
mahesh@clogenai.com

C:\Projects_clogenai>
