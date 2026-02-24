import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug == 'index',
      component: Component.RecentNotes({limit: 5, 
        title: "Recent News Articles",
        filter: (p)=> (p.filePath?.startsWith("news") || p.filePath?.startsWith("link")) || false
      })
    }),
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug == 'index',
      component: Component.RecentNotes({
        limit: 5,
        filter: (p)=> !(p.filePath?.startsWith("news") || p.filePath?.startsWith("link")),
        title: "Recent Encyclopedia Pages"
      })
    }),
    Component.ConditionalRender({
      condition: (page) => (page.fileData.slug !== 'index') && !page.fileData.slug?.startsWith("tags/"),
      component: Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: 'svines-rodeo/website',
      // from data-repo-id
      repoId: 'R_kgDORQ-8Tg',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDORQ-8Ts4C2gM7',
      // from data-lang
      lang: 'en'
    }
      })
    }),
  ],
  footer: Component.Footer({
    links: {
      Mastodon: "https://gts.svines.rodeo/@svines",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
