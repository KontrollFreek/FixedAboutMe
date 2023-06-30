/**
 * @name FixedAboutMe
 * @author KontrollFreek
 * @description Fixes Discord's cut-off "About Me"s
 * @version 0.2.0
 * @authorId 506101469787717658
 * @authorLink https://twitter.com/KontrollFreek
 * @donate https://ko-fi.com/KontrollFreek
 * @website https://github.com/KontrollFreek/FixedAbouMe
 * @source https://raw.githubusercontent.com/KontrollFreek/FixedAbouMe/main/fixedaboutme.plugin.js
 */

BdApi.DOM.addStyle('FixedAboutMe',
    `.fixedaboutme-icon {
        margin-left: 4px;
        position: relative;
        bottom: 1px;
        color: var(--header-primary);
        opacity: 0.6;
    }`
)

const Callback = (mutationList, observer) => {
    for (let mutation of mutationList) {
        if (!mutation.addedNodes.length || !(mutation.addedNodes[0] instanceof Element)) return
        const element = mutation.addedNodes[0]

        const popout = element.querySelector(`[class*="userPopoutOuter-"]`) ?? element

        if (popout && popout.matches(`[class*="userPopoutOuter-"]`)) {
            let scroller = popout.querySelector(`[class*="scroller-"]`)

            icon = document.createElement('span')
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 -960 960 960"><path fill="currentColor" d="M383-234q-12 0-24-5t-22-15L168-423q-19-19-18.5-46.5T169-516q19-19 47-19t47 19l122 122 313-313q19-19 45.5-19.5T790-707q19 19 19 46t-19 46L429-254q-10 10-22 15t-24 5Z"/></svg>'
            icon.classList.add('fixedaboutme-icon')

            let header = scroller.querySelector(`[class*="section-"] h2`)
            if (header.innerText.toLowerCase() != 'about me') return
            header.appendChild(icon)

            BdApi.UI.createTooltip(icon, 'Fixed About Me', { style: 'primary' })

            let aboutme = scroller.querySelector(`[class*="section-"] div div`)
            aboutme.style.webkitLineClamp = ''
        }

        const modal = element.querySelector(`[class*="userProfileModalOuter-"]`) ?? element

        if (modal && modal.matches(`[class*="userProfileModalOuter-"]`)) {
            let infosection = popout.querySelector(`[class*="userInfoSection-"]`)

            icon = document.createElement('span')
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 -960 960 960"><path fill="currentColor" d="M383-234q-12 0-24-5t-22-15L168-423q-19-19-18.5-46.5T169-516q19-19 47-19t47 19l122 122 313-313q19-19 45.5-19.5T790-707q19 19 19 46t-19 46L429-254q-10 10-22 15t-24 5Z"/></svg>'
            icon.classList.add('fixedaboutme-icon')
            icon.style.top = '4px'

            let header = infosection.querySelector(`h1`)
            if (header.innerText.toLowerCase() != 'about me') return
            header.appendChild(icon)

            BdApi.UI.createTooltip(icon, 'Fixed About Me', { style: 'primary' })

            let aboutme = infosection.querySelector(`div`)
            aboutme.style.webkitLineClamp = ''
        }
    }
}
const Observer = new MutationObserver(Callback)

module.exports = meta => ({
    start() {
        Observer.observe(document.querySelectorAll('[class*="layerContainer-"]')[1], { attributes: true, childList: true, subtree: true })
    },

    stop() {
        Observer.disconnect()
    }
})
