window.iframeUtils = window.iframeUtils || {}

window.iframeUtils.resizeIframe = height => {
  const iframe = document.getElementById('iframe-id')

  if (iframe) {
    iframe.style.height = height + 'px'
  }
}
