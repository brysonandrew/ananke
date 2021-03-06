import * as React from 'react';
import * as history from 'history';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { IParams } from "../../../../data/models";
import { IntroHeading } from "./IntroHeading";
import { saveParams } from "../../../HomeActionCreators";
import {contentsList} from '../../../../data/content';
import {IntroContents} from './IntroContents';

interface IProperties {
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onURLChange?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {
    keysPressed?: string
    mx?: number
    my?: number
    history: history.History
}

interface IState extends IProperties, ICallbacks {}

export class Intro extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.keysPressed.length > 0) {

            const firstPath = contentsList[1].path;

            this.props.history.push(`/${firstPath}`);
            this.props.onURLChange({activePagePath: firstPath});
        }
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop } = this.props;
        const styles = {
            intro: {
                display: "table",
                height: "100%",
                width: "100%"
            },
            intro__inner: {
                display: "table-cell",
                textAlign: "center",
                verticalAlign: "middle",
                height: "100vh",
                width: "100%"
            }
        } as any;

        return (
            <div style={ styles.intro }>
                <div style={ styles.intro__inner }>
                    <IntroHeading
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                    />
                    <IntroContents
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}/>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onURLChange: (nextParams) => {
            dispatch(saveParams(nextParams));
        }
    }
}

export const IntroFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Intro);
