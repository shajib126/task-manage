export function UnAuthorizedRequest(error){
    if(error.response.status === 401){
        localStorage.clear()
        window.location.href = '/'
    }
}