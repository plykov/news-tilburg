# Tilburg Nieuws

Companion to [Tilburg Agenda](https://musictilburg.grok.me/). Schema `tilburg.news.v1`.

## Live

- App + inbox: https://plykov.github.io/news-tilburg/
- Source: https://github.com/plykov/news-tilburg

`newstilburg.grok.me` is the intended Grok host. This repo cannot mint `*.grok.me`. Publish the same files there the way `musictilburg.grok.me` was published.

## Inbox

`news.json` is the public daily delivery. The app fetches `./news.json`, then Pages, then raw GitHub.

Rules:
- Free sources only: Gemeente Tilburg, Omroep Tilburg, Omroep Brabant
- No BD/AD
- No full article body — outbound `url` only
- EN/RU strings are model translations and must carry `langNote: ui-translated`
- Drop an item if the permalink or listing cannot be opened the same day

## Language

UI toggle NL | EN | RU. Default NL. Missing locale falls back to `title.nl` with an NL badge.
