# Tilburg Nieuws

Companion to [Tilburg Agenda](https://musictilburg.grok.me/). Separate news app. Schema `tilburg.news.v1`.

## Live

GitHub Pages: https://plykov.github.io/news-tilburg/

`newstilburg.grok.me` is the intended Grok host name. This repo does not mint `*.grok.me` itself.

## Inbox

`news.json` is the public daily delivery. The app fetches `./news.json`, then the Pages URL, then the raw GitHub URL. Newer `generatedAt` is kept in localStorage after a successful fetch.

- Free sources only: Gemeente Tilburg, Omroep Tilburg, Omroep Brabant, optional 3voor12 / 013 / Schouwburg
- No BD/AD
- No full article body — outbound `url` only
- EN/RU strings are model translations and must carry `langNote: ui-translated`

## Language

UI toggle NL | EN | RU. Default NL. Missing locale falls back to `title.nl` with an NL badge.
