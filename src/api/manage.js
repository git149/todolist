import request from '@/utils/request';

request.get('/user').then(
    res => {
        console.info(res)
    }
)

export function getAction(url, params) {
    return request({
        url: url,
        method: "get",
        params: params
    })
}

export function postAction(url, params) {
    return request({
        url: url,
        method: "post",
        params: params
    })
}

export function putAction(url, params) {
    return request({
        url: url,
        method: "put",
        params: params
    })
}

export function deleteAction(url, params) {
    return request({
        url: url,
        method: "delete",
        params: params
    })
}

export function downFile(url, parameter) {
    return request({
        url: url,
        parameter: parameter,
        method: "delete",
        responseType: 'blob'
    })
}
//   export function downloadFile(url, fileName, parameter) {
//     return downFile(url, parameter).then((data) => {
//         if (!data || data.size === 0) {
//             Vue.prototype['$message'].warning('文件下载失败')
//             return
//         }
//         if (typeof window.navigator.msSaveBlob !== 'undefined')
//              { window.navigator.msSaveBlob(new Blob([data]), fileName )}
//         else {
//             let url = window.URL.createObjectURL(new Blob([data]),
//             let link = document.createElement('a'),
//             link.style.display = 'none',
//             link.href = url,
//             link.setAttribute('download', fileName),
//             document.body.appendChild(link),
//              link.click(),
//           document.body.removeChild(link),
//           window.URL.revokeObjectURL(ur1),
//    ) }})}