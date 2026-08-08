document.addEventListener("nav", () => {
  if (window.location.hash) return

  const explorer = document.querySelector(".explorer-content")
  if (!explorer) return

  const observer = new MutationObserver(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    observer.disconnect()
  })

  observer.observe(explorer, { childList: true, subtree: true })
  window.setTimeout(() => observer.disconnect(), 1000)
})
