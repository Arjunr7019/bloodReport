const setUserAuth = async(value)=>{
       await localStorage.setItem('userData', JSON.stringify(value))
}

const getUserAuth = async()=>{
    const value = await localStorage.getItem('userData');
    return JSON.parse(value);
}

const Logout = ()=>{
    localStorage.clear();
}

export default {
    setUserAuth,
    getUserAuth,
    Logout
}