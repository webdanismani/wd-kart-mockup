# Web Danışmanı — Kredi Kartı Mockup / Credit Card Mockup

> 🇹🇷 **[webdanismani.com](https://webdanismani.com) tarafından hazırlanmıştır.** Ücretsiz forum desteği için: **[oblifex.com](https://oblifex.com)**
>
> 🇬🇧 **Made by [webdanismani.com](https://webdanismani.com).** Free community forum support: **[oblifex.com](https://oblifex.com)**

**[Canlı demo / Live demo](https://webdanismani.github.io/wd-kart-mockup/)** · **[Türkçe](#-türkçe)** · **[English](#-english)**

---

## 🇹🇷 Türkçe

Veri girildikçe canlanan, önlü arkalı animasyonlu bir kredi kartı ödeme formu tasarımı. Saf HTML, CSS ve JavaScript ile yazıldı; bağımlılık ve derleme adımı yok.

> Bu proje yalnızca bir **arayüz tasarımıdır**. Ödeme altyapısı içermez, girilen veriler hiçbir yere gönderilmez veya saklanmaz. Lütfen gerçek kart bilgisi girmeyin.

### Özellikler

- **Canlı kart önizlemesi** — yazdığınız her rakam kartın üzerine animasyonla düşer
- **Önlü arkalı 3B çevirme** — CVV alanına geçildiğinde kart kendiliğinden arkasını döner
- **Odak çerçevesi** — hangi alanı dolduruyorsanız kart üzerinde o bölge vurgulanır
- **Adım göstergesi** — Numara → İsim → Tarih → CVV adımları doldukça işaretlenir
- **Fareyle 3B eğim ve ışık yansıması**
- **4 kart teması** — Gece Mavisi, Okyanus, Gün Batımı, Grafit
- **Doğrulama, yükleniyor ve başarı ekranı** animasyonları
- **“Demo verisiyle doldur”** — sunumlar için formu kendi kendine yazar
- Mobil uyumlu, klavye ile kullanılabilir, `prefers-reduced-motion` desteği

### Kullanım

Depoyu indirip `index.html` dosyasını tarayıcıda açmanız yeterli. GitHub Pages'te yayınlamak için: **Settings → Pages → Branch: `main` / root**.

### Özelleştirme

- **Renkler:** `styles.css` başındaki `:root` değişkenleri (`--a1`, `--a2`).
- **Kart temaları:** `.card[data-theme="..."]` kuralları; yeni tema için bir kural ve `index.html` içinde bir `.sw` düğmesi ekleyin.
- **Tutar ve ürün adı:** `index.html` içindeki metinler.

### Destek

Sorularınız ve ücretsiz topluluk desteği için **[oblifex.com](https://oblifex.com)** forumuna bekleriz. Profesyonel web çözümleri için: **[webdanismani.com](https://webdanismani.com)**

---

## 🇬🇧 English

A credit card payment form design that comes alive as you type, with an animated two-sided card. Built with plain HTML, CSS and JavaScript — no dependencies, no build step.

> This project is a **UI design only**. It contains no payment backend; nothing you type is sent or stored anywhere. Please do not enter real card details.

### Features

- **Live card preview** — every digit you type drops onto the card with an animation
- **3D front/back flip** — the card turns over by itself when you reach the CVV field
- **Focus frame** — the area of the card you are filling in is highlighted
- **Step indicator** — Number → Name → Expiry → CVV steps are ticked off as you complete them
- **Mouse-driven 3D tilt and glare**
- **4 card themes** — Midnight, Ocean, Sunset, Graphite
- **Validation, loading and success screen** animations
- **“Fill with demo data”** — types the form by itself, handy for presentations
- Responsive, keyboard accessible, respects `prefers-reduced-motion`

> The interface text is in Turkish; all strings live in `index.html` and are easy to translate.

### Usage

Download the repository and open `index.html` in your browser. To publish on GitHub Pages: **Settings → Pages → Branch: `main` / root**.

### Customisation

- **Colours:** the `:root` variables at the top of `styles.css` (`--a1`, `--a2`).
- **Card themes:** the `.card[data-theme="..."]` rules; to add a theme, add one rule plus a `.sw` button in `index.html`.
- **Amount and product name:** plain text in `index.html`.

### Support

For questions and free community support, join the forum at **[oblifex.com](https://oblifex.com)**. For professional web services: **[webdanismani.com](https://webdanismani.com)**

---

## Dosyalar / Files

| Dosya / File | İçerik / Contents |
| --- | --- |
| `index.html` | Sayfa yapısı, kart ve form / Page structure, card and form |
| `styles.css` | Görsel tasarım ve animasyonlar / Visual design and animations |
| `script.js` | Canlı güncelleme, çevirme, adımlar, doğrulama / Live updates, flip, steps, validation |

## Lisans / License

[MIT](LICENSE) © Web Danışmanı
