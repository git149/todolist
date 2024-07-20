import axios from 'axios'

export const login = (data) =>
        axios({
            url:'login',
            method:'post',
            data
        })