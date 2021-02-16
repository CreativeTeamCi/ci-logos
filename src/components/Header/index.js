import React from 'react'
import PropTypes from 'prop-types';

const Header = ({ searchVisible = false, setSearch }) => {
    return (
        <div class="crt-header sticky">
            <div class="crt-header-content">
                <div class="crt-header-logo">
                    <a href="/">CI Logos</a>
                </div>
                {
                    searchVisible && (
                        <>
                            <div class="crt-search-btn">
                                <i class="material-icons">search</i>
                            </div>
                            <div class="crt-header-search">
                                <form>
                                    <label>
                                        <input type="text" class="crt__search-item" name="keyword" placeholder="Rechercher..." onChange={(e) => setSearch(e.target.value)} />
                                    </label>
                                    <input type="button" name="close" value="close" class="material-icons" />
                                </form>
                            </div>
                        </>
                    )
                }

                <div class="crt-clear-fix"></div>
            </div>
        </div>
    )
}
 
Header.propTypes = {
    searchVisible : PropTypes.bool.isRequired,
    setSearch : PropTypes.func
}

export default Header