// import Proptypes from 'prop-types';
import React from 'react';

interface av {
    img: string;
    className: string;
    color?: string;
    imgClassName?: string;
    initials?: string;
    size?: string;
    badgeUp?: string;
    content?: string;
    icon?: string;
    badgeColor?: string;
    badgeText?: string;

    imgHeight?: string;
    imgWidth?: string;
    status?: string;
    tag?: string;
    contentStyles?: string;
}

// const refData = {
//     imgClassName: Proptypes.string,
//     className: Proptypes.string,
//     src: Proptypes.string,
//     tag: Proptypes.oneOfType([Proptypes.func, Proptypes.string]),
//     badgeUp: Proptypes.bool,
//     content: Proptypes.string,
//     icon: Proptypes.node,
//     contentStyles: Proptypes.object,
//     badgeText: Proptypes.string,
//     imgHeight: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
//     imgWidth: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
//     size: Proptypes.oneOf(['sm', 'lg', 'xl']),
//     status: Proptypes.oneOf(['online', 'offline', 'away', 'busy']),
//     badgeColor: Proptypes.oneOf([
//         'primary',
//         'secondary',
//         'success',
//         'danger',
//         'info',
//         'warning',
//         'dark',
//         'light-primary',
//         'light-secondary',
//         'light-success',
//         'light-danger',
//         'light-info',
//         'light-warning',
//         'light-dark'
//     ]),
//     color: Proptypes.oneOf([
//         'primary',
//         'secondary',
//         'success',
//         'danger',
//         'info',
//         'warning',
//         'dark',
//         'light-primary',
//         'light-secondary',
//         'light-success',
//         'light-danger',
//         'light-info',
//         'light-warning',
//         'light-dark'
//     ])
// };

class AvatarCustom extends React.Component<av, any> {
    getInitials = (str: any) => {
        const results: string[] = [];
        const wordArray = str.split(' ');
        wordArray.forEach((e: string[]) => {
            results.push(e[0]);
        });

        return results.join('');
    };

    render() {
        return (
            <div className={`avatar bg-${this.props.color} avatar-${this.props.size} ${this.props.className}`}>
                <img
                    className={this.props.imgClassName}
                    src={this.props.img}
                    alt="avatarImg"
                    height={this.props.imgHeight && !this.props.size ? this.props.imgHeight : 32}
                    width={this.props.imgWidth && !this.props.size ? this.props.imgWidth : 32}
                />
            </div>
        );
    }
}
export default AvatarCustom;
