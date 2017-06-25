import * as React from 'react';
import * as Immutable from 'immutable';
import * as history from 'history';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import {contents, contentsList} from "../../../data/content";
import { IParams, IDictionary } from "../../../data/models";
import { saveParams } from "../../HomeActionCreators";
import {toParams} from "../../../data/helpers/toParams";

interface IProperties {
    savedParams?: IParams
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {
    history: history.History
    location: history.Location
}

interface IState extends IProperties, ICallbacks {
    keysPressed: string[]
    mx: number
    my: number
}

export class Pages extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            keysPressed: [],
            mx: 0,
            my: 0
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keypress", this.handleKeyPress);
        window.addEventListener("keyup", this.handleKeyUp);
        window.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener("keypress", this.handleKeyPress);
        window.removeEventListener("keyup", this.handleKeyUp);
        window.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleKeyPress(e) {
        const keysPressed = Immutable.List(this.state.keysPressed).push(e.key);

        this.setState({
            keysPressed: (this.state.keysPressed.indexOf(e.key) > -1) ? this.state.keysPressed : keysPressed.toArray()
        });
    }

    handleKeyUp(e) {
        const keysPressedList = Immutable.List(this.state.keysPressed);
        const nextKeysPressedList = keysPressedList.filter(item => !(item===e.key));

        this.setState({
            keysPressed: nextKeysPressedList.toArray()
        });
    }

    handleMouseMove(e) {
        this.setState({
            mx: e.pageX,
            my: e.pageY
        })

    }

    render(): JSX.Element {
        const { savedParams, history, location } = this.props;
        const { keysPressed, my, mx } = this.state;
        const styles = {
            page: {
            }
        } as any;

        const activePagePath = savedParams.activePagePath;
        const component = contents[activePagePath  ? activePagePath : "intro"].component;

        console.log(keysPressed);

        return (
            <div>
                <div style={ styles.page }>
                    {React.cloneElement(
                        component,
                        {
                            keysPressed: keysPressed,
                            mx: mx,
                            my: my,
                            history: history
                        }
                    )}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        savedParams: state.homeStore.savedParams,
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onURLChange: (nextParams) => {
            dispatch(saveParams(nextParams));
        }
    }
}

export let PagesFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Pages);
