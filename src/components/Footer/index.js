import React from 'react'

const Footer = ({ searchVisible = false, setSearch }) => {
    return (
        <div className="crt-footer">
            <div className="crt-footer-content">
                <div className="crt-footer-sn">
                    <ul>
                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                    </ul>
                </div>
                <div className="crt-footer-links">
                    <ul>
                        <li><a target="_blank" href="http://creative-team.ci/">© CreativeTeam 2020 </a></li>
                    </ul>
                </div>
                <div className="crt-clear-fix"></div>
            </div>
        </div>
    )
}

export default Footer