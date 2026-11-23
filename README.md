# kiyara sunshine — beats landing

Single-page site for selling beats. Black + chrome gothic style (from the YouTube banner).
Plain HTML/CSS/JS — no build step. Open `index.html` in a browser.

## Що міняти

Усе в `script.js`, блок `CONFIG` на початку:

- `links` — BeatStars, YouTube, Instagram, Telegram, TikTok, email. Порожні посилання ховаються автоматично.
- `beats` — список бітів: назва, жанр, BPM, тональність, теги, ціна, файл прев'ю, посилання на біт на BeatStars.

## Прев'ю бітів

Поклади mp3 (з тегом!) у папку `beats/` з назвою, як у полі `audio`, наприклад `beats/hurricane.mp3`.
Якщо файлу немає — плеєр покаже «preview coming soon».

## Кольори / стиль

`styles.css` → `:root` (фон, хромовий градієнт, шрифти).
Лого в хедері — `assets/logo-chrome.png`, фото — `assets/avatar.jpg`.

## Безкоштовний хостинг

GitHub Pages: Settings → Pages → Deploy from branch → вибрати гілку і `/ (root)`.
Або перетягнути папку на netlify.com/drop.
