import { driver } from 'driver.js';
export function initDriver(formatMessage: Function) {
    const guideSteps = [
        {
            element: "#sider-trigger",
            popover: {
                title: formatMessage('guide.change.collapse'),
                description: formatMessage('guide.change.collapseDesc'),
                position: "bottom-left",
            },
        },
        {
            element: "#fullscreen",
            popover: {
                title: formatMessage('guide.change.fullscreen'),
                description: formatMessage('guide.change.fullscreenDesc'),
                position: "bottom-center",
            },
        },
        {
            element: "#language-switch",
            popover: {
                title: formatMessage('guide.change.language'),
                description: formatMessage('guide.change.languageDesc'),
                position: "bottom-right"
            }
        },
        {
            element: "#system-setting",
            popover: {
                title: formatMessage('guide.change.setting'),
                description: formatMessage('guide.change.settingDesc'),
                position: "bottom-right"
            }
        }
    ]
    const guideParams = {
        showProgress: false,
        steps: guideSteps,
        stagePadding: 0, // 如果设置padding要设法解决右侧元素可能会挤出页面的横向滚动条
        doneBtnText: formatMessage('guide.finish'), // 完成按钮标题
        nextBtnText: formatMessage('guide.next'), // 下一步按钮标题
        prevBtnText: formatMessage('guide.prev') // 上一步按钮标题
    }
    const driverObj = driver(guideParams)
    return driverObj
}
// export const driverObj = initDriver()