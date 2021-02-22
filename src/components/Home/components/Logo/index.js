import React from 'react'
import PropTypes from 'prop-types'
import { BASE_URL } from '../../../../constants/API'

const Logo = ({data}) => {
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
    const base_url = BASE_URL.replace('/api','')
    return (
        <div key={id} className="crt__logo">
            <div className="crt__logo__holder">
                <div className="crt__logo__image">
                    <img src={`${base_url}/${logo_png}`} alt='SVG logo' />
                </div>
                <div className="crt__logo__download">
                    <div className="crt__logo__download__overlay">
                        <a href={`${base_url}/${logo_png}`} download={`${business_name}  PNG Logo`}>
                            <div class="row-xGrid iso-standard">
                                <button class="ctrl-standard typ-subhed fx-sliderIn">Download PNG</button>
                            </div>
                        </a>
                        {
                            logo_svg && (
                                <a href={`${base_url}/${logo_svg}`} download={`${business_name} SVG Logo`} style={{marginTop:10}}>
                                    <div class="row-xGrid iso-standard">
                                        <button class="ctrl-standard typ-subhed fx-sliderIn">Download SVG</button>
                                    </div>
                                </a>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="crt__logo__text">
                <p className="crt__logo__text--primary">{business_name}</p>
                <p className="crt__logo__text--secondary">{activity_area}</p>
            </div>
        </div>
    )
}

Logo.proptype = {
    activity_area : PropTypes.string,
    activity_areas_id : PropTypes.number,
    business_name : PropTypes.string,
    created_at : PropTypes.string,
    email : PropTypes.string,
    id : PropTypes.number.isRequired,
    logo_png : PropTypes.string.isRequired,
    logo_svg : PropTypes.string,
    name : PropTypes.string.isRequired,
    status : PropTypes.string.isRequired,
    updated_at : PropTypes.string,
    url : PropTypes.string,
}

export default Logo