import React from 'react'
import './AuthFooter.scss';

const AuthFooter = () => {
  return (
    <div className="auth-footer">
        <ul>
            <li><a href="#">Meta</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Top Accounts</a></li>
            <li><a href="#">Hashtags</a></li>
            <li><a href="#">Locations</a></li>
            <li><a href="#">Instagram Lite</a></li>
            <li><a href="#">Contact Uploading & Non-Users</a></li>
            <li><a href="#">Dance</a></li>
            <li><a href="#">Food & Drink</a></li>
            <li><a href="#">Home & Garden</a></li>
            <li><a href="#">Music</a></li>
            <li><a href="#">Visual Arts</a></li>
        </ul>

        <div className="copy-right-area">
            <select name="" id="">
                <option value="">English</option>
                <option value="">Bangla</option>
                <option value="">Hindi</option>
                <option value="">Arabic</option>
            </select>

            <div className="copy-right-text">
                © 2022 Instagram from Meta
            </div>
        </div>
    </div>
  )
}

export default AuthFooter;