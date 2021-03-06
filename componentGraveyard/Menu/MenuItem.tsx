// import * as React from 'react';
// import {IParams, IProject} from "../../data/models";
// import {SubMenu} from "./SubMenu/SubMenu";
//
// interface IProps {
//     index: number
//     savedParams: IParams
//     textOpacity: number
//     isMenuOpen: boolean
//     content: IProject
//     onClick: (index: number) => void
// }
//
// interface IState {
//     isHovered: boolean
// }
//
// export class MenuItem extends React.Component<IProps, IState> {
//
//     public constructor(props?: any, context?: any) {
//         super(props, context);
//         this.state = {
//             isHovered: false
//         };
//     }
//
//     handleClick() {
//         this.props.onClick(this.props.index);
//     }
//
//     handleMouseEnter() {
//         this.setState({isHovered: true});
//     }
//
//     handleMouseLeave() {
//         this.setState({isHovered: false});
//     }
//
//     render(): JSX.Element {
//         const { index, content, isMenuOpen, textOpacity, savedParams } = this.props;
//         const { isHovered } = this.state;
//
//         const isSelected = savedParams.activePagePath===content.path;
//
//         const styles = {
//             menuItem: {
//                 display: "block",
//                 position: "relative",
//                 width: "100%",
//                 height: 40,
//                 background: isSelected ? "#fff" : "#000",
//                 opacity: isHovered ? 0.8 : 1,
//                 borderRight: "1px solid #fff",
//                 cursor: "pointer"
//             },
//             menuItem__text: {
//                 position: "absolute",
//                 left: "50%",
//                 top: "50%",
//                 color: isSelected ? "#000" : "#fff",
//                 opacity: textOpacity,
//                 transform: "translate(-50%, -50%)"
//             },
//             menuItem__number: {
//                 position: "absolute",
//                 left: "50%",
//                 top: "50%",
//                 color: isSelected ? "#000" : "#fff",
//                 opacity: -1 * (textOpacity - 1),
//                 transform: "translate(-50%, -50%)"
//             },
//             menuItem__dot: {
//                 background: "#fff",
//                 width: 20,
//                 height: 20,
//                 borderRadius: 20
//             },
//             menuItem__subMenu: {
//                 position: "absolute",
//                 left: "100%",
//                 top: 0
//             }
//
//         } as any;
//         return (
//             <div style={styles.menuItem}
//                 onClick={this.handleClick.bind(this)}
//                 onMouseEnter={() => this.handleMouseEnter()}
//                 onMouseLeave={() => this.handleMouseLeave()}>
//                 {!isMenuOpen && <div style={styles.menuItem__number}>{index + 1}.</div>}
//                <div style={styles.menuItem__text}>
//                    {content.name}
//                </div>
//                 {(content.subComponents && isSelected)
//                     ?   <div style={styles.menuItem__subMenu}>
//                             <SubMenu
//                                 savedParams={savedParams}
//                                 isMenuOpen={isMenuOpen}
//                                 list={content.subComponents}
//                             />
//                         </div>
//                     :   null}
//             </div>
//         );
//     }
// }
