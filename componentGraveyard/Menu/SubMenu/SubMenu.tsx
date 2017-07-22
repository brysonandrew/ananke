// import * as React from 'react';
// import { StaggeredMotion, spring } from 'react-motion';
// import { contentsList } from "../../../data/content";
// import { SubMenuItem } from "./SubMenuItem";
// import { IParams } from "../../../data/models";
// import { MenuButton } from "../MenuButton";
//
// interface IProps {
//     savedParams?: IParams
//     isMenuOpen?: boolean
//     list?: any[]
// }
//
// interface IState {
//     isSubMenuOpen: boolean
// }
//
// export class SubMenu extends React.Component<IProps, IState> {
//
//     springConfig = {stiffness: 120, damping: 17};
//
//     public constructor(props?: any, context?: any) {
//         super(props, context);
//         this.state = {
//             isSubMenuOpen: false
//         };
//         this.handleSubMenuClose = this.handleSubMenuClose.bind(this);
//         this.handleSubMenuOpen = this.handleSubMenuOpen.bind(this);
//     }
//
//     handleSubMenuOpen() {
//         this.setState({
//             isSubMenuOpen: true
//         })
//     }
//
//
//     handleSubMenuClose() {
//         this.setState({
//             isSubMenuOpen: false
//         })
//     }
//
//     render(): JSX.Element {
//         const { isSubMenuOpen } = this.state;
//         const { savedParams, list } = this.props;
//
//         const styles = {
//             pagesSubMenu: {
//                 textAlign: "left",
//                 background: "rgba(0,0,0, 0.66)"
//             }
//         };
//
//         const itemCount = contentsList.length;
//         const widthStyle = isSubMenuOpen ? 220 : 40;
//         const widthStyles = contentsList.map(_ => ({x: widthStyle}));
//
//         const opacityStyle = isSubMenuOpen ? 1 : 0;
//         const opacityStyles = contentsList.map(_ => ({x: opacityStyle}));
//
//         const defaultStyles = widthStyles.concat(opacityStyles);
//
//         return (
//             <div style={styles.pagesSubMenu}>
//                 <MenuButton
//                     isACross={isSubMenuOpen}
//                     onClick={isSubMenuOpen ? this.handleSubMenuClose : this.handleSubMenuOpen}
//                 />
//                 <StaggeredMotion
//                     defaultStyles={defaultStyles}
//                     styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) =>
//                         i === 0
//                             ?   { x: spring(widthStyle, this.springConfig) }
//                             :   i < itemCount
//                                     ?   { x: spring(prevInterpolatedStyles[i - 1].x, this.springConfig) }
//                                     :   i === itemCount
//                                             ?   { x: spring(opacityStyle, this.springConfig) }
//                                             :   { x: spring(prevInterpolatedStyles[i - 1].x, this.springConfig) }
//                     )}>
//                     {s =>   <div>
//                                 {list.map((content, i) =>
//                                     <div key={i}
//                                          style={{width: s[i].x}}>
//                                         <SubMenuItem
//                                             index={i}
//                                             textOpacity={s[i + itemCount].x}
//                                             isSubMenuOpen={isSubMenuOpen}
//                                             savedParams={savedParams}
//                                             content={content}
//                                         />
//                                     </div>)}
//                             </div>}
//                 </StaggeredMotion>
//             </div>
//         );
//     }
// }