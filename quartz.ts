import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { RecentNotes } from "@quartz-community/recent-notes"

const recentSections = [
  RecentNotes({
    title: "Recent Links",
    limit: 3,
    showTags: true,
    hideTagPages: true,
    hideFolderPages: true,
    filter: (file) => file.slug?.startsWith("links/") ?? false,
  }),
  RecentNotes({
    title: "Recent Notes",
    limit: 3,
    showTags: true,
    hideTagPages: true,
    hideFolderPages: true,
    filter: (file) =>
      file.slug !== "index" && file.slug !== "404" && !file.slug?.startsWith("links/"),
  }),
]

const layoutOverrides = {
  defaults: { afterBody: recentSections },
  byPageType: {
    content: { afterBody: recentSections },
  },
}

const config = await loadQuartzConfig(undefined, layoutOverrides)
export default config
export const layout = await loadQuartzLayout(layoutOverrides)
