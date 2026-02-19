# Lucky Bajaj — Personal Blog

A personal blog built with [11ty (Eleventy)](https://www.11ty.dev/) and [Decap CMS](https://decapcms.org/), hosted on [Netlify](https://www.netlify.com/).

## Features

- **Dark editorial design** with warm amber accents
- **13 blog posts** migrated from Wix
- **Decap CMS** admin dashboard at `/admin` for writing posts without code
- **Categories**: Life, Movies, Shorts, Poetry, Fiction
- **Responsive** design for mobile and desktop
- **Scroll animations**, cursor glow, and editorial typography

## Quick Start (Local)

```bash
npm install
npm start
```

Site runs at `http://localhost:8080`

## Deploy to Netlify

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - blog migration from Wix"
git remote add origin https://github.com/YOUR_USERNAME/luckybajaj-blog.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site" → "Import an existing project"**
3. Choose your GitHub repo
4. Build settings will auto-detect from `netlify.toml`
5. Click **Deploy**

### Step 3: Enable Decap CMS (Netlify Identity)
1. In Netlify dashboard → **Site settings → Identity → Enable Identity**
2. Under **Registration**, set to **Invite only**
3. Under **Services → Git Gateway**, click **Enable Git Gateway**
4. Go to **Identity** tab → **Invite users** → add your email
5. Accept the invite from your email
6. Visit `your-site.netlify.app/admin` and log in!

### Step 4: Custom Domain
1. In Netlify → **Domain settings → Add custom domain**
2. Enter `luckybajaj.com`
3. Update your domain's DNS nameservers to point to Netlify
4. Netlify will auto-provision SSL

## Writing New Posts

1. Visit `luckybajaj.com/admin`
2. Log in with your account
3. Click **Blog Posts → New Blog Post**
4. Fill in: Title, Date, Category, Pull Quote (optional), Body
5. Click **Publish**
6. Netlify auto-builds and deploys in ~30 seconds!

## Editing Site Settings

In the CMS admin, go to **Site Settings → Site Info** to edit:
- Site title and description
- Email address
- Social media links
- About section text and interests

## Project Structure

```
├── src/
│   ├── _data/site.json      ← Site settings (editable via CMS)
│   ├── _includes/
│   │   ├── base.njk          ← Base HTML layout
│   │   └── post.njk          ← Single post layout
│   ├── admin/
│   │   ├── index.html         ← CMS entry point
│   │   └── config.yml         ← CMS configuration
│   ├── css/style.css          ← All styles
│   ├── js/main.js             ← Animations & interactions
│   ├── posts/                 ← Blog posts (Markdown)
│   └── index.njk              ← Homepage
├── static/                    ← Uploaded images
├── .eleventy.js               ← 11ty configuration
├── netlify.toml               ← Netlify build config
└── package.json
```

## Design Customization

- **Colors**: Edit CSS variables at top of `src/css/style.css`
- **Fonts**: Change Google Fonts import in `src/_includes/base.njk`
- **Layout**: Modify templates in `src/_includes/`
