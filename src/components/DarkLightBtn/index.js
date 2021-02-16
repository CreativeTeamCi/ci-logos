import React, { useState } from 'react'
import $ from 'jquery'

const DarkLightBtn = () => {
    const [btnText, setBtnText] = useState(
        window.localStorage.getItem('mode') ?? 'DARK MODE'
    )
    
    useState(()=>{
        let mode = window.localStorage.getItem('mode')
        console.log('mode', mode)
        if (mode == 'LIGHT MODE') {
            setBtnText('DARK MODE')
            $("link[title]").attr("href", "assets/css/light_style.css");
        } else {
            setBtnText('LIGHT MODE')
            $("link[title]").attr("href", "assets/css/dark_style.css");
        }
    },[])

    const handlePageStyleMode = () => {
        if ($("link[title]").attr("href") == "assets/css/light_style.css") {
            setBtnText('LIGHT MODE')
            $("link[title]").attr("href", "assets/css/dark_style.css");
            window.localStorage.setItem('mode','DARK MODE')
        } else {
            setBtnText('DARK MODE')
            $("link[title]").attr("href", "assets/css/light_style.css");
            window.localStorage.setItem('mode','LIGHT MODE')
        }
    }

    return (
        <div className="crt-theme-style">
            <a href="javascript:;" onClick={()=>handlePageStyleMode()}>{btnText}</a>
        </div>
    )
}

export default DarkLightBtn