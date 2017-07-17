import * as React from 'react';
import { Motion, spring } from 'react-motion';
import { colors } from "../../data/themeOptions";

interface IProps {
    isACross: boolean
    onClick: () => void
}

interface IState {
    isHovered: boolean
}

export class SubMenuButton extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        }
    }

    handleMouseEnter() {
        this.setState({ isHovered: true });
    }

    handleMouseLeave() {
        this.setState({ isHovered: false });
    }

    render(): JSX.Element {
        const { isHovered } = this.state;
        const { isACross, onClick } = this.props;

        const styles = {
            subMenuButton: {
                position: "relative",
                display: "inline-block",
                width: 40,
                height: 40,
                cursor: "pointer"
            },
            subMenuButton__line: {
                position: "absolute",
                width: "100%",
                height: 6,
                borderRadius: 2,
                background: colors.wht1
            },
            subMenuButton__lines: [
                {
                    top: spring(isACross ? 20 : 6),
                    left: spring(isHovered ? isACross ? 12 : 25 : 0),
                    width: spring(isHovered ? 75 : 100),
                    scale: 1,
                    rotate: spring(isACross ? 45 : 0)
                },
                {
                    top: 20,
                    left: 0,
                    width: spring(isHovered ? 75 : 100),
                    scale: spring(isACross ? 0 : 1),
                    rotate: 0
                },
                {
                    top: spring(isACross ? 20 : 34),
                    left: spring(isHovered ? isACross ? 12 : 25 : 0),
                    width: spring(isHovered ? 75 : 100),
                    scale: 1,
                    rotate: spring(isACross ? -45 : 0),
                }
            ]
        } as any;
        return (
            <div style={ styles.subMenuButton }
                 onClick={onClick}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                {styles.subMenuButton__lines.map((style, i) =>
                    <Motion key={i}
                            style={style}>
                        {s =>
                            <div style={ Object.assign({}, styles.subMenuButton__line, {
                                top: s.top,
                                left: `${s.left}%`,
                                width: `${s.width}%`,
                                transform: `scaleX(${s.scale}) rotate(${s.rotate}deg)`
                            }) }/>}
                    </Motion> )}
            </div>
        );
    }
}
