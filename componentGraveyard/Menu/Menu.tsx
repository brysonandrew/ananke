// import * as React from 'react';
// import { StaggeredMotion, spring } from 'react-motion';
// import { contentsList } from "../../data/content";
// import { MenuItem } from "./MenuItem";
// import { connect } from 'react-redux';
// import { IStoreState } from '../../redux/main_reducer';
// import { toggleMenu } from '../HomeActionCreators';
// import { MenuButton } from "./MenuButton";
// import { IParams } from "../../data/models";
//
// interface IProperties {
//     isMenuOpen?: boolean
//     savedParams?: IParams
// }
//
// interface ICallbacks {
//     onMenuOpen?: () => void
//     onMenuClose?: () => void
// }
//
// interface IProps extends IProperties, ICallbacks {
//     onClick: (index: number) => void
// }
//
// interface IState extends IProperties, ICallbacks {}
//
// export class Menu extends React.Component<IProps, IState> {
//
//     springConfig = {stiffness: 120, damping: 17};
//
//     public constructor(props?: any, context?: any) {
//         super(props, context);
//     }
//
//     render(): JSX.Element {
//         const { isMenuOpen, onMenuOpen, onMenuClose, savedParams } = this.props;
//
//         const styles = {
//             pagesMenu: {
//                 textAlign: "left",
//                 background: "rgba(0,0,0, 0.66)"
//             },
//             pagesMenu__items: {
//                 display: "block",
//                 verticalAlign: "top"
//             }
//         };
//
//         const itemCount = contentsList.length;
//         const widthStyle = isMenuOpen ? 220 : 40;
//         const widthStyles = contentsList.map(_ => ({x: widthStyle}));
//
//         const opacityStyle = isMenuOpen ? 1 : 0;
//         const opacityStyles = contentsList.map(_ => ({x: opacityStyle}));
//
//         const defaultStyles = widthStyles.concat(opacityStyles);
//
//         return (
//             <div style={styles.pagesMenu}>
//                 <MenuButton
//                     isACross={isMenuOpen}
//                     onClick={isMenuOpen ? onMenuClose : onMenuOpen}
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
//                     {s =>   <div style={styles.pagesMenu__items}>
//                                 {contentsList.map((content, i) =>
//                                     <div key={i}
//                                          style={{width: s[i].x}}>
//                                         <MenuItem
//                                             index={i}
//                                             textOpacity={s[i + itemCount].x}
//                                             savedParams={savedParams}
//                                             isMenuOpen={isMenuOpen}
//                                             content={content}
//                                             onClick={this.props.onClick}
//                                         />
//                                     </div>)}
//                             </div>}
//                 </StaggeredMotion>
//             </div>
//         );
//     }
// }
//
// // ------------ redux mappers -------------
//
// function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
//     return {
//         isMenuOpen: state.homeStore.isMenuOpen,
//         savedParams: state.homeStore.savedParams
//     };
// }
//
// function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
//     return {
//         onMenuOpen: () => {
//             dispatch(toggleMenu(true));
//         },
//         onMenuClose: () => {
//             dispatch(toggleMenu(false));
//         }
//     }
// }
//
// export const MenuFromStore = connect(
//     mapStateToProps, mapDispatchToProps
// )(Menu);
