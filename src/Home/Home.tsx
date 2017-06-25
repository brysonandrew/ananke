import * as React from 'react';
import * as history from 'history';
import { connect } from 'react-redux';
import { IParams } from "../data/models";
import { IStoreState } from '../redux/main_reducer';
import { changeViewportDimensions, saveLocation, saveParams } from './HomeActionCreators';
import { toParams } from "../data/helpers/toParams";
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

interface IState extends IProperties, ICallbacks {}

export class Home extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        const { onResizeViewport, history } = this.props;

        const params = toParams(history.location.pathname);

        this.props.onLoad(
            history.location,
            params
        );

        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    render(): JSX.Element {
        const styles = {
            home: {}
        } as any;
        return (
            <div style={ styles.home }>
                <PagesFromStore
                    history={this.props.history}
                    location={this.props.location}
                />
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
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        }
    }
}

export const HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);
