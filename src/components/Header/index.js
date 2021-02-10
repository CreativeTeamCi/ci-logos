import React from 'react'

const Header = ({data}) => {
    const {
        activity_area,
        activity_areas_id,
        business_name,
        created_at,
        email,
        id,
        logo_png,
        logo_svg,
        name,
        status,
        updated_at,
        url,
    } = data
    return (
        <div class="crt-header sticky">
            <div class="crt-header-content">
                <div class="crt-header-logo">
                    <a href="/">CI Logos</a>
                </div>
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
                <div class="crt-clear-fix"></div>
            </div>
        </div>
    )
}

export default Header