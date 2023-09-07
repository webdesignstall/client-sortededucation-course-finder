class SessionHelper {

    setToken = (token)=>{
        if (typeof window !== "undefined") {
            // Access localStorage here
            // For example:
            localStorage.setItem('token', token)
        }
    }

    getToken = ()=>{
        if (typeof window !== "undefined") {
            // Access localStorage here
            // For example:
            return localStorage.getItem('token')
        }
    }
    logOut = ()=>{
        localStorage.removeItem('token')
        window.location.href = '/'
    }
}

export const {setToken, getToken, logOut} = new SessionHelper();
