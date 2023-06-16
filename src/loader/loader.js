import './set-iframe-height'

(() => {
  window.iframeUtils = window.iframeUtils || {}
  window.iframeUtils.load = function () {
    const container = document.querySelector('#iframe-container-id')
    container.setAttribute('status', 'initialized')

    const iframe = window.document.createElement('iframe')
    iframe.src = 'javascript:void(0)'
    iframe.title = ''
    iframe.role = 'presentation'
    iframe.style = 'width: 100%; frameBorder: none; border: none; '
    iframe.id = 'iframe-id'

    container.appendChild(iframe)

    const iframeDocument = iframe.contentWindow.document
    window.iframeUtils.document = iframeDocument

    iframeDocument.open()
    iframeDocument.setup = async () => {
      try {
        const res = await fetch('http://localhost:8080')
        const html = await res.text()

        iframeDocument.documentElement.innerHTML = ''
        iframeDocument.documentElement.innerHTML = html

        iframeDocument.querySelectorAll('script').forEach(function (script) {
          const newScript = iframeDocument.createElement('script')
          newScript.src = script.src
          iframeDocument.querySelector('head').appendChild(newScript)
        })

        container.setAttribute('status', 'loaded')
      } catch (exception) {
        console.error(exception)
      }
    }

    const html = iframeDocument.createElement('html')
    iframeDocument.appendChild(html)

    iframeDocument.close()

    iframeDocument.setup()
    container.setAttribute('status', 'created')
  }

  window.iframeUtils.load()

  // Safari Fix
  window.iframeUtils.document.querySelectorAll('html').forEach((element, i) => {
    if (i === 0) {
      return
    }

    element.remove()
  })
})()
