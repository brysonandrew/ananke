import * as React from 'react';
import * as history from 'history';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import { contentsList } from "../../../data/content";
import { IParams, IDictionary } from "../../../data/models";
import { toggleScrollAnimation, toggleWheel, saveParams } from "../../HomeActionCreators";
import { toParams} from "../../../data/helpers/toParams";
import { MotionScroll } from "../../../Widgets/MotionScroll/MotionScroll";

interface IProperties {
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    isAnimating?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onAnimationEnd?: () => void
    onWheel?: () => void
    onWheelStop?: () => void
    onURLChange?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    docScroll?: number
}

export class Pages extends React.Component<IProps, IState> {

    pageOffsetList: number[] = [];
    pageOffsets: IDictionary<number>;
    timeoutId;
    timeoutStopDelay=50;
    isWheelRecorded=false;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            docScroll: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
    }

    componentDidMount() {
        this.pageOffsetList = contentsList.map((content, i) => document.getElementById(content.path).offsetTop);
        this.pageOffsets = this.pageOffsetList.reduce((acc, curr, i) => {
            acc[contentsList[i].path] = curr;
            return acc;
        }, {});

        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.handleWheel);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("wheel", this.handleWheel);
    }

    handleScroll() {
        if (!this.props.isAnimating) {
            this.changePagePathOnScroll();
        }
        this.setState({docScroll: document.body.scrollTop});
    }

    handleWheel() {
        if (!this.isWheelRecorded) {
            this.props.onWheel();
            this.isWheelRecorded=true;
        }
        //detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
                this.props.onWheelStop();
                this.isWheelRecorded=false;
            },
        this.timeoutStopDelay);
        if (this.props.isAnimating) {
            this.setState({docScroll: document.body.scrollTop});
        }
    }

    changePagePathOnScroll() {
        const { savedParams } = this.props;

        const approachingPageBuffer = 200;
        const pagesScrolledPastOffsets = this.pageOffsetList.filter(offset => (offset - approachingPageBuffer) < window.scrollY);

        const currentIndex = (pagesScrolledPastOffsets.length > 0)
                                ?   pagesScrolledPastOffsets.length - 1
                                :   -1;

        if (currentIndex > -1 && contentsList[currentIndex].path !== savedParams.activePagePath) {
            const nextPath = `/${contentsList[currentIndex].path}`;
            this.props.history.push(nextPath);
            this.props.onURLChange(toParams(nextPath));
        }
    }

    render(): JSX.Element {
        const { docScroll } = this.state;
        const { onAnimationEnd, savedParams, isAnimating } = this.props;
        const isSelected = "activePagePath" in savedParams;
        const isOffsetsReady = (this.pageOffsets != null);
        const isScrollReady = (isSelected && isOffsetsReady);

        const styles = {
            page: {
                position: "relative",
                width: `100%`,
                height: "100vh"
            }
        } as any;

        return (
            <div>
                {isScrollReady &&   <MotionScroll
                                        docScroll={docScroll}
                                        isAnimating={isAnimating}
                                        scrollTarget={this.pageOffsets[savedParams.activePagePath]}
                                        onRest={onAnimationEnd}
                                    />}
                {contentsList.map((content, i) =>
                    <div key={i}
                         id={content.path}
                         style={ styles.page }>
                        {React.cloneElement(
                            content.component,
                                {
                                    offsetTop: this.pageOffsetList[i],
                                    docScroll: this.state.docScroll
                                }
                            )}
                    </div>)}
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
        isAnimating: state.homeStore.isAnimating,
        savedParams: state.homeStore.savedParams,
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onAnimationEnd: () => {
            dispatch(toggleScrollAnimation(false));
        },
        onWheel: () => {
            dispatch(toggleWheel(true));
            dispatch(toggleScrollAnimation(false));
        },
        onWheelStop: () => {
            dispatch(toggleWheel(false));
        },
        onURLChange: (nextParams) => {
            dispatch(saveParams(nextParams));
        }
    }
}

export let PagesFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Pages);
