import React, { useRef, useEffect } from 'react'

function Titles(title, prevailOnUmount = false) {
    const defaultTitle = useRef(document.title)

    useEffect(()=>{
        document.title = title
    },[title]);

    useEffect(()=>()=>{
        if(!prevailOnUmount){
            document.title = defaultTitle.current
        }
    },[])
}

export default Titles