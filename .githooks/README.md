# Git hooks

This folder contains githooks for this repository.

They are set in this folder as the `.git/hooks` is not tracked in `.git` 
and cannot be shared with the rest of the team

Run the following command to tell `git` to look for hooks in this `.githooks` folder:

```shell
git config core.hooksPath .githooks
```
