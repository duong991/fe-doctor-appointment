import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
    textColor?: 'white'
}

const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = 'auto',
        textColor,
    } = props

    const logoStyle = {
        ...style,
        width: logoWidth,
        margin: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    const textStyle = {
        color: textColor === 'white' ? 'white' : '#333',
        fontSize: '20px',
        fontWeight: 'bold',
        marginLeft: '10px',
    }
    return (
        <div className={classNames('logo')} style={logoStyle}>
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}DoctorQ.svg`}
                alt={`${APP_NAME} logo`}
            />
            {className === 'px-6' && <p style={textStyle}>DoctorQ</p>}
        </div>
    )
}

export default Logo
