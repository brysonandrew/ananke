import * as React from 'react';
import * as history from 'history';
import { connect } from 'react-redux';
import { IParams } from "../data/models";
import { IStoreState } from '../redux/main_reducer';
import { changeViewportDimensions, saveLocation, saveParams, toggleScrollAnimation } from './HomeActionCreators';
import { toParams } from "../data/helpers/toParams";
import { MenuFromStore } from "./Menu/Menu";
import { PagesFromStore } from "./Body/Pages/Pages";

interface IProperties {
    savedParams?: IParams
    savedLocation?: Location
    width?: number
}

interface ICallbacks {
    onLoad?: (nextLocation: history.Location, nextParams: IParams) => void
    onAnimationStart?: () => void
    onResizeViewport?: (width: number, height: number) => void
}

interface IProps extends IProperties, ICallbacks {
    location: history.Location
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    isMounted: boolean
}

export class Home extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        }
    }

    componentDidMount() {
        const { onResizeViewport, onAnimationStart, history } = this.props;

        const params = toParams(history.location.pathname);
        if (params["activePagePath"].length > 0) {onAnimationStart()}

        this.props.onLoad(
            history.location,
            params
        );

        this.timerId = setTimeout(() => this.setState({ isMounted: true }), 0);

        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    render(): JSX.Element {
        const styles = {
            home: {
                position: "relative",
                background: "#eeeeee",
                overflow: "hidden"
            },
            home__pages: {}
        } as any;
        return (
            <div style={ styles.home }>
                <div>
                    <MenuFromStore/>
                </div>
                <div style={ styles.home__pages }>
                    <PagesFromStore
                        history={this.props.history}
                    />
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        savedLocation: state.homeStore.savedLocation,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onLoad: (nextLocation, nextParams) => {
            dispatch(saveLocation(nextLocation));
            dispatch(saveParams(nextParams));
        },
        onAnimationStart: () => {
            dispatch(toggleScrollAnimation(true));
        },
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        }
    }
}

export const HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);
