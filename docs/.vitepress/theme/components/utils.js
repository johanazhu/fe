import { fabric } from 'fabric-pure-browser'


// bgColor: ['#78c386', '#e48484', '#c28976'],// 语雀绘图的配色  绿=》红=》棕
// https://www.happyhues.co/palettes/13
// 主色调 二级颜色 三级颜色
// const bgColor = [
//     '#ff8906',
//     '#f25f4c',
//     '#e53170'
// ]
// // lineColor: '#69b1e4',
// const  lineColor = '#a7a9be'
// const  textColor = 'white'


// const bgColor = [
//     '#ffd803',
//     '#e3f6f5',
//     '#bae8e8'
// ]
// const lineColor = '#2d334a'
// const textColor = '#272343'
// const infoBg = '#595959';
// const infoTextColor = 'white';

const bgColor = [
    '#3da9fc',
    '#90b4ce',
    '#ef4565'
]
const lineColor = '#094067'
const textColor = '#fffffe'
const infoBg = '#595959';
const infoTextColor = 'white';


export const RECT = {
    w: 140,
    h: 40,
    bgColor,
    lineColor,
    textColor,
    fontSize: 16,
    origin: 'center',
    infoBg,
    infoTextColor,
    fontFamily: " Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif"
}
function drawInfo() {
    // 🔥 ❤️ 约翰个人觉得前端必须学习的知识点
    const title = `✅ 约翰已经掌握的前端知识点
🍒 约翰一知半解的知识点
⭐ 收藏的内容，但还没来得及研究
🍋 个人还没来得及学习的知识`
    const x = 35
    const y = 20
    const width = 220
    const height = 100
    const { infoTextColor, fontSize, origin, infoBg } = RECT
    const rect = new fabric.Rect({
        fill: infoBg,
        originX: origin,
        originY: origin,
        rx: '5',
        shadow: 'rgba(0,0,0,.2) 2px 2px 2px',
        width,
        height,
    })
    const text = new fabric.Text(title, {
        fill: infoTextColor,
        originY: origin,
        originX: origin,
        fontWeight: '500',
        lineHeight: 1.5,
        fontSize: 12,
        fontFamily: RECT.fontFamily
    })
    const group = new fabric.Group([rect, text], {
        left: x,
        top: y,
        lockMovementX: true,
        lockMovementY: true
    })
    return group
}

function drawQrcode(canvas) {


    const title = `公众号：随朱波流
来源：https://fe.azhubaby.com
点击可跳转相应页面`
    const x = 0
    const y = 20
    const width = 280
    const height = 100
    const { infoTextColor, fontSize, origin } = RECT
    fabric.Image.fromURL('/qrcode.jpg', img => {
        img.set({
            left: 665,
            top: 30,
            opacity: 0.8,
            scaleX: 0.32,
            scaleY: 0.32
        })

        const rect = new fabric.Rect({
            fill: RECT.infoBg,
            originX: origin,
            originY: origin,
            rx: '5',
            shadow: 'rgba(0,0,0,.2) 2px 2px 2px',
            width,
            height,
        })
        const text = new fabric.Text(title, {
            fill: infoTextColor,
            left: 35,
            originY: origin,
            originX: 'right',
            fontWeight: '500',
            lineHeight: 1.5,
            fontSize: 12,
            fontFamily: RECT.fontFamily
        })

        const group = new fabric.Group([rect, text], {
            left: 480,
            top: y,
            lockMovementX: true,
            lockMovementY: true
        })

        canvas.add(group)
        canvas.add(img)

    })


    return


    // canvas.add(group)
}


export function drawMap(dom, data) {
    const rects = []
    const lines = []
    let lastRect
    data = data.filter(v => v.show !== false)
    // data[0].y = data[0].y+130
    dom.title = data[0].title
    for (let i = 1; i < data.length; i++) {
        data[i].x = data[i - 1].x + (data[i].x || 0)
        data[i].y = data[i - 1].y + (data[i].y || 150)
    }

    dom.height = data[data.length - 1].y + 40 + 20
    let canvas = new fabric.Canvas(dom, {
        containerClass: 'roadmap-container',
        hoverCursor: 'pointer',
        interactive: false, //禁止交互
        selection: false
    })
    canvas.add(drawInfo())
    drawQrcode(canvas)

    data.forEach(item => {

        const rect = drawRect(item, canvas)
        rect.link = item.link
        rects.push(rect)

        if (lastRect) {
            lines.push(drawLine(lastRect, rect))
        }

        lastRect = rect

        const { left, right } = item
        traverse(rect, left, 'left', 1)
        traverse(rect, right, 'right', 1)

        function traverse(parent, children, direction, depth) {
            if (!children || !children.length) return

            if (typeof children == 'string') {
                children = [children]
            }
            //   else if (typeof children === 'object') {
            //     children = [children];
            //   }
            children = children.map(child => convert(...child))

            const len = children.length
            const isEven = !(len & 1) //是不是偶数
            children.filter(v => v).forEach((child, i) => {
                if (direction == 'left') {
                    child.x = parent.left + child.x - 210 + depth * 45
                } else {
                    child.x = parent.left + child.x + 240 - depth * 45
                }

                let y = (parent.top - (Math.floor(len / 2) - i) * (RECT.h + 9 - depth * 10)) + (child.y || 0)
                y += isEven ? RECT.h / 2 : 0

                const subRect = drawRect({ ...child, y, depth }, canvas)
                if (typeof child.title.link === 'string') {
                    subRect.link = child.title.link
                } else {
                    subRect.link = child.link || parent.link
                }

                rects.push(subRect)
                const l = direction == 'left' ? drawSubline(subRect, parent) : drawSubline(parent, subRect)
                lines.push(l)
                if (child.children) {
                    traverse(subRect, child.children, direction, depth + 1)
                }
            })
        }

    })

    // rects.forEach(rect=>canvas.add(rect))
    lines.forEach(line => canvas.add(line))
    return canvas
}

function drawSubline(r1, r2) {
    // 两个rect的连线
    const sx = r1.left + r1.width
    const sy = r1.top + r1.height / 2
    let dx, dy
    if (r1.left > r2.left) {
        dx = r2.left - (r1.left - r2.left) / 2
        dy = r1.top + (r2.top - r1.top) / 2
    } else {
        dx = r1.left + (r2.left + r1.width - r1.left) / 2
        dy = r1.top + (r2.top - r1.top) / 2
    }

    const ex = r2.left
    const ey = r2.top + RECT.h / 2

    const line = new fabric.Path(`M ${sx} ${sy} S${dx},${dy},${ex},${ey}`, {
        fill: '',
        stroke: RECT.lineColor,
        strokeWidth: 2,
        strokeDashArray: [5, 5]
    })
    return line
}

function drawRect(item, canvas) {
    const tags = ['❌', '✅', '🔥', '⭐', '🍒', '🍋']

    let tag
    tags.forEach(t => {
        if (typeof item.title == 'string' && item.title.startsWith(t)) {
            item.title = item.title.replace(t, '')
            tag = t
        } else if (typeof item.title == 'object' && item.title.title.startsWith(t)) {
            item.title.text = item.title.title.replace(t, '')
            tag = t
        }
    })

    const { title, x, y, depth = 0 } = item
    const width = (item.w ? item.w : RECT.w) - depth * 15
    const height = item.h ? item.h : RECT.h
    const { textColor, bgColor, fontSize, origin } = RECT
    let color = tag == '❌' ? RECT.infoBg : bgColor[depth]
    if (!item.link && depth == 0) {
        // color = '#81c2c3'
        // color = '#78b0df'
        // 第一个元素
        color = bgColor[0]
    }
    const rect = new fabric.Rect({
        fill: color,
        originX: 'origin',
        originY: origin,
        rx: '5',
        shadow: 'rgba(0,0,0,.2) 2px 2px 2px',
        width,
        height: height - depth * 7,
    })
    let text;
    if (typeof title == 'string') {
        text = new fabric.Text(title, {
            fill: textColor,
            originY: origin,
            originX: origin,
            fontWeight: '500',
            fontSize: fontSize - depth * 2,
            fontFamily: RECT.fontFamily

        })
    } else if (typeof title == 'object') {
        text = new fabric.Text(title.title, {
            fill: textColor,
            originY: origin,
            originX: origin,
            fontWeight: '500',
            fontSize: fontSize - depth * 2,
            fontFamily: RECT.fontFamily

        })
    }

    const group = new fabric.Group([rect, text], {
        left: x,
        top: y,
        lockMovementX: true,
        lockMovementY: true
    })
    if (item.download) {
        group.download = true
    }


    canvas.add(group)

    if (tag) {
        const t = new fabric.Text(tag, {
            fill: textColor,
            originY: origin,
            originX: origin,
            fontWeight: '500',
            fontSize: tag == '❌' ? 10 : 12,
            fontFamily: RECT.fontFamily

        })
        const g = new fabric.Group([t], {
            left: x <= 400 ? (x + 5) : (x + width - 15),
            top: y + 3,
            lockMovementX: true,
            lockMovementY: true
        })
        // if(item.download){
        // }
        canvas.add(g)
        canvas.bringForward(g)

    }


    return group
}


let lineDirection = 'left'

function drawLine(r1, r2) {
    // 两个rect的连线
    const sx = r1.left + RECT.w / 2
    const sy = r1.top + RECT.h / 2

    const dx = lineDirection === 'left' ? r1.left - RECT.w / 3 : r1.left + RECT.w
    const dy = r1.top + (r2.top - r1.top) / 2

    const ex = r2.left + RECT.w / 2
    const ey = r2.top + RECT.h / 2

    const line = new fabric.Path(`M ${sx} ${sy} Q ${dx},${dy},${ex},${ey}`, {
        fill: '',
        stroke: RECT.lineColor,
        strokeWidth: 3
    })
    lineDirection = lineDirection === 'left' ? 'right' : 'left'
    line.globalCompositeOperation = 'destination-over'
    return line
}

export function convert(title, options, children) {
    // console.log('convert', title, options, children)

    // [x,y,w,h]
    if (!options) {
        // only title
        options = []
        children = []
    } else if (!children) {
        if (typeof options[0] == 'number') {
            // title any options
            children = []
        } else {
            // title and children
            children = options
            options = []
        }

    }

    const [y = 0, x = 0, w = 120, h = 40] = options
    const { bgColor, textColor } = RECT
    const ret = {
        title, x, y, w, h, bgColor, textColor, children
    }
    return ret
}
