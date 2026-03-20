module.exports = (info) => {
  let installed = info.exists("app/env")
  let running = info.running("start.js")
  if (running) {
    return {
      menu: [
        { icon: "fa-solid fa-terminal", text: "Terminal", href: "start.js" }
      ]
    }
  } else {
    if (installed) {
      return {
        menu: [
          { icon: "fa-solid fa-play", text: "Launch", href: "start.js", default: true },
          { icon: "fa-solid fa-rotate", text: "Update", href: "update.js" },
          { icon: "fa-solid fa-trash-can", text: "Reset", href: "reset.js" }
        ]
      }
    } else {
      return {
        menu: [
          { icon: "fa-solid fa-download", text: "Install", href: "install.js", default: true }
        ]
      }
    }
  }
}