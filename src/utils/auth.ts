'use client'

export const checkAuth = () => {
    const isUser = localStorage.getItem("has-wallet") || ""
    return isUser === "" ? false : true
}