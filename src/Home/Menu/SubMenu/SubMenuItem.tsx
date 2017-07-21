import * as React from 'react';
import { IParams, IProject} from "../../../data/models";
import { Link } from "react-router-dom";

interface IProps {
    index: number
    savedParams: IParams
    textOpacity: number
    isSubMenuOpen: boolean
    content: IProject
}

interface IState {
    isHovered: boolean
}

export class SubMenuItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleMouseEnter() {
        this.setState({isHovered: true});
    }

    handleMouseLeave() {
        this.setState({isHovered: false});
    }

    render(): JSX.Element {
        const { index, content, isSubMenuOpen, textOpacity, savedParams } = this.props;
        const { isHovered } = this.state;

        const isSelected = savedParams.activeViewPath===content.path;

        const itemPath = `/${savedParams.activePagePath}/${content.path}`;

        const styles = {
            subMenuItem: {
                display: "block",
                position: "relative",
                width: "100%",
                height: 40,
                background: isSelected ? "#fff" : "#000",
                opacity: isHovered ? 0.8 : 1,
                borderRight: "1px solid #fff",
                cursor: "pointer"
            },
            subMenuItem__text: {
                position: "absolute",
                left: "50%",
                top: "50%",
                color: isSelected ? "#000" : "#fff",
                opacity: textOpacity,
                transform: "translate(-50%, -50%)"
            },
            subMenuItem__number: {
                position: "absolute",
                left: "50%",
                top: "50%",
                color: isSelected ? "#000" : "#fff",
                opacity: -1 * (textOpacity - 1),
                transform: "translate(-50%, -50%)"
            }
        } as any;

        return (
        <div style={styles.subMenuItem}
           onMouseEnter={() => this.handleMouseEnter()}
           onMouseLeave={() => this.handleMouseLeave()}>
            <Link to={itemPath}
                  onClick={(e) => e.stopPropagation()}>
                {!isSubMenuOpen && <div style={styles.subMenuItem__number}>{index + 1}.</div>}
               <div style={styles.subMenuItem__text}>
                   {content.name}
               </div>
            </Link>
        </div>
        );
    }
}
